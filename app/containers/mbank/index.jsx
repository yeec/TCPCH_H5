import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $native from './../../native/native';
import API from './../../constants/api';
import Cell from '../../../app/components/Base/cell/index.web.js';
import LinkCell from '../../components/mbank/mbank-public-link-cell/index';
import ContextDecorator from '../../util/decorator/context-decorator';
import '../../style/common.less';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        $native.callClientForComm(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '测试页面',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });
    }


    render() {

        return (
            <div className="a" >
                <Cell.Group header="Demo">
                    <LinkCell link='/AccountHome' arrow title='Accountlist  账户管理' key='/AccountHome'/>
                    <LinkCell link='/MbankTransfer' arrow title='MbankTransfer  转账管理' key='/MbankTransfer'/>
                    <LinkCell link='/MbankDingHuoList' arrow title='MbankDingHuoList  储蓄服务' key='/MbankDingHuoList'/>
                    <LinkCell link='/MbankRegister' arrow title='MbankRegister  注册' key='/MbankRegister'/>
                    <LinkCell link='/MbankPasswordReset' arrow title='MbankPasswordReset  找回密码' key='/MbankPasswordReset'/>
                    <LinkCell link='/MbankPublicNewsList' arrow title='MbankNews 新闻' key='/MbankPublicNewsList'/>
                    <LinkCell link='/MbankPublicCustomerFeedback' arrow title='MbankPublicCustomerFeedback 我要土嘈' key='/MbankPublicCustomerFeedback'/>
                    <LinkCell link='/MbankFinance' arrow title='MbankFinance 理财产品' key='/MbankFinance'/>
                    <LinkCell link='/YinZhengHome' arrow title='YinZhengHome 银证转账' key='/YinZhengHome'/>

                    <LinkCell link='/MbankJhsExplain' arrow title='MbankJhsExplain 巨划算介绍' key='/MbankJhsExplain'/>
                    <LinkCell link='/MbankJhsList' arrow title='MbankJhsList 巨划算' key='/MbankJhsList'/>
                    <LinkCell link='/MbankSxcExplain' arrow title='MbankSxcExplain 随心存介绍' key='/MbankSxcExplain'/>
                    <LinkCell link='/MbankSxcAList' arrow title='MbankSxcAList 随心存A' key='/MbankSxcAList'/>
                    <LinkCell link='/MbankSxcBList' arrow title='MbankSxcBList 随心存B' key='/MbankSxcBList'/>
                </Cell.Group>
            </div>
        )
    }
}
