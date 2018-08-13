import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router';
import ContextDecorator from '../../../../util/decorator/context-decorator';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import Common from "../../../../util/common.jsx";
import $Fetch from '../../../../fetch/fetch.js';
import $native from '../../../../native/native';
import $ from 'jquery';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import List from '../../../../components/Base/list/index.web.js';
import Input from '../../../../components/Base/input-list/index.web.jsx';
//业务组件
import MbankPublicInputMoney from '../../../../components/mbank/mbank-public-input-money/index.web.jsx';
import MbankTransferConfirm from '../../../../components/mbank/mbank-public-confirm-info/index.web.jsx';
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web.jsx';
@ContextDecorator
export default class YinZhuanZheng extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //账户信息
            detail: {},
            //交易金额
            transactionAmount: "",
            //证券交易密码
            capitalAccountPwd: ""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "证券转银行",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });
        // 接收Session数据
        let sessionData = JSON.parse(Common.getSessionData(API.SESSION_YINZHENG_ACCOUNT_INFO));
        // 接口数据
        $Fetch(API.API_YINZHENG_DETAIL, {
            // 固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "0001",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
                //银行账号
                bankAccount: sessionData.bankAccount,
                //理财账号
                financialAccount: sessionData.financialAccount,
            }
        }).then((res) => {
            that.setState({
                // State detail数据
                detail: res,
            })
        })
    }
    //金额输入
    setinput1val(val) {
        let that = this;
        that.setState({
            transactionAmount: val
        })
    }
    //密码输入
    setPassWordValue(vals) {
        this.setState({
            capitalAccountPwd: vals
        })
    }
    // 第一步 金额录入
    moneyInput() {
        let that = this;
        let transactionAmount = that.state.transactionAmount;
        // 校验金额
        if (Common.judgeEmpty(transactionAmount)) {
            let alertDict = {
                title: "信息提示",
                msg: "请输入转账金额",
                cancel_text: "取消",
                success_text: "确认",
            }
            Common.showAppDialogAlert(alertDict);
        } else {
            $(this.refs.myInput).hide();
            $(this.refs.myConfirm).show();
        }
    }
    // 第二步 信息确认交易密码
    infoConfirm() {
        let that = this;
        let bankAccount = that.state.detail.bankAccount;
        let financialAccount = that.state.detail.financialAccount;
        let transactionAmount = that.state.transactionAmount;
        let capitalAccountPwd = that.state.capitalAccountPwd;
        // 校验密码
        if (Common.PasswordSmsNumber(capitalAccountPwd)) {
            let alertDict = {
                title: "信息提示",
                msg: "请输入6位交易密码",
                success_text: "确认",
            }
            Common.showAppDialogAlert(alertDict);
        } else {
            // 账户添加接口
            $Fetch(API.API_YINZHENG_DETAIL, {
                // 固定上送报文
                reqHead: {
                    //场景编码
                    sceneCode: "0001",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode: "1",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType: "1",
                    //交易标识 1-主，2-副
                    flag: "1",
                    //服务接口版本号 1.0.0
                    serviceVersion: "1.0.0"
                },
                // 交易上送报文
                data: {
                    //银行账号
                    bankAccount: bankAccount,
                    //理财账号
                    financialAccount: financialAccount,
                    //转账金额
                    transactionAmount: transactionAmount,
                    //证券交易密码
                    capitalAccountPwd: capitalAccountPwd
                }
            }).then((res) => {
                // 判断返回结果
                if ("00000000" == "00000000") {
                    // 显示结果页面-成功
                    $(this.refs.myConfirm).hide();
                    $(this.refs.myResult).show();
                } else {
                    $(this.refs.myResult).show();
                }
            })
        }
    }
    // 第三步 页面跳转
    GoPage() {
        hashHistory.push('/YinZhengHome')
    }
    /**** 接口字段说明 

        bankAccount             //银行账户（银行账号）
        accountPwd              //交易密码
        transactionAmount       //交易金额
        financialAccount        //理财账号
        financialAccountPwd     //理财账号密码
        capitalAccountPwd       //资金账户密码
        usableBalance           //可用余额
        AccountType             //业务类别
        BrokerName              //券商名称
    
    ****/

    render() {
        let that = this;
        return (
            <div>
                {/* 交易录入 */}
                <div ref="myInput">
                    <List.Group>
                        <List title="证券资金账号" description={that.state.detail.financialAccount} />
                        <List title="银行账号" description={that.state.detail.bankAccount} />
                        <List title="券商名称" description={that.state.detail.BrokerName} />
                        <List title="业务类别" description={that.state.detail.AccountType} />
                    </List.Group>
                    <WhiteSpace size="md" />
                    <MbankPublicInputMoney inputid="bankininput" limitFlag={false} value={this.state.transactionAmount} finalval={this.setinput1val.bind(this)} />
                    <WhiteSpace size="lg" />
                    <WingBlank size="md">
                        <Button type="primary" size="default" disabled={!(this.state.transactionAmount)} onTap={this.moneyInput.bind(this)}>下一步</Button>
                    </WingBlank>
                </div>
                {/* 交易确认信息 */}
                <div ref="myConfirm" style={{ display: "none" }}>
                    <MbankPublicResult Small money={that.state.transactionAmount} title="交易金额" />
                    <WhiteSpace size="md" />
                    <MbankTransferConfirm.Group>
                        <MbankTransferConfirm title="证券资金账号" content={that.state.detail.financialAccount} />
                        <MbankTransferConfirm title="银行账号" content={that.state.detail.bankAccount} />
                        <MbankTransferConfirm title="券商名称" content={that.state.detail.BrokerName} />
                        <MbankTransferConfirm title="业务类别" content={that.state.detail.AccountType} />
                    </MbankTransferConfirm.Group>
                    <WhiteSpace size="md" />
                    <Input.Group>
                        <Input type="password" clear={true} textAlign="left" labelNumber={5} maxLength="6"
                            placeholder="请输入交易密码" onChange={this.setPassWordValue.bind(this)}>交易密码</Input>
                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="md">
                        <Button type="primary" size="default" disabled={!(this.state.transactionAmount)} onTap={this.infoConfirm.bind(this)}>确认</Button>
                    </WingBlank>
                </div>
                {/* 交易结果信息 */}
                <div ref="myResult" style={{ display: "none" }}>

                    <MbankPublicResult type="success" title="交易成功" message={<div>资金实时转入收款行，实际时间取决于收款行资金实时转入收款行.</div>} />
                    <WhiteSpace size="md" />
                    <MbankTransferConfirm.Group>
                        <MbankTransferConfirm title="证券资金账号" content={that.state.detail.financialAccount} />
                        <MbankTransferConfirm title="银行账号" content={that.state.detail.bankAccount} />
                        <MbankTransferConfirm title="转账金额" content={that.state.transactionAmount} />
                        <MbankTransferConfirm title="券商名称" content={that.state.detail.BrokerName} />
                        <MbankTransferConfirm title="业务类别" content={that.state.detail.AccountType} />
                    </MbankTransferConfirm.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="md">
                        <Button type="ghost" size="default" onTap={this.GoPage.bind(this)}>返回</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}