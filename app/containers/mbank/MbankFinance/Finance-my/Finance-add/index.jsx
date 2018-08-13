import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../../constants/api';
//公共方法
import $native from './../../../../../native/native';
import $Fetch from './../../../../../fetch/fetch';
import Common from "../../../../../util/common.jsx";
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import List from '../../../../../components/Base/list/index.web.js';
import Input from '../../../../../../app/components/Base/input-list/index.web.jsx';
import Button from '../../../../../../app/components/Base/button/index.web.jsx';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

export default class MbankFinanceAdd extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Detail: [],
            productDetaildata: [],
            map: [],
            passwordInputVal: "",
            passwordInputValm: "",
            phone: "",
            addAmount: "",
            clickState:"1",
            authInput: "",
            smsFigureSizeNum:""
        }
    }

    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '理财产品追加',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });

        // 获取持有产品信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_HOLD));

        this.setState({
            map: listdata
        });

        //获取产品详情
        let productDetaildata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL));

        this.setState({
            productDetaildata: productDetaildata
        });

        //短信校验模板
        let data = {
            templateNo: "sms00000003",
            sceneCode: "FA07"
        };
        Common.addSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN, JSON.stringify(data));
    }


    //修改赎回标识
    onAnnualizedReturnSignChange = (value) => {
        let that = this;
        that.setState({
            annualizedReturnSign: value,
        })

    };
    //修改赎回份额
    onAnnualizedReturnChange = (value) => {
        let that = this;
        that.setState({
            addAmount: value
        })
    };

    // 短信验证码
    setAuthinputval(vals) {
        this.setState({
            authInput: vals
        })
    }

    //短信验证码点击事件
    setClickState(vals){
        this.setState({
            clickState: vals
        })
    }

    //确认按钮//理财产品购买
    nextStepClick() {
        let that = this;
        let addAmount = that.state.addAmount;
        $Fetch(API.API_GET_FINANCE_PURCHASE, {
            reqHead: {
                //场景编码
                sceneCode: "FA07",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            data: {
                prdId: this.state.productDetaildata.prdId,        //产品ID
                bankAcct: this.state.map.bankAcct,     //银行账号
                appAmt: addAmount,       //购买金额
                agentChkType: '', //经办人识别方式
                agentName: '',    //经办人姓名
                agentCreType: '', //经办人证件类型
                agentCreNum: '',  //经办人证件号码
                fmManager: '',    //理财经理代码
                shareType: '',    //分红方式
                smsCode: this.state.authInput,  //短信验证码
                cipher: this.state.passwordInputValm    //交易密码   
            }
        }).then((res) => {
            if(res.rspHead.returnCode==='CCOE0154' || res.rspHead.returnCode==='CCOE0155'){ //短信验证、密码验证失败
                // 调取客户弹出框提示信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
            }else{
            let param = {
                bankAcct: that.state.map.bankAcct,
                prdId: that.state.productDetaildata.prdId,
                prdName: that.state.productDetaildata.prdName,
                matuDate: that.state.productDetaildata.matuDate,
                term: that.state.productDetaildata.term,
                moneyInputVal: that.state.addAmount,
            };
            //清除短信校验session中的值
            Common.removeSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN);
            //先清除session中值
            Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO);
            //先清除session中
            Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_ADD_RESTULT);

            //产品信息存session
            Common.addSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO, JSON.stringify(param));
            //交易返回结果存session
            Common.addSessionData(API.SESSION_FINANCE_PRODUCT_ADD_RESTULT, JSON.stringify(res.rspHead));
            Common.setUrl('finance-addResult/index.html');
            }
        })
    }

    //主交易接口
    confirmButton() {
        let that = this;
        let authInput = that.state.authInput ? that.state.authInput : '';    
        let passwordInputVal = that.state.passwordInputVal ? that.state.passwordInputVal : '';
        // 短信验证码必须发送
        if(this.state.clickState == "1"){
            let alertDict = {
                title: "提示信息",
                msg: "请获取短信验证码",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return
        }

        if (Common.PasswordSmsNumber(passwordInputVal)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的交易密码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
        }

        if (Common.PasswordSmsNumber(authInput)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的短信验证码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
        }

        let addAmount = that.state.addAmount;
        if (addAmount == "") {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请输入追加份额",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);

        } else if ((addAmount % this.state.productDetaildata.ssupSubAmt) != 0) {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "输入金额必须为追加金额的倍数",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
        } else {

            // 调取弹出框提示信息
            let alertDict = {
                title: "信息提示",
                msg: "确认追加",
                cancel_text: "取消",
                success_text: "确认",
                success: this.nextStepClick.bind(this)
            }
            Common.showAppDialogAlert(alertDict);
        }
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
    showKeyBoard1() {
        this.setState({
            passwordInputVal: ""
        })
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            cancel: "cancel",
            success: (res) => {
                let jsons = JSON.parse(res);

                let a = "";
                for (var i = 0; i < jsons.pswLength; i++) {
                    a = a + "2"
                }
                this.setState({
                    passwordInputVal: a,
                    passwordInputValm: jsons.pswText
                })
            }
        })
    }

    inputitemcheck = newId => {
        this.setState({
           AuthCode: "",
           smsFigureSizeNum: ""
        })
         let that = this;
         //展示光标
         $("#" + newId).show();
         $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
             type: "num",
             maxLength: "6",
             //关闭键盘回调函数，并传入关闭的光标的Id
             cancel: that.cancelKb.bind(this, newId),
             success: res => {
                 let jsons = JSON.parse(res);
                 this.setState({
                   AuthCode: jsons.text,
                   smsFigureSizeNum:jsons.pswLength
                 });
   
             inputitemcheck();
             }
         });
         $("#" + newId).show();
     }

    //金额框取值
    setMoneyinputval(val) {
        let that = this;

        that.setState({
            addAmount: val
        })
    }

    render() {
        const {
            list
        } = this.state;
        let that = this;

        let prdType = "";
        switch (this.state.productDetaildata.prdType) {
            case "1": prdType = "封闭"; break;
            case "2": prdType = "滚存"; break;
            case "3": prdType = "开放"; break;
            case "4": prdType = "智能封闭"; break;
            default: prdType = "";
        }

        return (
            <div>
                <WhiteSpace size="sm" />
                <List.Group>
                    <List title="购买账号" description={this.state.map.bankAcct} />
                    <List title="产品名称" description={this.state.productDetaildata.prdName} />
                    <List title="预估年化收益率" description={this.state.productDetaildata.propRateMax + '%'} />
                    <List title="产品类型" description={prdType} />
                    <List title="当前持有份额" description={formatMoney(this.state.map.canUseVol,{symbol: '￥'}) + '元'} />
                    <List title="投资期限" description={this.state.productDetaildata.term + "天"} />
                    <List title="追加金额" description={formatMoney(this.state.productDetaildata.ssupSubAmt,{symbol: '￥'}) + '元'} />
                    <List title="起始日期" description={moment(this.state.productDetaildata.valueDate).format('YYYY-MM-DD')} />
                    <List title="到期日期" description={moment(this.state.productDetaildata.matuDate).format('YYYY-MM-DD')} />
                </List.Group>
                <WhiteSpace size="sm" />
                <Input.Group>
                    <Input onChange={this.onAnnualizedReturnChange.bind(this)}
                         placeholder="请输入追加份额" type="number" labelNumber={6} limitFlag={false}
                        finalval={this.setMoneyinputval.bind(this)}
                        value={this.state.addAmount}>追加份额</Input>
                </Input.Group>
                <WhiteSpace size="sm" />
                <Input.Group>
                <Input type="password" clear={true} textAlign="left" labelNumber={6} maxLength="6" editable={false} onClick={this.showKeyBoard1.bind(this)}
                    value={this.state.passwordInputVal} placeholder="请输入交易密码">交易密码</Input>

                <Input.Sms iddatas={"autoinput"} labelNumber={5} inputtype={"authcode"} clickState={this.setClickState.bind(this)}
                    finalval={this.setAuthinputval.bind(this)} editable={false} id='smsBoard' type="num"
                    placeholder="请输入验证码" onClick={this.inputitemcheck.bind(this,"smsBoard")}
                    cursorSize={this.state.smsFigureSizeNum} value={this.state.AuthCode}
                    maxLength={6} />
                 </Input.Group>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button onTap={this.confirmButton.bind(this)} disabled={!(this.state.passwordInputVal && this.state.authInput)} type="primary">确认</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
            </div>
        )
    }

}

