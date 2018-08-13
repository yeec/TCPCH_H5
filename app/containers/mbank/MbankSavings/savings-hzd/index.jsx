import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ContextDecorator from '../../../../util/decorator/context-decorator';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import $Fetch from '../../../../fetch/fetch.js';
import Common from "../../../../util/common.jsx";
import formatMoney from '../../../../util/common/accounting-js/formatMoney.js';
import $ from 'jquery';
//基础组件
import Button from '../../../../components/Base/button/index.web';
import WhiteSpace from '../../../../components/Base/white-space/index.web';
import WingBlank from '../../../../components/Base/wing-blank/index.web';
import Input from '../../../../components/Base/input-list/index.web.jsx';
import List from '../../../../components/Base/list/index.web.js';
import List1 from '../../../../components/Base/assLIst/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web';
import MbankPublicConfirm from '../../../../components/mbank/mbank-public-confirm-info/index.web';
import MbankTransferOutItem from '../../../../components/mbank/mbank-public-account-select/index.web';
import MbankPublicInputMoney from '../../../../components/mbank/mbank-public-input-money/index.web';
import Modal from '../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js';



export default class HuoZhuanDing extends React.Component {
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
            // 转存金额
            moneyInputVal: "",
            // 存期列表
            savingTimeList: [
                {
                    label: '三个月',
                    value: 'M3'
                },
                {
                    label: '六个月',
                    value: 'M6'
                },
                {
                    label: '一年',
                    value: 'Y1'
                },
                {
                    label: '二年',
                    value: 'Y2'
                },
                {
                    label: '三年',
                    value: 'Y3'
                },
                {
                    label: '五年',
                    value: 'Y5'
                }
            ],
            // 选择的存期
            savingTime: [],
            // 转存方式
            savingTypeList: [
                {
                    label: '自动转存',
                    value: '9'
                },
                {
                    label: '不自动转存',
                    value: '0'
                }
            ],
            // 选择的转存方式
            savingType: [],
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
            banksavingType: "",
            interestRate: "",

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
                        closeFlag: 'false'

                    }
                });
                Common.closeModal();
                that.setState({ modalState: !that.state.modalState });
            }
            else if ($(that.refs.myInput).css('display') == 'block') {
                window.history.go(-1)
            } else if ($(that.refs.myConfirm).css('display') == 'block') {
                $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                    title: "活期转定期",
                    leftButton: {
                        exist: 'true',
                        closeFlag: 'false'

                    }
                });
                $(that.refs.myConfirm).hide();
                $(that.refs.myInput).show();
            } else {
                window.history.go(-1)
            }
        }
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "活期转定期",
            leftButton: {
                exist: 'true',
                closeFlag: 'false'

            }
        });

        // 获取转出账户列表
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "ZH01",
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
                // state 转账账户列表
                that.setState({
                    accountList: res.rspBody.returnList,
                    customerName: res.rspBody.customerName
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
    }
    // 组件更新调用
    componentDidUpdate() {
        let that = this;
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
        if (!(that.state.moneyInputVal == "" || that.state.savingTime == "" || that.state.savingType == "")) {
            that.setState({
                buttonAddDisabled: false
            });
        } else {
            that.setState({
                buttonAddDisabled: true
            });
        }
    }

    // 显示转出账户列表
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
            titleText: '选择转出账户',
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
                        currentAccount: item
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
    // 存期
    showSavingTimeListBox(value, label) {
        let me =this;
        let banksavingTime = ''
        this.setState({
            savingTime: label
        })

        if (label == 'M3') {
            banksavingTime = "03"
            this.setState({
                banksavingType: "三个月",

            })
        } else if (label == 'M6') {
            banksavingTime = "06"
            this.setState({
                banksavingType: "六个月",

            })
        } else if (label == 'Y1') {
            banksavingTime = "12"
            this.setState({
                banksavingType: '一年',

            })

        } else if (label == 'Y2') {
            banksavingTime = "24"
            this.setState({
                banksavingType: '二年',

            })

        } else if (label == 'Y3') {
            banksavingTime = "36"
            this.setState({
                banksavingType: '三年',

            })
        } else if (label == 'Y5') {
            banksavingTime = "60"
            this.setState({
                banksavingType: '五年',

            })
        }

        if (label) {
            // 获取利率
            $Fetch(API.API_QUERY_REGULAR_LV, {
                //默认固定上送报文
                reqHead: {
                    //场景编码
                    sceneCode: "ZH01",
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
                    reservoirTypes: "01",
                    term: banksavingTime
                }
            }).then((res) => {
                if (Common.returnResult(res.rspHead.returnCode)){
                    this.setState({
                        interestRate:res.rspBody.interestRate
                    })
                  
                }
        })
        }
    }
    // 转存方式
    showSavingTypeListBox(value, label) {

        this.setState({
            savingType: label
        })

    }
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
        if (Number(that.state.moneyInputVal) < 50.00) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "尊敬的用户，存入定期金额最少为50元",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        if (Number(that.state.moneyInputVal) > Number(that.state.currentAccount.availBal)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "账户余额不足！",
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
                this.savingResult();
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
        // 活转定接口
        $Fetch(API.API_SET_HUO_ZHUAN_DING, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "SA03",
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
                transAmount: that.state.moneyInputVal,//交易金额
                reservoirType: 'T1',//储种
                reservoirNo: that.state.savingTime,//储种号
                cipher: that.state.realPwd,//交易密码
                flag: that.state.savingType,//转存标志
                turnOutAccNo: that.state.currentAccount.acNo,//转出账号
                signSMSBankFlag: "1" //短信银行签约标识
            }
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
    toSavingType() {
        Common.setUrl("saving/index.html");
    }

    /**** 接口字段说明 

    注：无特殊说明字段均为 String 类型 
        moneyInputVal: 金额
        savingTime: 存期
        savingTimeLabel: 存期label

    */

    render() {
        let CurrentAccount = this.state.currentAccount;
        let savingTimeLabel = '';
        console.log(this.state.interestRate)
        // let registerdata = Common.getSessionData(API.CHUXU_HZD_CX_CX_CQ);
        // alert(registerdata)
        // for (let item of this.state.savingTimeList) {
        //     if (item.value == this.state.savingTime) {
        //         savingTimeLabel = item.label;
        //         break;
        //     }
        // }

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
                    <MbankPublicInputMoney inputid="bankininput"
                        inputName="转存金额"
                        placeholder="请输入转存金额"
                        limitFlag={false}
                        value={this.state.moneyInputVal}
                        finalval={this.setMoneyinputval.bind(this)} />
                    <WhiteSpace size="sm" />
                    <Input.Group>
                        {/* <Input.Pick
                            title="存期"
                            labelNumber={6}
                            data={this.state.savingTimeList}
                            cols="1"
                            placeholder="选择存期"
                            onChange={this.showSavingTimeListBox.bind(this)}
                            value={this.state.savingTime}
                        /> */}


                        <Input.Click
                            cols="1"
                            cellTitle="存期"
                            labelNumber={6}
                            placeholder="选择存期"
                            title="存期"
                            items={this.state.savingTimeList}
                            onChange={this.showSavingTimeListBox.bind(this)}
                            value={this.state.savingTime}
                            data={this.state.savingTimeList}
                        />
{/* thumb,
        link,
        multiple,
        arrow,
        title,
        title2,
        description,
        description2,
        isMoneyDescription,
        onTap,
        subTitle,
        active,
        className,
        disabled,
        subDescription,
        date, */}
                        {/* <Input.Pick title="转存方式" labelNumber={6} data={this.state.savingTypeList} cols="1"
                            placeholder="选择转存方式"
                            onChange={this.showSavingTypeListBox.bind(this)} value={this.state.savingType} /> */}
                        <div ref ="nterestRate">
                            <List.Group>
                                {/* <List title="利率"
                                    active={ Number(this.state.interestRate).toString() + "%"}
                                    
                                /> */}
                                <List.left
                                titl="利率"
                                lv = {this.state.interestRate == "" ? "" : Number(this.state.interestRate).toString() + "%"}
                                />
                            </List.Group>
                            
                        </div>


                        <Input.Click
                            cols="1"
                            cellTitle="转存方式"
                            labelNumber={6}
                            placeholder="选择转存方式"
                            title="转存方式"
                            items={this.state.savingTypeList}
                            onChange={this.showSavingTypeListBox.bind(this)}
                            value={this.state.savingType}
                            data={this.state.savingTypeList}
                        />


                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.savingConfirm.bind(this)} disabled={this.state.buttonAddDisabled || this.state.moneyInputVal == '0.00'}>确认</Button>
                    </WingBlank>
                </div>
                <div ref="myConfirm" style={{ display: "none" }}>
                    <div className="savings-zhiququereng-democode">
                        <MbankPublicResult Small title="转存金额" money={this.state.moneyInputVal} />
                        <div className="savings-zhiququereng-boder"></div>
                        <WhiteSpace size="sm" />
                        <MbankPublicConfirm.Group>
                            <MbankPublicConfirm title="转出账户" content={CurrentAccount.acNo} />
                            <MbankPublicConfirm title="存期" content={this.state.banksavingType} />
                            <MbankPublicConfirm title="转存方式" content={this.state.savingType == '0' ? '不自动转存' : '自动转存'} />
                        </MbankPublicConfirm.Group>
                        <WhiteSpace size="sm" />
                        {/* <Input.Group>
                            <Input type="password" textAlign="left" labelNumber={6} maxLength="6"
                                placeholder="请输入6位交易密码" value={this.state.pwd} editable={false} onClick={this.showKeyBoard.bind(this)}>交易密码</Input>
                        </Input.Group> */}
                    </div>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.showKeyBoard.bind(this)}>确认</Button>
                    </WingBlank>
                </div>
                <div ref="myResult" style={{ display: "none" }}>
                    {
                        Common.returnResult(this.state.returnCode) ?
                            <div className="savings-zhiququereng-democode">
                                <MbankPublicResult type="success" title="转存成功" money={this.state.moneyInputVal} />
                                <WhiteSpace size="sm" />
                                <div className="savings-zhiququereng-boder"></div>
                                <WhiteSpace size="sm" />
                                <MbankPublicConfirm.Group >
                                    <MbankPublicConfirm title="定期账号" content={this.state.accountNo} />
                                    <MbankPublicConfirm title="转出账户" content={CurrentAccount.acNo} />
                                    <MbankPublicConfirm title="存期" content={this.state.banksavingType} />
                                    <MbankPublicConfirm title="转存方式" content={this.state.savingType == '0' ? '不自动转存' : '自动转存'} />
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
                        <Button type="ghost" size="default" onTap={this.toSavingType.bind(this)}>返回储蓄服务</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}