import React from 'react';
import moment from 'moment'

import formatMoney from './../../../../util/common/accounting-js/formatMoney.js';
import WhiteSpace from '../../../Base/white-space/index.web.jsx';

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
    };

    render() {

        const {
            show
        } = this.state;


        const { props } = this;

        let {
            Flag,
            className,
            productHold,
            productName,
            AmountN,
            Balance,
            productID,
            productType,
            productState,
            TranDate01,
            TranTime,
            Sign1,
            Sign2,
            channelBusiCode,
            productStateShow,
            onClick
        } = props;

        if(channelBusiCode === '203'){
            Flag = '购买';
            Sign2 = "-"; Sign1 = "plus"
        }
        if(channelBusiCode === '204'){
            Flag = '赎回';
            Sign2 = "+"; Sign1 = "plus"
        }
        if(channelBusiCode === '205'){
            Flag = '撤单';
            Sign2 = "+"; Sign1 = "plus"
        }
        if(channelBusiCode === '302'){
            Flag = '到期';
            Sign2 = "+"; Sign1 = "plus"
        }
        if(channelBusiCode === '907'){
            Flag = '份额冻结';
            Sign2 = "-"; Sign1 = "plus"
        }
        if(channelBusiCode === '908'){
            Flag = '份额续冻';
            Sign2 = "-"; Sign1 = "plus"
        }
        if(channelBusiCode === '909'){
            Flag = '份额解冻';
            Sign2 = "+"; Sign1 = "plus"
        }

        if (Flag === "理财购买") {

            Sign2 = "-"; Sign1 = "plus"
        } else if (Flag === "理财撤销" || Flag === "理财赎回") {

            Sign2 = "+"; Sign1 = "minus"
        }

        switch(productState){
            case "1":productStateShow="申请成功";break;
            case "2":productStateShow="申请失败";break;
            case "3":productStateShow="已撤单，";break;
            case "4":productStateShow="确认成功";break;
            case "5":productStateShow="确认失败";break;
            default:productStateShow="";
        }

        return (
            <div>
                <WhiteSpace size="md"/>
                <div className="mbank-public-query-detail-item mbank-public-query-detail-item-middle"
                    onClick={this.showDetail.bind(this)}>
                    <div className="mbank-public-query-detail-line ">
                        <div className="mbank-public-query-detail-content">
                            <p>{Flag}</p>
                            <div>{moment(TranDate01).format('YYYY-MM-DD')} {TranTime}</div>
                        </div>
                        <div className="mbank-public-query-detail-extra">
                            <p><span className={Sign1}>{Sign2}{` ${formatMoney(productHold, { symbol: '￥' })}`}</span></p>
                            {/* <div>
                                <span>余额</span>
                                <span>{` ${formatMoney(Balance, { symbol: '￥' })}`}</span>
                            </div> */}
                        </div>
                        {show ?
                            <div className="mbank-public-query-detail-arrow">
                                <i className="ryt-icon ryt-icon-xxs ryt-icon-arrow-up"></i>
                            </div> : 
                            <div className="mbank-public-query-detail-arrow">
                                <i className="ryt-icon ryt-icon-xxs ryt-icon-arrow-dn"></i>
                            </div>
                        }
                    </div>
                </div>
                {
                    show ? <div className="mbank-public-query-detail-data">
                        <div>
                            <div>产品名称：</div>
                            <div>{productName}</div>
                        </div>
                        <div>
                            <div>产品代码：</div>
                            <div>{productID}</div>
                        </div>
                        {/* <div>
                            <div>产品类型：</div>
                            <div>{productType}</div>
                        </div> */}
                        <div>
                            <div>申购份额：</div>
                            <div>{formatMoney(productHold,{symbol: '￥'})+"元"}</div>
                        </div>
                        <div>
                            <div>交易状态：</div>
                            <div>{productStateShow}</div>
                        </div>
                    </div> : null
                }

            </div>

        );
    }
}


