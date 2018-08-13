import React from 'react';
import moment from 'moment'
import classNames from 'classnames';
import '../style/index.web';
import Common from "../../../../../util/common.jsx";

export default class MbankAccountQuery extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showLink: true
        }
    }


    showDetail = () => {
        this.setState({
            showLink: !this.state.showLink,
        })
    };



    RiskLevel() {
        Common.setUrl('finance-riskLevel/index.html')
    }

    MyFinance() {
        Common.setUrl('finance-hold/index.html')
    }

    BuinessDetail() {
        Common.setUrl('finance-businessDetail/index.html')
    }



    render() {

        const {
            showLink,              
        } = this.state;


        const { props } = this;

        let {
            className,
            cusRiskLev,
            riskExpiDate,
            cusRiskLevShow1,
            cusRiskLevShow2,
            cusRiskLevShow3,
            ...others
        } = props;

        {
            switch(cusRiskLev){
                case "0":cusRiskLev="安逸型";break;
                case "1":cusRiskLev="保守型";break;
                case "2":cusRiskLev="稳健型";break;
                case "3":cusRiskLev="平衡型";break;
                case "4":cusRiskLev="成长型";break;
                case "5":cusRiskLev="进取型";break;
            }
        }
        const cls = classNames({
            [className]: className
        });

        if(cusRiskLev != "" && cusRiskLev != undefined && cusRiskLev != null){
            if(moment().format('YYYYMMDD') > riskExpiDate ){   //客户风评失效
                cusRiskLevShow1 = "您的风险等级评估已过期，请重新评估";
                cusRiskLevShow2="";
                cusRiskLevShow3="";
            }else{
                cusRiskLevShow1="您的风险等级是：";
                cusRiskLevShow2="，您可以适时重新进行风险评估！";
                cusRiskLevShow3=cusRiskLev;
            }            
        }else{
            cusRiskLevShow1 = "您未进行个人风险评估，首次购买请至我行柜面办理";
            cusRiskLevShow2="";
            cusRiskLevShow3="";
        }

        return (
            <div>
                <div className="mbank-financing-index-top">
                    <div className="mbank-financing-index-top-link">
                        <div onClick={this.MyFinance.bind(this)}><i className="ryt-icon ryt-icon-lg ryt-icon-wodelicai"></i>
                            <p>我的理财</p>
                        </div>
                        <div onClick={this.RiskLevel.bind(this)}><i className="ryt-icon ryt-icon-lg ryt-icon-fengxianpinggu"></i>
                            <p>风险评估</p>
                        </div>
                        <div onClick={this.BuinessDetail.bind(this)}><i className="ryt-icon ryt-icon-lg ryt-icon-licaimingxi"></i>
                            <p>交易明细</p>
                        </div>
                    </div>

                </div>
                <div className="mbank-financing-index-top-text">{cusRiskLevShow1}<b>{cusRiskLevShow3}</b>{cusRiskLevShow2}</div>
            </div>
        )
    }
}


