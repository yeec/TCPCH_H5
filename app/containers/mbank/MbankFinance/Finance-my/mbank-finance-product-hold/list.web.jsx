import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';



const prefixCls = 'mbank-account-list';


export default class MbankAccountList extends React.Component {


    constructor(props) {
        super(props);
    }

    //点击事件
    clickFunction = (item) => {
        this.props.MethodFn(item);
    };

    render() {
        const {props} = this;

        let {
            list,
            className,
            prdName,
            matuDate,
            canUseVol,
            item,
            prdId,
            onClick
        } = props;


        return (

            <div className="mbank-financing-product-list-my" onClick={this.clickFunction.bind(this, item)}>
                <div className="mbank-financing-product-list-my-item">
                    <div className="mbank-financing-product-list-my-item-header">
                        <div>{prdName} {prdId}</div>
                        <div>
                            <i className="ryt-icon ryt-icon-xs ryt-icon-arrow-right"></i>
                        </div>
                    </div>
                    <div className="mbank-financing-product-list-my-item-content">
                        <div>
                            <p>{formatMoney(canUseVol,{symbol: '￥'})}</p>
                            <span>持有份额</span>
                        </div>
                        <div>
                            <p>{moment(matuDate).format('YYYY-MM-DD')}</p>
                            <span>到期日</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


