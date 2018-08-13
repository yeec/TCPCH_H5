import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import Tappable from "react-tappable";
//业务组件
import MbankAccountIcon from "../../../../../../app/components/mbank/mbank-public-icon/index.web.jsx";
//API数据接口
import API from "./../../../../../constants/api";
//公共方法
import $native from "./../../../../../native/native";
import Common from "../../../../../util/common.jsx";
import formatMoney from "./../../../../../util/common/accounting-js/formatMoney.js";

const prefixCls = "mbank-account-list";

export default class MbankAccountList extends React.Component {
  constructor(props) {
    super(props);
  }

  // 向父组件传递值并调用方法
  FatherMethodFn(url, info) {
    //transactionId为交易类型,item为账户信息
    this.props.MethodFn(url, info);
  }

  // 跳转至转账
  goTransfer(url, info) {
    //转账结果界面跳转传值
    Common.removeSessionData(API.SESSION_TRANSFER_RESULTCALLBACK);
    Common.addSessionData(API.SESSION_TRANSFER_RESULTCALLBACK, "accountMain");
    //跳转至转账录入模块
    Common.setUrl("transfer-businessInput.html");
    let params = JSON.stringify(info);
    //传值
    $native.callClientForUI(API.NATIVE_CODE_STOREDATA, { params });
  }

  render() {
    const { props } = this;
    let {
      flag,
      prdInterest,
      prdAmt,
      prdEndDate,
      prdName,
      resiveName,
      resiveOpenBank,
      transferDate,
      transferAmt,
    } = props;

    // 识别账户类型,并设置颜色
    /**** 接口字段说明
        flag	提醒类型	String					"1-理财类 2-转账预约"
        dateTime	提醒时间	String				年月日：yyyymmdd	
        prdAmt	产品金额	String					
        prdName	产品名称	String					
        prdEndDate	产品到期日	String				年月日：yyyymmdd	
        prdInterest	产品利息金额	String					
        transferAmt	转账金额	String					
        transferDate	转账时间	String				年月日：yyyymmdd	
        resiveOpenBank	收款人开户行	String					
        resiveName	收款人名称	String					
    */
    return (
      <div className="mbank-jrrl-list">
        {flag === "2" ?
        <div className="list">
          <div>
            <i />
            <span>预约转账</span>
          </div>
          <div>
            <div>
              <p>
                <span>转账金额</span>
                <span>
                  {` ${formatMoney(transferAmt, { symbol: "￥" })}`} 元
                </span>
              </p>
              <p>
                <span>转账日期</span>
                <span>{transferDate}</span>
              </p>
              <p>
                <span>收款人姓名</span>
                <span>{resiveName}</span>
              </p>
              <p>
                <span>收款人开户行</span>
                <span>{resiveOpenBank}</span>
              </p>
            </div>
            <div>
              <span>查看</span>
            </div>
          </div>
        </div>
        :
        <div className="list">
          <div>
            <i />
            <span>理财产品</span>
          </div>
          <div>
            <div>
              <p>
                <span>产品名称</span>
                <span>{prdName}</span>
              </p>
              <p>
                <span>投资金额</span>
                <span>{` ${formatMoney(prdAmt, { symbol: "￥" })}`} 元</span>
              </p>
              <p>
                <span>到期日期</span>
                <span>{prdEndDate}</span>
              </p>
              <p>
                <span>累计收益</span>
                <span>{` ${formatMoney(prdInterest, { symbol: "￥" })}`} 元</span>
              </p>
            </div>
            <div>
              <span>查看</span>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}
