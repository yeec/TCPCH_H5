import React, { Component, PropTypes } from 'react';

import formatMoney from './../../../../util/common/accounting-js/formatMoney.js';
import moment from 'moment';

const prefixCls = 'mbank-public-query-detail';

export default class MbankAccountQuery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }


    showDetail = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    render() {

        const {
            show
        } = this.state;


        const { props } = this;

        let {
            list,
            Flag,
            className,
            currency,
            Balance,
            AmountN,
            Account,
            AccountName,
            AccountType,
            Loanflag,
            TranDate01,
            TranTime,
            Sign1,
            Sign2,
            BankName,
            type,
            onClick
        } = props;


        if (Flag == "D") {
            Flag = '转出',
                Sign2 = "-",
                Sign1 = "plus"
        } else if (Flag == "C") {
            Flag = '转入',
                Sign2 = "+",
                Sign1 = "minus"
        }

        return (
            <div>

                <div className="mbank-public-query-detail-item mbank-public-query-detail-item-middle"
                    onClick={this.showDetail.bind(this)}>
                    <div className="mbank-public-query-detail-line ">
                        <div className="mbank-public-query-detail-content">
                            <p>{Loanflag}</p>
                            <div>{moment(TranDate01).format('YYYY-MM-DD')} {TranTime}</div>
                        </div>
                        <div className="mbank-public-query-detail-extra">
                            <p><span className={Sign1}>{Sign2}{` ${formatMoney(AmountN, { symbol: '￥' })}`}</span></p>
                            <div>
                                <span>余额</span>
                                <span>{` ${formatMoney(Balance, { symbol: '￥' })}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


