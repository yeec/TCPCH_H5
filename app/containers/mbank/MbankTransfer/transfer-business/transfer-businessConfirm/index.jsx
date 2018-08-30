import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
// import {hashHistory} from 'react-router'
//API数据接口
import API from "../../../../../constants/api";
//公共方法
import Common from "../../../../../util/common.jsx";
import $native from "../../../../../native/native";
import $Fetch from "../../../../../fetch/fetch.js";
import $ from "jquery";
//基础组件
import WhiteSpace from "../../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../../components/Base/button/index.web.jsx";
import Input from "../../../../../components/Base/input-list/index.web.jsx";
import Modal from "../../../../../components/Base/modal/index.web.js";
//业务组件
import MbankPublicResult from "../../../../../components/mbank/mbank-public-result/index.web.jsx";
import MbankTransferConfirm from "../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx";
import "./style/index.web";
export default class MbankTransferBusinessConfirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      List: [],
      ListPay: [],
      ConfirmTypesNow: "",
      ConfirmTypes: [],
      transferTypeNow: [],
      AuthCode: "",
      PhoneNum: "",
      cipher: "",
      passwordInputVal: "",
      returnCode: "",
      clickState: "1",
      businessRunningNo: "",
      sourceOrgSignature1: "",
      sourceString1: "",
      sourceOrgSignature: "",
      returnMsg: "",
      //收款人添加成功 进入转账标识
      useAdd: "",
      account: "",
      smsFigureSizeNum: "",
      ukeyFigureSizeNum: "",
      ukeyCode: "",
      keyKbHide: "",
      dxYz: true,
      uKeyYz: false,
      yzCode: ""
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }

  //模态框关闭
  goback = () => {
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    Common.setUrl("transfer-businessInput/index.html");
  };

  componentDidMount() {
    let that = this;
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "确认信息",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goback
      }
    });

    let listdata = JSON.parse(
      Common.getSessionData(API.SESSION_TRANSFER_CONFIRMDATA)
    );
    that.setState({
      List: listdata,
      ListPay: listdata.currentAccount,
      transferTypeNow: listdata.transfertypenow,
      useAdd: listdata.ueradd
    });
    // 发短信模板
    let data = {
      templateNo: "sms00000002",
      draweeAccNo: listdata.currentAccount.acNo, //：付款人名称
      tranAmt: listdata.money, //：交易金额
      sceneCode: "TF02"
    };
    Common.addSessionData(
      API.SESSION_SMS_DATA_AFTER_LOGIN,
      JSON.stringify(data)
    );
    // that.getKeyTools();
  }
  getKeyTools() {
    $Fetch(API.API_SAVE_PAYEE_QUERYSAFETOOL, {
      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF02",
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
        //上送验证金额
        // transAmt: this.state.List.money
        transAmt: "300"
      }
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        // 2002 短信认证
        let resultMap = res.rspBody.resultMap;
        if (resultMap == "2002") {
          this.setState({
            //返回验证方式
            dxYz: true,
            yzCode: resultMap
            // clickState:"1"
          });
        } // 2003 指纹
        else if (resultMap == "2003") {
          this.setState({
            //返回验证方式
            uKeyYz: true,
            yzCode: resultMap
          });
        }
      }
    });
  }
  //短信验证码输入获取
  setAuthinputval(vals) {
    this.setState({
      AuthCode: vals
    });
  }

  //密码输入框
  setPassWordinputval(vals) {
    this.setState({
      passwordInputVal: vals
    });
  }

  //短信验证码点击事件
  setClickState(vals) {
    this.setState({
      clickState: vals
    });
  }

  //**************************check input**************************
  checkInput() {
    let confirmTypes = this.state.List.confirmType;
    let authcode = this.state.AuthCode;
    let yzCode = this.state.yzCode;
    let ukeyCode = this.state.ukeyCode;
    //let randomid = Common.getSessionData(API.SESSION_AUTH_CODE_RANDOM);
    // 短信验证码必须发送
    if (this.state.clickState == "1" && yzCode === "2002") {
      let alertDict = {
        title: "提示信息",
        msg: "请获取短信验证码",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (authcode === "" && yzCode === "2002") {
      // 调取弹出框提示信息
      let alertDict = {
        title: "错误提示",
        msg: "短信验证码不能为空",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (authcode.length < 6 && yzCode === "2002") {
      // 调取弹出框提示信息
      let alertDict = {
        title: "错误提示",
        msg: "请输入正确格式短信验证码",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }
    if (ukeyCode === "" && yzCode === "2003") {
      // 调取弹出框提示信息
      let alertDict = {
        title: "错误提示",
        msg: "动态令牌验证码不能为空",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (authcode.ukeyCode < 6 && yzCode === "2003") {
      // 调取弹出框提示信息
      let alertDict = {
        title: "错误提示",
        msg: "请输入正确格式动态令牌验证码",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    this.checkSameTransfer();
  }

  // ****************22222**************查询转账是否重复**************************
  checkSameTransfer() {
    // 保存收款人接口
    $Fetch(API.API_GET_CHECK_SAME_TRANSFER, {
      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF02",
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
        payAccNo: this.state.ListPay.acNo, //  付款人卡号,
        //	付款账号
        subPayAccount: this.state.List.accountNum, //  收款人卡号,
        //	收款账号
        payAmount: this.state.List.money, //  交易金额//	付款金额
        accountName1: this.state.List.customerName,
        accountName2: this.state.List.name
      }
    }).then(res => {
      let transferTime = "";
      let transferTimeValue = "";
      if (Common.returnResult(res.rspHead.returnCode)) {
        if (res.rspBody.status == "00" || res.rspBody.status == "") {
          if (res.rspBody.totalNum != 0) {
            transferTime = res.rspBody.returnList[0].transEndTime;
            transferTimeValue =
              transferTime.substring(8, 10) +
              ":" +
              transferTime.substring(10, 12) +
              ":" +
              transferTime.substring(12, 14);

            let alertDict1 = {
              title: "信息提示",
              msg:
                "您今天" +
                transferTimeValue +
                "已向该客户发送一笔金额相同的转账，为避免重复转账，请您确认是否继续本次转账！",
              cancel_text: "取消",
              cancel: () => {
                this.goFirstPage();
              },
              success_text: "确认",
              success: this.showKeyBoard1.bind(this)
            };
            Common.showAppDialogAlert(alertDict1);
          } else {
            // this.genSignature()
            //验证交易密码
            this.showKeyBoard1();
          }
        } else if (
          res.rspBody.status == "02" ||
          res.rspBody.status == "20" ||
          res.rspBody.status == "22"
        ) {
          //清空转账确认信息
          Common.removeSessionData(API.SESSION_TRANSFER_CONFIRMDATA);
          let alertDict2 = {
            title: "信息提示",
            msg: "付款/收款 账户可疑,是否继续进行交易?",
            cancel_text: "取消",
            cancel: () => {
              this.goFirstPage();
            },
            success_text: "确认",
            success: () => {
              // this.genSignature()
              //验证交易密码
              this.showKeyBoard1();
            }
          };
          Common.showAppDialogAlert(alertDict2);
        } else if (
          res.rspBody.status == "01" ||
          res.rspBody.status == "10" ||
          res.rspBody.status == "11" ||
          res.rspBody.status == "12" ||
          res.rspBody.status == "21"
        ) {
          //清空转账确认信息
          Common.removeSessionData(API.SESSION_TRANSFER_CONFIRMDATA);
          let alertDict = {
            title: "信息提示",
            msg: "付款/收款 账户在涉案名单禁止交易",
            success_text: "确认",
            success: () => {
              this.goFirstPage();
            }
          };
          Common.showAppDialogAlert(alertDict);
        }
      } else {
        //验证交易密码
        this.showKeyBoard1();
      }
    });
  }
  // 调用客户端键盘接口
  //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
  showKeyBoard1() {
    this.setState({
      passwordInputVal: ""
    });
    let that = this;
    $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
      hint: "请输入交易密码",
      type: "tradePsw",
      cancel: "cancel",
      success: res => {
        let jsons = JSON.parse(res);
        let a = "";
        for (var i = 0; i < jsons.pswLength; i++) {
          a = a + "2";
        }
        this.setState({
          cipher: jsons.pswText,
          passwordInputVal: a
        });

        this.genSignature(); //转账接口
      }
    });
  }

  //*******************机构签名*******************transfer/genSignature

  genSignature() {
    let payAccNo = this.state.ListPay.acNo; //  付款人卡号
    let payAccName = this.state.List.customerName; //  付款人名称
    let transAmt = this.state.List.money; //  交易金额
    let isPosthaste = this.state.transferTypeNow.valueDate; //  是否加急 1-实时
    let resiveAccNo = this.state.List.accountNum; //  收款人卡号
    let resiveAccName = this.state.List.name; //  收款人户名
    let resiveBankName = this.state.List.transferBank; //	收款人银行行名
    let resiveBankNo = this.state.List.transferBranches; //	收款人银行联行号
    let safeTool = this.state.List.approveWay; //  安全工具
    let cloudsCode = ""; //  云证通签名
    let remitterTel = ""; //this.state.List.phone,//  付款人联系电话
    let smsCode = this.state.AuthCode; //  短信验证码
    let postscript = this.state.List.tip; //  客户附言
    let passwd = this.state.cipher; //  交易密码,
    let checkBusiness = ""; //	"云证通参与签名字段"	String			O	"安全工具为1003时必输。中间已|分隔"	例如：payAccNo|payAccName|transAmt
    let businessRunningNo = ""; //	机构交易流水号	String			O	安全工具为1003时必输
    let resiveMoblie = this.state.List.phone; //收款人手机号
    let signContent =
      "payAccNo=" +
      payAccNo +
      "&payAccName=" +
      payAccName +
      "&transAmt=" +
      transAmt +
      "&isPosthaste=" +
      isPosthaste +
      "&resiveAccNo=" +
      resiveAccNo +
      "&resiveAccName=" +
      resiveAccName +
      "&resiveBankName=" +
      resiveBankName +
      "&resiveBankNo=" +
      resiveBankNo +
      "&safeTool=" +
      safeTool +
      "&postscript=" +
      postscript +
      "&resiveMoblie=" +
      resiveMoblie;
    //机构签名
    this.showResultPage();
  }

  //************333333********** 转账确认提交*****************
  showResultPage() {
    let confirmTypes = this.state.List.confirmType;
    let authcode = this.state.AuthCode;
    let password = this.state.cipher; //passwordInputVal;
    let passwordInputVal = this.state.passwordInputVal; //passwordInputVal;
    let approveWay = this.state.List.approveWay;

    let payAccNo = this.state.ListPay.acNo; //  付款人卡号
    let payAccName = this.state.List.customerName; //  付款人名称
    let transAmt = this.state.List.money; //  交易金额
    let isPosthaste = this.state.transferTypeNow.valueDate; //  是否加急 1-实时

    let resiveAccNo = this.state.List.accountNum; //  收款人卡号
    let resiveAccName = this.state.List.name; //  收款人户名
    let resiveBankName = this.state.List.transferBank; //	收款人银行行名
    let resiveBankNo = this.state.List.transferBranches; //	收款人银行联行号
    let safeTool = this.state.List.approveWay; //  安全工具
    let cloudsCode = ""; //  云证通签名
    let remitterTel = ""; //this.state.List.phone,//  付款人联系电话
    let smsCode = this.state.AuthCode; //  短信验证码
    let postscript = this.state.List.tip; //  客户附言
    let passwd = this.state.cipher; //  交易密码,
    let checkBusiness = ""; //	"云证通参与签名字段"	String			O	"安全工具为1003时必输。中间已|分隔"	例如：payAccNo|payAccName|transAmt
    let businessRunningNo = ""; //	机构交易流水号	String			O	安全工具为1003时必输
    let resiveMoblie = this.state.List.phone; //收款人手机号

    if (safeTool == "1003") {
      checkBusiness =
        "payAccNo|payAccName|transAmt|isPosthaste|resiveAccNo|resiveAccName|resiveBankName|resiveBankNo|safeTool|postscript|resiveMoblie";
      businessRunningNo = this.state.businessRunningNo;
    }

    let params = {
      payAccNo: this.state.ListPay.acNo, //  付款人卡号
      payAccName: this.state.List.customerName, //  付款人名称
      transAmt: this.state.List.money, //  交易金额
      isPosthaste: this.state.transferTypeNow.valueDate, //  是否加急 1-实时
      resiveAccNo: this.state.List.accountNum, //  收款人卡号
      resiveAccName: this.state.List.name, //  收款人户名
      resiveBankName: this.state.List.transferBank, //	收款人银行行名
      resiveBankNo: this.state.List.transferBranches, //	收款人银行联行号
      safeTool: this.state.List.approveWay, //  安全工具
      cloudsCode: cloudsCode, //  云证通签名
      remitterTel: "", //this.state.List.phone,//  付款人联系电话
      smsCode: authcode, //  短信验证码
      postscript: this.state.List.tip, //  客户附言
      cipher: password, //  交易密码,
      checkBusiness: checkBusiness, //	"云证通参与签名字段"	String			O	"安全工具为1003时必输。中间已|分隔"	例如：payAccNo|payAccName|transAmt
      businessRunningNo: businessRunningNo, //	机构交易流水号	String			O	安全工具为1003时必输
      resiveMoblie: this.state.List.phone //收款人手机号
    };
    // console.log(params);
    //****************************获取转账结果****************************
    $Fetch(API.API_GET_TRANSFER_RESULT, {
      //
      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF02",
        //步骤编码(根据相应步骤填写字段（1,2,3,4）)
        stepCode: "1",
        //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
        tradeType: "1",
        //交易标识 1-主，2-副
        flag: "1",
        //服务接口版本号 1.0.0
        serviceVersion: "1.0.0"
      },
      data: params
    }).then(res => {
      //清空短信验证码 session 切记！！！！
      Common.removeSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN);
      //清空转账确认信息
      Common.removeSessionData(API.SESSION_TRANSFER_CONFIRMDATA);
      //清空转账联系人
      Common.removeSessionData(API.SESSION_TRANSFER_USER_DATA);
      // 判断返回结果
      if (Common.returnResult(res.rspHead.returnCode)) {
        if (params.isPosthaste) $(this.refs.myConfirm).hide();
        $(this.refs.myResult).show();

        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
          title: "转账结果",
          leftButton: {
            exist: "true",
            closeFlag: "false",
            success: this.goFirstPage
          }
        });

        //若为普通转账，则成功后提示两小时内到账
        if (this.state.transferTypeNow.valueDate == "0" && safeTool != "1003") {
          // 显示结果页面-成功
          this.setState({
            returnCode: "success",
            returnMsg: "转账成功,预计两小时内到账"
          });
        }
        //若为次日转账，则成功后提示两小时内到账
        if (this.state.transferTypeNow.valueDate == "2" && safeTool != "1003") {
          // 显示结果页面-成功
          this.setState({
            returnCode: "success",
            returnMsg:
              "转账成功,已成功冻结资金,次日转出,资金未转出时可以通过手机银行自行撤销"
          });
        }
        if (this.state.transferTypeNow.valueDate == "2" && safeTool == "1003") {
          // 显示结果页面-成功
          this.setState({
            returnCode: "success",
            returnMsg:
              "转账成功,已成功冻结资金,次日转出,资金未转出时可以通过手机银行自行撤销,本次使用云证通验证，安全方便。"
          });
        }
        if (this.state.transferTypeNow.valueDate == "1" && safeTool == "1003") {
          // 显示结果页面-成功
          this.setState({
            returnCode: "success",
            returnMsg: "转账成功,本次使用云证通验证，安全方便。"
          });
        }

        if (this.state.transferTypeNow.valueDate == "0" && safeTool == "1003") {
          // 显示结果页面-成功
          this.setState({
            returnCode: "success",
            returnMsg:
              "转账成功,预计两小时内到账,本次使用云证通验证，安全方便。"
          });
        }

        if (this.state.transferTypeNow.valueDate == "1" && safeTool != "1003") {
          // 显示结果页面-成功
          this.setState({
            returnCode: "success",
            returnMsg: "转账成功"
          });
        }

        //*****************************调用保存收款人信息****************
        this.saveNewPayee();
      } else {
        //*************************错误返回****************
        //验证密码失败
        if (Common.enciperResult(res.rspHead.returnCode)) {
          // 调取弹出框提示信息
          let alertDict = {
            title: "错误提示",
            msg: res.rspHead.returnMsg,
            success_text: "确认"
          };
          Common.showAppDialogAlert(alertDict);
          return;
        } else if (Common.messageResult(res.rspHead.returnCode)) {
          //短信验证码失败
          // 调取弹出框提示信息
          let alertDict = {
            title: "错误提示",
            msg: res.rspHead.returnMsg,
            success_text: "确认"
          };
          Common.showAppDialogAlert(alertDict);
          return;
        } else {
          $(this.refs.myConfirm).hide();
          $(this.refs.myResult).show();

          $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "转账结果",
            leftButton: {
              exist: "true",
              closeFlag: "false",
              success: this.goFirstPage
            }
          });
          if (res.rspHead.returnCode === "CCOE0160") {
            //二代返回超时
            this.setState({
              returnCode: "waiting",
              // returnMsg: "您好，您的转账交易失败，有疑问请拨打客户电话：0834-96834。错误码:" + res.rspHead.returnCode
              returnMsg:
                "转账待确认！请至网点核实转账交易记录，请勿重复转账，避免资金损失。"
            });
          } else {
            this.setState({
              returnCode: "error",
              // returnMsg: "您好，您的转账交易失败，有疑问请拨打客户电话：0834-96834。错误码:" + res.rspHead.returnCode
              returnMsg:
                "您好，您的转账交易失败，有疑问请拨打客户电话 9999。错误码:" +
                res.rspHead.returnCode +
                ",错误信息:" +
                res.rspHead.returnMsg
            });
          }
        }
      }
    });
  }

  //*********************************** 收款人保存********************************
  saveNewPayee = () => {
    let that = this;
    let payee = "";
    if (that.state.List.transferBranches === "313684093748") {
      payee = "1";
    } else {
      payee = "2";
    }

    let accountNo = that.state.List.accountNum; //账号
    let accountName = that.state.List.name; //姓名
    let mobileNo = that.state.List.phone; //手机号码
    let pmsBankNo = that.state.List.transferBranches; //联行号
    let payeeType = payee; //收款人类型1：行内收款人 2：跨行收款人3：手机银行收款人
    let pmsBankName = that.state.List.transferBank; //行名

    let params = {
      //客户账号
      accountNo: accountNo,
      //姓名
      accountName: accountName,
      //手机号码
      mobileNo: mobileNo,
      // 联行号
      pmsBankNo: pmsBankNo,
      //收款人类型
      payeeType: payeeType,
      //行名
      pmsBankName: pmsBankName
    };
    // console.log(params)

    // 保存收款人接口
    $Fetch(API.API_GET_NEWPAYEE_PAYEE, {
      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF02",
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
    }).then(res => {});
    //删除缓存
  };

  //转账成功按钮
  goFirstPage = () => {
    if (
      Common.getSessionData(API.SESSION_TRANSFER_RESULTCALLBACK) ===
      "transferMain"
    ) {
      //转账入口进入
      Common.setUrl("transfer/index.html");
    } else if (
      Common.getSessionData(API.SESSION_TRANSFER_RESULTCALLBACK) ===
      "accountMain"
    ) {
      //账户入口进入
      Common.setUrl("account/index.html");
    } else if (this.state.useAdd) {
      Common.setUrl("transfer/index.html");
    }
  };

  inputitemcheck = newId => {
    this.setState({
      AuthCode: "",
      smsFigureSizeNum: ""
    });
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
          smsFigureSizeNum: jsons.pswLength
        });

        inputitemcheck();
      }
    });
    $("#" + newId).show();
  };

  ukeyitemcheck = newId => {
    this.setState({
      ukeyCode: "",
      ukeyFigureSizeNum: ""
    });
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
          ukeyCode: jsons.text,
          ukeyFigureSizeNum: jsons.pswLength
        });

        ukeyitemcheck();
      }
    });
    $("#" + newId).show();
  };

  cancelKbGb = val => {
    let kbId = this.state.keyKbHide;
    if (kbId) {
      $("#" + kbId).hide();
      this.setState({
        keyKbHide: val
      });
    } else {
      this.setState({
        keyKbHide: val
      });
    }
  };

  cancelKb = val => {
    //还原上移
    Common.pageMoveHide();
    //隐藏光标
    $("#" + val).hide();
  };

  render() {
    // console.log(this.state.List.approveWay)
    return (
      <div>
        {/*************************** 2、交易确认信息 ****************************/}
        <div ref="myConfirm" style={{ display: "block" }}>
          <MbankPublicResult
            type=""
            Small
            money={this.state.List.money + ""}
            message={<div>实时转账</div>}
            tMessage={true}
            skName={this.state.List.name}
            skNum={this.state.List.accountNum}
            fkcard={this.state.List.acNo}
          />
          <WhiteSpace size="sm" />
          <MbankTransferConfirm.Group>
            <MbankTransferConfirm
              title="付款账户"
              content={
                this.state.ListPay.acNo + " | " + this.state.List.customerName
              }
            />
            <MbankTransferConfirm
              title="收款账户"
              content={
                this.state.List.accountNum + " | " + this.state.List.name
              }
            />
            <MbankTransferConfirm
              title="转账类型"
              content={this.state.transferTypeNow.titles}
            />
            <MbankTransferConfirm
              title="交易附言"
              content={this.state.List.tip}
            />
          </MbankTransferConfirm.Group>
          <WhiteSpace size="sm" />

          {this.state.dxYz == true ? (
            <Input.Group>
              <Input.Sms
                iddatas={"autoinput"}
                clickState={this.setClickState.bind(this)}
                labelNumber={5}
                inputtype={"authcode"}
                editable={false}
                editable={false}
                id="smsBoard"
                type="num"
                placeholder="请输入验证码"
                onClick={this.inputitemcheck.bind(this, "smsBoard")}
                cursorSize={this.state.smsFigureSizeNum}
                value={this.state.AuthCode}
                finalval={this.setAuthinputval.bind(this)}
                maxLength={"6"}
              />
            </Input.Group>
          ) : null}

          {this.state.uKeyYz == true ? (
            <div>
              <div className="dtlp">
                <p>请在动态令牌中输入以下数字</p>
                <p>
                  <span>009812</span>
                </p>
              </div>
              <Input.Group>
                <Input
                  type="text"
                  maxLength={100}
                  placeholder="请输入动态令牌验证码"
                  labelNumber={5}
                  id="uKeyLp"
                  onClick={this.ukeyitemcheck.bind(this, "uKeyLp")}
                  cursorSize={this.state.ukeyFigureSizeNum}
                  value={this.state.ukeyCode}
                >
                  动态令牌
                </Input>
              </Input.Group>
            </div>
          ) : null}
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="primary"
              size="default"
              onTap={this.checkInput.bind(this)}
            >
              确认
            </Button>
          </WingBlank>
        </div>
        {/***************************** 3、交易结果信息 *************************/}
        <div ref="myResult" style={{ display: "none" }}>
          <MbankPublicResult
            type={this.state.returnCode}
            message={this.state.returnMsg}
            title="转账金额"
            money={this.state.List.money + ""}
          />
          <WhiteSpace size="sm" />
          <MbankTransferConfirm.Group>
            <MbankTransferConfirm
              title="付款账户"
              content={
                this.state.ListPay.acNo + " | " + this.state.List.customerName
              }
            />
            <MbankTransferConfirm
              title="收款账户"
              content={
                this.state.List.accountNum + " | " + this.state.List.name
              }
            />
            <MbankTransferConfirm
              title="收款银行"
              content={this.state.List.transferBank}
            />
            <MbankTransferConfirm
              title="转账类型"
              content={this.state.transferTypeNow.titles}
            />
            <MbankTransferConfirm
              title="交易附言"
              content={this.state.List.tip}
            />
          </MbankTransferConfirm.Group>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="ghost"
              size="default"
              onTap={this.goFirstPage.bind(this)}
            >
              完成
            </Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}
