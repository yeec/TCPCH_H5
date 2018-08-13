import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
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
//业务组件
import MbankTransferSavePeople from '../../../../../components/mbank/mbank-public-select/mbank-public-select-save-people/index.web.jsx';
import MbankPublicResult from '../../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankTransferConfirm from '../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            List: [],
            ListPay:[],
            ListAccount:[],
            acceptBox: {display: "none"},
            successBox: {display: "none"},
            failBox: {display: "none"},
            transferMoney: "",
            transferType: ""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "转账结果",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        //获取转账结果session
        let resultData = JSON.parse(Common.getSessionData(API.SESSION_TRANSFE_RRESULTDATA));
        console.log(resultData);
        that.setState({
            List: resultData
        });

        //获取确认信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_TRANSFER_CONFIRMDATA));
        console.log(listdata);
        that.setState({
            ListPay:listdata,//.currentAccount,
            ListAccount:listdata.currentAccount,
        })

    }

    //保存收款人
    saveReceiver(flag) {
        let transferInData = {
            InAccount: this.state.List.inAccount,
            InName: this.state.List.inName,
            InBank: this.state.List.inBank,
            InBankLogo: this.state.List.inBankLogo
        };
        if (flag) {
            Common.addSessionData(API.SESSION_SAVE_TRANFERTNDATA, JSON.stringify(transferInData));
            // console.log(Common.getSessionData(API.SESSION_SAVE_TRANFERTNDATA));
        } else {
            Common.addSessionData(API.SESSION_SAVE_TRANFERTNDATA, "");
            // console.log(Common.getSessionData(API.SESSION_SAVE_TRANFERTNDATA));
        }
    }

    buttonClick1() {
        let payeemessage = Common.getSessionData(API.SESSION_SAVE_TRANFERTNDATA);
        if (payeemessage) {
            $Fetch(API.API_SAVE_PAYEE_MESSAGE, {//保存本次收款账户信息
                data: JSON.parse(payeemessage)
            }).then((res) => {

            })
        }
    }

    buttonClick2() {
        let payeemessage = Common.getSessionData(API.SESSION_SAVE_TRANFERTNDATA);
        if (payeemessage) {
            $Fetch(API.API_SAVE_PAYEE_MESSAGE, {//保存本次收款账户信息
                //默认固定上送报文
                reqHead:{
                    //场景编码
                    sceneCode:"0001",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode:"1",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType:"1",
                    //交易标识 1-主，2-副
                    flag:"1",
                    //服务接口版本号 1.0.0
                    serviceVersion:"1.0.0"
                },
                data: JSON.parse(payeemessage)
            }).then((res) => {

            })
        }
        hashHistory.push('/MbankTransfer');
    }

    //转账成功按钮
    buttonClick3() {
        Common.getSessionData(API.SESSION_SAVE_TRANFERTNDATA);
        hashHistory.push('/MbankTransfer');
    }

    render() {
        let allData = this.state.ListPay;
        // console.log(allData);
        let transfertime = "";
        let transfertypetext = "";
        if (allData.transferType === "0") {
            transfertime = "7*24小时内";
            transfertypetext = "实时到账";
        } else if (allData.transferType === "1") {
            transfertime = "7*24小时内";
            transfertypetext = "小额汇款";
        } else if (allData.transferType === "2") {
            transfertime = "7*24小时内";
            transfertypetext = "一般汇款";
        } else if (allData.transferType === "3") {
            transfertime = "7*24小时内";
            transfertypetext = "次日到账";
        }
        return (
            <div>

                {/*<MbankPublicResult type="error" title="转账失败" money={this.state.List.money + ""}*/}
                                   {/*message={<div>尊敬的用户，您的转账失败，请重新进行转账交易。</div>}/>*/}

                {/*<MbankPublicResult type="wait" title="转账申请已提交" money={this.state.List.money + ""}*/}
                                   {/*message={<div>尊敬的用户，您的转账申请已经提交，转账将在<b>2小时</b>到账，节假日及非工作时间顺延。</div>}/>*/}
                <MbankPublicResult type="success" title="转账金额" money={allData.money + ""}/>
                <WhiteSpace size="md"/>
                <MbankTransferConfirm.Group>
                    <MbankTransferConfirm title="付款账户" content={this.state.ListAccount.acNo + " | " + allData.customerName}/>
                    <MbankTransferConfirm title="收款账户" content={allData.accountNum + " | " + allData.name}/>
                    <MbankTransferConfirm title="收款银行" content={allData.transferBank}/>
                    <MbankTransferConfirm title="转账类型" content={transfertypetext}/>
                    <MbankTransferConfirm title="交易附言" content={allData.tip}/>
                </MbankTransferConfirm.Group>

                <WhiteSpace size="md"/>
                {/*保存收款人*/}
                <MbankTransferSavePeople banklogo={allData.inBankLogo}
                                         name={allData.name}
                                         bankname={allData.transferBank}
                                         accountnum={allData.accountNum}
                                         checkedState={this.saveReceiver.bind(this)}/>

                <WhiteSpace size="lg"/>
                <WingBlank size="md">
                    <Button type="primary" size="default" onTap={this.buttonClick3.bind(this)}>完成</Button>
                </WingBlank>

            </div>
        )
    }
}