import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import Common from "../../../../../util/common.jsx"
import $Fetch from '../../../../../fetch/fetch.js';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
import $ from "jquery";
import Input from '../../../../../components/Base/input-list/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankTransferConfirm from '../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx';

export default class MbankFinanceConfirm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            BuyInfo: {},
            ProductInfo: {},
            PassWord: "",
            passwordInputVal:"",
            passwordInputValm:"",
            clickState:"1",
            mobile: "",
            authInput: ""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "购买确认",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        //获取购买页面数值
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO));
        this.setState({
            BuyInfo: listdata
        });

        // 获取存储的理财产品信息
        let ProductInfo = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL));
        that.setState({
            ProductInfo: ProductInfo
        });

        //短信校验模板
        let data = {            
            templateNo: "sms00000003",
            sceneCode: "FA05"
        };
        Common.addSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN, JSON.stringify(data));
    }

    // 短信验证码
    setAuthInputValue(vals) {
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

    //校验短信验证码是否正确
    setAuthinputval(){
        let that = this;
        let authInput = that.state.authInput ? that.state.authInput : '';    
        // let passwordInputVal = that.state.passwordInputVal ? that.state.passwordInputVal : '';
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

        // if (Common.PasswordSmsNumber(passwordInputVal)) {
        //     // 调取客户弹出框提示信息
        //     let alertDict = {
        //         title: "错误提示",
        //         msg: "请填写正确的交易密码",
        //         success_text: "确认"
        //     };
        //     Common.showAppDialogAlert(alertDict);
        // }

        if (Common.PasswordSmsNumber(authInput)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的短信验证码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
        }else{
            //验证交易密码
            this.showKeyBoard1();
            // this.mbankFinancePurchase(); //理财购买接口
        }
    }

    // 调用客户端键盘接口
    //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
    showKeyBoard1() {
        this.setState({
            passwordInputVal:""
        })
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            cancel: "cancel",
            hint:"请输入交易密码",
            success: (res) => {
                let jsons = JSON.parse(res);
            
                let a = "";
                for(var i = 0;i<jsons.pswLength;i++){
                  a = a +"2"
                }
                this.setState({
                    passwordInputVal:a,
                    passwordInputValm: jsons.pswText
                })

                // if(a.length === 6){
                    let passwordInputVal = that.state.passwordInputVal ? that.state.passwordInputVal : '';
                    if (Common.PasswordSmsNumber(passwordInputVal)) {
                        // 调取客户弹出框提示信息
                        let alertDict = {
                            title: "错误提示",
                            msg: "请填写正确的交易密码",
                            success_text: "确认"
                        };
                        Common.showAppDialogAlert(alertDict);
                    }else{
                        this.mbankFinancePurchase(); //理财购买接口
                    }
                // }
            }
        })
    }

    inputitemcheck = newId => {
        this.cancelKbGb(newId);
       this.setState({
        authInput: "",
          smsFigureSizeNum: ""
       })
        let that = this;
        //展示光标
        $("#" + newId).show();
        //输入框上移
		Common.pageMoveShow(300);
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength: "6",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: res => {
                let jsons = JSON.parse(res);
                this.setState({
                    authInput: jsons.text,
                  smsFigureSizeNum:jsons.pswLength
                });
  
            inputitemcheck();
            }
        });
        $("#" + newId).show();
    }

    cancelKbGb = val => {
        let kbId=this.state.keyKbHide
        if(kbId){
          $("#" + kbId).hide();
          this.setState({
            keyKbHide:val
         })
        }else{
          this.setState({
            keyKbHide:val
         })
        }
      };

    cancelKb = val => {
        //隐藏光标
        $("#" + val).hide();
        //还原上移
		Common.pageMoveHide();
      };

    //理财购买接口
    mbankFinancePurchase() {
        //购买理财接口
        $Fetch(API.API_GET_FINANCE_PURCHASE, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA05",
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
                prdId: this.state.ProductInfo.prdId,        //产品ID
                bankAcct: this.state.BuyInfo.acNo,     //银行账号
                appAmt: this.state.BuyInfo.moneyInputVal,       //购买金额
                agentChkType: '', //经办人识别方式
                agentName: '',    //经办人姓名
                agentCreType: '', //经办人证件类型
                agentCreNum: '',  //经办人证件号码
                fmManager: '',    //理财经理代码
                shareType: '',    //分红方式
                smsCode:this.state.authInput,  //短信验证码
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
                //清除短信校验session中的值
                Common.removeSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN); 
                
                //先清除session中理财购买返回
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_RESTULT); 
                // 获取理财购买返回信息传入session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_RESTULT, JSON.stringify(res.rspHead));
                Common.setUrl('finance-result/index.html');
                }
        })
    }

    render() {
        return (
            <div>

                <MbankPublicResult Small title="购买金额" money={this.state.BuyInfo.moneyInputVal + ""}/>
                <WhiteSpace size="sm"/>
                <MbankTransferConfirm.Group>
                    <MbankTransferConfirm title="购买账户"
                                          content={this.state.BuyInfo.acNo + " | " + this.state.BuyInfo.customerName}/>
                    <MbankTransferConfirm title="理财名称" content={this.state.ProductInfo.prdName}/>
                    <MbankTransferConfirm title="理财到期" content={moment(this.state.ProductInfo.matuDate).format('YYYY-MM-DD')}/>
                    <MbankTransferConfirm title="理财期限" content={this.state.ProductInfo.term+"天"}/>
                    <MbankTransferConfirm title="年化收益率" content={this.state.ProductInfo.propRateMax+'%'}/>
                </MbankTransferConfirm.Group>

                <WhiteSpace size="sm"/>
                <Input.Group>
                {/* <Input type="password" clear={true} textAlign="left" labelNumber={6} maxLength="6" editable={false} onClick={this.showKeyBoard1.bind(this)}
                        value={this.state.passwordInputVal} placeholder="请输入交易密码">交易密码</Input> */}

                <Input.Sms iddatas={"autoinput"} clickState={this.setClickState.bind(this)} editable={false} finalval={this.setAuthInputValue.bind(this)}
                maxlen={"6"} id='smsBoard' onClick={this.inputitemcheck.bind(this,"smsBoard")} placeholder="请输入验证码" cursorSize={this.state.smsFigureSizeNum} value={this.state.authInput}/>
                </Input.Group>
                <WhiteSpace size="lg"/>
                <WingBlank size="lg">
                    <Button type="primary" size="default" editable={false} disabled={!this.state.authInput} onTap={this.setAuthinputval.bind(this)}>确认</Button>
                </WingBlank>
            </div>
        )
    }
}	