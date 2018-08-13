import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { hashHistory } from 'react-router'
import ContextDecorator from '../../../../util/decorator/context-decorator';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import $Fetch from '../../../../fetch/fetch.js';
import formatMoney from '../../../../util/common/accounting-js/formatMoney.js';
import Common from "../../../../util/common.jsx";
import moment from 'moment';
import $ from 'jquery';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web';
import WingBlank from '../../../../components/Base/wing-blank/index.web';
import Button from '../../../../components/Base/button/index.web';
import Input from '../../../../../app/components/Base/input-list/index.web.jsx';
import List from '../../../../../app/components/Base/list/index.web.js';
import Modal from "../../../../components/mbank/mbank-public-select-click/mbank-public-select-modal/index.web.js";
import List1 from '../../../../components/Base/assLIst/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web';
import MbankPublicConfirm from '../../../../../app/components/mbank/mbank-public-confirm-info/index.web';



export default class JhsDingZhuanHuo extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // 转入账户
            accountList: [],
            // 选择的转入账户
            account: [],
            // 列表传过来的转出账户号
            accountNo: '',
            // 列表传过来的巨划算A,B的标志  A-JSA,B-JSB
            signFlag: '',
            // 详情按钮禁用状态
            buttonDetailDisabled: true,
            // 交易密码
            pwd: "",
            // 上送交易密码
            realPwd: "",
            // 定转活接口成功返回对象
            successInfo: {},
            // 定转活接口成功返回对象
            successInfo1: {},
            // 详情接口成功返回-定期详情
            info: {},
            // 按钮禁用状态
            buttonDisabled: true,
            // 接口返回码
            returnCode: '',
            // 接口返回信息
            returnMsg: '',
            //提前销户标记
            advanceCancelAccount: '',
            //提前销户标记列表
            advanceCancelFlagList: [
                {
                    label: '是',
                    value: '1'
                },
                {
                    label: '否',
                    value: '0'
                }
            ],
            //账户名称
            customerName: '',
            //开户方式  // 手机银行   // 柜面
            cpzh: '',
            //零存账户
            dqaccountNo: "",
            //零存账户上送
            dqaccountNoss: "",
            //零存金额
            dqamount: "",
            //收息账户
            sxaccountNo: "",
            //收息金额
            sxamount: "",
            //起始日期
            startDate: "",
            //结束日期
            endDate: "",
            customeName:"",
            cZhlx: ""
        }
    }

    componentDidMount() {
        let that = this;
        let successFun = () => {
            if ($(that.refs.myInput).css('display') == 'block') {
                // window.history.go(-1);
                Common.setUrl('invest/index.html');
            } else if ($(that.refs.myConfirm).css('display') == 'block') {
                $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                    title: "金凉山-巨划算",
                    leftButton: {
                        exist: 'true',
                        closeFlag: 'false',
                        success: successFun
                    }
                });
                $(that.refs.myConfirm).hide();
                $(that.refs.myInput).show();
            } else {
                // window.history.go(-1);
                Common.setUrl('invest/index.html');
            }
        }
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "金凉山-巨划算",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: successFun
            }
        });
        // state 账户
        that.setState({
            accountNo: JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIST_TO_DETAIL)).accountNo,
            signFlag: JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIST_TO_DETAIL)).signFlag,
            cpzh: JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIST_TO_DETAIL)).cpzh,
            cZhlx:JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIST_TO_DETAIL)).cZhlx
        })

        // 巨划算列表-详情接口
        $Fetch(API.API_QUERY_REGULAR_Detail, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN05",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
                accountNo: JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIST_TO_DETAIL)).accountNo,
                childDoor: "0"
            }
        }).then((res) => {
            let dingqi = "";

            let dingqije = "";
            let qsdate = ""
            // 判断返回结果
            if (Common.returnResult(res.rspHead.returnCode)) {

                this.setState({
                    info: res.rspBody,
                    startDate: res.rspBody.openDate,
                    endDate: res.rspBody.endDate
                })


                res.rspBody.zhResultList.map(function (item, index) {
                    dingqi = item.zeroWarpAccountNo;

                })
                if(dingqi == ""){
                    $(this.refs.account).hide();
                }
                that.setState({
                    dqaccountNo: "零整账号" + "(" + Common.setAccountNum2(dingqi) + ")",
                    sxaccountNo: "收息账号" + "(" + Common.setAccountNum2(dingqi) + ")",
                    dingqiNo:dingqi
                })
                
                this.mingxi(dingqi, res.rspBody.openDate, res.rspBody.endDate)
                
            } else {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        });


        // 获取转出账户列表
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "ZH01",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                Common.checkUnderAccount(res.rspBody.returnList);
                let list = [];
                let cname = '';
                res.rspBody.returnList.map(function (item, i) {
                    if (item.alias == "") {
                        cname = res.rspBody.customerName;
                    } else {
                        cname = item.alias;
                    }
                    list.push({
                        label: Common.setAccountNum2(item.acNo,true) + '(' + cname + ')',
                        value: item.acNo
                    });
                })
                // state 转账账户列表
                that.setState({
                    customerName: res.rspBody.customerName,
                    accountList: list,
                    customeName:cname
                });
            } else {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        });
    }

    componentDidUpdate() {
        let that = this;
        // 详情页面禁用按钮状态
        if (!(that.state.account.length == 0)) {
            that.setState({
                buttonDetailDisabled: false
            });
        } else {
            that.setState({
                buttonDetailDisabled: true
            });
        }
        // 确认页面禁用按钮状态
        if (!(that.state.pwd.length == '')) {
            that.setState({
                buttonDisabled: false
            });
        } else {
            that.setState({
                buttonDisabled: true
            });
        }
    }

    //定活互转明细查询接口
    mingxi(dqaccoun, star, end) {

        if (dqaccoun) {
            $Fetch(API.API_QUERY_REGULAR_MX, {
                //默认固定上送报文
                reqHead: {
                    //场景编码
                    sceneCode: "IN05",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode: "1",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType: "1",
                    //交易标识 1-主，2-副
                    flag: "1",
                    //服务接口版本号 1.0.0
                    serviceVersion: "1.0.0"
                },
                // 交易上送报文
                data: {
                    accountNo: dqaccoun,
                    startDate: star,
                    endDate: end,
                    pageNum: 999,
                    pageSize: 10
                }
            }).then((res) =>{
                if (Common.returnResult(res.rspHead.returnCode)){
                    this.setState({
                        dqamount:res.rspBody.sumAmt
                    })
                }
            })
        }

    }
    // 选择转入账户
    showAccountListBox(value, label) {
        this.setState({
            account: label
        })
    }
    // 是否提前销户
    advanceCancelFlag(value) {
        this.setState({
            advanceCancelAccount: value
        })
    }
    // 显示确认页面
    toSavingDraw() {

        // 获取当前日期
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        let dqdate = year.toString() + month.toString() + day.toString()
        let namdqdate = Number(dqdate)
        let that = this;
        const {
            info
        } = that.state;
        let endDate = Number(info.endDate)

        if (this.state.cpzh != "WYCD0000") {
            //弹出错误信息
            let alertDict = {
                title: "错误提示",
                msg: '尊敬的客户，您的开户渠道为柜面，请您携带相关证件至我行开户网点办理。',
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        if (namdqdate < endDate) {
            this.setState({
                advanceCancelAccount: "1"
            })
            let alertDict1 = {
                title: "错误提示",
                msg: '提前支取可能导致您的利息损失,是否确认销户',
                success_text: "确认",
                cancel_text: "取消",
                success: () => {
                    // 隐藏录入页面
                    $(this.refs.myInput).hide();
                    // 显示确认页面
                    $(this.refs.myConfirm).show();
                },
                cancel: () => {

                }
            }
            Common.showAppDialogAlert(alertDict1);
            return false;
        }
        this.setState({
            advanceCancelAccount: "0"
        })
        // 隐藏录入页面
        $(this.refs.myInput).hide();
        // 显示确认页面
        $(this.refs.myConfirm).show();
    }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码
    showKeyBoard(){
        this.setState({
            pwd:""
        })
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            cancel: "cancel",
            hint: "请输入交易密码",
            success: (res) => {
                let jsons = JSON.parse(res);
            
                let a = "";
                for(var i = 0;i<jsons.pswLength;i++){
                  a = a +"2"
                }
                this.setState({
                    pwd:a,
                    realPwd: jsons.pswText
                })
                this.savingDrawResult();
            }
        })
    }

    // 显示结果页面
    savingDrawResult() {
        let that = this;
        if (that.state.pwd.length != 6) {
            // 弹出错误信息
            let alertDict = {
                title: "错误提示",
                msg: '请输入设置的6位定期交易密码',
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        const {
            info
        } = this.state;
        // 定转活接口
        $Fetch(API.API_SET_DING_ZHUAN_HUO_NEW, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN04",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
                accountNo: that.state.accountNo,//定期账号
                paidAmount: info.amount,//支取金额
                advanceCancelAccount: that.state.advanceCancelAccount,//用户界面输入
                cipher: that.state.realPwd,//交易密码
                gotoAccount: that.state.account,//转入帐号
                gotoAccountName: that.state.customerName,//转入账户户名 ---
                withdrawWay: "2",//支取方式0--无限制 1--凭印鉴 2--凭密码 3--凭证件
                reservoirTypes: "21",//01 整存整取 14 通知存款 16 零存整取 21 存本取息 31 活期存款 32 定活两便 34 集体零整 36 整存零取 39 定期一本通 46 教育储蓄 50 活期一本通 62 存单帐户 63 结算帐户
                flag: "1",//1--存本取息销户； 2--零存整取销户；
                nowTurnFlag: "1"// 0：现金 1：转账

            }
        }).then((res) => {

            if (Common.enciperResult(res.rspHead.returnCode)) {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    success: () => {
                        that.setState({
                            pwd: '',
                            realPwd: ''
                        })
                    }
                }
                Common.showAppDialogAlert(alertDict);
            } else {
                let param = {
                    returnCode: res.rspHead.returnCode,
                    returnMsg: res.rspHead.returnMsg
                }
                param.successInfo = Common.returnResult(res.rspHead.returnCode) ? res.rspBody.closeAccount1 : '';
                param.successInfo1 = Common.returnResult(res.rspHead.returnCode) ? res.rspBody.closeAccount2 : '';


                that.setState(param)
                // 隐藏录入页面
                $(that.refs.myConfirm).hide();
                // 显示结果页面
                $(that.refs.myResult).show();
            }
        });
    }

    // 跳转储蓄服务首页
    toInvest() {
        // hashHistory.push('/MbankJhsList');
        Common.setUrl("invest/index.html");
    }

    /**** 接口字段说明 

    注：无特殊说明字段均为 String 类型 
        openDate: 开户日期 
        endDate: 到期日期
        amount: 支取金额
        rate: 利率
        accountNo: 转出账户
        account: 转入账户

    */
    //跳转到收息、零整账号明细
   skipDetail(){
        // let params = {
        //     customerName: 'aabbcc',
        //     //账户信息
        //     accInfoMap: '22',
        // };
        // 获取当前选中账号信息传入session
        // Common.addSessionData(API.SESSION_ACCOUNT_DATA, JSON.stringify(params));
        Common.addSessionData(API.SESSION_INVEST_JHS_AB_ACCOUNT, "");
        Common.addSessionData(API.SESSION_INVEST_JHS_LIXI_MESSAGE, "");
        Common.addSessionData(API.SESSION_INVEST_JHS_AB_ACCOUNT, JSON.stringify({
            accountType : "JHS",
            account : this.state.dingqiNo,
            accountName : this.state.customeName}));
            
        let accountMessage = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_AB_ACCOUNT))

        Common.addSessionData(API.SESSION_INVEST_JHS_LIXI_MESSAGE, JSON.stringify({
            accountTitle : Common.setAccountNum2(accountMessage.account,true) + '(' + accountMessage.accountName + ')',
            account : this.state.dingqiNo
        }));
        let sessionInveseLiXiMessage = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIXI_MESSAGE));
        Common.setUrl("invest-jhsQueryDetail/index.html");   
    }

    render() {

        const {
            info,
            successInfo,
            successInfo1
        } = this.state;
        // info.zhResultList.map(function(ietm,index){
        //     console.log(ietm.zeroWarpAccountNo)
        // })
        // console.log(info.)

        return (
            <div>
                <div ref="myInput">
                    <WhiteSpace size="sm" />
                    <List.Group>
                        <List title="定期账户" description={this.state.accountNo} />
                        <List title="储种" description='巨划算存本取息' />
                        <List title="存期" description='五年' />
                        <List title={this.state.signFlag == 'JSA' ? '年收益率' : '年化综合收益率'} description={Number(info.interestRate).toString() + "%"} />
                        <List title="开户日期" description={moment(this.state.info.openDate).format('YYYY-MM-DD')} />
                        <List title="到期日期" description={moment(this.state.info.endDate).format('YYYY-MM-DD')} />
                        <List title="产品类型" description={this.state.signFlag == 'JSA' ? '巨划算A款' : '巨划算B款'} />
                        <List title="金额" isMoneyDescription={true} description={formatMoney(info.amount, { symbol: '￥' })} />
                        <div ref="account">
                            {this.state.signFlag == 'JSA' ? <List1 title={this.state.sxaccountNo}
                                description={formatMoney(this.state.dqamount, { symbol: '￥' })+'元(已付)'}
                                icon={"right"}
                                styl={{ display: "none" }}
                                click={this.skipDetail.bind(this)}
                            /> : <List1 title={this.state.dqaccountNo}
                                description={formatMoney(this.state.dqamount, { symbol: '￥' })+'元'}
                                icon={"right"}
                                styl={{ display: "none" }}
                                click={this.skipDetail.bind(this)}
                                />}
                        </div>
                    </List.Group>
                    <WhiteSpace size="sm" />
                    {
                        (this.state.cZhlx == 'T2' && this.state.cpzh == 'ZHCP0000') ? null
                        : 
                        (
                        <div>
                            <Input.Group>
                            <Input.Click
                                cols="1"
                                cellTitle="转入账户"
                                labelNumber={4}
                                placeholder="选择转入账户"
                                title="转入账户"
                                items={this.state.accountList}
                                onChange={this.showAccountListBox.bind(this)}
                                value={this.state.account}
                                data={this.state.accountList}
                            />
                        </Input.Group>
                        <WhiteSpace size="lg" />
                        <WingBlank size="lg">
                            <Button type="primary" size="default" onTap={this.toSavingDraw.bind(this)} disabled={this.state.buttonDetailDisabled}>下一步</Button>
                        </WingBlank>
                        </div>
                        )
                    }
                </div>
                <div ref="myConfirm" style={{ display: "none" }}>
                    <div className="savings-zhiququereng-democode">
                        <MbankPublicResult Small title="支取金额" money={info.amount} />
                        <div className="savings-zhiququereng-boder"></div>
                        <WhiteSpace size="sm" />
                        <MbankPublicConfirm.Group>
                            <MbankPublicConfirm title="定期账户" content={this.state.accountNo} />
                            <MbankPublicConfirm title="储种" content='巨划算存本取息' />
                            <MbankPublicConfirm title="存期" content='五年' />
                            <MbankPublicConfirm title={this.state.signFlag == 'JSA' ? '年收益率' : '年化综合收益率'} content={Number(info.interestRate).toString() + "%"} />
                            <MbankPublicConfirm title="开户日期" content={moment(this.state.info.openDate).format('YYYY-MM-DD')} />
                            <MbankPublicConfirm title="到期日期" content={moment(this.state.info.endDate).format('YYYY-MM-DD')} />
                            <MbankPublicConfirm title="产品类型" content={this.state.signFlag == 'JSA' ? '巨划算A款' : '巨划算B款'} />
                            <MbankPublicConfirm title="转入账户" content={this.state.account} />
                            <MbankPublicConfirm title="销户标志" content={this.state.advanceCancelAccount == '0' ? '否' : '是'} />
                        </MbankPublicConfirm.Group>
                        <WhiteSpace size="sm" />
                        {/* <Input.Group>
                            <Input type="password" labelNumber={6} maxLength="6"
                                placeholder="请输入交易密码" value={this.state.pwd} editable={false} onClick={this.showKeyBoard.bind(this)}>交易密码</Input>
                        </Input.Group> */}
                    </div>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.showKeyBoard.bind(this)}>确认</Button>
                    </WingBlank>
                </div>
                <div ref="myResult" style={{ display: "none" }}>
                    {
                        Common.returnResult(this.state.returnCode) ?
                            <div className="savings-zhiququereng-democode">
                                <MbankPublicResult type="success" title="支取成功" money={info.amount} />
                                <WhiteSpace size="sm" />
                                <div className="savings-zhiququereng-boder"></div>
                                <MbankPublicConfirm.Group>
                                    <MbankPublicConfirm title="本金" content={Common.setNumberFormat(info.amount) + '元'} />
                                    <MbankPublicConfirm title="存本取息利息金额" content={Common.setNumberFormat(successInfo.cbqxlxje) + '元'} />
                                    {successInfo.closeFlag == "1" ? <MbankPublicConfirm title="零存整取实付本息" content={Common.setNumberFormat(successInfo1.payPrincipalInterest) + '' + '元'} /> : null}
                                    <MbankPublicConfirm title="实付本息合计" content={Common.setNumberFormat(successInfo.interestTax)} />
                                    <MbankPublicConfirm title="起息日期" content={moment(successInfo.payoutDate).format('YYYY-MM-DD')} />
                                    <MbankPublicConfirm title="到期日期" content={moment(successInfo.endDate).format('YYYY-MM-DD')} />
                                </MbankPublicConfirm.Group>
                            </div>
                            :
                            <MbankPublicResult type="error" title="支取失败"
                                message={
                                    <div>尊敬的用户，您进行的支取操作失败。
                                        <br />错误编码：<b>{this.state.returnCode}</b>
                                        <br />错误信息：<b>{this.state.returnMsg}</b>
                                    </div>
                                }
                            />
                    }

                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={this.toInvest.bind(this)}>返回巨划算首页</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }

}
