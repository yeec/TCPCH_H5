import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import NotFound from '../containers/ErrorPage/404'
import Home from '../containers/mbank/MbankPublic'
import MbankPublicNewsList from '../containers/mbank/MbankPublic/MbankPublicNews/MbankPublicNewsList/index.jsx'
import MbankPublicNewsDetail from '../containers/mbank/MbankPublic/MbankPublicNews/MbankPublicNewsDetail/index.jsx'
import MbankPublicCustomerFeedback from '../containers/mbank/MbankPublic/MbankPublicCustomerFeedback/index.jsx'


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
                    <Route path='/MbankPublicNewsList' component={MbankPublicNewsList}/>
                    <Route path='/MbankPublicNewsDetail/:id' component={MbankPublicNewsDetail}/>
                    <Route path='/MbankPublicCustomerFeedback' component={MbankPublicCustomerFeedback}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
