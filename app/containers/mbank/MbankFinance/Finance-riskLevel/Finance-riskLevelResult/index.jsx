import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import Common from "../../../../../util/common.jsx";
//基础组件
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankTransferConfirm from '../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx';

export default class MbankFinanceRiskLevelResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            List: [],
        };
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "操作结果",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });
        let resultData = JSON.parse(Common.getSessionData(API.SESSION_CUSTOM_RISK_LEVEL));
        that.setState({
            List: resultData
        })

    }


    nextStepClick = () => {
        Common.setUrl('finance/index.html');
    };

    render() {
        let allData = this.state.List;
        let cusRiskLev = allData.cusRiskLev;

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
            <div>

                <MbankPublicResult type="success" title="风险等级评估成功" />
                <MbankTransferConfirm.Group>
                    <MbankTransferConfirm title="风险等级" content={cusRiskLev}/>
                    <MbankTransferConfirm title="有效日期" content={moment(allData.riskExpiDate).format('YYYY-MM-DD')}/>

                </MbankTransferConfirm.Group>

                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.nextStepClick.bind(this)}>返回</Button>
                </WingBlank>

            </div>
        )
    }
}