import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import { hashHistory } from 'react-router';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';
import MbankAccountIcon from '../../../../../../app/components/mbank/mbank-public-icon/index.web.jsx';
import Tag from '../../../../../../app/components/mbank/mbank-public-tag/index.web.jsx';
import Icon from '../../../../../../app/components/Base/icon/index.web.jsx';
import Common from "../../../../../util/common.jsx";
import API from '../../../../../constants/api';

const prefixCls = 'mbank-yinzheng-account-list';
export default class MbankAccountList extends React.Component {
    constructor(props) {
        super(props);
    }
    // 向父组件传递值并调用方法
    FatherMethodFn(item) {
        //transactionId为交易类型,item为账户信息
        this.props.MethodFn(item);
    }
    render() {
        const { props } = this;
        let {
            list,
            className,
            bankAccount,
            financialAccount,
            type,
            AccountType,
            BrokerName,
            onClick,
            MethodFn,
            item
        } = props;
        const cls = classNames(`mbank-yinzheng-account-list`, {
            [className]: className
        });
        return (
            <div className={cls} >
                <Tappable onClick={this.FatherMethodFn.bind(this, item)} component="div">
                    <div className={`${prefixCls}-header`}>
                        <div className={`${prefixCls}-header-info`}>
                            <div className="icon"><Icon name="logo" size="l" /></div>
                            <div className="name">
                                <span>凉山州商业银行</span>
                                <p>{bankAccount}</p>
                            </div>
                            <div className="type-name">{AccountType}</div>
                        </div>
                        <div className={`${prefixCls}-header-icon`}>
                            <div className="icon-huzhuan">
                                <Icon name="huzhuan" size="xl" />
                            </div>
                            <div className="icon-right">
                                <Icon name="arrow-right" size="sm" />
                            </div>
                        </div>

                        <div className={`${prefixCls}-header-info`}>
                            <div className="icon"><Icon name="zhengquan" size="l" /></div>
                            <div className="name">
                                <span>证券资金账号</span>
                                <p>{financialAccount}</p>
                            </div>
                            <div className="capitalName">
                                <span>{BrokerName}</span>
                            </div>
                        </div>
                    </div>
                </Tappable>
            </div>
        );
    }
}


