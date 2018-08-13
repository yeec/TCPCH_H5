import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import NotFound from '../containers/ErrorPage/404'
// 储蓄服务路由配置 ***************************

// 储蓄服务首页
import Home from '../containers/mbank/MbankSavings/MbankDingHuoList'
// 定活互转列表页面
import MbankDingHuoList from '../containers/mbank/MbankSavings/MbankDingHuoList'
// 定活互转-定转活
import DingZhuanHuo from '../containers/mbank/MbankSavings/DingZhuanHuo'
// 定活互转-活转定
import HuoZhuanDing from '../containers/mbank/MbankSavings/HuoZhuanDing'

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
                 
                    <Route path='/MbankDingHuoList' component={MbankDingHuoList}/>
                    <Route path='/HuoZhuanDing' component={HuoZhuanDing}/>
                    <Route path='/DingZhuanHuo' component={DingZhuanHuo}/>

                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
