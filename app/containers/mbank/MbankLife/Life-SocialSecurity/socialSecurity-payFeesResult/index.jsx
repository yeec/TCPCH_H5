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
export default class MbankLifeSocialSecurityResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            company:"",
            payReturnShow:[],
            returnCode: "",
            returnMsg: "",
            queryListShow: []
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
        
        let payReturn = Common.addSessionData(API.SESSION_LIFE_SECURITY_PAY); //社保缴费回显
        that.setState({
            payReturnShow: payReturn
        });
alert(payReturn.rspHead.returnCode)
        if(payReturn.rspHead.returnCode == '00000000'){
            that.setState({
                returnCode: 'success',
                returnMsg: payReturn.rspHead.returnMsg,
                returnMoney: payReturn.rspBody.aae019
            })
        }else{
            that.setState({
                returnCode: 'error',
                returnMsg: payReturn.rspHead.returnMsg,
                returnMoney: payReturn.rspBody.aae019
            })
        }

    }

    //点击下一步按钮
    nextStepButton = () =>{
        Common.setUrl('electricity-payFeesResult/index.html');
    }


    render() {
        let payReturnList = this.states.payReturnShow;
        return (
            <div>
                <MbankPublicResult type={this.state.returnCode} title="缴费金额" message={this.state.returnMsg} money={payReturnList.rspBody.aae019_1}/>
                <WhiteSpace size="md"/>
                <MbankLifeConfirm.Group>
                    <MbankLifeConfirm title="缴费金额" content={payReturnList.rspBody.aae019_1}/>
                <MbankLifeConfirm title="社保机构编码" content={payReturnList.rspBody.aaa027}/>
                    <MbankLifeConfirm title="个人编码" content={payReturnList.rspBody.aac001}/>
                    <MbankLifeConfirm title="姓名" content={payReturnList.rspBody.aac003}/>
                    <MbankLifeConfirm title="社保单据号" content={payReturnList.rspBody.aae072}/>

                    <MbankLifeConfirm title="付款账号|户名" content={this.state.accountValueShow.account}/>
                    <MbankLifeConfirm title="社保收款账号" content="04050309000002968"/>
                    <MbankLifeConfirm title="社保收款户名" content="四川西昌电力股份有限公司"/>
                </MbankLifeConfirm.Group>

                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.nextStepButton.bind(this)}>完成</Button>
                </WingBlank>

            </div>
        )
    }
}