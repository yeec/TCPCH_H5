import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import ContextDecorator from '../../../../util/decorator/context-decorator';
import $Fetch from './../../../../fetch/fetch.js';
import Common from "../../../../util/common.jsx";
import $ from 'jquery';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import List from '../../../../components/Base/list/index.web.js';
import Checkbox from '../../../../components/Base/checkbox/index.web.js';
import Cell from '../../../../components/Base/cell/index.web.js';
import Button from '../../../../components/Base/button/index.web.jsx';
import Input from '../../../../components/Base/input-list/index.web.jsx';
import Prompt from '../../../../components/Base/ocr-prompt/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web.jsx';
//样式引入
import '../style/index.web.js';


export default class PasswordUserData extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //证件类型
            certType:"",
            //证件号码
            certNo:"",
            //客户名称
            custerName:"",
            //手机号码
            mobileNo:"",
            //借记卡号
            accountInputVal: "",
            //交易密码
            passwordInputVal: "",
            //登陆密码
            loginPassword: "",
            //重新输入登陆密码
            loginPassword2: "",
            //交易密码加密
            passwordInputValm:"",
            userName: "",
            //第一次登陆密码加密
            loginPasswordm:"",
            //第二次登陆密码加密
            loginPasswordm2:"",
            //密码位数
            loginPasswordmlength:"",
            //获取随机数失败判断执行的次数
            getTimes: 0,
            Prompt:"",
            figureSizeNum: "",
            comfirmPasswordmlength: ""

        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount() {
        let that = this;
        // 添加背景颜色
        Common.addBgColor()
        // 初始化离开钩子
        // this.props.router.setRouteLeaveHook(
        //     this.props.route,
        //     Common.removeBgColor.bind(this)
        // )
       $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "重置密码",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
        //取到上个页面传来的信息
        let verification = JSON.parse(Common.getSessionData(API.SESSION_VERIFICATION_PHONEA));

        //证件类型
        that.setState({
          certType:verification.certType
        })
        //证件号码
        that.setState({
          certNo:verification.certNo
        })
        //客户名称
        that.setState({
          custerName:verification.custerName
        })
        //手机号
        that.setState({
          mobileNo:verification.mobileNo
        })

    }
    //秘钥失效后调用客户端随机数
    getRandom() {
        $native.callClientForBank(API.NATIVE_CODE_GETRANDOM, {
            success: this.getBackData
        });
        // this.getBackData();

    }
    //回调接受客户端的值做操作
    getBackData = (res) => {
      //成功继续发生交易请求
      if (res === "1") {
            this.jumpnextpage();
            //失败继续调用随机数 超过3次失败报错
        }
        //  else if (res === "0") {

        //     this.setState({
        //         getTimes: this.state.getTimes + 1
        //     });

        //    console.log(this.state.getTimes);
        //     if (this.state.getTimes >= 3) {
        //         let alertDict = {
        //             title: "提示",
        //             msg: "交易失败",
        //             success_text: "确认",
        //             success: () => {
        //               $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {})

        //             }
        //         };
        //         Common.showAppDialogAlert(alertDict);
        //         this.setState({
        //             getTimes: "0"
        //         });
        //         return;
        //     }
        //     this.getRandom();
        // }
    }
    //获取获取卡号

    //获取获取卡号

    //纯数字键盘
    showKeyBoard = newId =>{
        this.cancelKbGb(newId);
        this.setState({
            accountInputVal:"",
            figureSizeNum: ""
          })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength: "19",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: (res) => {
                let jsons = JSON.parse(res);
                // if(res.length<15){
                //     let alertDict = {
                //         title: "错误提示",
                //         msg: "请输入正确的卡号",
                //         success_text: "确认"
                //     };
                //     Common.showAppDialogAlert(alertDict);
                // }else 
                if(jsons.length>19){
                    let alertDict = {
                        title: "错误提示",
                        msg: "请输入正确的卡号",
                        success_text: "确认"
                    };
                    Common.showAppDialogAlert(alertDict);
                }else{
                    this.setState({
                        accountInputVal:jsons.text,
                        figureSizeNum: jsons.pswLength
                    })
                }                    
                showKeyBoard();            
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

    // setAccountinputval(val) {
    //     let that = this;
    //     that.setState({
    //         accountInputVal: val
    //     })
    // }
    //获取交易密码
    setPasswordinputval(val){
        let that = this;
        that.setState({
            passwordInputVal: val
        })
    }
     //获取登陆密码
    setLoginPassword(val){
        let that = this;
        that.setState({
            loginPassword: val
        })
    }
    //再次输入登陆密码
    setLoginPassword2(val){
      let that = this;
      that.setState({
        loginPassword2:val
      })
    }
    //返回
    goBackPage() {
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
        Common.setUrl('passwordreset/index.html');
    }

    //点击提交事件
    jumpnextpage(){
       
        //客户名称
        let custerName = this.state.custerName;
        //证件类型
        let certType = this.state.certType;
        //证件号码
        let certNo = this.state.certNo;
        //手机号码
        let mobileNo = this.state.mobileNo;
        //账户号码
        let account = this.state.accountInputVal
        //交易密码
        let password = this.state.passwordInputValm;
        //登陆密码
        let loginpassword = this.state.loginPasswordm;
        //确认登陆密码
        let loginpassword2 = this.state.loginPasswordm2;
       
        // 密码、短信验证码
        if (Common.PasswordSmsNumber(password)) {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的交易密码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
            return;
        }

        //两次登陆密码输入判断
        if(loginpassword !== loginpassword2){
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "两次输入登录密码不同，请重新输入",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
            return;
        }else{
           
            let params = {
                //客户名称
                custerName:custerName,
                //证件名称
                certType:certType,
                //证件号码
                certNo:certNo,
                //手机号码
                mobileNo:mobileNo,
                //账户号
                accountNo: account,
                //交易密码
                cipher: password,
                //登陆密码
                loginCipher: loginpassword
            };
            

            // 注册用户信息提交
            $Fetch(API.API_FORGOTPASSWORD_DATA, {
                
                //默认固定上送报文
                reqHead:{
                    //场景编码
                    sceneCode:"PW01",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode:"2",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType:"1",
                    //交易标识 1-主，2-副
                    flag:"1",
                    //服务接口版本号 1.0.0
                    serviceVersion:"1.0.0"
                },
                // 交易上送报文
                data: params
            }).then((res) => {
              //清空短信验证码session 切记！！！！
              Common.removeSessionData(API.SESSION_SMS_DATA);
              //页面返回状态判断
              if(Common.returnResult(res.rspHead.returnCode)) {
                $(this.refs.myInput).hide();
                // 显示结果页面-成功
                  $(this.refs.myResult).show();

                  //秘钥失效调用随机数
                }else if(res.rspHead.returnCode === API.MESSAGE_KEY_INVALID){
                  this.getRandom()

                }else if(res.rspHead.returnCode === API.ENCIPHER_ERROR){
                  let me = this;
                  let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                  }
                  Common.showAppDialogAlert(alertDict);
                  me.setState({
                    //交易密码
                    passwordInputVal: "",
                    //登陆密码
                    loginPassword: "",
                    //重新输入登陆密码
                    loginPassword2: ""
                  })

                }else {
                  let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                  }
                  Common.showAppDialogAlert(alertDict);
                }
              })
            }
          }
 //提交事件调用客户端登陆方法
    jumpLoginPage(){
         $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {})
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
    showKeyBoard1 = newId => {
        this.cancelKbGb(newId);
        this.setState({
          passwordInputVal:""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            hint:"请输入交易密码",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: (res) => {
              let jsons = JSON.parse(res)
                this.setState({
                    passwordInputValm: jsons.pswText,
                    loginPasswordmlength:jsons.pswLength
                })

                let a = "";
                for(var i = 0;i<this.state.loginPasswordmlength;i++){
                  a = a +"2"
                }
                this.setState({
                  passwordInputVal:a
                });
                showKeyBoard1();
            }
        });
        $("#" + newId).show();
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
    showKeyBoard2 = newId => {
        this.setState({
          loginPassword:"",
          loginPasswordmlength:""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "pwd",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: (res) => {
              let jsons = JSON.parse(res)
                this.setState({
                    loginPasswordm: jsons.pswText,
                    loginPasswordmlength:jsons.pswLength,
                    loginPassword: jsons.text
                })

                // let a = "";
                // for(var i = 0;i<this.state.loginPasswordmlength;i++){
                //   a = a +"2"
                // }
                // this.setState({
                //   loginPassword:a
                // })
                showKeyBoard2();
              }
        });
        $("#" + newId).show();
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
    showKeyBoard3 = newId => {
        this.setState({
          loginPassword2:"",
          comfirmPasswordmlength:"",
          loginPassword2:""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "pwd",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: (res) => {
              let jsons = JSON.parse(res)
                this.setState({
                    loginPasswordm2: jsons.pswText,
                    comfirmPasswordmlength:jsons.pswLength,
                    loginPassword2:jsons.text
                })

                // let a = "";
                // for(var i = 0;i<this.state.comfirmPasswordmlength;i++){
                //   a = a +"2"
                // }
                // this.setState({
                //   loginPassword2:a
                // })
                showKeyBoard3();
            }
        });
        $("#" + newId).show();
    }


    /**** 接口字段说明

    注：无特殊说明字段均为 String 类型
        certType 证件类型
        certNo   证件号码
        custerName  客户名称
        mobileNo    手机号
        accountNo    签约账号
        oginCipher   登录密码
        cipher       卡密码
        */
        //////调用OCR事件


        //   getBankID (出参：卡号bank_NUM， 卡名bank_NAME，)
        ocrClick(){
            let that = this;
            $native.callClientForBank(API.NATIVE_CODE_BANK_OCR,{
                success: (res)=>{
                    let certNo = JSON.parse(res);
                    that.setState({
                        accountInputVal:certNo.bank_NUM,
                        Prompt:"1",
                    })
                }
            })
        }

        

    render() {
        return (
            <div>
                <div ref="myInput">
                    <div className="register-box">
                        <Input.Group header="账户信息">

                        {/* <Input placeholder="请输入收款卡号" value={this.state.cardInputVal2} labelNumber={5} type="number"
                        rightExtra="true" ExtraIconSuffix="ocr" onChange={this.setCardinputval2.bind(this)}
                    >收款账户</Input> */}

                            <Input placeholder="请输入下挂手机银行账号" maxLength={19} type="num"  editable={false} value={this.state.accountInputVal} labelNumber={6} rightExtra="true" ExtraIconSuffix="ocr"
                                onClick={this.showKeyBoard.bind(this,"keyboardNumber")} onExtraClick={this.ocrClick.bind(this)} id="keyboardNumber" cursorSize={this.state.figureSizeNum}>下挂账户</Input>
                                {/* ocr提示信息 */}
                        <Prompt title="请核对账户信息" money={this.state.Prompt}></Prompt>
                            <Input onClick={this.showKeyBoard1.bind(this,"keyboardPassword3")} type="password" placeholder="请输入签约账号交易密码" maxLength={6} editable={false} inputType="name" value={this.state.passwordInputVal} labelNumber={6} 
                                onChange={this.setPasswordinputval.bind(this)} id="keyboardPassword3">交易密码</Input>
                        </Input.Group>
                        <Input.Group header="登录密码设置">
                            <Input onClick={this.showKeyBoard2.bind(this,"keyboardPassword1")} placeholder="请输入登录密码" type="password" editable={false} inputType="name" value={this.state.loginPassword} labelNumber={6}
                                onChange={this.setLoginPassword.bind(this)} id="keyboardPassword1" cursorSize={this.state.loginPasswordmlength}>登录密码</Input>
                            <Input onClick={this.showKeyBoard3.bind(this,"keyboardPassword2")} placeholder="请输入登录密码" type="password" editable={false} inputType="name" value={this.state.loginPassword2} labelNumber={6}
                                onChange={this.setLoginPassword2.bind(this)}id="keyboardPassword2" cursorSize={this.state.comfirmPasswordmlength}>确认登录密码</Input>
                        </Input.Group>
                        <WhiteSpace size="lg" />
                        <Button type="primary" size="default" disabled={!(this.state.certType && this.state.certNo && this.state.custerName && this.state.mobileNo && this.state.accountInputVal && this.state.passwordInputVal && this.state.loginPassword && this.state.loginPassword2 && this.state.loginPassword2)} onTap={this.jumpnextpage.bind(this)}>下一步</Button>
                        <WhiteSpace size="lg"/>
                    </div>
                </div>
                <div ref="myResult" style={{ display: "none" }}>
                    <MbankPublicResult type="success" title="修改成功" />
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={this.jumpLoginPage.bind(this)}>返回登录</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
