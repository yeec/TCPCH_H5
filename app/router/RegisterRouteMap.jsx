import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import NotFound from '../containers/ErrorPage/404'
import MbankRegister from '../containers/mbank/MbankRegister/MbankRegisterHome'
import MbankRegisterUserData from '../containers/mbank/MbankRegister/MbankRegisterUserData'


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
                    <IndexRoute component={MbankRegister}/>
                    <Route path='/MbankRegisterUserData' component={MbankRegisterUserData}/>

                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
