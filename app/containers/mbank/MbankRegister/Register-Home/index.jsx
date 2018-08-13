import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
//API数据接口
import API from "../../../../constants/api";
//证件类型
import document from "../../../../constants/identificationtype";
//公共方法
import $native from "../../../../native/native";
import ContextDecorator from "../../../../util/decorator/context-decorator";
import Common from "../../../../util/common.jsx";
import $Fetch from "./../../../../fetch/fetch.js";
import $ from "jquery";
//基础组件
import Input from "../../../../components/Base/input-list/index.web.jsx";
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../components/Base/button/index.web.jsx";
import Checkbox from "../../../../components/Base/checkbox/index.web.js";
import Modal from "../../../../components/mbank/mbank-public-select-click/mbank-public-select-modal/index.web.js";
//业务组件
//样式引入
import "../style/index.web.js";

export default class RegisterHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //客户名称
      nameInputVal: "",
      //证件类型
      documentTypeNow: "",
      /*证件类型value*/
      documentTypeNowval: '10100',
      //证件号码
      documentInputVal: "",
      //手机号
      mobileNo: "",
      //短信验证码
      AuthCode: "",
      //获取随机数失败判断执行的次数
      getTimes: "0",
      //勾选协议状态
      checked: false,
      //短信点击状态
      clickState: "1",
      //身份证
      sfzInputVal: "",
      sfz: "",
      sfzSizeNum: "",
      // Password2: jsons.pswText,
      figureSizeNum: "",
      keyKbHide:"",
      smsFigureSizeNum:""
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  componentDidMount() {
    let that = this;
    // 添加背景颜色
    Common.addBgColor();
    // // 初始化离开钩子
    // this.props.router.setRouteLeaveHook(
    //     this.props.route,
    //     Common.removeBgColor.bind(this)
    // )
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "验证注册信息",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goBackPage
      }
    });
    //获取Session的值 if不是空的 赋值给页面
    let registerdata = JSON.parse(
      Common.getSessionData(API.SESSION_REGISTER_DATA)
    );
    if (!Common.judgeEmpty(registerdata)) {
      this.setState({
        nameInputVal: registerdata.nameInputVal,
        documentTypeNowval: registerdata.documentTypeNowval,
        documentInputVal: registerdata.documentInputVal,
        mobileNo: registerdata.mobileNo,
        AuthCode: registerdata.AuthCode
      });
    }
  }
  //调用客户端随机数
  getRandom() {
    $native.callClientForBank(API.NATIVE_CODE_GETRANDOM, {
      success: this.getBackData
    });
    // this.getBackData();
  }
  //取到客户端随机数
  getBackData = res => {
    //如果返回结果为成功继续向前置发送请求
    if (res === "1") {
      this.jumpnextpage();
    }
      //如果为失败则继续调用随机数 调用3次报错返回登录页面
    // } else if (res === "0") {
    //   //获取随机数次数
    //   // this.setState({
    //   //   getTimes: this.state.getTimes + 1
    //   // });
      
    //   // if (this.state.getTimes >= 3) {
    //   //   let alertDict = {
    //   //     title: "提示",
    //   //     msg: "交易失败",
    //   //     success_text: "确认",
    //   //     success: () => {
    //   //       $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
    //   //     }
    //   //   };
    //   //   Common.showAppDialogAlert(alertDict);
    //   //   this.setState({
    //   //     getTimes: "0"
    //   //   });
    //   //   return;
    //   // }
    //   // 调取随机数
    //   this.getRandom();
    // }
  };
  //获取客户姓名
  setNameinputval(val) {
    let that = this;
    that.setState({
      nameInputVal: val
    });
  }

  setNameOnclickinputval(){
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
  }

  //获取证件类型value
  documentTypeNowCalues(val, label) {
    let that = this;
   
    that.setState({
      documentTypeNowval: label,
      documentTypeNow: val
    });
    
  }
  //获取证件号
  setDocumentinputval(val) {
    let that = this;
    that.setState({
      documentInputVal: val
    });
  }
  //xxxx
  testNum() {
    alert("a");
  }

  //获取短信验证码
  setAuthinputval(val) {
    let that = this;
    that.setState({
      AuthCode: val
    });
  }
  //短信验证码点击事件
  setClickState(vals) {
    this.setState({
      clickState: vals
    });
  }
  //勾选协议状态
  changeHandle = checked => {
    
    this.setState({ checked });
  };
  // 返回页面设置
  goBackPage() {
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
  }
  //点击提交
  jumpnextpage() {
    //客户名称
    let name = this.state.nameInputVal;
    //证件类型
    let documenttype = this.state.documentTypeNowval;
    console.log(documenttype)
    //证件号码
    let documentnum = this.state.documentInputVal;
    //手机号
    let phone = this.state.mobileNo;
    //短信验证码
    let authcode = this.state.AuthCode;
    // 短信验证码必须发送
    if (this.state.clickState == "1") {
      let alertDict = {
        title: "提示信息",
        msg: "请获取短信验证码",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    //身份证校验
    if (documenttype == "10100" || documenttype == "10300") {
      if (!(documentnum.length + 1 > 15) && documentnum.length + 1 < 18) {
        let alertDict = {
          title: "提示信息",
          msg: "请输入正确的身份证号码",
          success_text: "确认"
        };
        Common.showAppDialogAlert(alertDict);
        return;
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

    //手机号码校验
    if (Common.phoneNumber(phone)) {
      var alertDict = {
        title: "错误提示",
        msg: "请输入正确的手机号码",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
      //验证短信位数
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
        certType: documenttype.toString(),
        //证件号码
        certNo: documentnum,
        //手机号码
        mobileNo: phone,
        // 短信验证码
        smsCode: authcode
      };
      
      Common.addSessionData(
        API.SESSION_VERIFICATION_PHONEAA,
        JSON.stringify(params)
      );

      // 提交注册信息验证
      $Fetch(API.API_REGISTER_INFORMATION_DATA, {
        //默认固定上送报文
        reqHead: {
          //场景编码
          sceneCode: "RE01",
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
        data: params
      }).then(res => {
        if (Common.returnResult(res.rspHead.returnCode)) {
          //清空短信验证码session 切记！！！！
          Common.removeSessionData(API.SESSION_SMS_DATA);
          //清空页面信息的值
          Common.removeSessionData(API.SESSION_REGISTER_DATA);
          //保存注册信息

          //跳转到设置密码
          Common.setUrl("register-userdata/index.html");
          //如果秘钥超时调用客户端随机数
        } else if (res.rspHead.returnCode === "BPML0066") {
          //保存注册信息

          //清空页面信息的值
          Common.removeSessionData(API.SESSION_REGISTER_DATA);
          let alertDict = {
            title: "提示信息",
            msg:
              "尊敬的客户，您已开通我行网银业务，是否使用网银账户和密码进行登录。",
            success_text: "否",
            cancel_text: "是",
            success: () => {
              Common.setUrl("register-userdata/index.html");
            },
            cancel: () => {
              $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
            }
          };
          Common.showAppDialogAlert(alertDict);
        } else if (res.rspHead.returnCode === API.MESSAGE_KEY_INVALID) {
          this.getRandom();
        } else {
          let alertDict = {
            title: "错误提示",
            msg: res.rspHead.returnMsg,
            success_text: "确认",
            cancel_text: "取消"
          };
          Common.showAppDialogAlert(alertDict);
        }
      });
    }
  }

  //跳转至协议
  bankprotocol() {
    let that = this;
    let data = {
      nameInputVal: that.state.nameInputVal,
      documentInputVal: that.state.documentInputVal,
      documentTypeNowval: that.state.documentTypeNowval,
      mobileNo: that.state.mobileNo,
      AuthCode: that.state.AuthCode
    };
    //把页面的所有录入信息保存到Sessio
    Common.addSessionData(API.SESSION_REGISTER_DATA, JSON.stringify(data));
    Common.setUrl("register-text/index.html");
  }
  bankprotocol1() {
    let that = this;
    let data = {
      nameInputVal: that.state.nameInputVal,
      documentInputVal: that.state.documentInputVal,
      documentTypeNowval: that.state.documentTypeNowval,
      mobileNo: that.state.mobileNo,
      AuthCode: that.state.AuthCode
    };
    //把页面的所有录入信息保存到Sessio
    Common.addSessionData(API.SESSION_REGISTER_DATA, JSON.stringify(data));
    Common.setUrl("register-text1/index.html");
  }

  /**** 接口字段说明

    注：无特殊说明字段均为 String 类型
        certType:证件类型
        certNo:证件号码
        custerName：客户名称
        phone: 手机号码
        smsCode: 短信验证码
  */

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
      success: res => {
        let certNo = JSON.parse(res);
        that.setState({
          documentInputVal: certNo.ID_NUM,
          nameInputVal: certNo.ID_NAME
        });
      }
    });
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

  test = (url, info) => {
    alert(url);
  };

  ordinarySFZ = newId => {
    this.cancelKbGb(newId);
    this.setState({
      documentInputVal: "",
      sfzSizeNum: ""
    })
    let that = this;
    //展示光标
    $("#" + newId).show();
    $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
      type: "idcard",
      maxLength:"18",
      //关闭键盘回调函数，并传入关闭的光标的Id
      cancel: that.cancelKb.bind(this, newId),
      success: res => {
        let jsons = JSON.parse(res);
        this.setState({
          documentInputVal: jsons.text,
          // Password2: jsons.pswText,
          sfzSizeNum: jsons.pswLength
        });
        ordinarySFZ();
      }
    });
    $("#" + newId).show();
  };

    //纯数字键盘
    ordinaryFigure = newId => {
      this.cancelKbGb(newId);
      this.setState({
        mobileNo:"",
        figureSizeNum : ""
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
            // Password2: jsons.pswText,
            figureSizeNum: jsons.pswLength
          });         
  
          // 注册模板
          let data = {
            templateNo: "sms00000003",
            mobileNo: jsons.text,
            sceneCode: "RE01"
          };
          Common.addSessionData(API.SESSION_SMS_DATA, JSON.stringify(data));
          ordinaryFigure();
        }
      });
      $("#" + newId).show();
    };

    inputitemcheck = newId => {
      this.cancelKbGb(newId);
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

    //获取交易密码
    setPasswordinputval(val) {
      let that = this;
      that.setState({
        passwordInputVal: val
      });
    }

    //获取交易密码
    setPasswordinputval2(val) {
      let that = this;
      that.setState({
        passwordInputVal2: val
      });
    }

    //获取身份证号
    setSfzinputval(val) {
      let that = this;
      that.setState({
        documentInputVal: val
      });
    }
    
    //获取电话号码
    setFigureinputval(val) {
      let that = this;
      that.setState({
        mobileNo: val
      });
    }

  render() {
    return (
      <div className="register-box">
        {/* <div className="register-box-title">验证注册信息</div> */}
        <Input.Group>
          <Input
            placeholder="请输入开户姓名"
            value={this.state.nameInputVal}
            labelNumber={6}
            onChange={this.setNameinputval.bind(this)}
            onClick={this.setNameOnclickinputval.bind(this)}
          >
            姓名
          </Input>
          {/* <Input.Pick
            cols="1"
            cellTitle="证件类型"
            labelNumber={6}
            data={document}
            placeholder="居民身份证"
            title="证件类型"
            onChange={this.documentTypeNowCalues.bind(this)}
            callback={this.testNum}
            value={this.state.documentTypeNowval}
          /> */}
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

          <Input
            id="keyboardSfz"
            type="idcard"
            placeholder="请输入开户证件号"
            maxLength={18}            
            labelNumber={6}
            cursorSize={this.state.sfzSizeNum}
            editable={false}
            onClick={this.ordinarySFZ.bind(this, "keyboardSfz")}
            value={this.state.documentInputVal}
            onChange={this.setSfzinputval.bind(this)}
            rightExtra="true"
            ExtraIconSuffix="ocr"
            onExtraClick={this.ocrClick.bind(this)}
          >
            证件号
          </Input>
          <Input
            id="keyboardNumber"
            type="num"
            placeholder="请输入签约手机号码"
            maxLength={11}            
            labelNumber={6}
            cursorSize={this.state.figureSizeNum}
            editable={false}
            onClick={this.ordinaryFigure.bind(this,"keyboardNumber")}
            value={this.state.mobileNo}
            onChange={this.setFigureinputval.bind(this)}
          >
            手机号码
          </Input>
          <Input.Sms
            // className="authcode"
            id='smsBoard'
            type="num"
            placeholder="请输入验证码"
            onClick={this.inputitemcheck.bind(this,"smsBoard")}
            cursorSize={this.state.smsFigureSizeNum}
            clickState={this.setClickState.bind(this)}
            value={this.state.AuthCode}
            ref="authcode"
            iddatas={"autoinput"}
            labelNumber={6}
            // type={"authcode"}
            editable={false}
            finalval={this.setAuthinputval.bind(this)}
            maxLength={6}
          />
        </Input.Group>
        <WhiteSpace size="lg" />
        <Checkbox.Agree value={this.state.checked} onChange={this.changeHandle}>
          是否同意<a onClick={this.bankprotocol.bind(this)}>
            《电子银行个人客户服务协议》
          </a>
          <a onClick={this.bankprotocol1.bind(this)}>《电子银行业务章程》</a>
        </Checkbox.Agree>
        <WhiteSpace size="lg" />
        <Button
          type="primary"
          size="default"
          disabled={
            !(
              this.state.nameInputVal &&
              this.state.documentTypeNowval &&
              this.state.documentInputVal &&
              this.state.mobileNo &&
              this.state.AuthCode &&
              this.state.checked
            )
          }
          onTap={this.jumpnextpage.bind(this)}
        >
          下一步
        </Button>
      </div>
    );
  }
}
