import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $ from 'jquery';
//API数据接口
import API from '../../../../../constants/api'
//公共方法
import $native from '../../../../../native/native';
import $Fetch from '../../../../../fetch/fetch.js';
import Common from "../../../../../util/common.jsx";
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
//业务组件
import MbankFinanceRiskOutLevel from '../Finance-riskLevelInput-out/mbank-finance-risk-out-level/index.web.js';
import MbankFinanceRiskLevelOutHeader from '../Finance-riskLevelInput-out/mbank-finance-risk-level-out-header/index.web.js';

export default class MbankFinanceRiskLevelOutInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cusRiskLev: ""
        };
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    //跳转首面
    goback = () =>{
        Common.setUrl('finance/index.html');
    }
    
    componentDidMount() {
        let that = this;
        //title-bar标题更新
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "行外风险评估",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success:this.goback
            }
        });

        //风险评估查询

        /*
         cusName	客户名称
         creType	客户证件类型
         creNum		客户证件号码
         quesNo		题号


         cusRiskLev			风评等级
         riskExpiDate	    风评失效日期
         cusType			客户类型
         cusName			客户名称
         creType			客户证件类型
         creNum			客户证件号码
         remark			备注
         */
        $Fetch(API.API_QUERY_CUSTOM_RISK_LEVEL_RESULT, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA02",
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
                quesNo: '1'
            }
        }).then((res) => {
            this.setState({
                cusRiskLev:res.rspBody.cusRiskLev
            })

        })
    }

    //风险等级评估
    getFinanceRiskLevel = () => {
        const name1 = $("input[name='1']:checked").val();
        const name2 = $("input[name='2']:checked").val();
        const name3 = $("input[name='3']:checked").val();
        const name4 = $("input[name='4']:checked").val();
        const name5 = $("input[name='5']:checked").val();
        const name6 = $("input[name='6']:checked").val();
        const name7 = $("input[name='7']:checked").val();
        const name8 = $("input[name='8']:checked").val();
        const name9 = $("input[name='9']:checked").val();

        if (!name1 || !name2 || !name3 || !name4 || !name5 || !name6 || !name7 || !name8 || !name9) {
            let alertDict = {
                title: "信息提示",
                msg: "请选择所有题目",
                success_text: "确认",
            }
            Common.showAppDialogAlert(alertDict);
            return;
        }
        // 获取理财风险等级
        $Fetch(API.API_GET_CUSTOM_RISK_LEVEL_RESULT, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA02",
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
                quesNo: "1",
                answerInfo: "|"
                + 1 + ":" + name1 + "|"
                + 2 + ":" + name2 + "|"
                + 3 + ":" + name3 + "|"
                + 4 + ":" + name4 + "|"
                + 5 + ":" + name5 + "|"
                + 6 + ":" + name6 + "|"
                + 7 + ":" + name7 + "|"
                + 8 + ":" + name8 + "|"
                + 9 + ":" + name9 + "|",
            }
        }).then((res) => {
            //接口数据存入 Session
            if(Common.returnResult(res.rspHead.returnCode)){  //客户首次风评应在柜面
                Common.addSessionData(API.SESSION_CUSTOM_RISK_LEVEL, JSON.stringify(res.rspBody));
                //跳转至结果页面
                Common.setUrl('finance-riskLevelResultOut/index.html');
            }else{
                let alertDict={
                    title: "错误提示",
                    msg: res.rspHead.returnMsg + ""+res.rspHead.returnCode ,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
                Common.setUrl('finance/index.html');                
            }
        })
    };

    render() {
        return (
            <div>
                <MbankFinanceRiskLevelOutHeader cusRiskLev={this.state.cusRiskLev}/>
                <MbankFinanceRiskOutLevel.Group keyNo="1" question="您的年龄是？">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="1" select="高于65岁（含）（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="1" select="51岁-64岁（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="1" select="18岁-30岁（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="1" select="31岁-50岁（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="2" question="您的家庭年收入（折合人民币）为？">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="2" select="10万元（含）以下（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="2" select="10-30万元（含）（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="2" select="30-100万元（含）（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="2" select="100万元以上（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="3" question="在您的家庭年收入中，计划用于金融投资（储蓄存款除外）的比例为">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="3" select="10%（含）以下（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="3" select="10%-25%（含）（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="3" select="25%-50%（含）（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="3" select="50%以上（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="4" question="您的投资经验可以被描述为">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="4" select="基本无投资经验。仅有银行存款经历（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="4" select="有限投资经验。除拥有银行存款外，还投资过国债、货币市场基金、债券型基金和银行保本型理财产品等低风险金融产品（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="4" select="一般投资经验。除上述金融产品外，还投资过混合型基金、信托融资类银行理财产品等中等风险的金融产品（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="4" select="丰富投资经验。除上述金融产品外，还投资过外汇、股票、股票型基金等较高风险的金融产品。投资经验丰富，并倾向于自己作出投资决定（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="5" question="您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="5" select="没有经验（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="5" select="少于2年（含）（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="5" select="2至5年（含）（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="5" select="5年以上（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="6" question="您对风险的态度是">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="6" select="厌恶风险，不希望本金损失，希望获得稳定回报（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="6" select="可以承受有限风险，保守投资，愿意承担一定幅度的收益波动（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="6" select="可以承受较高风险，寻求较高收益，愿意为此承担有限本金损失（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="6" select="不介意风险，愿意承担为期较长期间的投资的负面波动（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="7" question="您的投资目的与收益期望值是">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="7" select="在本金安全的情况下，投资收益必须达到我的最低要求，例如同期定期存款收益（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="7" select="在本金安全或者本金损失可能性极低的情况下，我愿意接受投资收益适当的波动，以便有可能获得大于同期存款的收益（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="7" select="在本金安全或者有较大保障的情况下，我愿意接受投资收益的波动，以便有可能获得大于同期存款的收益（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="7" select="愿意承担一定风险，以平衡的方式，寻求一定的资金收益和成长性（6分）"/>
                    <MbankFinanceRiskOutLevel idNo="E" keyNo="7" select="为获得一定的投资回报，愿意承担投资产品市值较大波动导致本金损失的风险（8分）"/>
                    <MbankFinanceRiskOutLevel idNo="F" keyNo="7" select="以获得高投资回报为目的，愿意承担投资产品市值高波动性而导致本金大比例损失的风险（10分）"/>                    
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="8" question="您计划的投资期限是多久">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="8" select="半年（含）以下，暂时对空闲资金进行保值操作，对其流动性要求极高（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="8" select="1半年至1年（含），我可能会随时动用投资资金，对其流动性要求较高（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="8" select="1至2年（含），为获得满意的收益，我短期内不会动用投资资金（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="8" select="2年以上，为达到理想目标，我会持续地进行投资（6分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <MbankFinanceRiskOutLevel.Group keyNo="9" question="您投资的产品价值出现何种程度的波动时，您会采取止损措施？">
                    <MbankFinanceRiskOutLevel idNo="A" keyNo="9" select="本金无损失，但收益未达到预期（0分）"/>
                    <MbankFinanceRiskOutLevel idNo="B" keyNo="9" select="本金10%（含）以内的亏损（2分）"/>
                    <MbankFinanceRiskOutLevel idNo="C" keyNo="9" select="本金10%-30%（含）的亏损（4分）"/>
                    <MbankFinanceRiskOutLevel idNo="D" keyNo="9" select="本金30%-50%（含）的亏损（6分）"/>
                    <MbankFinanceRiskOutLevel idNo="E" keyNo="9" select="本金50%以上的亏损（8分）"/>
                </MbankFinanceRiskOutLevel.Group>

                <WhiteSpace size="lg"/>
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.getFinanceRiskLevel.bind(this)}>确认</Button>
                </WingBlank>
                <WhiteSpace size="lg"/>
            </div>
        )
    }
}