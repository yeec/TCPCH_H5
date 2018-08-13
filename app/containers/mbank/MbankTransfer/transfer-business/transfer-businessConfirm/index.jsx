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
import ContextDecorator from "../../../../../util/decorator/context-decorator";
//基础组件
import WhiteSpace from "../../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../../components/Base/button/index.web.jsx";
import Input from "../../../../../components/Base/input-list/index.web.jsx";

//业务组件
import MbankPublicResult from "../../../../../components/mbank/mbank-public-result/index.web.jsx";
import MbankTransferConfirm from "../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx";

@ContextDecorator
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
      keyKbHide: ""
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
    console.log(listdata.transfertypenow);
    // console.log(111111)

    // let confirmtypes = listdata.confirmType.map(function (item, i) {
    //     if (item.currents === "1") {
    //         that.setState({
    //             ConfirmTypesNow: item.titles
    //         })
    //     }
    //     if (i === 0) {
    //         that.setState({
    //             PhoneNum: Common.setPhoneNumFour(item.phonenum)
    //         })
    //         Common.addSessionData(API.SESSION_TRANSFER_PHONENUM, item.phonenum);
    //     }
    //     return JSON.stringify(item);
    // })
    that.setState({
      List: listdata,
      ListPay: listdata.currentAccount,
      transferTypeNow: listdata.transfertypenow,
      useAdd: listdata.ueradd
      // accountName1:listdata.customerName,
      // accountName2:listdata.name,
      // ConfirmTypes: confirmtypes
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

  //**************1111111************check input**************************
  checkInput() {
    let confirmTypes = this.state.List.confirmType;
    let authcode = this.state.AuthCode;
    let approveWay = this.state.List.approveWay;

    //let randomid = Common.getSessionData(API.SESSION_AUTH_CODE_RANDOM);

    // 短信验证码必须发送
    if (this.state.clickState == "1" && approveWay === "1002") {
      let alertDict = {
        title: "提示信息",
        msg: "请获取短信验证码",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (authcode === "" && approveWay === "1002") {
      // 调取弹出框提示信息
      let alertDict = {
        title: "错误提示",
        msg: "短信验证码不能为空",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (authcode.length < 6 && approveWay === "1002") {
      // 调取弹出框提示信息
      let alertDict = {
        title: "错误提示",
        msg: "请输入正确格式短信验证码",
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
        payAccNo: this.state.ListPay.acNo, //  付款人卡号,//	付款账号
        subPayAccount: this.state.List.accountNum, //  收款人卡号,//	收款账号
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
        // this.genSignature()
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
    // payAccNo	付款人卡号
    // payAccName	付款人名称
    // transAmt	交易金额
    // isPosthaste	是否加急
    // resiveAccNo	收款人卡号
    // resiveAccName	收款人户名
    // resiveBankName	收款人银行行名
    // resiveBankNo	收款人银行联行号
    // safeTool	安全工具
    // cloudsCode	云证通签名`````````````````
    // remitterTel	付款人联系电话
    // smsCode	短信验证码``````````````
    // postscript	客户附言
    // passwd	交易密码
    // checkBusiness	"云证通参与签名字段"1```````
    // businessRunningNo	机构交易流水号`````````
    // resiveMoblie	收款人接收短信通知手机号
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

    // 安全工具为1003时
    if (safeTool == "1003") {
      //1、获取转出账户列表
      $Fetch(API.API_GET_GENSIGNATURE, {
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
        data: {
          signContent: signContent
        }
      }).then(res => {
        // {
        //     "businessRunningNo": "20160405171342795O0HYPOQ0",
        //     "createDate": "2016-07-04 14:45:23",
        //     "service": " mobile.HKESDK.sign",
        //     "attach": "testtest",
        //     "certSN": "2000065625",
        // "businessText": "fromAccount=1234567890123456&payeeName=吴凡& receivingBank=2 & payeeAccount=6543 ******** 3210 & payeePhoneNo=6543 ******** 3210 & amount=999.9 & remark=OK"}
        // jsonObject.put("businessRunningNo", businessRunningNo);//交易流水号
        // jsonObject.put("createDate", createDate);//创建日期
        // jsonObject.put("service", service);//接口名称
        // jsonObject.put("hashAlg", hashAlg);//签名原文hash类型
        // jsonObject.put("signWithoutHash", signWithoutHash);//签名原文hash类型
        // jsonObject.put("certSN", certSN);//服务器证书序列号
        // jsonObject.put("businessText", signContent);//交易原文
        if (Common.returnResult(res.rspHead.returnCode)) {
          let businessRunningNo = res.rspBody.businessRunningNo;
          let createDate = res.rspBody.createDate;
          let service = res.rspBody.service;
          let hashAlg = res.rspBody.hashAlg;
          let signWithoutHash = res.rspBody.signWithoutHash;
          let certSN = res.rspBody.certSN;
          let businessText = res.rspBody.businessText;
          let decodeBase64 = res.rspBody.decodeBase64;
          let signatureText = res.rspBody.signatureText;
          let sourceOrgSignature = res.rspBody.signature;

          let params = {
            businessRunningNo: businessRunningNo,
            createDate: createDate,
            service: service,
            // hashAlg: hashAlg,
            // signWithoutHash: signWithoutHash,
            certSN: certSN,
            signatureText: signatureText,
            // decodeBase64: decodeBase64,
            businessText: businessText
          };

          // {"businessRunningNo":"05000201712210100048971010004897","createDate":"2017-12-21 17:22:03","service":"mobile.HKESDK.sign","certSN":"4002864805","businessText":"payAccNo=6231990000002368030&payAccName=郭苏伟&transAmt=123&isPosthaste=1&resiveAccNo=6231990000002368170&resiveAccName=杨明&resiveBankName=凉山州商业银行&resiveBankNo=313684093748&safeTool=1003&remitterTel=&postscript=手机转账&resiveMoblie=13910160980"}

          let signatureTextping =
            '{"businessRunningNo":"' +
            businessRunningNo +
            '","createDate":"' +
            createDate +
            '","service":"' +
            service +
            '","certSN":"' +
            certSN +
            '","businessText":"' +
            businessText +
            '"}';

          this.setState({
            businessRunningNo: businessRunningNo,
            sourceString1: signatureText,
            sourceOrgSignature1: sourceOrgSignature
          });

          //
          //客户端签名 sourceString 签名后字段 JSON.stringify(params)
          // 云证通签名接口：yztMessageSign   入参：（成功回调、签名原文、服务器签名） 出参：
          $native.callClientForBank(API.NATIVE_CODE_YZTMESSAGESIGN, {
            sourceString: signatureTextping, //this.state.sourceString1,
            sourceOrgSignature: this.state.sourceOrgSignature1,
            success: res => {
              if (res == 0) {
                //下载失败
                let alertDict = {
                  title: "信息提示",
                  msg: "云证通签名客户端失败，请重新进行交易",
                  success_text: "确认",
                  success: () => {
                    Common.setUrl("transfer-businessInput/index.html");
                  }
                };
                Common.showAppDialogAlert(alertDict);
              } else if (res == 1) {
                //下载成功进行转账
                this.showResultPage();
              }
            }
          });
        } else {
          let alertDict = {
            title: "信息提示",
            msg: "云证通签名失败，请重新进行交易",
            success_text: "确认",
            success: () => {
              Common.setUrl("transfer-businessInput/index.html");
            }
          };
          Common.showAppDialogAlert(alertDict);
        }
      });
    } else {
      //其他类型安全认证方式 直接进行转账
      this.showResultPage();
    }
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
      // let signContent =
      // "payAccNo=" + payAccNo
      // + "&payAccName=" + payAccName
      // + "&transAmt=" + transAmt
      // + "&isPosthaste=" + isPosthaste
      // + "&resiveAccNo=" + resiveAccNo
      // + "&resiveAccName=" + resiveAccName
      // + "&resiveBankName=" + resiveBankName
      // + "&resiveBankNo=" + resiveBankNo
      // + "&safeTool=" + safeTool
      // + "&remitterTel=" + remitterTel
      // + "&postscript=" + postscript
      // + "&passwd=" + passwd
      // + "&resiveMoblie=" + resiveMoblie
      checkBusiness =
        "payAccNo|payAccName|transAmt|isPosthaste|resiveAccNo|resiveAccName|resiveBankName|resiveBankNo|safeTool|postscript|resiveMoblie";

      // cloudsCode = this.state.sourceOrgSignature;
      businessRunningNo = this.state.businessRunningNo;
    }

    let params = {
      /*
             payAccNo	付款人卡号
             payAccName	付款人名称
             transAmt	交易金额
             isPosthaste	是否加急
             resiveAccNo	收款人卡号
             resiveAccName	收款人户名
             resiveBankName	收款人银行行名
             resiveBankNo	收款人银行联行号
             */

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
                "您好，您的转账交易失败，有疑问请拨打客户电话：0834-96834。错误码:" +
                res.rspHead.returnCode +
                ",错误信息:" +
                res.rspHead.returnMsg
            });
          }

          // let alertDict = {
          //     title: "信息提示",
          //     msg: res.rspHead.returnCode + res.rspHead.returnMsg,
          //     success_text: "确认",
          //
          // };
          // Common.showAppDialogAlert(alertDict);
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
            skName={this.state.List.customerName}
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
          <Input.Group>
            {/*<Cell title="认证方式" description={this.state.ConfirmTypesNow} onTap={this.showConfirmTypeBox.bind(this)}*/}
            {/*arrow="right"/> // <div className="mbank-modal-phone-tip">已向您尾号为{this.state.PhoneNum}的手机号发送验证码</div>
                         editable={true} onClick={this.showKeyBoard.bind(this)}*/}

            {this.state.List.approveWay === "1002" ? (
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
            ) : null}

            {/* <Input placeholder="请输入" labelNumber={6} type="password"
                            maxLength={6} editable={false} value={this.state.passwordInputVal}
                            onClick={this.showKeyBoard1.bind(this)}
                            onChange={this.setPassWordinputval.bind(this)}>交易密码</Input> */}
          </Input.Group>
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
          {/*<MbankPublicResult type="error" title="转账失败" money={this.state.List.money + ""}*/}
          {/*message={<div>尊敬的用户，您的转账失败，请重新进行转账交易。</div>}/>*/}
          {/*<MbankPublicResult type="wait" title="转账申请已提交" money={this.state.List.money + ""}*/}
          {/*message={<div>尊敬的用户，您的转账申请已经提交，转账将在<b>2小时</b>到账，节假日及非工作时间顺延。</div>}/>*/}
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
          {/*保存收款人*/}
          {/*<MbankTransferSavePeople banklogo={allData.inBankLogo}*/}
          {/*name={allData.name}*/}
          {/*bankname={allData.transferBank}*/}
          {/*accountnum={allData.accountNum}*/}
          {/*checkedState={this.saveReceiver.bind(this)}/>*/}
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
