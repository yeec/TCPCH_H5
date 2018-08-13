import React from "react";
// import {hashHistory} from 'react-router';
import PureRenderMixin from "react-addons-pure-render-mixin";
//API数据接口
import API from "../../../../../constants/api";
////公共方法
import Common from "../../../../../util/common.jsx";
import ContextDecorator from "../../../../../util/decorator/context-decorator";
import $Fetch from "../../../../../fetch/fetch.js";
import $native from "../../../../../native/native";
//基础组件
import Prompt from "../../../../../components/Base/ocr-prompt/index.web.jsx";
import WhiteSpace from "../../../../../components/Base/white-space/index.web.jsx";
import WingBlank from "../../../../../components/Base/wing-blank/index.web.jsx";
import Button from "../../../../../components/Base/button/index.web.jsx";
import ModalBase from "../../../../../components/Base/modal/index.web.js";
import Input from "../../../../../components/Base/input-list/index.web.jsx";
import $ from "jquery";

//业务组件
import MbankTransferPeople from "../../../../../components/mbank/mbank-public-list/mbank-pubilc-list-transfer-people/index.web.jsx";
import Modal from "../../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js";
import MbankTransferOutItem from "../../../../../components/mbank/mbank-public-account-select/index.web.jsx";
import MbankPublicInputMoney from "../../../../../components/mbank/mbank-public-input-money/index.web.jsx";
import MbankTransferBank from "../../../../../components/mbank/mbank-public-select/mbank-transfer-bank/index.web.jsx";

