import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../constants/api';
//公共方法
import $native from './../../../../native/native';
import $Fetch from './../../../../fetch/fetch';
import Common from "../../../../util/common.jsx";
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
//业务组件
import MbankFinanceHomeHead from './mbank-finance-home-head/index.web.js';
import MbankFinanceProduct from './mbank-finance-product/index.web.js';

export default class MbankFinanceHome extends React.Component {

    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: [],
            cusRiskLev:"",
            showFlag:false
        }
    }

    //初始化生命周期
    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '理财产品',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });
        
        //返回首页
        $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON,{});

        //查询理财产品列表
        /*
        ****上送参数*****
        prdId		    产品id
        prdName		    产品名称
        establishFlag	成立标志
        prdType		    产品类型
        riskLev		    产品风险等级
        profitFlag		收益标识
        oprateType		操作类型
        sortField		根据字段排序
        sortType		排序方式
        pageNum		    查询页数
        pageSize		每页条数

         */

        $Fetch(API.API_QUERY_PRODUCT_LIST, {
            //默认固定上送报文
            reqHead:{
                //场景编码
                sceneCode:"FA01",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode:"1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType:"1",
                //交易标识 1-主，2-副
                flag:"1",
                //服务接口版本号 1.0.0
                serviceVersion:"1.0.0"
            },
            data: {
                oprateType	 : '01,02'
            }
        },true,false).then((res) => {
            if(Common.returnResult(res.rspHead.returnCode)){
                this.setState({
                    list: res.rspBody.returnList
                })
                if(res.rspHead.returnCode==='1005'){
                    let alertDict= {
                        title: "错误提示",
                        msg: "查询无数据",
                        success_text: "确认"
                    }
                    Common.showAppDialogAlert(alertDict);
                    return
                }
            }          
        })

        $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
            success: (val) => {
                if(val == '1') {
                    this.customerRiskLevel();    //客户风险等级查询
                }else{
                    this.setState({
                        showFlag:false
                    });
                }
            }
        })      
    }

    //客户风险等级查询
    customerRiskLevel(){
        /*
        ****上送参数*****
            cusName	客户名称
            creType	客户证件类型
            creNum		客户证件号码
            quesNo		题号

        *******返回参数*******
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
                    sceneCode: "FA01",
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
                    quesNo: '0',
                }
            }).then((res) => {
                    if(res.rspHead.returnCode === 'CCOE0009'){  //登录超时
                        this.setState({
                            showFlag:false
                        });
                    }else{
                        this.setState({
                            cusRiskLev: res.rspBody.cusRiskLev,
                            riskExpiDate: res.rspBody.riskExpiDate,
                            showFlag:true
                        })
                    }
            })  
    }

    render() {
        const {
            list
        } = this.state;
        return (
            <div>
                {this.state.showFlag ?
                <MbankFinanceHomeHead cusRiskLev={this.state.cusRiskLev} riskExpiDate={this.state.riskExpiDate}/> : null}
                <WhiteSpace size="sm" />
                <MbankFinanceProduct.Group>
                    {
                        list.map(function (item, index) {
                            return <MbankFinanceProduct
                                prdId={item.prdId}
                                prdNo={item.prdNo}
                                propRateMax={item.propRateMax}
                                prdName={item.prdName}
                                term={item.term}
                                ssubStartAmt={item.ssubStartAmt} //个人认购起点
                                sbuyStartAmt={item.sbuyStartAmt} //个人申购起点
                                isSub={item.isSub}
                                isBuy={item.isBuy}
                                item={item}
                                key={index}                             
                            />
                        })
                    }
                </MbankFinanceProduct.Group>
            </div>
        )
    }
}

