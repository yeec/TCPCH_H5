import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Home from '../containers/mbank'
import NotFound from '../containers/ErrorPage/404'
// 账户交易路由配置 ***************************
//账户首页
import AccountHome from '../containers/mbank/MbankAccount/AccountHome/index.jsx'
//账户详情
import AccountDetail from '../containers/mbank/MbankAccount/AccountDetail/index.jsx'
//账户交易查询
import AccountQuery from '../containers/mbank/MbankAccount/AccountQuery/index.jsx'
//账户绑定
import AccountAdd from '../containers/mbank/MbankAccount/AccountAdd/index.jsx'
//账户解绑
import AccountRemove from '../containers/mbank/MbankAccount/AccountRemove/index.jsx'
//账户设置
import AccountSet from '../containers/mbank/MbankAccount/AccountSet/index.jsx'
//一键锁卡
import AccountLockCard from '../containers/mbank/MbankAccount/AccountLockCard/index.jsx'
//账户挂失
import AccountLoss from '../containers/mbank/MbankAccount/AccountLoss/index.jsx'
// 理财配置 ***************************
import MbankFinance from '../containers/mbank/MbankFinance/MbankFinanceHome/index.jsx'
import MbankFinanceDetail from '../containers/mbank/MbankFinance/MbankFinanceDetail/index.jsx'
import MbankFinanceDetailText from '../containers/mbank/MbankFinance/MbankFinanceDetail/index.textDetail.jsx'
import MbankFinanceHold from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceHold/index.jsx'
import FinanceEntrust from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceEntrust/index.jsx'
import MbankFinanceHoldDetail from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceHoldDetail/index.jsx'
import MbankFinanceEntrustDetail from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceEntrustDetail/index.jsx'
import MbankFinanceAdd from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceAdd/index.jsx'
import MbankFinanceCancle from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceCancle/index.jsx'
import MbankFinanceRedemption from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceRedemption/index.jsx'
import MbankFinanceAddResult from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceAddResult/index.jsx'
import MbankFinanceCancleResult from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceCancleResult/index.jsx'
import MbankFinanceRedemptionResult from '../containers/mbank/MbankFinance/MbankFinanceMy/MbankFinanceRedemptionResult/index.jsx'
import MbankFinanceBusinessDetail from '../containers/mbank/MbankFinance/MbankFinanceBusinessDetail/index.jsx'
import MbankFinanceResult from '../containers/mbank/MbankFinance/MbankFinancePurchase/MbankFinanceResult/index.jsx'
import MbankFinanceConfirm from '../containers/mbank/MbankFinance/MbankFinancePurchase/MbankFinanceConfirm/index.jsx'
import MbankFinanceInput from '../containers/mbank/MbankFinance/MbankFinancePurchase/MbankFinanceInput/index.jsx'
import MbankFinanceRiskLevel from '../containers/mbank/MbankFinance/MbankFinanceRiskLevel/MbankFinanceRiskLevelInput/index.jsx'
import MbankFinanceRiskLevelResult from '../containers/mbank/MbankFinance/MbankFinanceRiskLevel/MbankFinanceRiskLevelResult/index.jsx'

// 转账配置
import MbankTransfer from '../containers/mbank/MbankTransfer/MbankTransferHome'

import MbankTransferQueryDetail from '../containers/mbank/MbankTransfer/MbankTransferQueryDetail'


import MbankTransferBusinessInput from '../containers/mbank/MbankTransfer/MbankTransferBusiness/MbankTransferBusinessInput'
import MbankTransferBusinessConfirm from '../containers/mbank/MbankTransfer/MbankTransferBusiness/MbankTransferBusinessConfirm'
import MbankTransferBusinessResult from '../containers/mbank/MbankTransfer/MbankTransferBusiness/MbankTransferBusinessResult'

// 收款人
import MbankTransferUserAdd from '../containers/mbank/MbankTransfer/MbankTransferUser/MbankTransferUserAdd'
import MbankTransferUserEditOrDel from '../containers/mbank/MbankTransfer/MbankTransferUser/MbankTransferUserEditOrDel'
import MbankTransferUserList from '../containers/mbank/MbankTransfer/MbankTransferUser/MbankTransferUserList'

