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
export default class MbankLifeSocialSecurityConfirm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            company:"",
            electricityComp: {
                titles: '普通到账',
                value: '51520'
            },
            queryListShow:[],
            accountValueShow: "",
            securityMap: ""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "社保缴费确认",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        let queryList = JSON.parse(Common.getSessionData(API.SESSION_LIFE_QUERY_SECURITY_BACK));
        let accountValue = JSON.parse(Common.getSessionData(API.SESSION_LIFE_SECURITY_QUERY_ACCOUNT));
        let securityList = JSON.parse(Common.getSessionData(API.SESSION_LIFE_SECURITY_QUERY_INPUT));
        console.log(queryList)
        that.setState({
            queryListShow: queryList,
            accountValueShow: accountValue,
            securityMap: securityList
        })
    }

    // 选择转入账户
    showAccountListBox(value, label) {
        this.setState({
            company: label
        })
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

                this.nextStepButton();    //社保缴费
        }
    })}


    //点击下一步按钮社保缴费
    nextStepButton = () =>{
        let aaa027 = "513401";		//社保机构编码
        let aff002 = "C1079951000034";		//银行网点
        let aae011 = "MBOP";		//银行经办人
        let aaz010 = this.state.securityMap.aaz010;		//当事人信息
        let aae140_110 =this.state.securityMap.aae140_110;		//是否缴纳城职基本养老保险
        let aae140_310 =this.state.securityMap.aae140_310;		//是否缴纳城职基本医疗保险
        let aae140_313 =this.state.securityMap.aae140_313;		//是否缴纳城职重病医疗保险
        let aae140_330 =this.state.securityMap.aae140_330;		//是否缴纳城职补充医疗保险
        let aae140_390 =this.state.securityMap.aae140_390;		//是否参加城乡基本医疗保险
        let aae140_391 =this.state.securityMap.aae140_391;		//是否参加城乡补充医疗保险
        let yic016 = this.state.accountValueShow.payGrade;		//缴费档次
        let aae041 = this.state.accountValueShow.payStartTime;		//缴费开始时间
        let aae042 = this.state.accountValueShow.payEndTime;		//缴费结束时间
        let aae013 = "";		//其他缴费人员姓名
        let payeeAccountNo = this.state.accountValueShow.account;		//付款账号
        let cipher = this.state.cipher;		//付款账号密码

        //社保缴纳
        $Fetch(API.API_PAY_SECURITY, {
        //默认固定上送报文
        reqHead: {
            //场景编码
            sceneCode: "LI05",
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
            aaa027: aaa027,
            aff002: aff002,
            aae011: aae011,
            aaz010: aaz010,
            aae140_110: aae140_110,
            aae140_310: aae140_310,
            aae140_313: aae140_313,
            aae140_330: aae140_330,
            aae140_390: aae140_390,
            aae140_391: aae140_391,
            yic016: yic016,
            aae041: aae041,
            aae042: aae042,
            aae013: aae013,
            payeeAccountNo: payeeAccountNo,
            cipher: cipher
        }
    }).then((res) => {
        // if (Common.returnResult(res.rspHead.returnCode)) {
            Common.removeSessionData(API.SESSION_LIFE_SECURITY_PAY, "");
            Common.addSessionData(API.SESSION_LIFE_SECURITY_PAY, JSON.stringify(res));
            Common.setUrl('socialSecurity-payFeesResult/index.html');
        
            // 弹出错误信息
            // let alertDict = {
            //     title: "错误提示",
            //     msg: res.rspHead.returnMsg,
            //     success_text: "确认"
            // }
            // Common.showAppDialogAlert(alertDict);
        
    });

    }


    render() {
        let queryListShow = this.state.queryListShow;
        return (
            <div>
                <WhiteSpace size="sm" />
                <List.Group>
                    <List title="姓名" description={queryListShow.aac003} />
                    <List title="应缴金额" description={'￥'+Common.setMoneyFormat(queryListShow.aae019)+'元'} />
                    <List title="社保机构编码" description={queryListShow.aaa027} />
                    <List title="个人编码" description={queryListShow.aac001} />
                    {/* <List title="社保单据号" description={queryListShow.aae072} /> */}
                    <List title="付款账号|户名" description={this.state.accountValueShow.account+'|'+this.state.accountValueShow.name} />
                    <List title="社保收款账号" description="04050309000002968" />
                    <List title="社保收款户名" description="四川西昌电力股份有限公司"/>
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