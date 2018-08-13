import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
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
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web';
import MbankPublicConfirm from '../../../../../app/components/mbank/mbank-public-confirm-info/index.web';
import MbankPublicInputMoney from '../../../../components/mbank/mbank-public-input-money/index.web.jsx';


export default class DingZhuanHuo extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            accountList: [],
            // 选择的转入账户
            account: [],
            // 列表传过来的转出账户号
            accountNo: '',
            // 详情按钮禁用状态
            buttonDetailDisabled: true,
            // 交易密码
            pwd: "",
            // 上送交易密码
            realPwd: "",
            // 定转活接口成功返回对象
            successInfo: {},
            // 详情接口成功返回-定期详情
            info: {},
            // 按钮禁用状态
            buttonDisabled: true,
            // 接口返回码
            returnCode: '',
            // 接口返回信息
            returnMsg: '',
            moneyInputVal: "",
        }
    }

    componentDidMount() {
        
        let that = this;
        let successFun = () => {
            if ($(that.refs.myInput).css('display') == 'block') {
                window.history.go(-1)
            } else if ($(that.refs.myConfirm).css('display') == 'block') {
                $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                    title: "定活互转",
                    leftButton: {
                        exist: 'true',
                        closeFlag: 'false',
                        success: successFun
                    }
                });
                $(that.refs.myConfirm).hide();
                $(that.refs.myInput).show();
            } else {
                window.history.go(-1)
            }
        }
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "定活互转",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: successFun
            }
        });
        // state 账户
        that.setState({
            accountNo: JSON.parse(Common.getSessionData(API.SESSION_SAVING_REGULAR_AC_NO)).acNo
        })
        // 定活互转列表-详情接口
        $Fetch(API.API_QUERY_REGULAR_Detail, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "SA04",
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
                accountNo: JSON.parse(Common.getSessionData(API.SESSION_SAVING_REGULAR_AC_NO)).acNo,
                childDoor: JSON.parse(Common.getSessionData(API.SESSION_SAVING_REGULAR_AC_NO)).iseq,
            }
        }).then((res) => {
            // 判断返回结果
            if (Common.returnResult(res.rspHead.returnCode)) {
                that.setState({
                    info: res.rspBody
                })
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
                    accountList: list
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

    // 选择转入账户
    showAccountListBox(value,label) {
        this.setState({
            account: label
        })
    }
    // 显示确认页面
    toSavingDraw() {
        // let date = new Date();
        // let Year = date.getFullYear(); //获取完整的年份(4位)
        // let Month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        // let dateri = date .getDate(); //获取当前日(1-31)
        // let dqdate = Year.toString() + Month.toString() + dateri.toString()
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

        if (JSON.parse(Common.getSessionData(API.SESSION_SAVING_REGULAR_AC_NO)).cpzh != "WYCD0000") {
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
                
            }
            Common.showAppDialogAlert(alertDict1);
            return false;
        }
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
        const {
            info
        } = that.state;
        if (that.state.pwd.length != 6) {
            // 弹出错误信息
            let alertDict = {
                title: "错误提示",
                msg: '请输入您设置的6位定期交易密码',
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }
        
        // 定转活接口
        $Fetch(API.API_SET_DING_ZHUAN_HUO, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "SA03",
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
                transAmount: info.amount,//交易金额
                cipher: that.state.realPwd,//交易密码
                turnInAccNo: that.state.account//转入帐号
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
                param.successInfo = Common.returnResult(res.rspHead.returnCode) ? res.rspBody.regularToCurrent : '';
                that.setState(param)
                // 隐藏录入页面
                $(that.refs.myConfirm).hide();
                // 显示结果页面
                $(that.refs.myResult).show();
            }
        });
    }

    // 跳转储蓄服务首页
    toSavingType() {
        Common.setUrl("saving/index.html");
    }
    /**** 接口字段说明 

    注：无特殊说明字段均为 String 类型 
        term: 存期
        openDate: 开户日期 
        endDate: 到期日期
        amount: 支取金额
        rate: 利率
        accountNo: 转出账户
        account: 转入账户

    */

    //金额框取值
    setMoneyinputval(val) {
        let that = this;

        that.setState({
            moneyInputVal: val
        })
    }

    render() {
        const {
            info,
            successInfo
        } = this.state;
        let term = '';
        switch (info.term) {
            case 'M3': term = '三个月'; break;
            case 'M6': term = '六个月'; break;
            case 'Y1': term = '一年'; break;
            case 'Y2': term = '两年'; break;
            case 'Y3': term = '三年'; break;
            case 'Y5': term = '五年'; break;
        }
        return (
            <div>
                <div ref="myInput">
                    <WhiteSpace size="sm" />
                    <List.Group>
                        <List title="定期账户" description={this.state.accountNo} />
                        <List title="账户本金" isMoneyDescription={true} description={formatMoney(info.amount, { symbol: '￥' })} />
                    </List.Group>
                    <WhiteSpace size="sm" />
                    <List.Group>
                        <List title="存期" description={term} />
                        <List title="利率" description={Number(info.interestRate).toString() + "%"} />
                        <List title="开户日期" description={moment(info.openDate).format('YYYY-MM-DD')} />
                        <List title="到期日期" description={moment(info.endDate).format('YYYY-MM-DD')} />
                        <List title="转存方式" description={info.flag == 9 ? '自动转存' : '不转存'} />
                    </List.Group>
                    <WhiteSpace size="sm" />


                    <MbankPublicInputMoney
                        inputid="savingInputMoney"
                        inputName='支取金额'
                        placeholder='请输入支取金额'
                        finalval={this.setMoneyinputval.bind(this)}
                        value={this.state.moneyInputVal}
                        allMoney={info.amount}
                        limitFlag={false}
                        showAllMoney={info.amount}
                        showButtonFlag={true}
                        pageMove='300'
                        showAll={true}
                    />
                <WhiteSpace size="sm" />


                    <Input.Group>
                        {/* <Input.Pick title="转入账户" labelNumber={6}
                            data={this.state.accountList}
                            cols="1"
                            placeholder="选择转入账户"
                            onChange={this.showAccountListBox.bind(this)}
                            value={this.state.account}
                        /> */}

                        <Input.Click
                            cols="1"
                            cellTitle="转入账户"
                            labelNumber={6}
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
                        <Button type="primary" size="default" onTap={this.toSavingDraw.bind(this)} disabled={this.state.buttonDetailDisabled}>支取</Button>
                    </WingBlank>
                </div>
                <div ref="myConfirm" style={{ display: "none" }}>
                    <div className="savings-zhiququereng-democode">
                        <MbankPublicResult Small title="支取金额" money={info.amount + ".00"} />
                        <div className="savings-zhiququereng-boder"></div>
                        <WhiteSpace size="sm" />
                        <MbankPublicConfirm.Group>
                            <MbankPublicConfirm title="转出账户" content={this.state.accountNo} />
                            <MbankPublicConfirm title="存期" content={term} />
                            <MbankPublicConfirm title="利率" content={Number(info.interestRate).toString() + "%"} />
                            <MbankPublicConfirm title="开户日期" content={moment(info.openDate).format('YYYY-MM-DD')} />
                            <MbankPublicConfirm title="到期日期" content={moment(info.endDate).format('YYYY-MM-DD')} />
                            <MbankPublicConfirm title="转存方式" content={info.flag == 9 ? '自动转存' : '不转存'} />
                            <MbankPublicConfirm title="转入账户" content={this.state.account} />
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
                                <MbankPublicResult type="success" title="支取成功" money={info.amount + ".00"} />
                                <WhiteSpace size="sm" />
                                <div className="savings-zhiququereng-boder"></div>
                                <MbankPublicConfirm.Group>
                                    <MbankPublicConfirm title="本金" content={Common.setNumberFormat(successInfo.principal)} />
                                    <MbankPublicConfirm title="定期开户日" content={moment(successInfo.openDate).format('YYYY-MM-DD')} />
                                    <MbankPublicConfirm title="余额" content={formatMoney(successInfo.balance, { symbol: '￥' }) + '元'} />
                                    <MbankPublicConfirm title="支取日期" content={moment(successInfo.drawDate).format('YYYY-MM-DD')} />
                                    <MbankPublicConfirm title="利息" content={Common.setNumberFormat(successInfo.interest) + '元'} />
                                    <MbankPublicConfirm title="利息税" content={Common.setNumberFormat(successInfo.interestTax) + '元'} />
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
                        <Button type="primary" size="default" onTap={this.toSavingType.bind(this)}>返回储蓄服务</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }

}
