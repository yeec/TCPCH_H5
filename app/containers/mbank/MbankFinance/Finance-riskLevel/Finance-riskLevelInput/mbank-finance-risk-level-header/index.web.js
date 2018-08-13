import React from 'react';
import '../style/index.web';

const prefixCls = 'mbank-account-list';


export default class MbankAccountList extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;

        let {

            className,
            cusRiskLev,
            onClick
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

        return (
            <div id="demoCode">
                <div className="financing-evaluate-box">
                    <div className="financing-evaluate-box-prompt ryt-wingblank ryt-wingblank-md">投资有风险，不同承受能力和风险偏好的客户应选择不同的投资产
                        品和投资组合</div>
                </div>

                <div className="evaluate-qyzh">
                    <div className="evaluate-qyzh-lef">风险评估等级</div>
                    <div className="evaluate-qyzh-rhgh">{cusRiskLev}</div>
                </div>

            </div>
        );
    }
}


