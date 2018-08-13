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

export default class MbankQrCodeHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  //初始化生命周期
  componentDidMount() {
    // 设置native topbar 标题及返回
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "二维码收付款",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goBackPage
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
    let info = {
      name: "重庆老火锅西二旗店",
      money: "98.88",
      card: "唐山银行信用卡(6764)"
    };
    Common.addSessionData(API.SESSION_INVEST_SMF_MESSAGE, JSON.stringify(info));
    // Common.setUrl("qrcode-input.html");
  };
  //扫描结果回调函数
  successCallBack = res => {
    Common.setUrl("qrcode-input/index.html");
    // console.log(JSON.stringify(res));
    // alert(JSON.stringify(res));
  };
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
                <p>2898 ****查看数字</p>
              </div>
              <div className="ewm">
                <div />
              </div>
              <div className="card">唐山银行信用卡(6764)</div>
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
