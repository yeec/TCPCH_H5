//API数据接口
import API from './../../../../../constants/api';
//公共方法
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $native from './../../../../../native/native';
import $Fetch from './../../../../../fetch/fetch';
import ContextDecorator from '../../../../../util/decorator/context-decorator';
import Common from "../../../../../util/common.jsx";
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import SegmentButton from '../../../../../components/Base/segment-button/index.web.jsx';
import NoData from '../../../../../components/Base/no-data/index.web.jsx';
//业务组件
import MbankFinanceProductHold from '../mbank-finance-product-hold/index.web.js';

export default class MbankFinanceHold extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: [],
            noDataState:false
        }
    }

    //跳转至持有页面
    goback = () =>{
        Common.setUrl('finance/index.html')
    };

    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '持有理财产品',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goback
            }
        });

        //客户可用份额查询
        $Fetch(API.API_QUERY_HOLD_PRODUCT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "FA06",
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
                prdId: '',//产品ID
                pageNum: '1',//查询页数
                pageSize: '10',//	每页条数
            }
        }).then((res) => {              
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.setState({
                    list: res.rspBody.returnList
                })
                if(res.rspBody.returnList.length === 0){
                    this.setState({
                        noDataState:true
                    })
                }
            }else {
                if(res.rspHead.returnCode === "1005"){
                    this.setState({
                        noDataState:true
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
            }
        })
    }

    //跳转至当前委托
    goFinanceEntrust = () => {
        Common.setUrl('finance-entrust/index.html')
    };

    //跳转至购买产品明细
    showpProductDetail = (item) => {
        Common.addSessionData(API.SESSION_FINANCE_PRODUCT_PURCHASE_HOLD, JSON.stringify(item));
        Common.setUrl('finance-holdDetail/index.html');
    };
    
    render() {
        const {
            list
        } = this.state;
        let that = this;
        
        return (
            <div>
                <WhiteSpace size="md"/>
                    <SegmentButton title1="我的持有" title2="当前委托" active1 onChange2={this.goFinanceEntrust.bind(this)}/>
                <WhiteSpace size="md"/>
                {
                    this.state.noDataState ? <NoData text="查询无数据"/>:                
                    <MbankFinanceProductHold.Group>
                        {
                            list.map(function (item, index) {
                                return <MbankFinanceProductHold
                                    canUseVol={item.canUseVol}
                                    prdName={item.prdName}
                                    matuDate={item.matuDate}
                                    prdId={item.prdId}
                                    item={item}
                                    key={index}
                                    MethodFn={that.showpProductDetail.bind(this)}
                                />
                            })
                        }
                    </MbankFinanceProductHold.Group>
                }
            </div>
        )
    }
}

