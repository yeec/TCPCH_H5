import React, {Component, PropTypes} from 'react';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';
import Common from "../../../../../util/common.jsx";
import API from '../../../../../constants/api';
import Icon from '../../../../../components/mbank/mbank-public-icon/index.web.jsx';

const prefixCls = 'mbank-account-list';

export default class MbankAccountList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSub: this.props.isSub,
            isBuy: this.props.isBuy
        }
    }

    jumpProductDetail = (item,prdId) => {
        let that = this;
        //先清除session中的值
        Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_INFO);
        // 获取当前账号信息传入session
        Common.addSessionData(API.SESSION_FINANCE_PRODUCT_INFO, JSON.stringify(item));
        // Common.setUrl("finance-detail/index.html?"+prdId+'#'+this.state.isBuy+'&'+this.state.isSub);
        Common.setUrl("finance-detail/index.html?"+'prdId='+prdId+'&isBuy='+this.state.isBuy+'&isSub='+this.state.isSub+'&enterFlag='+'');
    };

    render() {
        const {props} = this;

        let {
            className,
            prdId,
            prdNo,
            propRateMax,
            prdName,
            term,
            ssubStartAmt,
            item,
            onClick
        } = props;
        
        let minMoney="";
        if(this.state.isBuy == '1'){   //是否可申购
            minMoney = sbuyStartAmt;
        }else if(this.state.isSub == '1'){             //是否可认购
            minMoney = ssubStartAmt;
        }

        return (
            <div className="mbank-financing-product-list-item" onClick={this.jumpProductDetail.bind(this, item ,prdId)}>
            <div className="title">
                    <p>{propRateMax}<span>%</span></p>
                    <span>最高年化收益</span>
                </div>
                <div className="title2">
                    <div>{prdName} </div>
                    <p>{prdId}</p>
                    <span>{term}天</span><span>|</span><span>{` ${formatMoney(minMoney, {symbol: '￥'})}`}起售</span>
                </div>
                <div><Icon name="arrow-right" size="xs" /></div>
            </div>
        );
    }
}


