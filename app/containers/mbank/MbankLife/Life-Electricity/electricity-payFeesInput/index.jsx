import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import $Fetch from '../../../../../fetch/fetch.js';
import Common from "../../../../../util/common.jsx";
import ContextDecorator from '../../../../../util/decorator/context-decorator';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
import Input from '../../../../../components/Base/input-list/index.web.jsx';
import List from '../../../../../components/Base/list/index.web.js';
//业务组件

@ContextDecorator
export default class MbankLifeElectricityInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountList:[],
            //账户姓名
            customerName: '',
            //选择的付款账号
            demandAccount: [],
            //电费查询返回
            queryList:[],
            //付款账号
            account:"",
            moneyInputVal:"",
            // 当前的选择的账户
            currentAccount: {},
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "缴电费",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        let queryListReturn = JSON.parse(Common.getSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_MESSAGE));
        that.setState({
            queryList: queryListReturn
        });

        // 获取付款账户列表
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "LI03",
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
                let list = [];
                let cname = '';
                res.rspBody.returnList.map(function (item, index) {
                    if (item.alias == "") {
                        cname = res.rspBody.customerName;
                    } else {
                        cname = item.alias;
                    }
                    list.push({
                        label: Common.setAccountNum2(item.acNo,true) + '(' + cname + ')',
                        value: item.acNo
                    })
                });

                // state 转账账户列表
                this.setState({
                    accountList: list
                })
   
                // 获取当前账户
                that.state.accountList.map(function (item, i) {
                    item.now = '0';
                    if (i === 0) {
                        item.now = '1';
                        that.setState({
                            currentAccount: item
                        })
                    }
                })
                console.log(that.state.currentAccount)
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

    // 金额
    setMoneyinputval(val) {
        let that = this;
        that.setState({
            moneyInputVal: val
        })
    }
    
    // 选择转入账户
    showAccountListBox(value, label) {
        this.setState({
            demandAccount: label
        })
    }

    //点击下一步按钮
    nextStepButton = () =>{
        //传账号给录入页面
        Common.removeSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_ACCOUNT,"");
        Common.addSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_ACCOUNT, JSON.stringify({
            accountValue: this.state.currentAccount.value,
            moneyValue: this.state.moneyInputVal
        }));
alert(this.state.currentAccount.value+"还未点击账号就有账号了")
alert(this.state.moneyInputVal)
        //校验输入金额必须大于应缴金额
        if (Number(this.state.queryList.sum) > Number(this.state.moneyInputVal)) {
            // 调取客户弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "缴费金额必须大于应缴金额！",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return false;
        }else{
            Common.setUrl('electricity-payFeesConfirm/index.html');
        }
    }


    render() {
        let queryListShow = this.state.queryList;
        // let CurrentAccount = this.state.currentAccount;
        // let currentAno = CurrentAccount.acNo;
        // alert(currentAno)
        return (
            <div>
                <WhiteSpace size="sm" />
                <List.Group>
                    <List title="客户余额" description={'￥'+Common.setMoneyFormat(queryListShow.balance)+'元'} />
                    <List title="客户名称" description={queryListShow.name} />
                    <List title="缴费单位编号" description={queryListShow.bureau} />
                    <List title="用户编号" description={queryListShow.number} />
                    <List title="用电地址" description={queryListShow.address} />
                    <List title="本次应缴金额" description={queryListShow.sum} />
                    <List title="应缴电费笔数" description={queryListShow.count} />
                </List.Group>
                <WhiteSpace size="sm" />
                
                <Input.Group>
                    <Input placeholder="请输入缴费金额" value={this.state.moneyInputVal} labelNumber={7} type="money" id="keyboardNumber"
                        maxLength="11" rightExtra="true" onChange={this.setMoneyinputval.bind(this)}
                    >缴费金额</Input>
                    <Input.Click
                        cols="1"
                        cellTitle="付款账号列表"
                        labelNumber={7}
                        placeholder="选择付款账号列表"
                        title="付款账号列表"                        
                        items={this.state.accountList}
                        onChange={this.showAccountListBox.bind(this)}                        
                        value={this.state.demandAccount}
                        data={this.state.accountList}
                    />
                </Input.Group>
                <WhiteSpace size="sm" />

                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" disabled={Common.judgeEmpty(this.state.currentAccount.value)} onTap={this.nextStepButton.bind(this)}>下一步</Button>
                </WingBlank>

            </div>
        )
    }
}