import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import $Fetch from '../../../../../fetch/fetch.js';
import Common from "../../../../../util/common.jsx";
import ContextDecorator from '../../../../../util/decorator/context-decorator';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
import Input from '../../../../../components/Base/input-list/index.web.jsx';
import List from '../../../../../components/Base/list/index.web.js';
//业务组件
import MbankPublicResult from '../../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankLifeConfirm from '../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx';


@ContextDecorator
export default class MbankLifeElectricityResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            company:"",
            queryList:[],
            payAccountShow:[],
            payReturnShow: []
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "缴电费",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        let queryListReturn = JSON.parse(Common.getSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_MESSAGE));
        let payAccount = JSON.parse(Common.getSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_ACCOUNT));

        that.setState({
            queryList: queryListReturn,
            payAccountShow: payAccount
        });
    }

    //点击下一步按钮
    nextStepButton = () =>{
        Common.setUrl('electricity-payFeesResult/index.html');
    }


    render() {
        let queryListShow = this.state.queryList;
        let payAccountList = this.state.payAccountShow;
        return (
            <div>
                <MbankPublicResult type="success" title="缴费金额" money={queryListShow.moneyValue}/>
                <WhiteSpace size="md"/>
                <MbankLifeConfirm.Group>
                    <MbankLifeConfirm title="缴费金额" content={queryListShow.moneyValue}/>
                    <MbankLifeConfirm title="用户编号" content={queryListShow.number}/>
                    <MbankLifeConfirm title="户名" content={queryListShow.name}/>
                    <MbankLifeConfirm title="付款账号" content={payAccountList.accountValue}/>
                    <MbankLifeConfirm title="缴费单位" content="西昌电力股份有限公司"/>
                </MbankLifeConfirm.Group>

                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.nextStepButton.bind(this)}>完成</Button>
                </WingBlank>

            </div>
        )
    }
}