import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../constants/api';
//证件类型
import document from '../../../../constants/identificationtype';
//公共方法
import $native from '../../../../native/native';
import ContextDecorator from '../../../../util/decorator/context-decorator';
import Common from "../../../../util/common.jsx";
import $Fetch from './../../../../fetch/fetch.js';
import $ from "jquery";
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import Input from '../../../../components/Base/input-list/index.web.jsx';
import Prompt from '../../../../components/Base/ocr-prompt/index.web.jsx';
import Modal from "../../../../components/mbank/mbank-public-select-click/mbank-public-select-modal/index.web.js";
//样式引入
import '../style/index.web.js';


export default class PasswordResetHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //客户名称
            nameInputVal: "",
            //证件类型
            documentTypeNow: [],
            /*证件类型value*/
            documentTypeNowval: '10100',
            //证件号码
            documentInputVal: "",
            //手机号
            mobileNo: "",
            //短信验证码
            AuthCode: "",
            //短信点击状态
            clickState: "1",
            //获取随机数失败判断执行的次数
            getTimes: 0,
            Prompt: "",
            zjhSizeNum: "",
            phoneSizeNum: "",
            keyKbHide:"",
            smsFigureSizeNum:""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount() {
        // 添加背景颜色
        Common.addBgColor()
        // 初始化离开钩子
        //   this.props.router.setRouteLeaveHook(
        //       this.props.route,
        //       Common.removeBgColor.bind(this)
        //   )
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "验证手机信息",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
    }
    //调用客户端随机数
    getRandom() {
        $native.callClientForBank(API.NATIVE_CODE_GETRANDOM, {
            success: this.getBackData
        });
    }
    //获取客户端返回的值
    getBackData = (res) => {
        //如果成功继续发生交易请求
        if (res === "1") {
            this.jumpnextpage();
            //失败继续调用随机数 超过三次报错 返回登录
        }
        //  else if (res === "0") {

        //     this.setState({
        //         getTimes: this.state.getTimes + 1
        //     });

        //     console.log(this.state.getTimes);
        //     if (this.state.getTimes >= 3) {
        //         let alertDict = {
        //             title: "提示",
        //             msg: "交易失败",
        //             success_text: "确认",
        //             success: () => {
        //                 $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {})
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
    //获取客户姓名
    setNameinputval(val) {
        let that = this;
        that.setState({
            nameInputVal: val
        })

    }

    setNameOnclickinputval(){
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    }
    
    //获取证件类型value
    documentTypeNowCalues(val,label) {
        let that = this;
        console.log(label)
        that.setState({
            documentTypeNowval: label,
            // documentTypeNow: val
        })


    }
    //获取证件号
    setDocumentinputval = newId => {
        this.cancelKbGb(newId);
        this.setState({
            documentInputVal:"",
            zjhSizeNum: ""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
          type: "idcard",
          maxLength: "18",
          //关闭键盘回调函数，并传入关闭的光标的Id
          cancel: that.cancelKb.bind(this, newId),
          success: res => {
            let jsons = JSON.parse(res);
            this.setState({
              documentInputVal: jsons.text,
              zjhSizeNum: jsons.pswLength
            });
            setDocumentinputval();
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


    //获取短信验证码
    setAuthinputval(val) {
        let that = this;
        that.setState({
            AuthCode: val
        })

    }

    //短信验证码点击事件
    setClickState(vals) {
        this.setState({
            clickState: vals
        })
    }
    // 返回页面设置
    goBackPage() {
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
        $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
    }

    //获取手机号
    showKeyBoard = newId => {
        this.cancelKbGb(newId);
        this.setState({
            mobileNo: "",
            phoneSizeNum: ""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();

        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength: "11",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: res => {
                let jsons = JSON.parse(res);
                this.setState({
                    mobileNo: jsons.text,
                    phoneSizeNum: jsons.pswLength
                });         
      
                // 注册模板
                let data = {
                    templateNo: "sms00000003",
                    mobileNo: jsons.text,
                    sceneCode: "PW01"
                };
                Common.addSessionData(API.SESSION_SMS_DATA, JSON.stringify(data));
                showKeyBoard();
            }
          });
          $("#" + newId).show();





        // $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
        //     type: "num",
        //     cancel: "cancel",
        //     success: (res) => {
        //         if (res.length > 11) {
        //             let alertDict = {
        //                 title: "提示信息",
        //                 msg: "请输入正确的手机号码",
        //                 success_text: "确认"
        //             }
        //             Common.showAppDialogAlert(alertDict);
        //         } else {
        //             this.setState({
        //                 mobileNo: res
        //             })
        //         }

        //         // 注册模板
        //         let data = {
        //             templateNo: "sms00000003",
        //             mobileNo: res,
        //             sceneCode: "PW01"
        //         };
        //         Common.addSessionData(API.SESSION_SMS_DATA, JSON.stringify(data));
        //     }
        // })

    }

    //点击提交
    jumpnextpage() {
        //客户名称
        let name = this.state.nameInputVal;
        //证件类型
        let documenttype = this.state.documentTypeNowval;
        //证件号码
        let documentnum = this.state.documentInputVal;
        //手机号
        let phone = this.state.mobileNo;
        //短信验证码
        let authcode = this.state.AuthCode;
        //身份证校验
        if (documenttype == "10100" || documenttype == "10300") {
            if (documenttype == "10100" || documenttype == "10300") {
                if (!(documentnum.length + 1 > 15) && (documentnum.length + 1 < 18)) {
                    let alertDict = {
                        title: "提示信息",
                        msg: "请输入正确的身份证号码",
                        success_text: "确认"
                    }
                    Common.showAppDialogAlert(alertDict);
                    return
                }
                // if (!Common.validateIDCard(documentnum)) {
                //     let alertDict = {
                //         title: "提示信息",
                //         msg: "请输入正确的身份证号码",
                //         success_text: "确认"
                //     }
                //     Common.showAppDialogAlert(alertDict);
                //     return
                // }
            }
        }


        // 短信验证码必须发送
        if (this.state.clickState == "1") {
            let alertDict = {
                title: "提示信息",
                msg: "请获取短信验证码",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return
        }

        //验证手机号位数
        if (Common.phoneNumber(phone)) {
            let alertDict = {
                title: "错误提示",
                msg: "请输入正确的手机号码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
            return;
        } else if (Common.PasswordSmsNumber(authcode)) {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的验证码",
                success_text: "确认"

            };
            Common.showAppDialogAlert(alertDict);
            return;
        } else {
            // if (window.authcodetimer) {
            //     window.clearTimeout(authcodetimer);
            // }
            let params = {
                //客户名称
                custerName: name,
                //证件类型
                certType: documenttype,
                //证件号码
                certNo: documentnum,
                //手机号码
                mobileNo: phone,
                // 短信验证码
                smsCode: authcode
            }
            console.log(params)

            // 提交注册手机号信息验证
            $Fetch(API.API_RESETPASSWORDSUBMISSION_DATA, {
                //默认固定上送报文
                reqHead: {
                    //场景编码
                    sceneCode: "PW01",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode: "1",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType: "1",
                    //交易标识 1-主，2-副
                    flag: "2",
                    //服务接口版本号 1.0.0
                    serviceVersion: "1.0.0",
                    //渠道日期
                    channelDate: "20171121"
                },
                // 交易上送报文
                data: params


            }).then((res) => {
                
                if (Common.returnResult(res.rspHead.returnCode)) {
                    //清空短信验证码session 切记！！！！
                    Common.removeSessionData(API.SESSION_SMS_DATA);
                    //保存注册信息
                    Common.addSessionData(API.SESSION_VERIFICATION_PHONEA, JSON.stringify(params));

                    //跳转到重置密码页面
                    Common.setUrl("password-userdata/index.html");
                    //秘钥失效调用随机数
                } else if (res.rspHead.returnCode === API.MESSAGE_KEY_INVALID) {
                    this.getRandom()

                } else {
                    if(res.rspHead.returnCode==='BPML0053'){    //证件号码输入错误提示、行方要求
                        let alertDict = {
                            title: "错误提示",
                            msg: '客户证件信息不存在，请重新输入',
                            success_text: "确认"
                        }
                        Common.showAppDialogAlert(alertDict);
                    }else{
                        let alertDict = {
                            title: "错误提示",
                            msg: res.rspHead.returnMsg,
                            success_text: "确认"
                        }
                        Common.showAppDialogAlert(alertDict);
                    }

                }
            })
        }
    }

    /**** 接口字段说明

    注：无特殊说明字段均为 String 类型
        certType:证件类型
        certNo:证件号码
        custerName：客户名称
        phone: 手机号码
        smsCode: 短信验证码
  */





    //   getBankID (出参：卡号bank_NUM， 卡名bank_NAME，)  
    //   getCardID获取身份证信息（出参：身份证号ID_NUM，
    //   姓名ID_NAME，
    //   性别ID_SEX，
    //   民族ID_FOLK，
    //   出生日期ID_BIRT，
    //   地址ID_ADDRESS）
    //////调用OCR事件
    ocrClick() {
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_CARDID_OCR, {
            success: (res) => {
                let certNo = JSON.parse(res);
                that.setState({
                    documentInputVal: certNo.ID_NUM,
                    nameInputVal: certNo.ID_NAME,
                    Prompt: "1",
                })

            }
        })
    }
      //列表点击选择modal框
  showListClickBox() {
    let that = this;
    // this.setState({
    //   pickerVisible: true
    // });
    // let typeList = document.map(function(item, i) {
    //   item.cusName = that.state.customerName;
    //   return JSON.stringify(item);
    // });
    Modal.selectListClick(
      {
        items: document,
        close: Common.closeModal,
        closeText: "关闭"
      },
      function(key) {
        let accountListNew2 = document.map(function(item, i) {
          item.now = "0";
          if (i === key) {
            item.now = "1";
            // that.setState({
            //     documentTypeNow: [],
            //     /*证件类型value*/
            //     documentTypeNowval: [10100],
            // })
            
          }
          return item;
        });

        // that.setState({
        //     ListOut: accountListNew2
        // })
        Common.closeModal();
      }
    );
  }
    // //通讯录选择信息phoneName: JSON.parse(res).phoneName,
    // pickContacts = () => {
    //     let that = this;
    //     $native.callClientForComm(API.NATIVE_CODE_GET_ADDRESSBOOK, {
    //         success: (res) => {
    //             let phoneNumber = Common.setPhoneNum(JSON.parse(res).phoneNumber);
    //             that.setState({
    //                 phoneInputVal2: phoneNumber,
    //             })
    //         }
    //     });
    // };
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

    render() {
        return (
            <div className="register-box">
                <Input.Group>
                    <Input placeholder="请输入开户姓名" value={this.state.nameInputVal} labelNumber={6}
                        onChange={this.setNameinputval.bind(this)} onClick={this.setNameOnclickinputval.bind(this)}>姓名</Input>
                    {/* <Input.Pick cols="1" cellTitle="证件类型" labelNumber={6} data={document}
                        placeholder="居民身份证" title="证件类型"
                        onChange={this.documentTypeNowCalues.bind(this)} value={this.state.documentTypeNowval} /> */}
                    <Input.Click
                        cols="1"
                        cellTitle="证件类型"
                        labelNumber={6}
                        placeholder="居民身份证"
                        title="证件类型"
                        items={document}
                        onChange={this.documentTypeNowCalues.bind(this)}
                        value={this.state.documentTypeNowval}
                        data={document}
                    />
                    <Input placeholder="请输入开户证件号" type="idcard" maxLength={23} value={this.state.documentInputVal} labelNumber={6} id="keyboardSfz" editable={false} cursorSize={this.state.zjhSizeNum}
                        onClick={this.setDocumentinputval.bind(this,"keyboardSfz")} rightExtra="true" ExtraIconSuffix="ocr" onExtraClick={this.ocrClick.bind(this)}>证件号</Input>
                    {/* ocr提示信息 */}
                    <Prompt title="请核对证件信息" money={this.state.Prompt}></Prompt>
                    <Input onClick={this.showKeyBoard.bind(this,"keyboardNumber")} editable={false} placeholder="请输入签约手机号码" maxLength={11} value={this.state.mobileNo} labelNumber={6}
                        id="keyboardNumber" type="num" cursorSize={this.state.phoneSizeNum} 
                    >手机号码</Input>

                    <Input.Sms clickState={this.setClickState.bind(this)} iddatas={"autoinput"} labelNumber={5} inputtype={"authcode"}
                        finalval={this.setAuthinputval.bind(this)} editable={false}  id='smsBoard' type="num"
                        placeholder="请输入验证码" onClick={this.inputitemcheck.bind(this,"smsBoard")}
                        cursorSize={this.state.smsFigureSizeNum} value={this.state.AuthCode}
                        maxlen={"6"} />

                </Input.Group>
                <WhiteSpace size="lg" />
                <Button type="primary" size="default" disabled={!(this.state.nameInputVal && this.state.documentTypeNowval && this.state.documentInputVal && this.state.mobileNo && this.state.AuthCode)} onTap={this.jumpnextpage.bind(this)}>下一步</Button>
            </div>
        )
    }
}
