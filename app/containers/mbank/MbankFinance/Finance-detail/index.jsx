//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import React from 'react'

import PureRenderMixin from 'react-addons-pure-render-mixin';
import Common from "../../../../util/common.jsx";
import $Fetch from './../../../../fetch/fetch.js';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import List from '../../../../components/Base/list/index.web.js';
//业务组件
import MbankFinanceProductDetail from './mbank-finance-product-detail/index.web.js'

export default class MbankFinanceDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            ProductDetailMap: {},
            ProductsResidualAmount: {},
            list:[],
            prdIdInput:"",
            limitFlag:"",
            prdSourceFlag:"",
            historyId:false,
            buyId:"",
            subId:"",
            gobackFlag:""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    getUrl(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    }

   //返回
   goback = () => {
        if(this.state.gobackFlag === '1'){ //返回客户端首页
            $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {})
        }else{
            Common.setUrl('finance/index.html');
        }
   }
        
    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "理财产品详情",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success:this.goback
            }
        });
        let prdId = this.getUrl("prdId");
        let isBuy = this.getUrl("isBuy");
        let isSub = this.getUrl("isSub");
        let enterFlag = this.getUrl("enterFlag");

        this.setState({
            gobackFlag:enterFlag
        })

        let isHistory = false;
        if(isBuy == '0' && isSub == '0'){   //为历史产品
            isHistory = true;
        }else{
            isHistory = false;
        }
        this.setState({
            prdIdInput:prdId,
            historyId:isHistory,
            buyId:isBuy,
            subId:isSub
        });

        //调用理财详情接口查询理财详细信息
        //上送理财产品编号
        $Fetch(API.API_QUERY_PRODUCT_DETAIL, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA04",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            data: {
                prdId: prdId
            }
        }, true, false).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                //先清除session中理财详情的值
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL);
                // 获取理财详情传入session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL, JSON.stringify(res.rspBody));
                //先清除session中理财详情的值
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_RETURN);
                // 获取理财详情传入session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_RETURN, JSON.stringify(res.rspBody.returnList));
                this.setState({
                    ProductDetailMap: res.rspBody,
                    prdSourceFlag:res.rspBody.prdSource
                })

                if(!Common.judgeEmpty(res.rspBody.returnList)){
                    this.setState({        
                         list:res.rspBody.returnList
                    })  
                }

                //产品剩余额度查询
                this.queryProductsResidualAmount();
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }
        })
    }

    //产品剩余额度查询
    queryProductsResidualAmount() {
        let that = this;

        let prdIdInput = that.state.prdIdInput;

        $Fetch(API.API_QUERY_PRODUCT_SRESIDUAL_AMOUNT, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA04",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            }, data: {
                prdId: prdIdInput      //产品id
            }
        },true,false).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.setState({
                    ProductsResidualAmount: res.rspBody,
                    limitFlag:res.rspBody.limit
                })

                if((res.rspBody.limit - that.ProductDetailMap.ssubStartAmt) < 0){
                    let alertDict = {
                        title: "错误提示",
                        msg: '产品已无额度',
                        success_text: "确认"
                    }
                    Common.showAppDialogAlert(alertDict);
                    return
                }
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rsphead.returnCode,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }
        })
    }

    //校验是否登录
    queryIsLogin(){
        $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
            success: (val) => {
                if(val == '1') {
                    this.queryCustomeRiskLevel();    //客户风险等级查询
                }else{
                    $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
                }
            }
        })          
    }

    //查询客户风险等级
    queryCustomeRiskLevel() {
        //上送理财产品编号
        $Fetch(API.API_QUERY_CUSTOM_RISK_LEVEL_RESULT, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA04",
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
                quesNo: parseInt(this.state.ProductDetailMap.prdSource) - 1
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                //先清除session中客户风险等级的值
                Common.removeSessionData(API.SESSION_CUSTOM_RISK_LEVEL);
                // 获取客户风险等级信息传入session
                Common.addSessionData(API.SESSION_CUSTOM_RISK_LEVEL, JSON.stringify(res.rspBody));

                let CustomRiskLev = res.rspBody ? res.rspBody.cusRiskLev : null;
                let ProductRiskLev = this.state.ProductDetailMap.riskLev;
                let riskExpiDate = res.rspBody.riskExpiDate ? res.rspBody.riskExpiDate : null;
                let Productslimit = this.state.ProductsResidualAmount ? this.state.ProductsResidualAmount.limit : null;
                let nowDate = Common.getCurrentDate("yyyyMMdd");

                let prdSourceInput = this.state.prdSourceFlag ? this.state.prdSourceFlag: '';  //产品来源
                let prdSource='';
                if(prdSourceInput == '1'){//本行
                    prdSource='行内';
                }else if(prdSourceInput == '2'){//他行
                    prdSource='行外';
                }
                //校验客户风险评估日期
                if ((nowDate > riskExpiDate) && !Common.judgeEmpty(riskExpiDate)) {
                    // 调取弹出框提示信息
                    let alertDict = {
                        title: "错误提示",
                        msg: "风险等级过期，请进行"+prdSource+"风险等级评估",
                        cancel_text: "取消",
                        success_text: "确认",
                        success: this.goRiskLevel.bind(this)
                    };
                    Common.showAppDialogAlert(alertDict);
                    return;
                }else if (ProductRiskLev > CustomRiskLev) {
                    // 调取弹出框提示信息
                    let alertDict = {
                        title: "错误提示",
                        msg: "客户"+prdSource+"风险等级不足以购买此产品，是否重新评估",
                        success_text: "确认",
                        success: this.goRiskLevel.bind(this),
                        cancel_text: "取消",
                        cancel:this.goback.bind(this)
                    };
                    Common.showAppDialogAlert(alertDict);
                    return;
                }else if (Productslimit < this.state.ProductDetailMap.ssupSubAmt) {   //产品剩余额度小于追加金额
                        // 调取弹出框提示信息
                        let alertDict = {
                            title: "错误提示",
                            msg: "该产品已无购买额度",
                            success_text: "确认",
                            success: this.goback.bind(this)
                        };
                        Common.showAppDialogAlert(alertDict);
                        return;
                    } 
                else{
                    Common.setUrl('finance-input/index.html?' + 'prdId='+this.state.prdIdInput+'&isBuy='+this.state.buyId+'&isSub='+this.state.subId + '&enterFlag=' + this.state.gobackFlag)  //跳转
                }
            } else {
                let CustomRiskLev1 = res.rspBody ? res.rspBody.cusRiskLev : null;
                
                if(res.rspHead.returnCode === 'CCOE0009'){  //登录超时
                    let alertDict = {
                        title: "信息提示",
                        msg: "登录超时，请重新登录",
                        success_text: "重新登录",
                        success: () => {
                            $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
                        }
                    };
                    Common.showAppDialogAlert(alertDict);
                    return;
                }else{
                    let prdSourceInput = this.state.prdSourceFlag ? this.state.prdSourceFlag: '';  //产品来源
                    let prdSource='';
                    if(prdSourceInput == '1'){//本行
                        prdSource='行内';
                    }else if(prdSourceInput == '2'){//他行
                        prdSource='行外';
                    }
                    //校验客户风险等级
                    if (CustomRiskLev1 == null || CustomRiskLev1 == "" || CustomRiskLev1 == undefined) {
                        // 调取弹出框提示信息
                        let alertDict = {
                            title: "错误提示",
                            msg: "您尚未做过"+prdSource+"风险等级评估，请先至我行网点办理风险评估",
                            success_text: "确认",
                            success: this.goMbankFinance.bind(this)
                        };
                        Common.showAppDialogAlert(alertDict);
                        return;
                    }else {
                        let alertDict = {
                            title: "错误提示",
                            msg: res.rspBody.returnMsg,
                            success_text: "确认",
                            success: this.goMbankFinance.bind(this)
                        }
                        Common.showAppDialogAlert(alertDict);
                        return
                    }
                }
            }
        });
    }

    //跳转至风险评估页面
    goRiskLevel() {
        if (parseInt(this.state.ProductDetailMap.prdSource) - 1 == 0) { //行内
            Common.setUrl('finance-riskLevel/index.html')
        } else {//行外
            Common.setUrl('finance-riskLevelOut/index.html')
        }
    }

    //跳转至理财首页     
    goMbankFinance() {
        Common.setUrl('finance/index.html')
    }

    openExplain(res) {
        let gobackId = this.state.prdIdInput
        let detailMess= res;
        //先清除session中
        Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_PROTOCOL); 
        Common.addSessionData(API.SESSION_FINANCE_PRODUCT_PROTOCOL, JSON.stringify(detailMess));
        Common.setUrl('finance-detailText/index.html?' +'prdId='+gobackId+'&isBuy='+this.state.buyId+'&isSub='+this.state.subId + '&enterFlag=' +this.state.gobackFlag)
    }

    render() {
        const {
            list
        } = this.state;
        let that = this.state;

        return (
            <div>
                <WhiteSpace size="sm" />
                <MbankFinanceProductDetail
                    prdName={that.ProductDetailMap.prdName}
                    profitFlag={that.ProductDetailMap.profitFlag}
                    propRateMax={that.ProductDetailMap.propRateMax}
                    term={that.ProductDetailMap.term}
                    ssubStartAmt={that.ProductDetailMap.ssubStartAmt}//个人认购起点
                    ssupSubAmt={that.ProductDetailMap.ssupSubAmt}//个人追加认购金额
                    sbuyStartAmt={that.ProductDetailMap.sbuyStartAmt}//个人申购起点
                    ssupBuyAmt={that.ProductDetailMap.ssupBuyAmt}//个人追加申购金额
                    riskLev={that.ProductDetailMap.riskLev}
                    payRule={that.ProductDetailMap.ssubStartAmt}
                    raiseStartDate={that.ProductDetailMap.raiseStartDate}
                    raiseEndDate={that.ProductDetailMap.raiseEndDate}
                    valueDate={that.ProductDetailMap.valueDate}
                    matuDate={that.ProductDetailMap.matuDate}

                    limitFlag={that.limitFlag}
                    buyIdFlag={this.state.buyId} //是否可申购
                    subIdFlag={this.state.subId} //是否可认购
                    expectedEarning={"3008.00"} />
                <WhiteSpace size="sm" />
                <List.Group>
                    {
                        list.map(function (item, index) {
                            return<List
                                title2={item.docName}
                                onTap={this.openExplain.bind(this,item)}
                                key={index}
                            />
                        },this)
                    }
                </List.Group>
                <WhiteSpace size="lg" />
                {this.state.historyId == true 
                ?
                <Button type="primary" size="default" disabled={true}>已售罄</Button>
                :
                <WingBlank size="lg"> <Button type="primary" size="default" onTap={this.queryIsLogin.bind(this)}>购买</Button></WingBlank>
                }
                <WhiteSpace size="lg" />
            </div>
        )
    }
}