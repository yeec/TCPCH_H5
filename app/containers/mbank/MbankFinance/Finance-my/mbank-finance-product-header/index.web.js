import React, {Component, PropTypes} from 'react';
import './style/index.web';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

const prefixCls = 'mbank-account-list';


export default class MbankAccountList extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const {props} = this;

        let {

            className,
            productName,
            productHold,
            productID,
            type,
            onClick
        } = props;


        return (
            <div className="mbank-financing-chiyou-detail">
                <h2>{productName} {productID}</h2>
                <p>{formatMoney(productHold,{symbol: '￥'})+'元'}</p>
                <span>当前申请份额</span>
            </div>
        );
    }
}


