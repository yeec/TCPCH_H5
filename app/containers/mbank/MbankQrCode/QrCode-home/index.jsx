import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
//API数据接口
import API from "../../../../constants/api";
//公共方法
import Common from "../../../../util/common.jsx";
import $Fetch from "../../../../fetch/fetch.js";
import $native from "../../../../native/native";
//基础组件
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
//业务组件
import "../style/index.web.js";
import MbankTransferOutItem from "../../../../components/mbank/mbank-public-account-select2/index.web.jsx";
import Modal from "../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js";

export default class MbankQrCodeHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      List2: [], //下挂账户列表使用
      ListOut: [], //模态框下挂列表选择返回
      currentAccount2: [], //转出列表下挂账户信息
      name: "天天来重庆老火锅",
      money: "98.88",
      card: "唐山银行信用卡(6768)"
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  //初始化生命周期
  componentDidMount() {
    let that = this;
    // 设置native topbar 标题及返回
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "二维码收付款",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goBackPage
      }
    });
    //1、获取转出账户列表
    $Fetch(API.API_GET_OWN_ACCOUNTS, {
      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF02",
        //步骤编码(根据相应步骤填写字段（1,2,3,4）)
        stepCode: "1",
        //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
        tradeType: "1",
        //交易标识 1-主，2-副
        flag: "2",
        //服务接口版本号 1.0.0
        serviceVersion: "1.0.0"
      },
      data: {}
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        //
        Common.checkUnderAccount(res.rspBody.returnList);
        that.setState({
          List2: res.rspBody.returnList,
          customerName: res.rspBody.customerName
        });

        if (
          Common.getSessionData(API.SESSION_TRANSFER_RESULTCALLBACK) ===
          "accountMain"
        ) {
          // 4、账户管理跳转传值问题
          $native.callClientForUI(API.NATIVE_CODE_STOREDATA, {
            success: res => {
              let item = JSON.parse(res);
              that.setState({
                currentAccount2: item
              });
            }
          });
        }

        if (that.state.currentAccount2.length == 0) {
          res.rspBody.returnList.map(function(item, i) {
            item.now = "0";
            if (i === 0) {
              item.now = "1";
              that.setState({
                currentAccount2: item
              });
            }
          });
        }
      }
    });
  }
  goBackPage() {
    $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
    Common.removeSessionData(API.SESSION_INVEST_SMF_MESSAGE);
  }
  // 扫二维码
  shaoEwm = () => {
    $native.callClientForUI(API.NATIVE_CODE_SCAN_QRCODE, {
      success: this.successCallBack
    });
    
    // Common.setUrl("qrcode-input.html");
  };
  //扫描结果回调函数
  successCallBack = res => {
    let resSuccess =JSON.parse(res).success;
    // alert(resSuccess.name);
    this.setState({
      name: resSuccess.name,
      money: resSuccess.money
    });
    let info = {
      name: this.state.name,
      money: this.state.money,
      // card: this.state.card
    };
    Common.addSessionData(API.SESSION_INVEST_SMF_MESSAGE, JSON.stringify(info));
    Common.setUrl("qrcode-input/index.html");
  };
  //下挂账户列表显示modal框
  showAccountListBox2() {
    let that = this;
    this.setState({
      pickerVisible: true
    });
    let allaccount = that.state.List2.map(function(item, i) {
      item.cusName = that.state.customerName;
      return JSON.stringify(item);
    });
    Modal.transferPaymentAccount(
      {
        items: allaccount,
        titleText: "选择账户",
        close: Common.closeModal
      },
      function(key) {
        let accountListNew2 = that.state.List2.map(function(item, i) {
          item.now = "0";
          if (i === key) {
            item.now = "1";
            that.setState({
              currentAccount2: item
            });
          }
          return item;
        });

        that.setState({
          ListOut: accountListNew2
        });
        Common.closeModal();
      }
    );
  }
  render() {
    let CurrentAccount2 = this.state.currentAccount2;
    return (
      <div>
        <div className="mbank-QrCode">
          <div className="mbank-QrCode-title" />
          <div className="mbank-QrCode-shao">
            <div className="mbank-QrCode-shao-box">
              <div className="txm">
                <div />
                <p>2898 ****888查看数字</p>
              </div>
              <div className="ewm">
                <div />
              </div>
              <MbankTransferOutItem
                cardnum={CurrentAccount2.acNo}
                name={this.state.customerName}
                money={CurrentAccount2.availBal}
                showdetail={this.showAccountListBox2.bind(this)}
              />
              {/* <div className="card">{this.state.card}</div> */}
            </div>
          </div>
          <div className="mbank-QrCode-tips">
            如付款失败，将尝试其他付款方式
          </div>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <div className="mbank-QrCode-button">
            <div>
              <i className="fkm" />
              <p>付款码</p>
            </div>
            <div onClick={this.shaoEwm}>
              <i className="smf" />
              <p>扫码付</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
