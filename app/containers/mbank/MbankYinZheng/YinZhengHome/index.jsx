import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router';
import ContextDecorator from '../../../../util/decorator/context-decorator';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import Common from "../../../../util/common.jsx";
import $Fetch from '../../../../fetch/fetch.js';
import $native from '../../../../native/native';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import Modal from '../../../../components/Base/modal/index.web.js';
//当前页面子组件
import YinZhengAccountList from './yinzheng-account-list/index.web.js';

@ContextDecorator
export default class YinZheng extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // 定义数据state格式
            list:[]
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "银证转账",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });
        // 获取第三方存款账户列表数据
        $Fetch(API.API_YINZHENG_LIST, {
            //默认固定上送报文
            reqHead:{
                //场景编码
                sceneCode:"0001",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode:"1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType:"1",
                //交易标识 1-主，2-副
                flag:"1",
                //服务接口版本号 1.0.0
                serviceVersion:"1.0.0"
            },
            // 交易上送报文
            data: {}
        }).then((res) => {
            //接口返回数据及操作 
            // 判断是否开通第三方存款账户
            if( 1 !== 1 ){
                //没有开通返回首页
                let alertDict = {
                    title: "信息提示",
                    msg: "尊敬的用户，您尚未签约第三方存管业务，请您至我行柜台或个人网银进行签约!",
                    success_text: "确认",
                    success: that.goToIndexPage.bind(this)
                }
                Common.showAppDialogAlert(alertDict);
            }else{
                this.setState({
                    list: res.List
                })
                
            }
        })
    }
    //跳转客户端首页
    goToIndexPage(){
        hashHistory.push('/#')
    }
    //跳转交易页面
    GoTransactionPage = (item) => {
        let params = {
                //银行账号
                bankAccount:item.bankAccount,
                //理财账号
                financialAccount:item.financialAccount,
            }
        // 获取当前账号信息传入session
        Common.addSessionData(API.SESSION_YINZHENG_ACCOUNT_INFO, JSON.stringify(params));
        // 判断交易类型跳转页面
        Modal.actionsheet({
            items: ['银行转证券', '证券转银行', '取消'],
            // titleText: '请选择转账方式',
            cancelIndex: 2
        }, function (key) {
            // 判断选择类型
            switch (key){
                case 0:
                //银转证交易
                hashHistory.push('/YinZhuanZheng')
                break;
                case 1:
                //证转银交易
                hashHistory.push('/ZhengZhuanYin')
                break;
            }
        });
    }
    /**** 接口字段说明 

        bankAccount             //银行账户（银行账号）
        accountPwd              //交易密码
        transactionAmount       //交易金额
        financialAccount        //理财账号
        financialAccountPwd     //理财账号密码
        capitalAccountPwd       //资金账户密码
        usableBalance           //可用余额
        AccountType             //业务类别
        BrokerName              //券商名称
    
    ****/
    render() {
        // 声明当前list=this.state
        const {
            list
        } = this.state;
        let that=this;
        return (
            <div> 
                <WhiteSpace size="md"/>
                <YinZhengAccountList.Group>
                {
                    list.map(function (item, index) {
                        return <YinZhengAccountList
                            bankAccount={item.bankAccount}
                            AccountType={item.AccountType}
                            BrokerName={item.BrokerName}
                            financialAccount={item.financialAccount}
                            key={index}
                            type={index}
                            MethodFn={that.GoTransactionPage}
                            item={item}
                        />

                    })
                }
                </YinZhengAccountList.Group>
            </div>
        )
    }
}