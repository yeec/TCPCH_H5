import React, { Component, PropTypes } from "react";
//业务组件
//API数据接口
//公共方法
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

  urlFianceDetail=()=>{
    Common.setUrl("finance/index.html");
  }
  urlTransfer=()=>{
    Common.setUrl("transfer-businessInput/index.html");
  }
  render() {
    const { props } = this;
    let {
      flag,
      prdName,
      prdAmt,
      dateTime,
      time
    } = props;

    // 识别账户类型,并设置颜色
    /**** 接口字段说明
        flag	提醒类型	String					"1-理财类 2-转账预约"
        prdName	产品名称	String					
        prdAmt	交易金额	String					
        dateTime	产品到期日	String				年月日：yyyymmdd	
        time 到期时间
    */
    return (
      <div className="mbank-jrrl-list">
        <div className="list">
          <div>
            <i />
            <span>{flag}</span>
          </div>
          <div>
            <div>
              <p>
                <span>产品名称</span>
                <span>{prdName}</span>
              </p>
              <p>
                <span>交易金额</span>
                <span>{` ${formatMoney(prdAmt, { symbol: "￥" })}`} 元</span>
              </p>
              <p>
                <span>到期日期</span>
                <span>{dateTime}</span>
              </p>
              <p>
                <span>到期时间</span>
                <span>{time}</span>
              </p>
            </div>
            <div onClick={this.urlFianceDetail}>
              <span>再次购买</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
