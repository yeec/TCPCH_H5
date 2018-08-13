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
export default class MbankLifeElectricityConfirm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //电费查询返回
            queryList:[],
            sttReturn: "",  //状态编码返回
            numberReturn: "",   //用户名返回
            bureauReturn: "",    //供电单位编号返回
            payAccountShow: [],
            cipher: ""
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
        let payAccount = JSON.parse(Common.getSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_ACCOUNT));

        that.setState({
            queryList: queryListReturn,
            payAccountShow: payAccount
        });
    }

    //验证密码
    showKeyBoard(){        
        this.setState({
            cipher: ""
        });
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            hint:"请输入交易密码",
            type: "tradePsw",
            cancel: "cancel",
            success: (res) => {
                let jsons = JSON.parse(res);
                let a = "";
                for (var i = 0; i < jsons.pswLength; i++) {
                    a = a + "2"
                }
                this.setState({
                    cipher: jsons.pswText
                })

                this.nextStepButton();    //转账接口
        }
    })}


    //点击下一步按钮,缴费
    nextStepButton = () =>{
        let number = this.state.queryList.number;		//用户编号
        let bureau = this.state.queryList.bureau;		//代收单位编号
        let balance = this.state.queryList.balance;		//缴款金额
        let payAccNo = this.state.queryList.payAccNo;		//付款账号
        let debitAccount = this.state.queryList.debitAccount;		//借方帐号
        let password = this.state.queryList.cipher;		//付款账号密码

        $Fetch(API.API_PAY_ELECTRICITY_FEE,{
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "LI02",
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
                number: number,
                bureau: bureau,   
                balance: balance,     
                payAccNo: payAccNo,
                debitAccount: debitAccount,
                cipher: password
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                alert(res.rspHead.returnCode)
                this.setState({
                    sttReturn: res.rspBody.stt,
                    numberReturn: res.rspBody.number,
                    bureauReturn: res.rspBody.bureau
                })
            }
        })
        Common.setUrl('electricity-payFeesResult/index.html');
    }


    render() {
        let queryListShow = this.state.queryList;
        let payAccountList = this.state.payAccountShow;
        return (
            <div>
                <WhiteSpace size="sm" />
                <List.Group>
                    <List title="客户余额" description={'￥'+Common.setMoneyFormat(queryListShow.balance)+'元'} />
                    <List title="客户名称" description={queryListShow.name} />
                    <List title="缴费单位编号" description={queryListShow.bureau} />
                    <List title="用户编号" description={queryListShow.number} />
                    <List title="用电地址" description={queryListShow.address} />
                    <List title="本次应缴金额" description={'￥'+Common.setMoneyFormat(queryListShow.sum)+'元'} />
                    <List title="应缴电费笔数" description={'￥'+Common.setMoneyFormat(queryListShow.count)+'元'} />
                    <List title="付款账号" description={payAccountList.accountValue} />
                </List.Group>
                <WhiteSpace size="sm" />

                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.showKeyBoard.bind(this)}>确认</Button>
                </WingBlank>

            </div>
        )
    }
}