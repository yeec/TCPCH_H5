import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../constants/api';
//公共方法
import $Fetch from './../../../../fetch/fetch';
import $native from './../../../../native/native';
import Common from "../../../../util/common.jsx";
import $ from 'jquery';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import Input from '../../../../components/Base/input-list/index.web.jsx';
import Prompt from '../../../../components/Base/ocr-prompt/index.web.jsx';

//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web.jsx';
export default class AccountAdd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // 加挂账号
            accountNo: "",
            // 加挂别名
            alias: "",
            // 加挂账号密码
            cipher: "",
            // 短信验证码
            smsCode: "",
            //安全工具标识
            businessRunningNo: "",
            safeTool: "",
            clickState: "1",
            returnCode: "",
            returnMsg: "",
            passwordInputVal: "",
            Prompt:"",
            accountNoSizeNum:"",
            smsFigureSizeNum:"",
            keyKbHide:""
        };
        // 性能优化（当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '银行卡绑定',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });

        // 发送短信通知模板
        let data = {
            templateNo: "sms00000006",
            sceneCode: "AC07",
        };
        Common.addSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN, JSON.stringify(data));

        // //5、云证通
        // //查询云证通
        //temp1 查询是否开通云证通
        $Fetch(API.API_QUERY_CST_BANK_SECURITIES, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC07",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                //云证通开通标识（0:未开通，1:开通）
                let openFlag = res.rspBody.openFlag;//开通标志
                if (openFlag == '0') {
                    //显示短信验证界面设置
                    this.setState({
                        safeTool: "1002"
                    })
                } else {//此设置用户是否显示短信验证码发送，如果是开通过云证通，默认走云证通流程
                    //云证通快速开通
                    $native.callClientForBank(API.NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO, {
                        success: (res) => {
                            // alert(res);
                            //1- 失败  0- 成功
                            if (res == "0") {
                                this.setState({
                                    safeTool: "1003"
                                });
                            } else {
                                //显示短信验证界面设置
                                this.setState({
                                    safeTool: "1002"
                                });
                            }
                        }
                    });
                }
            } else {
                //1.如果查询渠道是否开通云证通失败，默认走短信验证流程
                this.setState({
                    safeTool: "1002"
                });
            }
        });
    }

    // 调用客户端键盘接口
    //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
    // 卡号
    setAccountNoValue = newId => {
        this.cancelKbGb(newId);
        this.setState({
            accountNo:"",
            accountNoSizeNum: ""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength:"19",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: res => {
            let jsons = JSON.parse(res);
            this.setState({
                accountNo: jsons.text,
                accountNoSizeNum: jsons.pswLength
            });         

            setAccountNoValue();
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
      };

    // 别名
    setAliasValue(vals) {
        this.setState({
            alias: vals
        })
    }

    setAliasClickValue(){
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    }
    
    // 密码
    setPassWordValue(vals) {
        this.setState({
            cipher: vals
        })
    }

    // 短信验证码
    setAuthInputValue(vals) {
        this.setState({
            smsCode: vals
        })
    }

    //短信验证码点击事件
    setClickState(vals) {
        this.setState({
            clickState: vals
        })
    }

    // 提交确认
    checkTips() {
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
        let that = this;
        let accountNo = that.state.accountNo.split(" ").join("");
        let cipher = that.state.cipher;
        let smsCode = that.state.smsCode;


        // 短信验证码必须发送
        if (this.state.clickState == "1" && this.state.safeTool == "1002") {
            let alertDict = {
                title: "提示信息",
                msg: "请获取短信验证码",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return
        }

        // 校验卡号卡号是否为空,长度是否在10-20之间
        if (Common.cardNumber(accountNo)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的银行卡号",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
        }
        // // 校验短信验证码
        // else if (Common.PasswordSmsNumber(cipher)) {
        //     // 调取弹出框提示信息
        //     let alertDict = {
        //         title: "错误提示",
        //         msg: "请填写正确的密码",
        //         success_text: "确认"
        //     }
        //     Common.showAppDialogAlert(alertDict);
        // }
        // 校验密码 
        else if (Common.PasswordSmsNumber(smsCode) && this.state.safeTool == "1002") {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的短信验证码",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
        } else {
            // 调取弹出框提示信息, 设置回调方法
            let alertDict = {
                title: "信息提示",
                msg: "尊敬的用户，确认添加新的卡号",
                cancel_text: "取消",
                success_text: "确认",
                success: that.showKeyBoard1.bind(this)

            }
            Common.showAppDialogAlert(alertDict);
        }
    }


    
    // 调用客户端键盘接口
    //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
    showKeyBoard1 (){
        this.setState({
            passwordInputVal: ""
        });
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            hint:"请输入交易密码",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: "cancel",
            success: (res) => {
                let jsons = JSON.parse(res);
                let a = "";
                for (var i = 0; i < jsons.pswLength; i++) {
                    a = a + "2"
                }
                this.setState({
                    cipher: jsons.pswText,
                    passwordInputVal: a
                });
                that.checkSignState();
            }
        })
    }

    inputitemcheck = newId => {
        this.cancelKbGb(newId);
        this.setState({
            smsCode: "",
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
                    smsCode: jsons.text,
                   smsFigureSizeNum:jsons.pswLength
                 });
   
             inputitemcheck();
             }
         });
         $("#" + newId).show();
     }

    // 机构验证签名
    checkSignState() {

        let that = this;
        let safeTool = that.state.safeTool;
        let accountNo = that.state.accountNo;
        let alias = that.state.alias;
        let cipher = that.state.cipher;
        let smsCode = that.state.smsCode;

        if (safeTool == "1002") {
            this.nextStepClick();
        } else {

            let signContent = "accountNo=" + accountNo + "&alias=" + alias;

            //1、获取转出账户列表
            $Fetch(API.API_GET_GENSIGNATURE, {
                //默认固定上送报文
                reqHead: {
                    //场景编码
                    sceneCode: "AC07",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode: "1",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType: "1",
                    //交易标识 1-主，2-副
                    flag: "2",
                    //服务接口版本号 1.0.0
                    serviceVersion: "1.0.0",
                },
                data: {
                    signContent: signContent
                }
            }).then((res) => {
                // alert(res.rspHead.returnCode);
                // {
                //     "businessRunningNo": "20160405171342795O0HYPOQ0",
                //     "createDate": "2016-07-04 14:45:23",
                //     "service": " mobile.HKESDK.sign",
                //     "attach": "testtest",
                //     "certSN": "2000065625",
                // "businessText": "fromAccount=1234567890123456&payeeName=吴凡& receivingBank=2 & payeeAccount=6543 ******** 3210 & payeePhoneNo=6543 ******** 3210 & amount=999.9 & remark=OK"}

                if (Common.returnResult(res.rspHead.returnCode)) {
                    let businessRunningNo = res.rspBody.businessRunningNo;
                    let createDate = res.rspBody.createDate;
                    let service = res.rspBody.service;
                    let certSN = res.rspBody.certSN;
                    let businessText = res.rspBody.businessText;


                    this.setState({
                        businessRunningNo: businessRunningNo,
                        // sourceString: sourceString,
                        //sourceOrgSignature: params,

                    });

                    let signatureTextping = '{"businessRunningNo":"' + businessRunningNo + '","createDate":"' + createDate + '","service":"' + service + '","certSN":"' + certSN + '","businessText":"' + businessText + '"}';

                    //
                    //客户端签名 sourceString 签名后字段 JSON.stringify(params)
                    // 云证通签名接口：yztMessageSign   入参：（成功回调、签名原文、服务器签名） 出参：
                    $native.callClientForBank(API.NATIVE_CODE_YZTMESSAGESIGN, {
                        sourceString: signatureTextping,
                        sourceOrgSignature: res.rspBody.signature,
                        success: (res) => {
                            // alert(res);
                            if (res == 0) {
                                //下载失败
                                let alertDict = {
                                    title: "信息提示",
                                    msg: "云证通签名客户端失败，请重新进行交易",
                                    success_text: "确认"
                                };
                                Common.showAppDialogAlert(alertDict);
                            } else if (res == 1) {
                                //下载成功进行转账
                                this.nextStepClick();
                            }
                        }
                    })

                } else {
                    let alertDict = {
                        title: "信息提示",
                        msg: "云证通签名失败，请重新进行交易",
                        success_text: "确认"
                    };
                    Common.showAppDialogAlert(alertDict);

                }
            });
        }
    }


    // 下一步
    nextStepClick() {
        let that = this;
        let accountNo = that.state.accountNo;
        let alias = that.state.alias;
        let cipher = that.state.cipher;
        let smsCode = that.state.smsCode;
        let checkBusiness = "";
        let businessRunningNo = "";


        let safeTool = that.state.safeTool;
        if (safeTool == "1003") {
            checkBusiness = "accountNo|alias";
            businessRunningNo = that.state.businessRunningNo;

        }

        // 账户添加接口
        $Fetch(API.API_SET_ACCOUNT_ADD, {
            // 固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC07",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "2",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",
            },
            // 交易上送报文
            data: {

                //加挂账号
                accountNo: accountNo,
                //别名
                alias: alias,
                //加挂账号密码
                cipher: cipher,
                //短信验证码
                smsCode: smsCode,
                safeTool: safeTool,
                businessRunningNo: businessRunningNo,
                checkBusiness: checkBusiness

            }
        }).then((res) => {
            //验证密码失败
            if (Common.enciperResult(res.rspHead.returnCode)) {
                // 调取弹出框提示信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
                return
            } else if (Common.messageResult(res.rspHead.returnCode)) {
                //短信验证码失败
                // 调取弹出框提示信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
                return
            } else {
                this.setState({
                    returnCode: res.rspHead.returnCode,
                    returnMsg: res.rspHead.returnMsg
                });
                // 隐藏录入页面
                $(this.refs.myInput).hide();
                // 显示结果页面-成功
                $(this.refs.myResult).show();
                $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
            }
        })
    }

    // 返回页面设置
    goBackPage() {
        Common.setUrl("account/index.html");
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    }

    /****
     * 接口字段说明
     accountNo        加挂账号
     accountNo        加挂别名
     cipher            加挂账号密码
     smsCode            短信验证码
     */


     //   getBankID (出参：卡号bank_NUM， 卡名bank_NAME，)
    ocrClick() {
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_BANK_OCR, {
            success: (res) => {
                let certNo = JSON.parse(res);
                that.setState({
                    accountNo: certNo.bank_NUM,
                    Prompt:"1",
                })
            }
        })
    }
    render() {
        return (
            <div>
                <WhiteSpace size="sm" />
                <div ref="myInput">
                    <Input.Group>
                        <Input placeholder="请输入卡号" value={this.state.accountNo} labelNumber={6} maxLength="19" cursorSize={this.state.accountNoSizeNum}
                            onClick={this.setAccountNoValue.bind(this,"keyboardNumber")} type="number" id="keyboardNumber" editable={false} rightExtra="true" ExtraIconSuffix="ocr" onExtraClick={this.ocrClick.bind(this)}>
                            卡号
                        </Input>
                        {/* ocr提示信息 */}
                        <Prompt title="请核对账户信息" money={this.state.Prompt}></Prompt>
                        <Input placeholder="请输入别名(选输)" value={this.state.alias} labelNumber={6} maxLength="8"
                            type="text"
                            onChange={this.setAliasValue.bind(this)} onClick={this.setAliasClickValue.bind(this)}>
                            别名
                        </Input>
                        {/* <Input textAlign="left" labelNumber={6} maxLength="6"
                            placeholder="请输入交易密码" editable={false} value={this.state.passwordInputVal}
                            onClick={this.showKeyBoard1.bind(this,"keyboardNumAndChar")} type="password" id="keyboardNumAndChar"
                            onChange={this.setPassWordValue.bind(this)}>交易密码</Input> */}
                        {
                            this.state.safeTool == "1002" ?
                                <Input.Sms iddatas={"autoinput"} clickState={this.setClickState.bind(this)}
                                    inputtype={"authcode"} editable={false}  id='smsBoard' type="num"
                                    placeholder="请输入验证码" onClick={this.inputitemcheck.bind(this,"smsBoard")}
                                    cursorSize={this.state.smsFigureSizeNum} value={this.state.smsCode}
                                    finalval={this.setAuthInputValue.bind(this)} maxLength={6} /> : null
                        }
                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default"
                            disabled={!(this.state.accountNo)}
                            onTap={this.checkTips.bind(this)}>确认</Button>
                    </WingBlank>
                </div>
                {/*****************************结果页面************************/}
                <div ref="myResult" style={{ display: "none" }}>
                    {
                        Common.returnResult(this.state.returnCode) ?
                            <MbankPublicResult type="success" title="绑定成功"
                                message={<div>尊敬的用户，账号<b>{this.state.accountNo}</b>绑定成功。
                                               </div>} />
                            : <MbankPublicResult type="error" title="绑定失败"
                                message={<div>尊敬的用户，您进行的绑定操作失败。
                                                     <br />错误编码：<b>{this.state.returnCode}</b>
                                    <br />错误信息：<b>{this.state.returnMsg}</b>
                                </div>} />
                    }
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={this.goBackPage.bind(this)}>返回</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }

}

