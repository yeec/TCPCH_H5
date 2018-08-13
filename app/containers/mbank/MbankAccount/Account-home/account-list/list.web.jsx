import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
//业务组件
import MbankAccountIcon from '../../../../../../app/components/mbank/mbank-public-icon/index.web.jsx';
//API数据接口
import API from './../../../../../constants/api';
//公共方法
import $native from './../../../../../native/native';
import $Fetch from './../../../../../fetch/fetch';
import Common from "../../../../../util/common.jsx";
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

const prefixCls = 'mbank-account-list';

export default class MbankAccountList extends React.Component {

    constructor(props) {
        super(props);
    }

    // 向父组件传递值并调用方法
    FatherMethodFn(url, info) {
        if(JSON.parse(Common.getSessionData(API.SESSION_EDIT_ANOTHER_NAME))){
            // alert("11")
            //transactionId为交易类型,item为账户信息
            this.props.MethodFn(url, info);
        }else {
            // alert("jinru")
            Common.addSessionData(API.SESSION_EDIT_ANOTHER_NAME, true);
            // this.FatherMethodFn(url, info);
        }
    }

    // 跳转至转账
    goTransfer(url,info) {
        //转账结果界面跳转传值
        Common.removeSessionData(API.SESSION_TRANSFER_RESULTCALLBACK);
        Common.addSessionData(API.SESSION_TRANSFER_RESULTCALLBACK, 'accountMain');
        //跳转至转账录入模块
        Common.setUrl('transfer-businessInput/index.html');
        let params = JSON.stringify(info)
        //传值
        $native.callClientForUI(API.NATIVE_CODE_STOREDATA, {params});

    }

    render() {
        const {props} = this;
        let {
            className,
            accountSign,
            acNo,
            availBal,
            acState,
            deptName,
            accInfo,
            alias,
            customerName,
            onTop,
            MethodFn,
            onClick
        } = props;

        // 识别账户类型,并设置颜色
        const cls = classNames(`mbank-account-list`, {
            [className]: className
        });
        /**** 接口字段说明
         *
         openOrg  //开卡机构
         foldCardFlag  //账户类型: 卡折标志 (0-卡) (1-存折)( 2-卡折关联)
         accountNo  //账号
         alias //别名
         accountStat //签约状态: (0-未签约) (1-签约)
         accountSign //主账户: (0-非主账户)(1-主账户)
         balance //账户总额
         usableBalance //可用余额
         accountStatus //账户状态: (0-正常) (1-销户) (2-长期不动户) (3-不动转收益)
         bankName // 行名
         */




        return (
            <div className={cls}>
                <Tappable onClick={this.FatherMethodFn.bind(this, 0, accInfo)} component="div">
                    <div className={`${prefixCls}-header`}>
                        <div className={`${prefixCls}-header-icon`}>
                            <MbankAccountIcon name="logo-313684093748"/>
                        </div>
                        <div className={`${prefixCls}-header-info`}>
                            <div className="name">
                                <span>{customerName}</span>
                            </div>
                            <div className="preName">
                                <p>{'('+alias}</p>
                            </div>
                            <div className={`${prefixCls}-header-info-icon`} onClick={onTop}>
                                <MbankAccountIcon name="bianji" size='xxs'/>
                            </div>
                            <div className={`${prefixCls}-header-info-icon`}>
                            </div>
                            <div className="preNameRight">
                                <p>{')'}</p>
                            </div>
                            <div className="tagSmall">
                                {accountSign == 1 && <div><i className="ryt-icon ryt-icon-xs ryt-icon-zhuzhanghu"></i>
                                    <p>主账户</p></div>}
                                <div><i className="ryt-icon ryt-icon-xs ryt-icon-chuxuka"></i>
                                    <p>储蓄卡</p>
                                </div>
                                {/*<div><i className="ryt-icon ryt-icon-xs ryt-icon-cunzhe"></i>*/}
                                {/*<p>存折</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                        <div className={`${prefixCls}-header-info`}>
                            <div className="number">
                                <span>{Common.setAccountNum2(acNo,true)}</span>
                            </div>
                            <div><MbankAccountIcon size="xxs" name="arrow-right"></MbankAccountIcon></div>
                        </div>

                        <div className={`${prefixCls}-header-info`}>
                            <div className="text">
                                <span>可用余额</span>
                            </div>
                            <div className="money">
                                <b>{` ${formatMoney(availBal, {symbol: '￥'})}`}</b><span>元</span>
                            </div>
                        </div>
                    </div>
                </Tappable>
                <div className={`${prefixCls}-bar`}>
                    <div onClick={this.FatherMethodFn.bind(this, 1, accInfo)}><i
                        className="ryt-icon ryt-icon-sm ryt-icon-jiaoyimingxi"></i>
                        <p>交易明细</p></div>
                    <div onClick={this.goTransfer.bind(this, 2, accInfo)}><i
                        className="ryt-icon ryt-icon-sm ryt-icon-zhanghushezhi"></i>
                        <p>转账汇款</p></div>
                </div>
            </div>
        );
    }
}


