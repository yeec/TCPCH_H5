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
import MbankFinanceRiskLevel from '../Finance-riskLevelInput/mbank-finance-risk-level/index.web.js';
import MbankFinanceRiskLevelHeader from '../Finance-riskLevelInput/mbank-finance-risk-level-header/index.web.js';

export default class MbankFinanceRiskLevelInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cusRiskLev: ""
        };
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        //title-bar标题更新
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "行内风险评估",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
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
                sceneCode: "FA03",
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
                quesNo: '0'
            }
        }).then((res) => {
            if(res.rspBody.cusRiskLev == '' || res.rspBody.cusRiskLev == null ||res.rspBody.cusRiskLev == undefined){
                let alertDict= {
                    title: "错误提示",
                    msg: "您未进行个人行内风险等级评估，首次购买请至我行柜面办理",
                    success_text: "确认",
                    success:this.nextStip.bind(this)
                }
                Common.showAppDialogAlert(alertDict);
                return
            }else{
                this.setState({
                    cusRiskLev:res.rspBody.cusRiskLev
                })
            }
        })
    }

    nextStip = () =>{
        Common.setUrl('finance/index.html')
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
        const name10 = $("input[name='10']:checked").val();

        if (!name1 || !name2 || !name3 || !name4 || !name5 || !name6 || !name7 || !name8 || !name9 || !name10) {
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
                sceneCode: "FA03",
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
                quesNo: "0",
                answerInfo: "|"
                + 1 + ":" + name1 + "|"
                + 2 + ":" + name2 + "|"
                + 3 + ":" + name3 + "|"
                + 4 + ":" + name4 + "|"
                + 5 + ":" + name5 + "|"
                + 6 + ":" + name6 + "|"
                + 7 + ":" + name7 + "|"
                + 8 + ":" + name8 + "|"
                + 9 + ":" + name9 + "|"
                + 10 + ":" + name10 + "|",
            }
        }).then((res) => {
            //接口数据存入 Session
            if(Common.returnResult(res.rspHead.returnCode)){  //客户首次风评应在柜面
                Common.addSessionData(API.SESSION_CUSTOM_RISK_LEVEL, JSON.stringify(res.rspBody));
                //跳转至结果页面
                Common.setUrl('finance-riskLevelResult/index.html');
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
                <MbankFinanceRiskLevelHeader cusRiskLev={this.state.cusRiskLev}/>
                <MbankFinanceRiskLevel.Group keyNo="1" question="您的年龄是？">
                    <MbankFinanceRiskLevel idNo="A" keyNo="1" select="18-30岁"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="1" select="31-50岁"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="1" select="51-60岁"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="1" select="高于60岁"/>
                    {/*<MbankFinanceRiskLevel idNo="E" keyNo="1" select="18岁以下"/>*/}
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="2" question="您的家庭收入为（折合人民币）？">
                    <MbankFinanceRiskLevel idNo="A" keyNo="2" select="5万以下"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="2" select="5-20万元"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="2" select="20-50万元"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="2" select="50-100万元"/>
                    <MbankFinanceRiskLevel idNo="E" keyNo="2" select="100万元以上"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="3" question="一般情况下，在您每年的家庭收入中可用于金融投资（储蓄存款除外）的比例为">
                    <MbankFinanceRiskLevel idNo="A" keyNo="3" select="小于10%"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="3" select="10%-25%"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="3" select="25%-50%"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="3" select="大于50%"/>
                </MbankFinanceRiskLevel.Group>


                <MbankFinanceRiskLevel.Group keyNo="4" question="以下哪项最能说明您的投资经验">
                    <MbankFinanceRiskLevel idNo="A" keyNo="4" select="除存款、国债外，我几乎不投资其他金融产品"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="4" select="大部分投资于存款、国债等，较少投资于股票、基金等风险产品"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="4" select="资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="4" select="大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="5" question="您投资股票、基金、外汇、金融衍生产品等风险投资品的经验为">
                    <MbankFinanceRiskLevel idNo="A" keyNo="5" select="没有经验"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="5" select="少于2年"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="5" select="2-5年"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="5" select="5-8年"/>
                    <MbankFinanceRiskLevel idNo="E" keyNo="5" select="8年以上"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="6" question="以下哪项描述最符合您的投资态度">
                    <MbankFinanceRiskLevel idNo="A" keyNo="6" select="厌恶风险，不希望本机损失，希望获得稳定回报"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="6" select="保守投资，不希望本机损失，愿意承担一定幅度的收益波动"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="6" select="寻求资金的较高收益和成长性，愿意为此承担有限本金损失"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="6" select="希望专区高回报，能接受为期较长期间的负面波动，包括损失本金"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="7"
                                             question="如果您要参与投资理财，您打算购买理财产品（含基金，下同）的资金占个人净资产（计算净资产时，不包括自用住宅和私营企业等事业资产；但包括储蓄、现有投资组合、房地产投资、人寿保险、固定收入，减去债务如房屋贷款、贷款、应用卡账单等）的百分比是">
                    <MbankFinanceRiskLevel idNo="A" keyNo="7" select="75%以上"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="7" select="51%-75%"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="7" select="25%-50%"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="7" select="25%以下"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="8" question="您计划的投资期限是">
                    <MbankFinanceRiskLevel idNo="A" keyNo="8" select="1年以下，我可能会随时动用投资资金，对其流动性要求比较高"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="8" select="1-3年，为或得满意的收益，我短期内不会动用投资资金"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="8" select="3-5年，我会在相对较长的一段时间内进行投资，对流动性要求较低"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="8" select="5年以上，为达到理财目标，我会持续进行投资"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="9" question="您的投资目的与期望值是">
                    <MbankFinanceRiskLevel idNo="A" keyNo="9" select="资产保值，与银行同期存款利率大体相同"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="9" select="资产稳健增长，略高于银行定期存款利率"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="9" select="资产迅速增长，远超银行定期存款利率"/>
                </MbankFinanceRiskLevel.Group>

                <MbankFinanceRiskLevel.Group keyNo="10" question="您投资产品的价值储蓄何种程度的波动时，您会呈现明显的焦虑">
                    <MbankFinanceRiskLevel idNo="A" keyNo="10" select="本机无损失，但收益未达预期"/>
                    <MbankFinanceRiskLevel idNo="B" keyNo="10" select="出现轻微本金损失"/>
                    <MbankFinanceRiskLevel idNo="C" keyNo="10" select="本金10%以内的损失"/>
                    <MbankFinanceRiskLevel idNo="D" keyNo="10" select="本金20%-50%的损失"/>
                </MbankFinanceRiskLevel.Group>

                <WhiteSpace size="lg"/>
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.getFinanceRiskLevel.bind(this)}>确认</Button>
                </WingBlank>
                <WhiteSpace size="lg"/>
            </div>
        )
    }
}