// 储蓄服务 ***************************
// 定活互转列表页面
import MbankDingHuoList from '../containers/mbank/MbankSavings/MbankDingHuoList'
// 定活互转-定转活
import DingZhuanHuo from '../containers/mbank/MbankSavings/DingZhuanHuo'
// 定活互转-活转定
import HuoZhuanDing from '../containers/mbank/MbankSavings/HuoZhuanDing'

// 巨划算A,B、随心存A,B ***************************
// 巨划算介绍首页
import MbankJhsExplain from '../containers/mbank/MbankInvest/MbankJhsExplain'
// 巨划算列表页面
import MbankJhsList from '../containers/mbank/MbankInvest/MbankJhsList'
// 巨划算-定转活
import JhsDingZhuanHuo from '../containers/mbank/MbankInvest/JhsDingZhuanHuo'
// 巨划算-活转定
import JhsHuoZhuanDing from '../containers/mbank/MbankInvest/JhsHuoZhuanDing'
// 随心存介绍首页
import MbankSxcExplain from '../containers/mbank/MbankInvest/MbankSxcExplain'
// 随心存A列表页面
import MbankSxcAList from '../containers/mbank/MbankInvest/MbankSxcAList'
// 随心存B列表页面
import MbankSxcBList from '../containers/mbank/MbankInvest/MbankSxcBList'
// 随心存B-定转活
import SxcBDingZhuanHuo from '../containers/mbank/MbankInvest/SxcBDingZhuanHuo'
// 随心存B-活转定
import SxcBHuoZhuanDing from '../containers/mbank/MbankInvest/SxcBHuoZhuanDing'

// 自动注册配置
import MbankRegister from '../containers/mbank/MbankRegister/MbankRegisterHome'
import MbankRegisterUserData from '../containers/mbank/MbankRegister/MbankRegisterUserData'

// 密码找回配置
import MbankPasswordReset from '../containers/mbank/MbankPasswordReset/MbankPasswordResetHome'
import MbankPasswordUserData from '../containers/mbank/MbankPasswordReset/MbankPasswordUserData'

