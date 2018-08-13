import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin';
//公共方法
import $native from './../../../../../native/native';
import $Fetch from './../../../../../fetch/fetch';
import Common from "../../../../../util/common.jsx";
//API数据接口
import API from './../../../../../constants/api';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import List from '../../../../../components/Base/list/index.web.js';
import DateFormat from './../../../../../util/common/date-format';
//业务组件
import MbankButtonBox from '../../../../../components/mbank/mbank-public-button-box/index.web.js';
import MbankFinanceProductHoldHeader from '../mbank-finance-product-header/index.web.js';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

export default class MbankFinanceHoldDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Detail: [],
            ProductDetailMap:[],
            map: [],
            openStartDateInput:"",
            openStartTimeInput:"",
            openEndDateInput:"",
            openEndTimeInput:""
        }
    }

    //初始化页面
    componentDidMount() {
        //title更新
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '持有产品详情',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });

        // 获取存储的理财产品信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_HOLD));
        this.setState({
            map: listdata
        });
        
        //调用理财详情接口查询理财详细信息
        //上送理财产品编号
        $Fetch(API.API_QUERY_PRODUCT_DETAIL, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA06",
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
                prdId:listdata.prdId

            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                //先清除session中
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL); 
                // 获取当前账号信息传入session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL, JSON.stringify(res.rspBody));
                
                this.setState({
                    ProductDetailMap: res.rspBody,
                    openStartDateInput:res.rspBody.openStartDate,
                    openStartTimeInput:res.rspBody.openStartTime,
                    openEndDateInput:res.rspBody.openEndDate,
                    openEndTimeInput:res.rspBody.openEndTime   
                })
            }else{
                // 调取弹出框提示信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg + ""+res.rspHead.returnCode ,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
                return
            }

        })
    }

    goback(){
        Common.setUrl('finance-hold/index.html')
    }

//追加界面
    goMbankFinanceAdd = () => {
        let that = this.state;
        var date = new Date();
        const formatStr = 'yyyyMMdd';
        let nowDate = DateFormat.date(new Date().getTime(), formatStr);        
        let nowHours = date.getHours().toString();
        let nowMinutes = date.getMinutes().toString();
        let nowSeconds = date.getSeconds().toString();

        if(nowMinutes.toString().length == 1){
            nowMinutes = '0'+nowMinutes
        }
        if(nowSeconds.toString().length == 1){
            nowSeconds = '0'+nowSeconds
        }
        
        let currentTime = nowDate + nowHours + nowMinutes + nowSeconds;

        let openStartTime = that.openStartDateInput+that.openStartTimeInput;//开发起始时间
        let openEndTime = that.openEndDateInput+that.openEndTimeInput;//开发结束时间

        if(currentTime < openStartTime || currentTime > openEndTime){   //当前时间不在产品开放日
            let alertDict = {
                title: "错误提示",
                msg: '该产品不在开放期，不允许追加！',
                success_text: "确认",
                success:this.goback.bind(this)
            };
            Common.showAppDialogAlert(alertDict);
            return
        }else{
            Common.setUrl('finance-add/index.html')
        }
    };

//赎回界面
    goMbankFinanceRedemption = () => {
        let that = this.state;
        var date = new Date();
        const formatStr = 'yyyyMMdd';
        let nowDate = DateFormat.date(new Date().getTime(), formatStr);        
        let nowHours = date.getHours().toString();
        let nowMinutes = date.getMinutes().toString();
        let nowSeconds = date.getSeconds().toString();

        if(nowMinutes.toString().length == 1){
            nowMinutes = '0'+nowMinutes
        }
        if(nowSeconds.toString().length == 1){
            nowSeconds = '0'+nowSeconds
        }
        
        let currentTime = nowDate + nowHours + nowMinutes + nowSeconds;

        let openStartTime = that.openStartDateInput+that.openStartTimeInput;//开发起始时间
        let openEndTime = that.openEndDateInput+that.openEndTimeInput;//开发结束时间

        if(currentTime < openStartTime || currentTime > openEndTime){   //当前时间不在产品开放日
            let alertDict = {
                title: "错误提示",
                msg: '该产品不在开放期，不允许赎回！',
                success_text: "确认",
                success:this.goback.bind(this)
            };
            Common.showAppDialogAlert(alertDict);
            return
        }else{
            Common.setUrl('finance-redemption/index.html')
        }        
    };

    render() {
        const {
            list
        } = this.state;

        let prdType="";
        switch(this.state.ProductDetailMap.prdType){
            case "1":prdType="封闭";break;
            case "2":prdType="滚存";break;
            case "3":prdType="开放";break;
            case "4":prdType="智能封闭";break;
            default:prdType="";
        }

        return (
            <div>
                <MbankFinanceProductHoldHeader
                    productID={this.state.ProductDetailMap.prdId}
                    productHold={this.state.map.canUseVol}
                    productName={this.state.ProductDetailMap.prdName}
                />
                <List.Group header="持有理财">
                    <List title="关联账号" description={this.state.map.bankAcct}/>
                    <List title="产品代码" description={this.state.ProductDetailMap.prdId}/>
                    <List title="预估年化收益率" description={this.state.ProductDetailMap.propRateMax+'%'}/>
                    <List title="产品类型" description={prdType}/>
                    <List title="可用份额" description={formatMoney(this.state.map.canUseVol,{symbol: '￥'})+'元'}/>
                    <List title="投资期限" description={this.state.ProductDetailMap.term+"天"}/>
                    <List title="起始日期" description={moment(this.state.ProductDetailMap.valueDate).format('YYYY-MM-DD')}/>
                    <List title="到期日期" description={moment(this.state.ProductDetailMap.matuDate).format('YYYY-MM-DD')}/>
                </List.Group>

                <WhiteSpace size="lg"/>
                <WingBlank size="lg">
                    <MbankButtonBox title1="追加" onTap1={this.goMbankFinanceAdd} title2="赎回"
                                    onTap2={this.goMbankFinanceRedemption}/>
                </WingBlank>

            </div>
        )
    }

}

