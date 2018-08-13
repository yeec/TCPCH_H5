import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin';
//API数据接口
import API from './../../../../../constants/api';
//公共方法
import $native from './../../../../../native/native';
import $Fetch from './../../../../../fetch/fetch';
import Common from "../../../../../util/common.jsx";
import $ from "jquery";
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import List from '../../../../../components/Base/list/index.web.js';
import Input from '../../../../../../app/components/Base/input-list/index.web.jsx';
import Button from '../../../../../../app/components/Base/button/index.web.jsx';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

export default class MbankFinanceCancle extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Detail: [],
            map:[],
            productDetaildata: [],
            passwordInputVal:"",
            authInput:"",
            clickState:"1",
            passwordInputValm:"",
            smsFigureSizeNum:""
        }
    }

    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '理财产品撤单',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });

        // 获取持有产品信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_ENTRUST));

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
            sceneCode: "FA10"
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
            addAmount: value,

        })
    };

    // // 短信验证码
    // setAuthinputval(vals) {
    //     this.setState({
    //         authInput: vals
    //     })
    // }

    //短信验证码点击事件
    setClickState(vals){
        this.setState({
            clickState: vals
        })
    }

    //确认按钮
    confirmButton() {
        //校验短信验证码是否正确
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

        if (Common.PasswordSmsNumber(authInput)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的短信验证码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
        }else{
            let alertDict = {
                title: "信息提示",
                msg: "确认撤销？",
                cancel_text: "取消",
                success_text: "确认",
                success: this.showKeyBoard1.bind(this)
            }
            Common.showAppDialogAlert(alertDict);
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
                        this.nextStepClick(); //理财购买接口
                    }
                // }
            }
        })
    }

    //提交
    nextStepClick() {
        // 获取存储的理财产品信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_ENTRUST));
        this.setState({
            map: listdata
        });
        let that = this;

        //理财撤单
        $Fetch(API.API_GET_CANCLE_PRODUCT, {
            reqHead: {
                //场景编码
                sceneCode: "FA10",
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
                dealNo: listdata.dealNo,         //原交易流水号
                bankAcct: this.state.map.bankAcct,         //	银行账号
                agentChkType: "",         //		经办人识别方式
                agentName: "",         //	经办人姓名
                agentCreType: "",         //		经办人证件类型
                agentCreNum: "",         //	经办人证件号码
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
                let param = {
                    productRelevanceCard: that.state.Detail.productRelevanceCard,
                    prdId: that.state.Detail.prdId,
                    prdName: that.state.Detail.prdName,
                    matuDate: that.state.Detail.matuDate,
                    term: that.state.Detail.term,
                    moneyInputVal: that.state.addAmount,
                };
                //清除短信校验session中的值
                Common.removeSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN); 

                //清除session
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO); 
                //清除session
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_CANCLE_RESTULT);

                //产品信息存session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO, JSON.stringify(param));
                //交易返回结果存session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_CANCLE_RESTULT, JSON.stringify(res.rspHead));
                //弹框跳转页面
                Common.setUrl('finance-cancelResult/index.html')
            }
        })
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
    // showKeyBoard1() {
    //     this.setState({
    //         passwordInputVal:""
    //     })
    //     $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
    //         type: "tradePsw",
    //         cancel: "cancel",
    //         success: (res) => {
    //             let jsons = JSON.parse(res);
            
    //             let a = "";
    //             for(var i = 0;i<jsons.pswLength;i++){
    //               a = a +"2"
    //             }
    //             this.setState({
    //                 passwordInputVal:a,
    //                 passwordInputValm: jsons.pswText
    //             })
    //         }
    //     })
    // }

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
		Common.pageMoveShow(400);
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

    render() {
        const {
            list
        } = this.state;
        let that = this;

        let prdType="";
        switch(this.state.productDetaildata.prdType){
            case "1":prdType="封闭";break;
            case "2":prdType="滚存";break;
            case "3":prdType="开放";break;
            case "4":prdType="智能封闭";break;
            default:prdType="";
        }
        return (
            <div>
                <List.Group>
                    <List title="购买账号" description={this.state.map.bankAcct}/>
                    <List title="产品代码" description={this.state.productDetaildata.prdId}/>
                    <List title="预估年化收益率" description={this.state.productDetaildata.propRateMax+'%'}/>
                    <List title="产品类型" description={prdType}/>
                    <List title="交易金额" description={formatMoney(this.state.map.appAmt,{symbol: '￥'})+'元'}/>
                    <List title="投资期限" description={this.state.productDetaildata.term='天'}/>
                    <List title="起始日期" description={moment(this.state.productDetaildata.valueDate).format('YYYY-MM-DD')}/>
                    <List title="到期日期" description={moment(this.state.productDetaildata.matuDate).format('YYYY-MM-DD')}/>
                </List.Group>
                <WhiteSpace size="md"/>

                {/* <Input type="password" clear={true} textAlign="left" labelNumber={6} maxLength="6" editable={false} onClick={this.showKeyBoard1.bind(this)}
                    value={this.state.passwordInputVal} placeholder="请输入交易密码">交易密码</Input> */}

                <Input.Sms iddatas={"autoinput"} clickState={this.setClickState.bind(this)} inputtype={"authcode"}
                          maxlen={"6"} editable={false}  editable={false} id='smsBoard' type="num"
                          placeholder="请输入验证码" onClick={this.inputitemcheck.bind(this,"smsBoard")}
                          cursorSize={this.state.smsFigureSizeNum} value={this.state.authInput}/>
                <WhiteSpace size="md"/>
                <WingBlank size="lg">
                    <Button onTap={this.confirmButton.bind(this)} disabled={!this.state.authInput} type="primary">确认</Button>
                </WingBlank>
            </div>
        )
    }
}

