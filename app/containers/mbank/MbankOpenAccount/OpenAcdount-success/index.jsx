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

// 预约处理页面
export default class OpenAcdountSuccess extends React.Component {
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

    // 跳转上一个页面
    goFirstPage = () =>{
      Common.setUrl("openAcdount-input/index.html");
    }

     //页面跳转
  render() {
    return (
      <div>
        {/***************************** 交易结果信息 *************************/}
        <div ref="myResult">
          <WhiteSpace size="xs" />
          <MbankPublicResult
            type="success"
            message={this.state.name}
            title="预约成功"
            money={this.state.money}
            ljOpen={this.state.ljOpen}
            ljMoney={this.state.ljMoney}
          />
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
        </div>
      </div>
    );
  }
}