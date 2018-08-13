import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import NotFound from '../containers/ErrorPage/404'
// 巨划算A,B、随心存A,B ***************************
// 巨划算介绍页面
import MbankJhsExplain from '../containers/mbank/MbankInvest/MbankJhsExplain'
// 巨划算列表页面
import MbankJhsList from '../containers/mbank/MbankInvest/MbankJhsList'
// 巨划算-定转活
import JhsDingZhuanHuo from '../containers/mbank/MbankInvest/JhsDingZhuanHuo'
// 巨划算-活转定
import JhsHuoZhuanDing from '../containers/mbank/MbankInvest/JhsHuoZhuanDing'
// 随收存介绍页面
import MbankSxcExplain from '../containers/mbank/MbankInvest/MbankSxcExplain'
// 随心存A列表页面
import MbankSxcAList from '../containers/mbank/MbankInvest/MbankSxcAList'
// 随心存B列表页面
import MbankSxcBList from '../containers/mbank/MbankInvest/MbankSxcBList'
// 随心存B-定转活
import SxcBDingZhuanHuo from '../containers/mbank/MbankInvest/SxcBDingZhuanHuo'
// 随心存B-活转定
import SxcBHuoZhuanDing from '../containers/mbank/MbankInvest/SxcBHuoZhuanDing'

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
                    <Route path='/MbankJhsExplain' component={MbankJhsExplain} />
                    <Route path='/MbankJhsList' component={MbankJhsList} />
                    <Route path='/JhsHuoZhuanDing' component={JhsHuoZhuanDing} />
                    <Route path='/JhsDingZhuanHuo' component={JhsDingZhuanHuo} />

                    <Route path='/MbankSxcExplain' component={MbankSxcExplain} />
                    <Route path='/MbankSxcAList' component={MbankSxcAList} />
                    <Route path='/MbankSxcBList' component={MbankSxcBList} />
                    <Route path='/SxcBHuoZhuanDing' component={SxcBHuoZhuanDing} />
                    <Route path='/SxcBDingZhuanHuo' component={SxcBDingZhuanHuo} />

                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        )
    }
}

export default RouterMap