@ContextDecorator
export default class MbankTransferBusinessInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      yztSign: false, //云证通开通标识
      modalVisibleBank: false,
      modalVisiblePeople: false,
      List2: [], //下挂账户列表使用
      ListOut: [], //模态框下挂列表选择返回
      currentAccount2: [], //转出列表下挂账户信息
      customerName: "", //付款人名称
      returnList: [], //限额返回列表
      daySum: "", //日累计限额
      moneyInputVal2: "", //转账金额
      cardInputVal2: "", //收款人卡号
      nameInputVal2: "", //收款人姓名
      phoneInputVal2: "", //通知收款人手机号
      tipInputVal2: "手机转账",
      transferBank: "请选择",
      approveWay: "", //转账方式
      // sfzSizeNum:"",
      pickerVisible: false,
      Prompt: "", //ocr状态
      //收款人添加成功 进入转账标识
      useAdd: "",
      // onTapDisabled: "",
      approve: "", //渠道云证通开通状态
      transferBranchesList: [], //支行网点
      transferTypeNow2: {
        titles: "普通到账",
        contents: "转账金额不超过5万元，预计两小时内转出。",
        valueDate: "0",
        currents: "1"
      },
      transferTypes2: [
        {
          titles: "实时到账",
          contents: "实时转出",
          valueDate: "1",
          currents: "0"
        },
        {
          titles: "普通到账",
          contents: "转账金额不超过5万元，预计两小时内转出。",
          valueDate: "0",
          currents: "1"
        },
        {
          titles: "次日到账",
          contents:
            "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
          valueDate: "2",
          currents: "2"
        }
      ],
      flags: "",
      figureSizeNum: "",
      cardSizeNum: ""
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }

  //模态框关闭
  goback = () => {
    if (
      this.state.modalVisiblePeople ||
      this.state.modalVisibleBank ||
      this.state.pickerVisible
    ) {
      if (this.state.modalVisiblePeople) {
        this.setState({
          modalVisiblePeople: !this.state.modalVisiblePeople
        });
      }

      if (this.state.modalVisibleBank) {
        this.setState({
          modalVisibleBank: !this.state.modalVisibleBank
        });
      }

      if (this.state.pickerVisible) {
        this.setState({
          pickerVisible: !this.state.pickerVisible
        });
      }

      Common.closeModal();
      $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
        title: "转账汇款",
        leftButton: {
          exist: "true",
          closeFlag: "false",
          success: this.goback
        }
      });
    } else {
      $native.callClientForUI(API.NATIVE_CODE_STOREDATA, {});
      $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
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
        Common.setUrl("transfer-userQuery/index.html");
      }
      // hashHistory.push('/MbankTransfer')
    }
  };

  //初始化页面
  componentDidMount() {
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "转账汇款",
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goback
      }
    });

    this.queryreal();
    let that = this;
    //1、获取转出账户列表
    $Fetch(API.API_GET_OWN_ACCOUNTS, {
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
      data: {}
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        //
        Common.checkUnderAccount(res.rspBody.returnList);
        // if (Common.judgeEmpty(res.rspBody.returnList)) {
        //     let alertDict = {
        //         title: "信息提示",
        //         msg: "该账户没有下挂账户无法进行转账",
        //         success_text: "添加账户",
        //         success: ()=>{
        //             //跳转至转账录入模块
        //             $native.callClientForUI(API.NATIVE_CODE_LOADNEWPAGE, {
        //                 pageUrl: 'account/index.html'
        //             });}
        //     };
        //     Common.showAppDialogAlert(alertDict);
        //     return;
        //
        // }
        //查询本日累计金额
        this.GetLimtMoney();
        that.setState({
          List2: res.rspBody.returnList,
          customerName: res.rspBody.customerName
        });

        if (
          Common.getSessionData(API.SESSION_TRANSFER_RESULTCALLBACK) ===
          "accountMain"
        ) {
          // 4、账户管理跳转传值问题
          $native.callClientForUI(API.NATIVE_CODE_STOREDATA, {
            success: res => {
              let item = JSON.parse(res);
              that.setState({
                currentAccount2: item
              });
            }
          });
        }

        if (that.state.currentAccount2.length == 0) {
          res.rspBody.returnList.map(function(item, i) {
            item.now = "0";
            if (i === 0) {
              item.now = "1";
              that.setState({
                currentAccount2: item
              });
            }
          });
        }
      }
    });

    //2、确认页面返回输入初始化
    let listdata = JSON.parse(
      Common.getSessionData(API.SESSION_TRANSFER_CONFIRMDATA)
    );

    if (!Common.judgeEmpty(listdata)) {
      if (this.state.flags == "1") {
        if (listdata.transfertypenow.titles === "实时转账") {
          that.setState({
            transferTypes2: [
              {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "1"
              },
              {
                titles: "普通到账",
                contents: "转账金额不超过5万元，预计两小时内转出。",
                valueDate: "0",
                currents: "0"
              },
              {
                titles: "次日到账",
                contents:
                  "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                valueDate: "2",
                currents: "2"
              }
            ]
          });
        } else {
        }
      }

      that.setState({
        transferTypeNow2: listdata.transfertypenow,
        //  currentAccount2: listdata.acNo,
        transferBranches: listdata.transferBranches,
        cardInputVal2: listdata.accountNum,
        nameInputVal2: listdata.name,
        transferBank: listdata.transferBank,
        tipInputVal2: listdata.tip,
        phoneInputVal2: listdata.phone,
        moneyInputVal2: listdata.money
      });
    }

    //3、收款人返回输入初始化
    let userData = JSON.parse(
      Common.getSessionData(API.SESSION_TRANSFER_USER_DATA)
    );
    let fages = JSON.parse(
      Common.getSessionData(API.SESSION_TRANSFER_USER_TONGDAO)
    );

    if (!Common.judgeEmpty(userData)) {
      this.setCardinputval2(userData.accNo, fages);

      that.setState({
        cardInputVal2: userData.accNo,
        nameInputVal2: userData.accName,
        transferBank: userData.pmsBankName,
        transferBranches: userData.pmsBankNo,
        phoneInputVal2: userData.mobile,
        useAdd: userData.useAdd
      });
    }

    Common.removeSessionData(API.SESSION_TRANSFER_CONFIRMDATA);
    //清空转账联系人
    Common.removeSessionData(API.SESSION_TRANSFER_USER_DATA);

    // // 4、账户管理跳转传值问题
    // $native.callClientForUI(API.NATIVE_CODE_STOREDATA, {
    //     success: (res) => {
    //         let item = JSON.parse(res);

    //         item.acNo = "12121";
    //         that.setState({
    //             currentAccount2: item
    //         })
    //     }

    // });
  }

  // //格式化返回信息
  // initData(res) {
  //     let item = JSON.parse(res);
  //     item.now = '1';
  //     this.setState({
  //         currentAccount2: item
  //     })
  // }

  // //跳转转账
  // goAccount() {
  //     //跳转至转账录入模块
  //     $native.callClientForUI(API.NATIVE_CODE_LOADNEWPAGE, {
  //         pageUrl: 'account/index.html'
  //     });
  // }

  //3、查询限额以及累计额度
  GetLimtMoney() {
    $Fetch(API.API_QUERY_CSTLIMIT, {
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
        safeTool: ""
      }
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        //5、云证通
        console.log(res.rspBody);

        // $native.callClientForBank(API.NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO, {
        //     success: (res) => {
        //         //0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
        //         this.setState({
        //             yztSign: res
        //         })
        //     }
        // });

        //查询云证通
        // $native.callClientForBank(API.NATIVE_CODE_VERTIFY_YZT_STATUS, {
        //     success: (res) => {
        //         //0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
        //         this.setState({
        //             yztSign: res
        //         })
        //     }
        // });

        this.setState({
          returnList: res.rspBody.returnList,
          daySum: res.rspBody.daySum
        });
        // this.state.returnList.map(function(item, i){
        //     console.log(item)
        // })
      }
    });
  }
  queryreal() {
    $Fetch(API.API_SAVE_PAYEE_QUERYREAL, {
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
        path: "HVPS"
      }
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        this.setState({
          flags: res.rspBody.flag
        });
      }
    });
  }
  //显示获取收款人名册
  showTransferPeopleBox() {
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    this.setState({
      modalVisiblePeople: true
    });
  }

  //显示获取收款人名册
  hideTransferPeopleBox() {
    this.setState({
      modalVisiblePeople: false
    });
  }

  //获取到收款人名册返回信息
  getTransferPeople(val) {
    // console.log(val)
    //移除焦点
    Common.inputBlur();
    if (Common.judgeEmpty(val.info)) {
      this.setState({
        modalVisiblePeople: false
      });
    } else {
      // let card = val.info.accNo.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      this.setCardinputval2(val.info.accNo);
      this.setState({
        phoneInputVal2: val.mobile, //手机号
        transferBranches: val.info.pmsBankNo, //联行号
        transferBank: val.info.pmsBankName, //行名
        cardInputVal2: val.info.accNo, //收款账号
        nameInputVal2: val.info.accName, //收款姓名
        modalVisiblePeople: false
      });
    }
  }

  //收款人卡号返回
  // cardInputBlur() {
  //     // 输入框失去焦点
  //
  //     let card = this.state.cardInputVal2.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
  //     this.setState({
  //         cardInputVal2: card
  //     });
  // }

  //收款人银行显示   若为凉山行 则不能修改行号
  showTransferBankBox() {
    //移除焦点
    Common.inputBlur();
    // let vals = this.state.cardInputVal2;
    // let arr = [623199, 9400279003, 6221359003, 621057];
    // for (let i = 0; i < arr.length; i++) {
    //     if (vals.replace(/\s/g, "").indexOf(arr[i]) === 0) {

    //         this.setState({
    //             modalVisibleBank: false
    //         });
    //         break;
    //     } else {
    //         this.setState({
    //             modalVisibleBank: true
    //         });
    //     }
    // }
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    this.setState({
      modalVisibleBank: true
    });
  }

  //收款人银行返回
  getTransferBank(val, bankNo) {
    // console.log(val,bankNo)
    //移除焦点
    Common.inputBlur();
    this.setState({
      transferBank: val,
      transferBranches: bankNo,
      modalVisibleBank: false
    });
  }

  //收款人开户行返回
  showTransferBranchesBox(value) {
    this.setState({
      transferBranches: value
      //pickerVisible: false,
    });
  }

  //下挂账户列表显示modal框
  showAccountListBox2() {
    let that = this;
    this.setState({
      pickerVisible: true
    });
    let allaccount = that.state.List2.map(function(item, i) {
      item.cusName = that.state.customerName;
      return JSON.stringify(item);
    });
    Modal.transferPaymentAccount(
      {
        items: allaccount,
        titleText: "选择账户",
        close: Common.closeModal
      },
      function(key) {
        let accountListNew2 = that.state.List2.map(function(item, i) {
          item.now = "0";
          if (i === key) {
            item.now = "1";
            that.setState({
              currentAccount2: item
            });
          }
          return item;
        });

        that.setState({
          ListOut: accountListNew2
        });
        Common.closeModal();
      }
    );
  }

  //转账方式modal框
  showTransferTypeBox2() {
    //移除焦点
    Common.inputBlur();
    let that = this;
    this.setState({
      pickerVisible: true
    });
    let transfertypes = that.state.transferTypes2.map(function(item, i) {
      return JSON.stringify(item);
    });
    Modal.transfertype(
      {
        items: transfertypes,
        titleText: "选择转账方式",
        close: Common.closeModal
      },
      function(key) {
        let typesNew = that.state.transferTypes2.map(function(item, i) {
          item.currents = "0";
          if (i === key) {
            item.currents = "1";
            that.setState({
              transferTypeNow2: item
            });
          }
          return item;
        });
        that.setState({
          transferTypes2: typesNew
        });
        Common.closeModal();
      }
    );
  }

  //金额输入框
  setMoneyinputval2(val) {
    // 输入框失去焦点
    let that = this;
    let cardCheck = that.state.cardInputVal2;
    let checkSign = false;
    if (!Common.judgeEmpty(cardCheck)) {
      // 校验卡bin是否为本行账号 IC卡-623199 磁条卡-9400279003，6221359003，621057
      let arr = [623199, 9400279003, 6221359003, 621057];
      for (let i = 0; i < arr.length; i++) {
        if (cardCheck.replace(/\s/g, "").indexOf(arr[i]) === 0) {
          checkSign = true;
        }
      }
    }
    if (checkSign) {
      that.setState({
        //界面展示取值
        transferTypeNow2: {
          titles: "实时到账",
          contents: "实时转出",
          valueDate: "1",
          currents: "1"
        },
        transferTypes2: [
          {
            titles: "实时到账",
            contents: "实时转出",
            valueDate: "1",
            currents: "1"
          },
          {
            titles: "普通到账",
            contents: "转账金额不超过5万元，预计两小时内转出。",
            valueDate: "0",
            currents: "0"
          },
          {
            titles: "次日到账",
            contents:
              "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
            valueDate: "2",
            currents: "2"
          }
        ]
      });
    } else {
      if (this.state.flags == "1") {
        if (val - 50000 > 0) {
          that.setState({
            //界面展示取值
            transferTypeNow2: {
              titles: "实时到账",
              contents: "实时转出",
              valueDate: "1",
              currents: "1"
            },
            transferTypes2: [
              {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "1"
              },
              {
                titles: "普通到账",
                contents: "转账金额不超过5万元，预计两小时内转出。",
                valueDate: "0",
                currents: "0"
              },
              {
                titles: "次日到账",
                contents:
                  "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                valueDate: "2",
                currents: "2"
              }
            ]
          });
        } else {
          that.setState({
            //界面展示取值
            transferTypeNow2: {
              titles: "普通到账",
              contents: "转账金额不超过5万元，预计两小时内转出。",
              valueDate: "0",
              currents: "0"
            },
            transferTypes2: [
              {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "0"
              },
              {
                titles: "普通到账",
                contents: "转账金额不超过5万元，预计两小时内转出。",
                valueDate: "0",
                currents: "1"
              },
              {
                titles: "次日到账",
                contents:
                  "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                valueDate: "2",
                currents: "2"
              }
            ]
          });
        }
      } else {
        that.setState({
          //界面展示取值
          transferTypeNow2: {
            titles: "普通到账",
            contents: "转账金额不超过5万元，预计两小时内转出。",
            valueDate: "0",
            currents: "1"
          },
          transferTypes2: [
            {
              titles: "实时到账",
              contents: "实时转出",
              valueDate: "1",
              currents: "0",
              fas: "a"
            },
            {
              titles: "普通到账",
              contents: "转账金额不超过5万元，预计两小时内转出。",
              valueDate: "0",
              currents: "1"
            },
            {
              titles: "次日到账",
              contents:
                "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
              valueDate: "2",
              currents: "2"
            }
          ]
        });
      }
    }

    that.setState({
      moneyInputVal2: val
    });
  }

  //通知手机号返回

  // 调用客户端键盘接口
  //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
  //纯数字键盘
  setPhoneinputval2 = newId => {
    this.cancelKbGb(newId);
    this.setState({
      phoneInputVal2: "",
      figureSizeNum: ""
    });
    let that = this;
    //展示光标
    $("#" + newId).show();
    //根据当前input位置定义上移高度，以px值为基础方法中会换算成REM
    //输入框上移
    Common.pageMoveShow(380);
    $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
      type: "num",
      maxLength: "11",
      //关闭键盘回调函数，并传入关闭的光标的Id
      cancel: that.cancelKb.bind(this, newId),
      success: res => {
        let jsons = JSON.parse(res);
        this.setState({
          phoneInputVal2: jsons.text,
          figureSizeNum: jsons.pswLength
        });

        setPhoneinputval2();
      }
    });
    $("#" + newId).show();
  };

  //获取客户端键盘账号
  ordinaryFigure = newId => {
    this.cancelKbGb(newId);
    this.setState({
      cardInputVal2: "",
      cardSizeNum: ""
    });
    let that = this;
    //展示光标
    $("#" + newId).show();
    //输入框上移
    Common.pageMoveShow(200);
    $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
      type: "num",
      maxLength: "19",
      //关闭键盘回调函数，并传入关闭的光标的Id
      cancel: that.cancelKb.bind(this, newId),
      success: res => {
        let jsons = JSON.parse(res);
        this.setState({
          cardInputVal2: jsons.text,
          cardSizeNum: jsons.pswLength
        });

        // 校验卡bin是否为本行账号 IC卡-623199 磁条卡-9400279003，6221359003，621057
        let arr = [623199, 9400279003, 6221359003, 621057];

        for (let i = 0; i < arr.length; i++) {
          // alert(jsons)
          if (jsons.text.replace(/\s/g, "").indexOf(arr[i]) === 0) {
            that.setState({
              transferBank: "凉山州商业银行",
              transferBranches: "313684093748",
              payeeType: "1",
              cardInputVal2: jsons.text,
              //界面展示取值
              transferTypeNow2: {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "1"
              },
              transferTypes2: [
                {
                  titles: "实时到账",
                  contents: "实时转出",
                  valueDate: "1",
                  currents: "1"
                },
                {
                  titles: "普通到账",
                  contents: "转账金额不超过5万元，预计两小时内转出。",
                  valueDate: "0",
                  currents: "0"
                },
                {
                  titles: "次日到账",
                  contents:
                    "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                  valueDate: "2",
                  currents: "0"
                }
              ]
            });
            break;
          } else {
            if (this.state.flags == "1" || fags == "1") {
              that.setState({
                transferBank: "",
                transferBranches: "",
                // onTapDisabled: false,
                cardInputVal2: jsons.text,
                transferTypeNow2: {
                  titles: "普通到账",
                  contents: "转账金额不超过5万元，预计两小时内转出。",
                  valueDate: "0",
                  currents: "1"
                },
                transferTypes2: [
                  {
                    titles: "实时到账",
                    contents: "实时转出",
                    valueDate: "1",
                    currents: "0"
                  },
                  {
                    titles: "普通到账",
                    contents: "转账金额不超过5万元，预计两小时内转出。",
                    valueDate: "0",
                    currents: "1"
                  },
                  {
                    titles: "次日到账",
                    contents:
                      "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                    valueDate: "2",
                    currents: "0"
                  }
                ]
              });
            } else {
              that.setState({
                transferBank: "",
                transferBranches: "",
                // onTapDisabled: false,
                cardInputVal2: jsons.text,
                transferTypeNow2: {
                  titles: "普通到账",
                  contents: "转账金额不超过5万元，预计两小时内转出。",
                  valueDate: "0",
                  currents: "1"
                },
                transferTypes2: [
                  {
                    titles: "实时到账",
                    contents: "实时转出",
                    valueDate: "1",
                    currents: "0",
                    fas: "a"
                  },
                  {
                    titles: "普通到账",
                    contents: "转账金额不超过5万元，预计两小时内转出。",
                    valueDate: "0",
                    currents: "1"
                  },
                  {
                    titles: "次日到账",
                    contents:
                      "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                    valueDate: "2",
                    currents: "0"
                  }
                ]
              });
            }
          }
        }
        ordinaryFigure();
      }
    });
    // alert(this.state.cardInputVal2+"****")

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

  //获取交易密码
  setFigureinputval(val) {
    let that = this;
    that.setState({
      cardInputVal2: val
    });
  }

  // 账号
  setCardinputval2(vals, fags) {
    // 输入框失去焦点
    let that = this;
    // 校验卡bin是否为本行账号 IC卡-623199 磁条卡-9400279003，6221359003，621057
    let arr = [623199, 9400279003, 6221359003, 621057];
    for (let i = 0; i < arr.length; i++) {
      if (vals.replace(/\s/g, "").indexOf(arr[i]) === 0) {
        that.setState({
          transferBank: "凉山州商业银行",
          transferBranches: "313684093748",
          // onTapDisabled: true,
          payeeType: "1",
          cardInputVal2: vals,
          //界面展示取值
          transferTypeNow2: {
            titles: "实时到账",
            contents: "实时转出",
            valueDate: "1",
            currents: "1"
          },
          transferTypes2: [
            {
              titles: "实时到账",
              contents: "实时转出",
              valueDate: "1",
              currents: "1"
            },
            {
              titles: "普通到账",
              contents: "转账金额不超过5万元，预计两小时内转出。",
              valueDate: "0",
              currents: "0"
            },
            {
              titles: "次日到账",
              contents:
                "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
              valueDate: "2",
              currents: "0"
            }
          ]
        });
        break;
      } else {
        if (this.state.flags == "1" || fags == "1") {
          that.setState({
            transferBank: "",
            transferBranches: "",
            // onTapDisabled: false,
            cardInputVal2: vals,
            transferTypeNow2: {
              titles: "普通到账",
              contents: "转账金额不超过5万元，预计两小时内转出。",
              valueDate: "0",
              currents: "1"
            },
            transferTypes2: [
              {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "0"
              },
              {
                titles: "普通到账",
                contents: "转账金额不超过5万元，预计两小时内转出。",
                valueDate: "0",
                currents: "1"
              },
              {
                titles: "次日到账",
                contents:
                  "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                valueDate: "2",
                currents: "0"
              }
            ]
          });
        } else {
          that.setState({
            transferBank: "",
            transferBranches: "",
            // onTapDisabled: false,
            cardInputVal2: vals,
            transferTypeNow2: {
              titles: "普通到账",
              contents: "转账金额不超过5万元，预计两小时内转出。",
              valueDate: "0",
              currents: "1"
            },
            transferTypes2: [
              {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "0",
                fas: "a"
              },
              {
                titles: "普通到账",
                contents: "转账金额不超过5万元，预计两小时内转出。",
                valueDate: "0",
                currents: "1"
              },
              {
                titles: "次日到账",
                contents:
                  "实时冻结资金，次日转出，资金未转出时可以通过手机银行自行撤销",
                valueDate: "2",
                currents: "0"
              }
            ]
          });
        }
      }
    }
  }

  //收款人姓名返回
  setNameinputval2(val) {
    // 输入框失去焦点
    let that = this;
    that.setState({
      nameInputVal2: val
    });
  }

  setNameClickinputval() {
    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
  }

  //通讯录选择信息phoneName: JSON.parse(res).phoneName,
  pickContacts = () => {
    let that = this;
    $native.callClientForComm(API.NATIVE_CODE_GET_ADDRESSBOOK, {
      success: res => {
        let phoneNumber = Common.setPhoneNum(JSON.parse(res).phoneNumber);
        that.setState({
          phoneInputVal2: phoneNumber
        });
      }
    });
  };

  //附言输入返回
  setTipinputval2(val) {
    // 输入框失去焦点
    let that = this;
    that.setState({
      tipInputVal2: val
    });
  }

  //跳转至确认页面
  jumpquickpage2() {
    // 输入框失去焦点
    Common.inputBlur();
    let that = this;
    let moneyinputval = that.state.moneyInputVal2;
    // alert(moneyinputval)
    // if (Common.moneyTyp(moneyinputval)) {
    //     // 调取客户弹出框提示信息
    //     let alertDict = {
    //         title: "错误提示",
    //         msg: "[金额输入]格式有误，不能为空，只允许数字，整数部分最多12位，小数部分最多2位，金额不能为负数，请重新输入！",
    //         success_text: "确认"
    //     }
    //     Common.showAppDialogAlert(alertDict);
    //     return ;
    // } else {
    //     let money = moneyinputval;
    //     let valarr = money.split('.')
    //     if (valarr.length < 2) {
    //         money += '.00';
    //     } else if (valarr[1].length < 2) {
    //         money += '0';
    //     }
    //     moneyinputval = money;
    // }

    let currentaccount = this.state.currentAccount2; //付款人账户信息
    let customerName = this.state.customerName; //付款人名称
    let transfertypenow = this.state.transferTypeNow2; //付款类型
    // let moneyinputval = that.state.moneyInputVal2;                      //转账金额
    let cardinputval = that.state.cardInputVal2.split(" ").join(""); //收款账号
    let nameinputval = that.state.nameInputVal2; //收款人姓名
    let transferbank = that.state.transferBank; //收款人银行
    let transferbranches = that.state.transferBranches; //收款人开户网点
    let phoneinputval = that.state.phoneInputVal2; //通知收款人手机号
    let tipinputval = that.state.tipInputVal2; //附言
    let approveWay = ""; //安全认证方式
    let daySum = Number(this.state.daySum); //= Number("1900.01"); Number(this.state.daySum)
    let money = Number(moneyinputval);
    let flags = that.state.flags;
    if (transfertypenow.valueDate == "0" && moneyinputval > 50000) {
      let alertDict = {
        title: "信息提示",
        msg: "转账方式为普通到账,转账金额不能超过5万元",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }
    //  console.log(moneyinputval)
    //  console.log(flag)
    //付款金额不能大于余额.split(",").join("")
    let availBal = Number(
      this.state.currentAccount2.availBal.split(",").join("")
    );
    let moneyinputvalCheck = Number(moneyinputval);
    if (moneyinputvalCheck > availBal) {
      let alertDict = {
        title: "信息提示",
        msg: "转账金额大于账户余额，请重新输入",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (cardinputval.length > 20 || cardinputval.length < 15) {
      let alertDict = {
        title: "信息提示",
        msg: "收款人账号输入有误，请重新输入",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    //收款账户与收款账户一致
    if (currentaccount.acNo == cardinputval) {
      let alertDict = {
        title: "信息提示",
        msg: "收款人卡号与付款人卡号一致，请重新输入",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    //付款人手机号

    if (
      Common.phoneNumber(phoneinputval) &&
      !Common.judgeEmpty(phoneinputval)
    ) {
      let alertDict = {
        title: "信息提示",
        msg: "收款人手机号格式不正确，请重新输入",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }
    if (money > 500000) {
      let alertDict = {
        title: "信息提示",
        msg: "单笔限额大于50万元,不能进行转账",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    if (money + daySum > 1000000) {
      let alertDict = {
        title: "信息提示",
        msg: "日转账金额超过100万元,不能进行转账",
        success_text: "确认"
      };
      Common.showAppDialogAlert(alertDict);
      return;
    }

    // //查询本日累计金额
    // // this.GetLimtMoney();
    //
    //

    // fetch 渠道查询云证通是否开通 返回开通    若未开通  根据金额判断

    $Fetch(API.API_QUERY_CST_BANK_SECURITIES, {
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
      data: {}
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        //查询渠道云证通开通标志 0 失败   1开通
        that.setState({
          approve: res.rspBody.openFlag
        });
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

    //判断金额输入后，转账方式 以及 认证方式
    //第一步 判断云证通是否开通，若开通默认 认证方式为1003-云证通

    //若云证政通未开通，金额小于2K, 认证方式为1001-不需认证  转账方式可选0-普通 1-加急实时

    //若云证通未开通，金额大于等于2K，小于等于5w 认证方式为1002-短信验证码 转账方式可选 0-普通 1-加急实时

    //若云证通未开通,金额大于5w，认证方式必须为 1003-云证通，需要客户去开通云证通 转账方式 1-加急实时

    // 0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
    //fetch 请求返回的值

    // 渠道返回开通云证通时

    if (that.state.approve == "1") {
      //开通后 不大于50w
      if (money + daySum <= 1000000) {
        //native 成功时 云证通1003
        //客户端返回开通云证通错误时 如过金额小于2K 使用交易密码1001  如果大于2k小于5w  使用1002  若果大于5w 报错
        //剩余限额为 (500000-daySum)
        $native.callClientForBank(API.NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO, {
          success: res => {
            //0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
            // approve = res;
            that.setState({
              yztSign: res
            });
          }
        });
        if (that.state.yztSign == "0") {
          approveWay = "1003";
        } else {
          if (money + daySum <= 2000) {
            approveWay = "1001";
          } else if (money + daySum > 2000 && money + daySum <= 50000) {
            approveWay = "1002";
          } else {
            let alertDict = {
              title: "信息提示",
              msg: "日转账超过5万元,不能进行转账",
              success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
            return;
          }
        }
      } else {
        let alertDict = {
          title: "信息提示",
          msg: "日转账金额超过100万元,不能进行转账",
          success_text: "确认"
        };
        Common.showAppDialogAlert(alertDict);
        return;
      }
    } else {
      //渠道返回未开通运政通时
      // 剩余金额为 (50000 - daySum)
      //单笔限额小于2k 并且 日累计+转账金额小于2k
      if (money + daySum <= 2000) {
        approveWay = "1001";
      } //  单笔在2k与5w之间 并且 日累计+转账金额
      else if (money + daySum > 2000 && money + daySum <= 50000) {
        $native.callClientForBank(API.NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO, {
          success: res => {
            //0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
            // approve = res;
            that.setState({
              yztSign: res
            });
          }
        });
        if (that.state.yztSign === "0") {
          approveWay = "1003";
        } else {
          approveWay = "1002";
        }
      } else if (money + daySum > 50000) {
        $native.callClientForBank(API.NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO, {
          success: res => {
            //0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
            // approve = res;
            that.setState({
              yztSign: res
            });
          }
        });
        if (that.state.yztSign == "0") {
          approveWay = "1003";
        } else {
          let alertDict = {
            title: "信息提示",
            msg: "日转账超过5万元,不能进行转账",
            // cancel_text: "取消",
            success_text: "确认"
            // success: () => {
            //     Common.setUrl("yunzhengtong/index.html");
            // }
          };
          Common.showAppDialogAlert(alertDict);
          return;
        }
      }
    }

    // let daySum = Number(this.state.daySum); //= Number("1900.01"); Number(this.state.daySum)
    // let money = Number(moneyinputval);

    // // 剩余金额为 (50000 - daySum)
    // //单笔限额小于2k 并且 日累计+转账金额小于2k
    // if ((money + daySum) <= 2000) {

    //     approveWay = "1001";
    // } //  单笔在2k与5w之间 并且 日累计+转账金额
    // else if ((money + daySum) > 2000 && (money + daySum) <= 50000) {
    //     approveWay = "1002";
    // } else if ((money + daySum) > 50000) {

    //     $native.callClientForBank(API.NATIVE_CODE_QUICK_OPEN_YZTWITHUSERINFO, {
    //         success: (res) => {
    //             //0开通且证书可用    展示结果  //1开通证书不可用或失效 下载可用   2 未开通
    //             // approve = res;
    //             that.setState({
    //                 yztSign: res
    //             })
    //         }
    //     });

    //     if (that.state.yztSign == "0") {
    //         approveWay = "1003";

    //     } else {
    //         let alertDict = {
    //             title: "信息提示",
    //             msg: "日转账超过5万元,不能进行转账",
    //             // cancel_text: "取消",
    //             success_text: "确认",
    //             // success: () => {
    //             //     Common.setUrl("yunzhengtong/index.html");
    //             // }
    //         };
    //         Common.showAppDialogAlert(alertDict);
    //         return
    //     }

    // }

    //上送
    let params = {
      currentAccount: currentaccount,
      customerName: customerName,
      transfertypenow: transfertypenow,
      money: moneyinputval,
      accountNum: cardinputval,
      name: nameinputval,
      transferBank: transferbank,
      transferBranches: transferbranches,
      phone: phoneinputval,
      tip: tipinputval,
      approveWay: approveWay,
      ueradd: this.state.useAdd
    };

    Common.addSessionData(
      API.SESSION_TRANSFER_CONFIRMDATA,
      JSON.stringify(params)
    );
    // hashHistory.push('/transfer-businessConfirm')
    Common.setUrl("transfer-businessConfirm/index.html");
  }
  //   getBankID (出参：卡号bank_NUM， 卡名bank_NAME，)
  ocrClick() {
    let that = this;
    $native.callClientForBank(API.NATIVE_CODE_BANK_OCR, {
      success: res => {
        let certNo = JSON.parse(res);

        // 输入框失去焦点
        let that = this;
        // 校验卡bin是否为本行账号 IC卡-623199 磁条卡-9400279003，6221359003，621057
        let arr = [623199, 9400279003, 6221359003, 621057];
        for (let i = 0; i < arr.length; i++) {
          if (certNo.bank_NUM.replace(/\s/g, "").indexOf(arr[i]) === 0) {
            that.setState({
              transferBank: "凉山州商业银行",
              transferBranches: "313684093748",
              // onTapDisabled: true,
              payeeType: "1",
              cardInputVal2: certNo.bank_NUM,
              Prompt: "1",
              //界面展示取值
              transferTypeNow2: {
                titles: "实时到账",
                contents: "实时转出",
                valueDate: "1",
                currents: "1"
              },
              transferTypes2: [
                {
                  titles: "实时到账",
                  contents: "实时转出",
                  valueDate: "1",
                  currents: "1"
                }
              ]
            });
            break;
          } else {
            that.setState({
              transferBank: "",
              transferBranches: "",
              // onTapDisabled: false,
              cardInputVal2: certNo.bank_NUM,
              Prompt: "1"
            });
          }
        }
        // that.setState({
        //     cardInputVal2: certNo.bank_NUM
        // })
      }
    });
  }

  render() {
    let CurrentAccount2 = this.state.currentAccount2;
    return (
      <div>
        <MbankTransferOutItem
          cardnum={CurrentAccount2.acNo}
          name={this.state.customerName}
          money={CurrentAccount2.availBal}
          showdetail={this.showAccountListBox2.bind(this)}
        />
        <WhiteSpace size="sm" />
        {/*转账金额*/}
        <MbankPublicInputMoney
          inputid="bankoutinput"
          finalval={this.setMoneyinputval2.bind(this)}
          value={this.state.moneyInputVal2}
        />

        <WhiteSpace size="sm" />
        <Input.Group>
          {/*收款姓名*/}
          <Input
            placeholder="请输入收款姓名"
            value={this.state.nameInputVal2}
            labelNumber={5}
            rightExtra="true"
            ExtraIconSuffix="shoukuanren"
            onChange={this.setNameinputval2.bind(this)}
            onClick={this.setNameClickinputval.bind(this)}
            onExtraClick={this.showTransferPeopleBox.bind(this)}
          >
            收款人
          </Input>
          {/*收款卡号onBlur={this.cardInputBlur.bind(this)}*/}
          <Input
            placeholder="请输入收款卡号"
            value={this.state.cardInputVal2}
            labelNumber={5}
            type="num"
            id="keyboardNumber"
            editable={false}
            cursorSize={this.state.cardSizeNum}
            maxLength="11"
            rightExtra="true"
            ExtraIconSuffix="ocr"
            title="请核对账户信息"
            onExtraClick={this.ocrClick.bind(this)}
            onClick={this.ordinaryFigure.bind(this, "keyboardNumber")}
            onChange={this.setFigureinputval.bind(this)}
          >
            收款账号
          </Input>

          {/* ocr提示信息 */}
          <Prompt title="请核对账户信息" money={this.state.Prompt} />

          <ModalBase visible={this.state.modalVisiblePeople} fullScreen>
            <MbankTransferPeople selectok={this.getTransferPeople.bind(this)} />
          </ModalBase>
          {/*收款行*/}
          <Input.Modal
            labelNumber={5}
            onTap={this.showTransferBankBox.bind(this)}
            selectText={this.state.transferBank}
            rightExtra="true"
            ExtraIconSuffix="arrow-right"
          >
            收款银行
          </Input.Modal>
          <ModalBase visible={this.state.modalVisibleBank} fullScreen>
            <MbankTransferBank selectok={this.getTransferBank.bind(this)} />
          </ModalBase>
          {/*<Input.Pick cellTitle="支行网点" data={this.state.transferBranchesList} arrow={'right'}/>*/}
          {/*placeholder="请选择" title="选择地区"*/}
          {/*onChange={this.showTransferBranchesBox.bind(this)} value={this.state.transferBranches}/>*/}
        </Input.Group>

        <WhiteSpace size="sm" />
        {/*转账方式*/}
        <Input.Group>
          <Input.Modal
            labelNumber={5}
            onTap={this.showTransferTypeBox2.bind(this)}
            selectText={this.state.transferTypeNow2.titles}
            rightExtra="true"
            ExtraIconSuffix="arrow-right"
          >
            转账方式
          </Input.Modal>
        </Input.Group>
        <WhiteSpace size="sm" />
        <Input.Group>
          {/*通知手机号*/}
          <Input
            placeholder="请输入收款人手机号(选填)"
            labelNumber={5}
            maxLength="11"
            type="num"
            id="keyboardPhone"
            onClick={this.setPhoneinputval2.bind(this, "keyboardPhone")}
            editable={false}
            rightExtra="true"
            ExtraIconSuffix="shoukuanren"
            cursorSize={this.state.figureSizeNum}
            onExtraClick={this.pickContacts.bind(this)}
            value={this.state.phoneInputVal2}
          >
            通知收款人
          </Input>
          {/*交易附言*/}
          <Input
            type="text"
            maxLength={100}
            placeholder="必输"
            labelNumber={5}
            value={this.state.tipInputVal2}
            onChange={this.setTipinputval2.bind(this)}
          >
            交易附言
          </Input>
        </Input.Group>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button
            type="primary"
            size="default"
            disabled={
              !(
                this.state.moneyInputVal2 &&
                this.state.cardInputVal2 &&
                this.state.nameInputVal2 &&
                this.state.transferBank &&
                this.state.tipInputVal2 &&
                this.state.moneyInputVal2 != "0.00"
              )
            }
            onTap={this.jumpquickpage2.bind(this)}
          >
            确认
          </Button>
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}
