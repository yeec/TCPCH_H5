import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
// import {hashHistory} from 'react-router'
//API数据接口
import API from "../../../../constants/api";
//公共方法
import Common from "../../../../util/common.jsx";
import $native from "../../../../native/native";
import $Fetch from "../../../../fetch/fetch.js";
//基础组件
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../components/Base/button/index.web.jsx";
import Modal from "../../../../components/Base/modal/index.web.js";

//业务组件
import MbankPublicResult from "../../../../components/mbank/mbank-public-result/index.web.jsx";
import RedPacket from "../../../../components/mbank/mbank-pubilc-redPacket/index.web.jsx";
export default class MbankQrCodeConfirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redPacketDisplay: false,
      redPacketMoney: "",
      name: "",
      money: "",
      hbMoney: "",
      ljMoney: "",
      imgURL: "",
      ljOpen: false
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  //初始化生命周期
  componentDidMount() {
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "付款成功",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goBackPage
      }
    });
    this.dataFech();
  }
  dataFech() {
    let that = this;
    let sessionData = JSON.parse(
      Common.getSessionData(API.SESSION_INVEST_SMF_MESSAGE)
    );
    $Fetch(
      API.NATIVE_CODE_RED_PACKET,
      {
        //默认固定上送报文
        reqHead: {
          //场景编码
          sceneCode: "FA01",
          //步骤编码(根据相应步骤填写字段（1,2,3,4）)
          stepCode: "1",
          //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
          tradeType: "1",
          //交易标识 1-主，2-副
          flag: "1",
          //服务接口版本号 1.0.0
          serviceVersion: "1.0.0"
        },
        data: {
          mallId: "05bcbb75-26f4-416e-b5fa-7eb95325742b",
          orgCityNo: "110",
          shelfCode: "TS05",
          runTimeFlag: "runTimeFlag"
        }
      },
      true,
      false
    ).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        let hblist = res.rspBody.shelfGoodsList[0];
        if (hblist.redpacketType == "02") {
          this.setState({
            hbMoney: hblist.redpacketCeiling,
            imgURL: hblist.imgURL,
            name: sessionData.name,
            money: sessionData.money
          });
        } else if (hblist.redpacketType == "01") {
          console.log(hblist.redpacketCeiling);
          this.setState({
            ljMoney: hblist.redpacketCeiling,
            money: sessionData.money - hblist.redpacketCeiling,
            ljOpen: true
          });
        }
      } else {
        let alertDict = {
          title: "错误提示",
          msg: res.rspHead.returnMsg,
          success_text: "确认",
          cancel_text: "取消"
        };
        Common.showAppDialogAlert(alertDict);
      }
    });
  }
  //页面跳转
  goFirstPage = () => {
    Common.setUrl("qrcode-home/index.html");
    Common.removeSessionData(API.SESSION_INVEST_SMF_MESSAGE);
  };
  //页面跳转
  displayRedPacket = () => {
    let redPacketDisplay = !this.state.redPacketDisplay;
    this.setState({
      redPacketDisplay
    });
  };
  //页面跳转
  openRedPacket = () => {
    this.setState({
      redPacketMoney: this.state.hbMoney,
      redPacketDisplay: true
    });
  };
  //页面跳转
  render() {
    // console.log(this.state.shelfGoodsList.redpacketType);
    return (
      <div>
        {/***************************** 交易结果信息 *************************/}
        <div ref="myResult">
          <WhiteSpace size="xs" />
          <MbankPublicResult
            type="success"
            message={this.state.name}
            title="支付成功"
            money={this.state.money}
            ljOpen={this.state.ljOpen}
            ljMoney={this.state.ljMoney}
          />
          {/* <WhiteSpace size="lg" /> */}
          {!Common.judgeEmpty(this.state.hbMoney) ? (
            <div>
              <div onClick={this.displayRedPacket.bind()}>
                <img src={this.state.imgURL} alt="" width="100%" />
              </div>
            </div>
          ) : null}
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="ghost"
              size="default"
              onTap={this.goFirstPage.bind(this)}
            >
            返回
            </Button>
          </WingBlank>

          <Modal visible={this.state.redPacketDisplay} type="alert">
            <RedPacket
              onTap={this.openRedPacket}
              redPacketMoney={this.state.redPacketMoney}
              closeRedPacket={this.displayRedPacket}
            />
          </Modal>
        </div>
      </div>
    );
  }
}
