import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import NotFound from '../containers/ErrorPage/404'
import MbankPasswordReset from '../containers/mbank/MbankPasswordReset/MbankPasswordResetHome'
import MbankPasswordUserData from '../containers/mbank/MbankPasswordReset/MbankPasswordUserData'

// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    updateHandle() {
        // 统计 PV
        console.log('每次router变化之后都会触发统计PV')
    }

    render() {
        console.log("inner router !!!!!!!!!!!!");
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/'>
                    <IndexRoute component={MbankPasswordReset}/>
                    <Route path='/MbankPasswordUserData' component={MbankPasswordUserData}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
