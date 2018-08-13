import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { hashHistory } from 'react-router'
import ContextDecorator from '../../../../util/decorator/context-decorator';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import $Fetch from '../../../../fetch/fetch.js';
import Common from "../../../../util/common.jsx";
import $ from 'jquery';
//基础组件
import Button from '../../../../components/Base/button/index.web';
import WhiteSpace from '../../../../components/Base/white-space/index.web';
import WingBlank from '../../../../components/Base/wing-blank/index.web';
import Input from '../../../../components/Base/input-list/index.web';
import Checkbox from '../../../../components/Base/checkbox/index.web.js';
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web';
import MbankPublicConfirm from '../../../../components/mbank/mbank-public-confirm-info/index.web';
import MbankTransferOutItem from '../../../../components/mbank/mbank-public-account-select/index.web';
import MbankPublicInputMoney from '../../../../components/mbank/mbank-public-input-money/index.web';
import Modal from '../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js';




export default class JhsHuoZhuanDing extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // 转账账户列表
            accountList: [],
            // 当前的选择的账户
            currentAccount: {},
            // 定期账号--交易成功返回字段
            accountNo: '',
            // 交易金额
            moneyInputVal: "",
            // 产品类型列表
            productTypeList: [
                {
                    label: '巨划算A款',
                    value: 'A'
                },
                {
                    label: '巨划算B款',
                    value: 'B'
                }
            ],
            // 选择的产品类型
            productFlag: [],
            // 收息账号列表
            demandAccountList: [],
            // 选择的收息账号
            demandAccount: [],
            // 添加模块按钮禁用状态
            buttonAddDisabled: true,
            // 交易密码
            pwd: "",
            realPwd: "",
            // 按钮禁用状态
            buttonDisabled: true,
            // 账户姓名
            customerName: '',
            // 接口返回码
            returnCode: '',
            // 接口返回信息
            returnMsg: '',
            // modal状态
            modalState: false,
            //产品类型
            productType: "",
            //勾选协议状态
            checked: false,
            //短信银行签约标志
            signSMSBankFlag: "1",
            //是否选择收息账号
            fagesd:"",
        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        let successFun = () => {
            if (that.state.modalState) {
                $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                    title: "活期转定期",
                    leftButton: {
                        exist: 'true',
                        closeFlag: 'false',
                        success: () => { Common.setUrl("invest-jhsExplain/index.html"); }
                    }
                });
                Common.closeModal();
                that.setState({ modalState: !that.state.modalState });
            }
            else if ($(that.refs.myInput).css('display') == 'block') {
                that.toInvest();
            } else if ($(that.refs.myConfirm).css('display') == 'block') {
                $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                    title: "金凉山-巨划算",
                    leftButton: {
                        exist: 'true',
                        closeFlag: 'false',
                        success: () => { Common.setUrl("invest-jhsExplain/index.html"); }
                    }
                });
                $(that.refs.myConfirm).hide();
                $(that.refs.myInput).show();
            } else {
                that.toInvest();
            }
        }
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "金凉山-巨划算",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: () => { Common.setUrl("invest-jhsExplain/index.html"); }
            }
        });

        // 获取付款账户列表
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN03",
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
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                Common.checkUnderAccount(res.rspBody.returnList);
                let demandAccountList = [];
                let cname = '';
                res.rspBody.returnList.map(function (item, index) {
                    if (item.alias == "") {
                        cname = res.rspBody.customerName;
                    } else {
                        cname = item.alias;
                    }
                    demandAccountList.push({
                        label: Common.setAccountNum2(item.acNo,true) + '(' + cname + ')',
                        value: item.acNo
                    })
                })
                // state 转账账户列表
                that.setState({
                    accountList: res.rspBody.returnList,
                    customerName: res.rspBody.customerName,
                    demandAccountList: demandAccountList,
                    demandAccount: [demandAccountList[0].value]
                });
                // 获取当前账户
                that.state.accountList.map(function (item, i) {
                    item.now = '0';
                    if (i === 0) {
                        item.now = '1';
                        that.setState({
                            currentAccount: item
                        })
                    }
                })
            } else {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        });
        // let sessionData = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_AC_NO));
        // if(sessionData == "0"){

        //     that.setState({
        //         productType:"巨划算A款",
        //         // productFlag:"A"
        //     })
        // }else{
        //     that.setState({
        //         productType:"巨划算B款",
        //         // productFlag:"B"
        //     })
        // }
    }
    // 组件更新调用
    componentDidUpdate() {
        let that = this;
        if(that.state.productFlag == "B"){
            that.setState({
                fagesd: ""
            });
        }
        // 确认模块按钮禁用判断
        if (!(that.state.pwd.length == '')) {
            that.setState({
                buttonDisabled: false
            });
        } else {
            that.setState({
                buttonDisabled: true
            });
        }
        // 新增模块按钮禁用判断
        if(that.state.productFlag == "A"){
            if (!(that.state.moneyInputVal == "" || that.state.productFlag == "" )) {
                that.setState({
                    buttonAddDisabled: false
                });
                
            } else{
                that.setState({
                    buttonAddDisabled: true
                });
            }
        }else{
            if (!(that.state.moneyInputVal == "" || that.state.productFlag == "")) {
                that.setState({
                    buttonAddDisabled: false
                });
            } else {
                that.setState({
                    buttonAddDisabled: true
                });
            }
        }
     
    }

    // // 调用客户端键盘接口
    // //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
    // showKeyBoard() {
    //     let that = this;
    //     that.setState({
    //         pwd: ""
    //     })
    //     $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
    //         type: "tradePsw",
    //         cancel: "cancel",
    //         success: (res) => {
    //             let jsons = JSON.parse(res);
    //             let a = "";
    //             for (var i = 0; i < Number(jsons.pswLength); i++) {
    //                 a = a + "2"
    //             }
    //             that.setState({
    //                 pwd: a,
    //                 realPwd: jsons.pswText
    //             })
    //         }
    //     })
    // }

    // 显示付款账户列表
    showAccountListBox() {
        let that = this;
        that.setState({
            modalState: true
        })
        let allaccount = that.state.accountList.map(function (item, i) {
            return JSON.stringify(item);
        });
        Modal.transferPaymentAccount({
            items: allaccount,
            titleText: '选择付款账户',
            customerNames: this.state.customerName,
            close: () => {
                Common.closeModal();
                that.setState({
                    modalState: false
                })
            }
        }, function (key) {
            let accountListNew = that.state.accountList.map(function (item, i) {
                item.now = "0"
                if (i === key) {
                    item.now = "1";
                    that.setState({
                        currentAccount: item,
                        demandAccount: [that.state.demandAccountList[i].value]
                    })
                }
                return item;
            })
            that.setState({
                accountList: accountListNew,
                modalState: false
            })
            Common.closeModal();
        });
    }
    // 金额
    setMoneyinputval(val) {
        let that = this;
        that.setState({
            moneyInputVal: val
        })
    }
    // 产品类型
    showProductTypeListBox(value, label) {
        this.setState({
            productFlag: label
        })

    }
    // 收息账号
    showDemandAccountListBox(value,label) {
        if(label != ""){
            this.setState({
                fagesd:"1"
            })
        }
        this.setState({
            demandAccount: label
        })
    }

    //勾选协议状态
    changeHandle = (checked) => {
        console.log(checked);
        this.setState({ checked });
        if (checked) {
            if (this.state.productFlag == "B") {
                this.setState({
                    signSMSBankFlag: "0"
                })

            }
        } else {
            this.setState({
                signSMSBankFlag: "1"
            })
        }
    };

    // 显示确认页面
    savingConfirm() {
        let that = this;
        // 输入框失去焦点
        Common.inputBlur();
        // if (Common.moneyTyp(this.state.moneyInputVal)) {
        //     // 调取客户弹出框提示信息
        //     let alertDict = {
        //         title: "错误提示",
        //         msg: "[金额输入]格式有误，不能为空，只允许数字，整数部分最多12位，小数部分最多2位，金额不能为负数，请重新输入！",
        //         success_text: "确认"
        //     }
        //     Common.showAppDialogAlert(alertDict);
        //     return false;
        // } else {
        //     let money = this.state.moneyInputVal;
        //     let valarr = money.split('.')
        //     if (valarr.length < 2) {
        //         money += '.00';
        //     } else if (valarr[1].length < 2) {
        //         money += '0';
        //     }
        //     that.setState({
        //         moneyInputVal: money
        //     })
        // }
        if (Number(that.state.moneyInputVal) < 10000.00) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "尊敬的用户，存入定期金额最少为1万元",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        if (Number(that.state.moneyInputVal) > Number(that.state.currentAccount.availBal)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "尊敬的用户，存入巨划算的金额不能超过当前账户可用额度",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        // 隐藏录入页面
        $(this.refs.myInput).hide();
        // 显示确认页面
        $(this.refs.myConfirm).show();
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
    showKeyBoard(){
        this.setState({
            pwd:""
        })
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            cancel: "cancel",
            hint: "请输入交易密码",
            success: (res) => {
                let jsons = JSON.parse(res);
            
                let a = "";
                for(var i = 0;i<jsons.pswLength;i++){
                  a = a +"2"
                }
                this.setState({
                    pwd:a,
                    realPwd: jsons.pswText
                })

                // if(a.length === 6){
                    let passwordInputVal = that.state.realPwd ? that.state.realPwd : '';
                    if (Common.PasswordSmsNumber(passwordInputVal)) {
                        // 调取客户弹出框提示信息
                        let alertDict = {
                            title: "错误提示",
                            msg: "请填写正确的交易密码",
                            success_text: "确认"
                        };
                        Common.showAppDialogAlert(alertDict);
                    }else{
                        this.savingResult(); //理财购买接口
                    }
                // }
            }
        })
    }

    // 跳转结果页面
    savingResult() {
        let that = this;
        if (that.state.pwd.length != 6) {
            // 弹出错误信息
            let alertDict = {
                title: "错误提示",
                msg: that.state.pwd.length != 6 ? '请输入您6位的交易密码' : '请您设置6位的定期交易密码',
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        let params = {
            transAmount: that.state.moneyInputVal,//交易金额
            reservoirType: '030',//储种
            reservoirNo: 'Y5',//储种号
            productFlag: that.state.productFlag[0],//产品标识
            cipher: that.state.realPwd,//帐户密码
            flag: '0',//收息标志
            conventionTime: '60',//循环次数
            signSMSBankFlag: that.state.signSMSBankFlag, //短信银行签约标识
            turnOutAccNo: that.state.currentAccount.acNo//付款账号
        }
        //收息账号 --巨划算A需要，B不需要
        that.state.productFlag[0] == 'A' ? params.demandAccount = that.state.demandAccount[0] : null;
        // 活转定接口
        $Fetch(API.API_SET_HUO_ZHUAN_DING, {
            //默认固定上送报文
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
            data: params
        }).then((res) => {
            if (Common.enciperResult(res.rspHead.returnCode)) {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    success: () => {
                        that.setState({
                            pwd: '',
                            realPwd: ''
                        })
                    }
                }
                Common.showAppDialogAlert(alertDict);
            } else {
                let param = {
                    returnCode: res.rspHead.returnCode,
                    returnMsg: res.rspHead.returnMsg
                }
                param.accountNo = Common.returnResult(res.rspHead.returnCode) ? res.rspBody.currentToRegular.accountNo : '';
                that.setState(param)
                // 隐藏录入页面
                $(that.refs.myConfirm).hide();
                // 显示结果页面
                $(that.refs.myResult).show();
            }
        });
    }

    // 跳转储蓄服务首页
    toInvest() {
        // hashHistory.push('/MbankJhsList');
        Common.setUrl("invest/index.html");
    }

    /**** 接口字段说明 

    注：无特殊说明字段均为 String 类型 


    */

    render() {
        let CurrentAccount = this.state.currentAccount;
        return (
            <div>
                <div ref="myInput">
                    <WhiteSpace size="sm" />
                    {
                        JSON.stringify(CurrentAccount) != '{}' ?
                            <MbankTransferOutItem cardnum={CurrentAccount.acNo} name={this.state.customerName} money={CurrentAccount.availBal} showdetail={this.showAccountListBox.bind(this)} />
                            : null
                    }
                    <WhiteSpace size="sm" />
                    <MbankPublicInputMoney
                        inputid="bankininput"
                        inputName="交易金额"
                        placeholder="请输入交易金额"
                        limitFlag={false}
                        finalval={this.setMoneyinputval.bind(this)}
                        value={this.state.moneyInputVal}
                    />
                    <WhiteSpace size="sm" />
                    <Input.Group>
                        <Input disabled={true} labelNumber={6} value='存本取息'>储种</Input>
                        <Input disabled={true} labelNumber={6} value='五年'>存期</Input>
                        {/* <Input.Pick title="产品类型" labelNumber={6} data={this.state.productTypeList} cols="1"
                            placeholder="选择产品类型"
                            onChange={this.showProductTypeListBox.bind(this)} value={this.state.productFlag} /> */}

                        <Input.Click
                            cols="1"
                            cellTitle="产品类型"
                            labelNumber={6}
                            placeholder="选择产品类型"
                            title="产品类型"
                            items={this.state.productTypeList}
                            onChange={this.showProductTypeListBox.bind(this)}
                            value={this.state.productFlag}
                            data={this.state.productTypeList}
                        />


                        {
                            this.state.productFlag == 'A' ?
                                // <Input.Pick title="收息账号" labelNumber={6} data={this.state.demandAccountList} cols="1"
                                //     placeholder="选择收息账号"
                                //     onChange={this.showDemandAccountListBox.bind(this)} value={this.state.demandAccount} />
                                <Input.Click
                                    cols="1"
                                    cellTitle="收息账号"
                                    labelNumber={6}
                                    placeholder={Common.setAccountNum2(CurrentAccount.acNo,true) + '(' + CurrentAccount.alias + ')'}
                                    title="收息账号"
                                    items={this.state.demandAccountList}
                                    onChange={this.showDemandAccountListBox.bind(this)}
                                    value={this.state.demandAccount}
                                    data={this.state.demandAccountList}
                                />
                                : null
                        }
                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.savingConfirm.bind(this)} disabled={this.state.buttonAddDisabled}>下一步</Button>
                    </WingBlank>
                </div>
                <div ref="myConfirm" style={{ display: "none" }}>
                    <div className="savings-zhiququereng-democode">
                        <MbankPublicResult Small title="交易金额" money={this.state.moneyInputVal} />
                        <div className="savings-zhiququereng-boder"></div>
                        <WhiteSpace size="sm" />
                        <MbankPublicConfirm.Group>
                            <MbankPublicConfirm title="储种" content='存本取息' />
                            <MbankPublicConfirm title="存期" content='五年' />
                            <MbankPublicConfirm title="产品类型" content={this.state.productFlag == 'A' ? '巨划算A款' : '巨划算B款'} />
                            <MbankPublicConfirm title="付款账号" content={CurrentAccount.acNo} />
                            {this.state.productFlag == 'A' ? <MbankPublicConfirm title="收息账号" content={this.state.demandAccount} /> : null}
                        </MbankPublicConfirm.Group>
                        <WhiteSpace size="sm" />
                        {/* <Input.Group>
                            <Input type="password" textAlign="left" labelNumber={6} maxLength="6"
                                placeholder="请输入6位交易密码" value={this.state.pwd} editable={false} onClick={this.showKeyBoard.bind(this)}>交易密码</Input>
                        </Input.Group> */}
                    </div>
                    <WhiteSpace size="lg" />
                    {
                        this.state.productFlag == 'B' ?
                            <WingBlank size="lg">
                                <Checkbox.Agree value={this.state.checked} onChange={this.changeHandle}>
                                    是否签约巨划算B款短信通知
                        </Checkbox.Agree></WingBlank>

                            : null
                    }
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.showKeyBoard.bind(this)}>确认</Button>
                    </WingBlank>
                </div>
                <div ref="myResult" style={{ display: "none" }}>
                    {
                        Common.returnResult(this.state.returnCode) ?
                            <div className="savings-zhiququereng-democode">
                                <MbankPublicResult type="success" title="交易成功" money={this.state.moneyInputVal} />
                                <WhiteSpace size="sm" />
                                <div className="savings-zhiququereng-boder"></div>
                                <WhiteSpace size="sm" />
                                <MbankPublicConfirm.Group >
                                    <MbankPublicConfirm title="巨划算定期账号" content={this.state.accountNo} />
                                    <MbankPublicConfirm title="储种" content='存本取息' />
                                    <MbankPublicConfirm title="存期" content='五年' />
                                    <MbankPublicConfirm title="产品类型" content={this.state.productFlag == 'A' ? '巨划算A款' : '巨划算B款'} />
                                    <MbankPublicConfirm title="付款账号" content={CurrentAccount.acNo} />
                                    {this.state.productFlag == 'A' ? <MbankPublicConfirm title="收息账号" content={this.state.demandAccount} /> : null}
                                </MbankPublicConfirm.Group>
                            </div>
                            :
                            <MbankPublicResult type="error" title="转存失败"
                                message={
                                    <div>尊敬的用户，您进行的转存操作失败。
                                        <br />错误编码：<b>{this.state.returnCode}</b>
                                        <br />错误信息：<b>{this.state.returnMsg}</b>
                                    </div>
                                }
                            />
                    }
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={this.toInvest.bind(this)}>返回巨划算首页</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}