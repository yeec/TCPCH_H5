import React from "react";
// import { hashHistory } from 'react-router'
//公共方法
import Common from "../../../../../util/common.jsx";
import PureRenderHoc from "../../../../../util/hoc/index";
//API数据接口
import API from "./../../../../../../app/constants/api";
//业务组件
import MbankAccountIcon from "./../../../../../components/mbank/mbank-public-icon/index.web.jsx";

import "./style/index.web";

class MbankTransferWay extends React.Component {
  constructor(props) {
    super(props);
  }

  UserTransfer = () => {
    Common.removeSessionData(API.SESSION_TRANSFER_CONFIRMDATA);
    //清空转账联系人
    Common.removeSessionData(API.SESSION_TRANSFER_USER_DATA);
    //转账结果界面跳转传值
    Common.removeSessionData(API.SESSION_TRANSFER_RESULTCALLBACK);
    Common.addSessionData(API.SESSION_TRANSFER_RESULTCALLBACK, "transferMain");
    //hashHistory.push('/transfer-businessInput')
    Common.setUrl("transfer-businessInput/index.html");
  };
  OutBankTransfer = () => {
    Common.setUrl("transfer-query/index.html");
    // hashHistory.push('/transfer-query')
  };
  MbankTransferList() {
    Common.setUrl("transfer-userQuery/index.html");
    // hashHistory.push('/transfer-userQuery')
  }
  MbankrevokeList() {
    Common.setUrl("transfer-revoke/index.html");
  }

  render() {
    return (
      <div>
        <div className=" mbank-transfer-top">
          <div className=" mbank-transfer-top-link">
            <div onClick={this.UserTransfer.bind(this)}>
              <i className="zz1"></i>
              <p>手机号转账</p>
            </div>
            <div onClick={this.UserTransfer.bind(this)}>
            <i className="zz2"></i>
              <p>转账汇款</p>
            </div>

            <div onClick={this.MbankrevokeList.bind(this)}>
            <i className="zz3"></i>
              <p>转账撤销</p>
            </div>
          </div>
        </div>
        <div className=" mbank-transfer-top-link2">
          <div onClick={this.OutBankTransfer.bind(this)}>
          <i className="zz2"></i>
            <p>转账查询</p>
          </div>
          <div onClick={this.MbankTransferList.bind(this)}>
          <i className="zz1"></i>
            <p>收款人管理</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PureRenderHoc(MbankTransferWay);
