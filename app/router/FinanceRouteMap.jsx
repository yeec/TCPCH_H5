import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Home from '../containers/mbank/MbankFinance/MbankFinanceHome'
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
import MbankFinanceRiskOutLevel from '../containers/mbank/MbankFinance/MbankFinanceRiskLevel/MbankFinanceRiskLevelOutInput/index.jsx'
import MbankFinanceRiskLevelOutResult from '../containers/mbank/MbankFinance/MbankFinanceRiskLevel/MbankFinanceRiskLevelOutResult/index.jsx'
import NotFound from '../containers/ErrorPage/404'



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
                    <IndexRoute component={MbankFinance}/>
                    <Route path='/MbankFinance' component={MbankFinance}/>
                    <Route path='/MbankFinanceHold' component={MbankFinanceHold}/>
                    <Route path='/FinanceEntrust' component={FinanceEntrust}/>
                    <Route path='/MbankFinanceDetailText/:gobackId' component={MbankFinanceDetailText}/>
                    <Route path='/MbankFinanceDetail/:prdId' component={MbankFinanceDetail}/>
                    <Route path='/MbankFinanceHoldDetail' component={MbankFinanceHoldDetail}/>
                    <Route path='/MbankFinanceEntrustDetail' component={MbankFinanceEntrustDetail}/>
                    <Route path='/MbankFinanceAdd' component={MbankFinanceAdd}/>
                    <Route path='/MbankFinanceCancle' component={MbankFinanceCancle}/>
                    <Route path='/MbankFinanceRedemption' component={MbankFinanceRedemption}/>
                    <Route path='/MbankFinanceAddResult' component={MbankFinanceAddResult}/>
                    <Route path='/MbankFinanceCancleResult' component={MbankFinanceCancleResult}/>
                    <Route path='/MbankFinanceRedemptionResult' component={MbankFinanceRedemptionResult}/>
                    <Route path='/MbankFinanceBusinessDetail' component={MbankFinanceBusinessDetail}/>
                    <Route path='/MbankFinanceInput' component={MbankFinanceInput}/>
                    <Route path='/MbankFinanceConfirm' component={MbankFinanceConfirm}/>
                    <Route path='/MbankFinanceResult' component={MbankFinanceResult}/>
                    <Route path='/MbankFinanceRiskLevel' component={MbankFinanceRiskLevel}/>
                    <Route path='/MbankFinanceRiskLevelResult' component={MbankFinanceRiskLevelResult}/>
                    <Route path='/MbankFinanceRiskOutLevel' component={MbankFinanceRiskOutLevel}/>
                    <Route path='/MbankFinanceRiskLevelOutResult' component={MbankFinanceRiskLevelOutResult}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
