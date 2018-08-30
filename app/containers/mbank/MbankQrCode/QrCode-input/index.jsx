import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
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
import Input from "../../../../components/Base/input-list/index.web.jsx";
import $ from "jquery";

//业务组件
import "../style/index.web.js";
import MbankTransferOutItem from "../../../../components/mbank/mbank-public-account-select2/index.web.jsx";
import Modal from "../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js";

export default class MbankQrCodeInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      money: "",
      card: "",
      password: "",
      loginPasswordmlength2: "",
      loginPassword: "",
      loginPasswordm: "",
      keyKbHide: "",
      List2: [], //下挂账户列表使用
      ListOut: [], //模态框下挂列表选择返回
      currentAccount2: [], //转出列表下挂账户信息
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  //初始化生命周期
  componentDidMount() {
    let that = this;
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "确认并付款",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goBackPage
      }
    });
    let sessionData = JSON.parse(
      Common.getSessionData(API.SESSION_INVEST_SMF_MESSAGE)
    );
    this.setState({
      name: sessionData.name,
      money: Common.setMoneyFormat(sessionData.money),
      card: sessionData.card
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
  // 调用客户端键盘接口
  //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
  showKeyBoard2 = newId => {
    this.cancelKbGb(newId);
    this.setState({
      loginPasswordm: "",
      loginPassword: "",
      loginPasswordmlength2: ""
    });
    let that = this;
    //展示光标
    $("#" + newId).show();
    $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
      type: "pwd",
      //关闭键盘回调函数，并传入关闭的光标的Id
      cancel: that.cancelKb.bind(this, newId),
      success: res => {
        let jsons = JSON.parse(res);
        // alert(res)
        this.setState({
          loginPasswordm: jsons.pswText,
          loginPassword: jsons.text,
          loginPasswordmlength2: jsons.pswLength
        });
        showKeyBoard2();
      }
    });
    $("#" + newId).show();
  };
  cancelKbGb = val => {
    let kbId = this.state.keyKbHide;
    if (kbId) {
      $("#" + kbId).hide();
      this.setState({
        keyKbHide: val
      });
    } else {
      this.setState({
        keyKbHide: val
      });
    }
  };

  cancelKb = val => {
    //隐藏光标
    $("#" + val).hide();
  };

  //获取交易密码
  setPasswordinputval2(val) {
    let that = this;
    that.setState({
      passwordInputVal2: val
    });
  }
  goBackPage() {
    Common.setUrl("qrcode-home/index.html");
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    //清除Session
    Common.removeSessionData(API.SESSION_INVEST_SMF_MESSAGE);
  }
  //页面跳转
  goFirstPage = () => {
    Common.setUrl("qrcode-confirm/index.html");
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
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
          <div className="mbank-QrCode-title">
            <div>
              <i> </i>
            </div>
            <div>
              <p>{this.state.name}</p>
              {/* <span>龙观店</span> */}
            </div>
          </div>
          <div className="mbank-QrCode-input">
            <div className="mbank-QrCode-input-box">
              <div className="info">
                <p>支付金额</p>
                <span><span>￥</span> {this.state.money} <span>元</span></span>
                <MbankTransferOutItem
                cardnum={CurrentAccount2.acNo}
                name={this.state.customerName}
                money={CurrentAccount2.availBal}
                showdetail={this.showAccountListBox2.bind(this)}
              />
              </div>
              <Input.Group>
                <Input
                  placeholder="请输入交易密码"
                  type="password"
                  inputType="name"
                  editable={false}
                  onClick={this.showKeyBoard2.bind(this, "keyboardPassword1")}
                  value={this.state.loginPassword}
                  labelNumber={6}
                  id="keyboardPassword1"
                  cursorSize={this.state.loginPasswordmlength2}
                >
                  交易密码
                </Input>
              </Input.Group>
            </div>
          </div>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="primary"
              size="default"
              onTap={this.goFirstPage.bind(this)}
              disabled={!this.state.loginPassword}
            >
              确认付款
            </Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}
