import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
// 银证转账
import YinZhengHome from '../containers/mbank/MbankYinZheng/YinZhengHome/index.jsx'
import YinZhuanZheng from '../containers/mbank/MbankYinZheng/YinZhuanZheng/index.jsx'
import ZhengZhuanYin from '../containers/mbank/MbankYinZheng/ZhengZhuanYin/index.jsx'
// 如果是大型项目，router部分就需要做更加复杂的配置
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
                    <IndexRoute component={YinZhengHome}/>
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
