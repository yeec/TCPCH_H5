//公共方法
import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $native from '../../../../../native/native';
import Common from "../../../../../util/common.jsx";
//API数据接口
import API from '../../../../../constants/api';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankTransferConfirm from '../../../../../components/mbank/mbank-public-confirm-info/index.web.jsx';

export default class MbankFinanCancelResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            BuyInfo: {},//购买金额
            ProductInfo: {},//理财产品信息
            List: []
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "操作结果",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success:this.turnToMbankFinanceHome
            }
        });

        //获取理财购买返回结果
        let resultData = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_CANCLE_RESTULT));
        that.setState({
            List: resultData
        });

        //获取购买页面数值
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_BUY_INFO));
        this.setState({
            BuyInfo: listdata
        });

        // 获取存储的理财产品信息
        let ProductInfo = JSON.parse(Common.getSessionData(API.SESSION_FINANCE_PRODUCT_DETAIL));
        that.setState({
            ProductInfo: ProductInfo
        });
    }

    //跳转至理财首页
    turnToMbankFinanceHome = () => {
        Common.setUrl('finance/index.html');
    };

    render() {
        let allData = this.state.List;
        let BuyInfoMsg = this.state.BuyInfo;
        let ProductInfoMsg = this.state.ProductInfo;

        const { props } = this;
        let {
            typeFlag,
            returnMessage
        }=props;
        
        if(allData.returnCode !="00000000"){
            typeFlag="error";
            returnMessage="撤单失败："+allData.returnMsg;
        }else{
            typeFlag="success";
            returnMessage="撤单成功";
        }

        return (
            <div>
                <MbankPublicResult type={typeFlag} title={returnMessage}/>
                <MbankTransferConfirm.Group>
                    <MbankTransferConfirm title="理财名称" content={ProductInfoMsg.prdName}/>
                    <MbankTransferConfirm title="理财到期" content={moment(ProductInfoMsg.matuDate).format('YYYY-MM-DD')}/>
                    <MbankTransferConfirm title="理财期限(天)" content={ProductInfoMsg.term+"天"}/>
                    <MbankTransferConfirm title="年化收益率(%)" content={ProductInfoMsg.propRateMax+'%'}/>
                </MbankTransferConfirm.Group>
                <WhiteSpace size="lg"/>
                <WingBlank size="md">
                    <Button type="ghost" size="default" onTap={this.turnToMbankFinanceHome.bind(this)}>完成</Button>
                </WingBlank>
            </div>
        )
    }
}