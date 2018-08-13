import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PureRenderHoc from '../../../../../util/hoc/index';
import Common from "../../../../../util/common.jsx";
import './style/index.web';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';


class MbankFinanceProductDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            productName: this.props.productName,
            productTip: this.props.productTip,
            annualizedReturn: this.props.annualizedReturn,
            productDate: this.props.productDate,
            productStartPrice: this.props.productStartPrice,
            riskLevel: this.props.riskLevel,
            // payRule: this.props.payRule,
            dealStartDate: this.props.dealStartDate,
            dealEndDate: this.props.dealEndDate,
            valueDate: this.props.valueDate,
            productExpirationDate: this.props.productExpirationDate,
            expectedEarning: this.props.expectedEarning
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {

    }

    render() {
        const { props } = this;


        let {
            className,
            prdName,
            profitFlag,
            propRateMax,
            term,
            ssubStartAmt,
            riskLev,
            raiseStartDate,
            raiseEndDate,
            valueDate,
            matuDate,
            item,
            payRule,
            ssupSubAmt,
            sbuyStartAmt,
            ssupBuyAmt,
            buyIdFlag,
            subIdFlag,
            onClick,
            limitFlag
        } = props;

        // 风险等级
        if (riskLev == 1) {
            riskLev = '低';
        } else if (riskLev == 2) {
            riskLev = '较低';
        } else if (riskLev == 3) {
            riskLev = '中';
        } else if (riskLev == 4) {
            riskLev = '较高';
        } else if (riskLev == 5) {
            riskLev = '高';
        }

        // 产品收益类型
        if (profitFlag == 1) {
            profitFlag = '保本固定收益';
        } else if (profitFlag == 2) {
            profitFlag = '保本浮动收益';
        } else if (profitFlag == 3) {
            profitFlag = '非保本浮动收益';
        } else if (profitFlag == 4) {
            profitFlag = '净值';
        }

        let minMoney="";
        let addMoney="";
        let buyRule="";

        if(buyIdFlag == '1'){   //是否可申购
            minMoney = sbuyStartAmt;
            addMoney = ssupBuyAmt;
            buyRule='申购';
        }else if(subIdFlag == '1'){             //是否可认购
            minMoney = ssubStartAmt;
            addMoney = ssupSubAmt;
            buyRule='认购';
        }else{
            minMoney = '0.00';
            addMoney = '0.00';
            buyRule='购买';
        }

        return (
            <div>
                <div className="mbank-financing-detail-top">
                    <div className="mbank-financing-detail-top-content">
                        <div className="mbank-financing-detail-top-info">
                            <h2>{prdName}</h2>
                            <div><span>{profitFlag}</span></div>
                            <p><b>{propRateMax}</b><em>%</em></p>
                            <span>预期年化收益率</span>
                        </div>
                        <div className="mbank-financing-detail-top-explain">
                            <div>
                                <p>{formatMoney(ssubStartAmt,{symbol: '￥'})}</p>
                                <span>起投金额</span>
                            </div>
                            <div>
                                <p>{term}天</p>
                                <span>投资天数</span>
                            </div>
                            <div>
                                <p>{riskLev}</p>
                                <span>风险等级</span>
                            </div>
                        </div>
                    </div>
                    <div className="mbank-financing-detail-top-rule">
                        <p>产品剩余额度: {formatMoney(limitFlag,{symbol: '￥'})}元</p>
                    </div>
                </div>
                <div className="mbank-financing-detail-time">
                    <div className="mbank-financing-detail-time-title">理财周期</div>
                    <div className="mbank-financing-detail-time-steps">
                        <div className="mbank-financing-detail-time-steps-title">
                            <div>募集开始</div>
                            <div>募集结束</div>
                            <div>起息</div>
                            <div>产品到期</div>
                        </div>
                        <div className="mbank-financing-detail-time-steps-line">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                        <div className="mbank-financing-detail-time-steps-date">
                            <div>{moment(raiseStartDate).format('YYYY-MM-DD')}</div>
                            <div>{moment(raiseEndDate).format('YYYY-MM-DD')}</div>
                            <div>{moment(valueDate).format('YYYY-MM-DD')}</div>
                            <div>{moment(matuDate).format('YYYY-MM-DD')}</div>
                        </div>
                    </div>

                    {/*<div className="mbank-financing-detail-time-explain">*/}
                    {/*<div>投资{Common.setMoneyFormat(this.state.productStartPrice)}元，{this.state.productDate}天后预期收益可达<span>{Common.setMoneyFormat(this.state.expectedEarning)}元</span></div>*/}
                    {/*</div>*/}
                </div>
                <div className="mbank-financing-detail-top-rule">
                    <span>{buyRule+'规则'}</span>
                    <p>{'起购金额：'+ formatMoney(minMoney,{symbol: '￥'}) + '元; '} {'追加金额：' + formatMoney(addMoney,{symbol: '￥'})+'元;'}</p>
                    </div>
                <WhiteSpace size="sm" />
                {/* <div className="mbank-financing-guize">
                    <div className="mbank-financing-guize-title">购买规则</div>
                    <div className="mbank-financing-guize-text">
                        <div>
                            <div>起购金额</div><div><span>10000.00</span> 元</div>
                        </div>
                        <div>
                            <div>起购金额</div><div><span>10000.00</span> 元</div>
                        </div>
                    </div>
                </div> */}


            </div>
        );
    }
}

MbankFinanceProductDetail.propTypes = {
    productName: React.PropTypes.string,
    productTip: React.PropTypes.string,
    annualizedReturn: React.PropTypes.string,
    productDate: React.PropTypes.string,
    productStartPrice: React.PropTypes.string,
    riskLevel: React.PropTypes.string,
    // payRule: React.PropTypes.string,
    dealStartDate: React.PropTypes.string,
    dealEndDate: React.PropTypes.string,
    valueDate: React.PropTypes.string,
    productExpirationDate: React.PropTypes.string,
    expectedEarning: React.PropTypes.string
};

MbankFinanceProductDetail.defaultProps = {
    productName: "",
    productTip: "",
    annualizedReturn: "",
    productDate: "",
    productStartPrice: "",
    riskLevel: "",
    // payRule: "",
    dealStartDate: "",
    dealEndDate: "",
    valueDate: "",
    productExpirationDate: "",
    expectedEarning: ""
};
export default PureRenderHoc(MbankFinanceProductDetail);
