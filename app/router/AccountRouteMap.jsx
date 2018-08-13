import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import NotFound from '../containers/ErrorPage/404'
// 账户交易路由配置 ***************************
//账户首页
import Home from '../containers/mbank/MbankAccount/AccountHome/index.jsx'
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
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
