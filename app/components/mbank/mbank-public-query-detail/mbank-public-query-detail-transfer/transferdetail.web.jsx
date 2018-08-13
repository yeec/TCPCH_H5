import React from 'react';
import formatMoney from './../../../../util/common/accounting-js/formatMoney.js';
import WhiteSpace from '../../../Base/white-space/index.web.jsx';
import Button from '../../../Base/button/index.web.jsx'
// import Button from '../../../../components/Base/button/index.web.jsx';

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
            show,
            
        } = this.state;


        const {props} = this;

        let {
            tranDate,
            tranTime,
            Sign1,
            transStartTime,
           
            returnCode,
            returnMsg,
            payAccNo,
            payAccName,
            resiveAccNo,
            zhuanchuAccNo,
            zhuanchuAccName,
            resiveAccName,
            resiveBankName,
            transAmt,
            transtt,
            postscript,
            isPosthaste,
            onClick,
            fages,
            onTAB
        } = props;

        console.log(transtt)
        if((returnCode === "00000000" && transtt =="51") || (returnCode === "CCOE0160" && transtt =="51")){
            Sign1 = "plus";
            returnCode = "处理中"
        }else if ((returnCode === "00000000" && transtt =="90")  || (returnCode === "CCOE0160" && transtt =="90")) {
            Sign1 = "plus";
            returnCode = "成功"
        }else {
            Sign1 = "minus";
            returnCode = "失败"
        }

        // 卡号

        let transStartTimeNew =
            transStartTime.slice(0, 4) + "-" +
            transStartTime.slice(4, 6) + "-" +
            transStartTime.slice(6, 8) + " " +
            transStartTime.slice(8, 10) + ":" +
            transStartTime.slice(10, 12) + ":" +
            transStartTime.slice(12, 14)
        ;
        // {moment(tranDate).format('YYYY-MM-DD')} {moment(tranTime).format('hh:mm:ss')}
        // let style = {
        //     color:"#FFF",
        //     margin: "0 auto",
        //     padding:"0 456px",
        //     lineHeight:"105px",
        //     fontSize:"48px",
        //     border:"1px solid #ccc",
        //     borderRadius:"20px",
        //     backgroundColor:"#d62721",
        //     marginTop:"20px"
        // }
        return (
            <div>
                <WhiteSpace size="lg"/>
                <div className="mbank-public-query-detail-item mbank-public-query-detail-item-middle"
                     onClick={this.showDetail.bind(this)}>
                    <div className="mbank-public-query-detail-line ">
                        <div className="mbank-public-query-detail-content">
                            <p>手机银行转账</p>
                            <div> {transStartTimeNew}</div>
                        </div>
                        <div className="mbank-public-query-detail-extra">
                            <p><span className={Sign1}>{returnCode}</span></p>
                            <div>
                                <span>转账金额</span>
                                <span>{` ${formatMoney(transAmt.toString(), {symbol: '￥'})}`}</span>
                            </div>
                        </div>
                        {
                            show ?
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
                            <div>转入账号：</div>
                            <div>{resiveAccNo}</div>
                        </div>
                        <div>
                            <div>转入户名：</div>
                            <div>{resiveAccName}</div>
                        </div>
                        {
                            fages == "1" ?<div>
                            <div>转出账号：</div>
                            <div>{zhuanchuAccNo}</div>
                        </div> :null
                        }
                        
                        {
                            fages == "1" ?<div>
                            <div>转出户名：</div>
                            <div>{zhuanchuAccName}</div>
                        </div> :null
                        }
                        <div>
                            <div>转入银行：</div>
                            <div>{resiveBankName}</div>
                        </div>
                        <div>
                            <div>转账方式：</div>
                            <div>{isPosthaste=="0"?"普通转账":isPosthaste == "1"?"实时转账":"次日转账"}</div>
                        </div>
                        <div>
                            <div>交易信息：</div>
                            <div>{returnMsg=="success"?"交易成功":returnMsg}</div>
                        </div>
                        {
                            fages == "1" ?<div className="mbank-public-query-button"  onClick={onTAB}>撤销</div> :null
                        }
                        
                    </div> : null
                }

            </div>

        );
    }
}


