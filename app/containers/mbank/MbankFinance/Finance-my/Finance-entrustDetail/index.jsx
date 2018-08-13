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
import Button from '../../../../../../app/components/Base/button/index.web.jsx';
//业务组件
import MbankFinanceProductHoldHeader from '../mbank-finance-product-header/index.web.js';
import formatMoney from './../../../../../util/common/accounting-js/formatMoney.js';

export default class MbankFinanceEntrustDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Detail: [],
            map: [],
            ProductDetailMap:[]
        }
    }

    //初始化页面
    componentDidMount() {
        //title更新
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '委托产品详情',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });

        // 获取存储的理财产品信息
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_ENTRUST));
        this.setState({
            map: listdata
        });
        //调用理财详情接口查询理财详细信息
        //上送理财产品编号
        $Fetch(API.API_QUERY_PRODUCT_DETAIL, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA09",
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
        },true,false).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                //先清除session中
                Common.removeSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL); 
                // 获取当前账号信息传入session
                Common.addSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL, JSON.stringify(res.rspBody));
                this.setState({
                    ProductDetailMap: res.rspBody
                })
            }else{
                let alertDict={
                    title:"错误提示",
                    msg:res.rspHead.returnMsg,
                    success_text:"确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }

        })
    }


    //追加界面
    goNextPage = () => {
        Common.setUrl('finance-cancel/index.html')
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
                    productHold={this.state.map.appAmt}
                    productName={this.state.ProductDetailMap.prdName}
                />
                <List.Group header="持有理财">
                    <List title="关联账号" description={this.state.map.bankAcct}/>
                    <List title="产品代码" description={this.state.ProductDetailMap.prdId}/>
                    <List title="预估年化收益率" description={this.state.ProductDetailMap.propRateMax+'%'}/>
                    <List title="产品类型" description={prdType}/>
                    <List title="可用份额" description={formatMoney(this.state.map.appAmt,{symbol: '￥'})+'元'}/>
                    <List title="投资期限" description={this.state.ProductDetailMap.term+'天'}/>
                    <List title="起始日期" description={moment(this.state.ProductDetailMap.valueDate).format('YYYY-MM-DD')}/>
                    <List title="到期日期" description={moment(this.state.ProductDetailMap.matuDate).format('YYYY-MM-DD')}/>
                </List.Group>

                <WhiteSpace size="md"/>
                <WingBlank size="lg">
                    <Button type="primary" size="default"
                            onTap={this.goNextPage.bind(this)}>撤单</Button>
                </WingBlank>

            </div>
        )
    }
}