// 公用功能配置
import MbankPublicNewsList from '../containers/mbank/MbankPublic/MbankPublicNews/MbankPublicNewsList/index.jsx'
import MbankPublicNewsDetail from '../containers/mbank/MbankPublic/MbankPublicNews/MbankPublicNewsDetail/index.jsx'
import MbankPublicCustomerFeedback from '../containers/mbank/MbankPublic/MbankPublicCustomerFeedback/index.jsx'
// 银证转账
import YinZhengHome from '../containers/mbank/MbankYinZheng/YinZhengHome/index.jsx'
import YinZhuanZheng from '../containers/mbank/MbankYinZheng/YinZhuanZheng/index.jsx'
import ZhengZhuanYin from '../containers/mbank/MbankYinZheng/ZhengZhuanYin/index.jsx'
// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    updateHandle() {
        // 统计 PV
        console.log('每次router变化之后都会触发统计PV')
    }

    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/'>
                    <IndexRoute component={Home}/>
                    <Route path='/AccountHome' component={AccountHome}/>
                    <Route path='/AccountDetail' component={AccountDetail}/>
                    <Route path='/AccountQuery' component={AccountQuery}/>
                    <Route path='/AccountAdd' component={AccountAdd}/>
                    <Route path='/AccountRemove' component={AccountRemove}/>
                    <Route path='/AccountSet' component={AccountSet}/>
                    <Route path='/AccountLockCard' component={AccountLockCard}/>
                    <Route path='/AccountLoss' component={AccountLoss}/>
                    <Route path='/MbankFinance' component={MbankFinance}/>
                    <Route path='/MbankFinanceHold' component={MbankFinanceHold}/>
                    <Route path='/FinanceEntrust' component={FinanceEntrust}/>

                    <Route path='/MbankFinanceDetail/:prdId' component={MbankFinanceDetail}/>
                    <Route path='/MbankFinanceDetailText/:prdId' component={MbankFinanceDetailText}/>
                    <Route path='/MbankFinanceHoldDetail' component={MbankFinanceHoldDetail}/>
                    <Route path='/MbankFinanceEntrustDetail' component={MbankFinanceEntrustDetail}/>
                    <Route path='/MbankFinanceRedemption' component={MbankFinanceRedemption}/>
                    <Route path='/MbankFinanceAdd' component={MbankFinanceAdd}/>
                    <Route path='/MbankFinanceCancle' component={MbankFinanceCancle}/>
                    <Route path='/MbankFinanceAddResult' component={MbankFinanceAddResult}/>
                    <Route path='/MbankFinanceCancleResult' component={MbankFinanceCancleResult}/>
                    <Route path='/MbankFinanceRedemptionResult' component={MbankFinanceRedemptionResult}/>
                    <Route path='/MbankFinanceBusinessDetail' component={MbankFinanceBusinessDetail}/>
                    <Route path='/MbankFinanceInput' component={MbankFinanceInput}/>
                    <Route path='/MbankFinanceConfirm' component={MbankFinanceConfirm}/>
                    <Route path='/MbankFinanceResult' component={MbankFinanceResult}/>
                    <Route path='/MbankFinanceRiskLevel' component={MbankFinanceRiskLevel}/>
                    <Route path='/MbankFinanceRiskLevelResult' component={MbankFinanceRiskLevelResult}/>



                    <Route path='/MbankTransfer' component={MbankTransfer}/>

                    <Route path='/MbankTransferQueryDetail' component={MbankTransferQueryDetail}/>

                    <Route path='/MbankTransferBusinessInput' component={MbankTransferBusinessInput}/>
                    <Route path='/MbankTransferBusinessConfirm' component={MbankTransferBusinessConfirm}/>
                    <Route path='/MbankTransferBusinessResult' component={MbankTransferBusinessResult}/>

                    <Route path='/MbankTransferUserAdd' component={MbankTransferUserAdd}/>
                    <Route path='/MbankTransferUserEditOrDel' component={MbankTransferUserEditOrDel}/>
                    <Route path='/MbankTransferUserList' component={MbankTransferUserList}/>

                    <Route path='/MbankDingHuoList' component={MbankDingHuoList}/>
                    <Route path='/HuoZhuanDing' component={HuoZhuanDing}/>
                    <Route path='/DingZhuanHuo' component={DingZhuanHuo}/>

                    <Route path='/MbankJhsExplain' component={MbankJhsExplain}/>
                    <Route path='/MbankJhsList' component={MbankJhsList}/>
                    <Route path='/JhsHuoZhuanDing' component={JhsHuoZhuanDing}/>
                    <Route path='/JhsDingZhuanHuo' component={JhsDingZhuanHuo}/>
                    
                    <Route path='/MbankSxcExplain' component={MbankSxcExplain}/>
                    <Route path='/MbankSxcAList' component={MbankSxcAList}/>
                    <Route path='/MbankSxcBList' component={MbankSxcBList}/>
                    <Route path='/SxcBHuoZhuanDing' component={SxcBHuoZhuanDing}/>
                    <Route path='/SxcBDingZhuanHuo' component={SxcBDingZhuanHuo}/>

                    <Route path='/MbankRegister' component={MbankRegister}/>
                    <Route path='/MbankRegisterUserData' component={MbankRegisterUserData}/>

                    <Route path='/MbankPasswordReset' component={MbankPasswordReset}/>
                    <Route path='/MbankPasswordUserData' component={MbankPasswordUserData}/>
              
                    <Route path='/MbankPublicNewsList' component={MbankPublicNewsList}/>
                    <Route path='/MbankPublicNewsDetail/:id' component={MbankPublicNewsDetail}/>
                    <Route path='/MbankPublicCustomerFeedback' component={MbankPublicCustomerFeedback}/>

                    <Route path='/YinZhengHome' component={YinZhengHome}/>
                    <Route path='/YinZhuanZheng' component={YinZhuanZheng}/>
                    <Route path='/ZhengZhuanYin' component={ZhengZhuanYin}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
