import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
// import {hashHistory} from 'react-router'
//API数据接口
import API from "../../../../constants/api";
//公共方法
import Common from "../../../../util/common.jsx";
import $native from "../../../../native/native";
import $Fetch from "../../../../fetch/fetch.js";
import $ from "jquery";
//基础组件
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../components/Base/button/index.web.jsx";
import Input from "../../../../components/Base/input-list/index.web.jsx";
import Modal from "../../../../components/Base/modal/index.web.js";

//业务组件
import MbankPublicResult from "../../../../components/mbank/mbank-public-result/index.web.jsx";
import MbankTransferConfirm from "../../../../components/mbank/mbank-public-confirm-info/index.web.jsx";
import RedPacket from "../../../../components/mbank/mbank-pubilc-redPacket/index.web.jsx";
export default class MbankQrCodeConfirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redPacketDisplay: false,
      redPacketMoney: ""
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  //初始化生命周期
  componentDidMount() {
    // this.displayRedPacket();
  }

  // 调用客户端键盘接口
  //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
  displayRedPacket = () => {
    let redPacketDisplay = !this.state.redPacketDisplay;
    this.setState({
      redPacketDisplay
    });
  };
  showKeyBoard1() {
    this.setState({
      passwordInputVal: ""
    });
    let that = this;
    $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
      hint: "请输入交易密码",
      type: "tradePsw",
      cancel: "cancel",
      success: res => {
        let jsons = JSON.parse(res);
        let a = "";
        for (var i = 0; i < jsons.pswLength; i++) {
          a = a + "2";
        }
        this.setState({
          cipher: jsons.pswText,
          passwordInputVal: a
        });

        this.genSignature(); //转账接口
      }
    });
  }
  dataFech=()=> {
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
      console.log(res)
    });
  }
  //页面跳转
  goFirstPage = () => {
    Common.setUrl("qrcode-home.html");
  };
  //页面跳转
  openRedPacket = () => {
    this.setState({
      redPacketMoney: "10"
    });
  };
  render() {
    // console.log(this.state.List.approveWay)
    return (
      <div>
        {/***************************** 交易结果信息 *************************/}
        <div ref="myResult">
          <MbankPublicResult
            type={this.state.returnCode}
            type="success"
            message="老重庆担担面"
            title="支付成功"
            money={"34"}
          />
          <WhiteSpace size="sm" />
          {/* <MbankTransferConfirm.Group>
            <MbankTransferConfirm
              title="支付账户"
              content="唐山银行信用卡(6764)"
            />
            <MbankTransferConfirm title="收款账户" content="老重庆担担面" />
          </MbankTransferConfirm.Group> */}
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="ghost"
              size="default"
              onTap={this.goFirstPage.bind(this)}
            >
              完成
            </Button>
          </WingBlank>
          <Button type="warning" onTap={this.dataFech}>
            点我开启
          </Button>
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
