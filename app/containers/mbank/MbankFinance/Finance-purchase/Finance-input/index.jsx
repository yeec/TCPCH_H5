import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import Common from "../../../../../util/common.jsx";
import $Fetch from '../../../../../fetch/fetch.js';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
import List from '../../../../../../app/components/Base/list/index.web.js';
import Checkbox from '../../../../../components/Base/checkbox/index.web.js';
//业务组件
import MbankPublicInputMoney from '../../../../../components/mbank/mbank-public-input-money/index.web.jsx';
import Modal from '../../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js';
import MbankTransferOutItem from '../../../../../components/mbank/mbank-public-account-select/index.web.jsx';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

export default class MbankFinanceInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            transferTypes: [],
            currentAccount: [],
            moneyInputVal: "",
            cardInputVal: "",
            nameInputVal: "",
            phoneInputVal: "",
            tipInputVal: "",
            AccountList: [],//存放账户列表
            productMap: {},//存放账户列表
            AuthCode: "",
            PassWord: "",
            customerName: "",
            list: [],
            docName: "",
            returnLengh: "",
            PhoneNum: "",
            docUrl: "",
            modalVisibleAccount: false,
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    //跳转
    goback = () => {
        if (this.state.modalVisibleAccount) {
            this.setState({
                modalVisibleAccount: !this.state.modalVisibleAccount
            });
            Common.closeModal();
            $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                title: "确认信息",
                leftButton: {
                    exist: 'true',
                    closeFlag: 'false',
                    success: that.goback
                }
            });
        } else {
            // alert(window.location.search)
            let prdId = this.state.productMap.prdId;
            let isBuy = this.getUrl("isBuy");
            let isSub = this.getUrl("isSub");
            let enterFlag = this.getUrl("enterFlag");
            // alert(isBuy)
            // alert(isSub)
            // alert(enterFlag)
            Common.setUrl('finance-detail/index.html?' + 'prdId='+prdId +'&isBuy='+ isBuy +'&isSub='+ isSub +'&enterFlag='+ enterFlag);
            
        }
    };

    getUrl(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "确认信息",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: that.goback
            }
        });

        // 获取存储的理财产品信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL));
        that.setState({
            productMap: listdata
        });

        // 获取存储的理财产品信息
        let returndata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_RETURN));
        that.setState({
            list: listdata.returnList,
            returnLengh: returndata.length
        });

        //先清除session中手机号码
        Common.removeSessionData(API.SESSION_TRANSFER_PHONENUM);
        // 获取手机号码传入session
        Common.addSessionData(API.SESSION_TRANSFER_PHONENUM, this.state.PhoneNum);

        //下挂账户列表查询
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA05",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            //上送数据
            data: {
            }
        }).then((res) => {
            // State List
            if (Common.returnResult(res.rspHead.returnCode)) {
                that.setState({
                    customerName: res.rspBody.customerName,
                    AccountList: res.rspBody.returnList,
                });
                res.rspBody.returnList.map(function (item, i) {
                    that.setState({
                        currentAccount: item
                    })
                })
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    success: that.goback.bind(this)
                }
                Common.showAppDialogAlert(alertDict);
                return
            }

        })
    }

    //购买账号列表
    showAccountListBox() {
        let that = this;
        this.setState({
            modalVisibleAccount: true
        });
        let allaccount = that.state.AccountList.map(function (item, i) {
            return JSON.stringify(item);
        });
        let customerNames = that.state.customerName;

        //付款账户列表弹框展示选择
        Modal.transferPaymentAccount({
            items: allaccount,
            customerNames: customerNames,
            titleText: '选择付款账户',
            close: Common.closeModal
        }, function (key) {
            let accountListNew = that.state.AccountList.map(function (item, i) {
                item.now = "0";
                if (i === key) {
                    item.now = "1";
                    that.setState({
                        currentAccount: item
                    })
                }
                return item;
            });

            that.setState({
                AccountList: accountListNew
            })
            Common.closeModal();
        });
    }

    //金额框取值
    setMoneyinputval(val) {
        let that = this;

        that.setState({
            moneyInputVal: val
        })
    }

    //理财经理编号取值
    setManagerCodeinputval(val) {
        let that = this;
        that.setState({
            ManagerCodeInputVal: val
        })
    }

    //checkbox取值
    changeHandle(val) {
        let that = this;
        that.setState({
            checkboxVal: val
        })
    }

    //确认按钮
    inputConfirm() {
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
        let that = this;
        let moneyInputVal = that.state.moneyInputVal;
        // if (Common.moneyTyp(moneyInputVal)) {
        //     // 调取客户弹出框提示信息
        //     let alertDict = {
        //         title: "错误提示",
        //         msg: "[金额输入]格式有误，不能为空，只允许数字，整数部分最多12位，小数部分最多2位，金额不能为负数，请重新输入！",
        //         success_text: "确认"
        //     }
        //     Common.showAppDialogAlert(alertDict);
        //     return false;
        // } else {
        //     let money = moneyInputVal;
        //     let valarr = money.split('.')
        //     if (valarr.length < 2) {
        //         money += '.00';
        //     } else if (valarr[1].length < 2) {
        //         money += '0';
        //     }
        //     moneyInputVal = money;
        // }

        let balance = that.state.currentAccount.availBal;
        let ssubStartAmt = that.state.productMap.ssubStartAmt;
        if ((balance - moneyInputVal) < 0) {

            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "账户余额不足！",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);

        } else if ((moneyInputVal - ssubStartAmt) < 0) {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "输入金额小于购买最小购买金额，请重新输入",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
        } else {
            let param = {
                currentAccount: that.state.currentAccount.accountNum,
                name: that.state.currentAccount.name,
                prdName: that.state.productMap.prdName,
                matuDate: that.state.productMap.matuDate,
                term: that.state.productMap.term,
                moneyInputVal: that.state.moneyInputVal,
                customerName: that.state.customerName,
                acNo: that.state.currentAccount.acNo
            };
            //先清除session中
            Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO);
            // 为确认界面传值传入session
            Common.addSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO, JSON.stringify(param));
            Common.setUrl('finance-confirm/index.html');
        }
    }

    RiskDisclosureOne(vals) {
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
        //先清除session中
        Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_PROTOCOL);
        Common.addSessionData(API.SESSION_FINANCE_PRODUCT_PROTOCOL, JSON.stringify(vals));
        let gobackId = 'input';
        Common.setUrl('finance-detailText/index.html?' + gobackId)
    }

    render() {
        let CurrentAccount = this.state.currentAccount;
        let returnLenghFlag = this.state.returnLengh;
        let listInput = this.state.list;

        let items = [];
        for (var i = 0; i < returnLenghFlag; i++) {
            items.push(<a href="javascript:void(0)" onClick={this.RiskDisclosureOne.bind(this, listInput[i])}>{'《' + listInput[i].docName + '》'}</a>)
        }
        return (
            <div>
                <WhiteSpace size="sm" />
                <MbankTransferOutItem
                    cardnum={CurrentAccount.acNo}
                    name={this.state.customerName}
                    money={CurrentAccount.availBal}
                    showdetail={this.showAccountListBox.bind(this)} />
                <WhiteSpace size="sm" />
                <List.Group>
                    <List title="理财产品名称" description={this.state.productMap.prdName} />
                    <List title="理财产品编号" description={this.state.productMap.prdId} />
                    <List title="年化收益率" description={this.state.productMap.propRateMax + '%'} />
                    <List title="购买最小金额元" description={formatMoney(this.state.productMap.ssubStartAmt,{symbol: '￥'}) + "元"} />
                    <List title="申购起始日期" description={moment(this.state.productMap.raiseStartDate).format('YYYY-MM-DD')} />
                </List.Group>
                <WhiteSpace size="sm" />
                <MbankPublicInputMoney inputid="financepayinput" value={this.state.moneyInputVal} placeholder="请输入购买金额" inputName="购买金额" limitFlag={false}
                    finalval={this.setMoneyinputval.bind(this)} pageMove={360}/>
                <WhiteSpace size="sm" />
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Checkbox.Agree onChange={this.changeHandle.bind(this)}>我已阅读
                        {items}，并愿意承担投资风险                       
                    </Checkbox.Agree>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default"
                        disabled={!(this.state.moneyInputVal && this.state.checkboxVal && this.state.moneyInputVal !="00.00")}
                        onTap={this.inputConfirm.bind(this)}>确认</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}