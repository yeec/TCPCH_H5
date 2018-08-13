import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
//API数据接口
import API from "../../../../constants/api";
//公共方法
import Common from "../../../../util/common.jsx";
import $Fetch from "../../../../fetch/fetch.js";
import $native from "../../../../native/native";
//基础组件
import Prompt from "../../../../components/Base/ocr-prompt/index.web.jsx";
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../components/Base/button/index.web.jsx";
import ModalBase from "../../../../components/Base/modal/index.web.js";
import Input from "../../../../components/Base/input-list/index.web.jsx";
import $ from "jquery";

//业务组件
import MbankTransferPeople from "../../../../components/mbank/mbank-public-list/mbank-pubilc-list-transfer-people/index.web.jsx";
import Modal from "../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js";
import MbankTransferOutItem from "../../../../components/mbank/mbank-public-account-select/index.web.jsx";
import MbankPublicInputMoney from "../../../../components/mbank/mbank-public-input-money/index.web.jsx";
import MbankTransferBank from "../../../../components/mbank/mbank-public-select/mbank-transfer-bank/index.web.jsx";

import "../style/index.web.js";

export default class MbankQrCodeInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      money: "",
      card: "",
      password: "",
      loginPasswordmlength2:"",
      loginPassword:"",
      loginPasswordm:"",
      keyKbHide:""
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  //初始化生命周期
  componentDidMount() {
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
    console.log(sessionData);
  }
  // 调用客户端键盘接口
  //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
  showKeyBoard2 = newId => {
    alert(newId)
    this.cancelKbGb(newId);
    this.setState({
      loginPasswordm: "",
      loginPassword: "",
      loginPasswordmlength2: ""
    });
    alert("222")
    let that = this;
    //展示光标
    $("#" + newId).show();
    alert("333")
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
    let kbId=this.state.keyKbHide
    if(kbId){
      $("#" + kbId).hide();
      this.setState({
        keyKbHide:val
     })
    }else{
      this.setState({
        keyKbHide:val
     })
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
    Common.setUrl("qrcode-home.html");
    //清除Session
    Common.removeSessionData(API.SESSION_INVEST_SMF_MESSAGE);
  }
  //页面跳转
  goFirstPage = () => {
    Common.setUrl("qrcode-confirm.html");
  };
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
                <span>{this.state.money}</span>
                <div>
                  <span>{this.state.card}</span>
                  <span>更换</span>
                </div>
              </div>
              <Input.Group>
              <Input placeholder="请输入交易密码" type="password" inputType="name" editable={false} onClick={this.showKeyBoard2.bind(this,"keyboardPassword1")} value={this.state.loginPassword} labelNumber={6}
                               id="keyboardPassword1" cursorSize={this.state.loginPasswordmlength2}>交易密码</Input>
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
            >
              确认付款
            </Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}
