import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
//import App from '../containers'
import Home from '../containers/Example/Home'
import BaseExample from '../containers/Example/BaseExample'
import ClientDemo from '../containers/Example/ClientExample'
import NotFound from '../containers/ErrorPage/404'
import  Accordion    from '../containers/Example/BaseExample/Accordion'
import  Badge         from '../containers/Example/BaseExample/Badge'
import  Button       from '../containers/Example/BaseExample/Button'
import  Card          from '../containers/Example/BaseExample/CardNews'
import  Carousel      from '../containers/Example/BaseExample/Carousel'
import  Cell         from '../containers/Example/BaseExample/Cell'
import  List         from '../containers/Example/BaseExample/List'
import  ListWord         from '../containers/Example/BaseExample/ListWord'
import  Checkbox     from '../containers/Example/BaseExample/Checkbox'
import  Countingup     from '../containers/Example/BaseExample/Countingup'
import  DatetimePicker from '../containers/Example/BaseExample/DatetimePicker'
import  Echarts     from '../containers/Example/BaseExample/Echarts'
import  Flex         from '../containers/Example/BaseExample/Flex'
import  InkTab       from '../containers/Example/BaseExample/InkTab'
import  Input        from '../containers/Example/BaseExample/Input'
import  Modal       from '../containers/Example/BaseExample/Modal'
import  Navigator    from '../containers/Example/BaseExample/Navigator'
import  NGrids       from '../containers/Example/BaseExample/NGrids'
import  Picker       from '../containers/Example/BaseExample/Picker'
import  Radio        from '../containers/Example/BaseExample/Radio'
import  SegmentTab   from '../containers/Example/BaseExample/SegmentTab'
import  Switch      from '../containers/Example/BaseExample/Switch'
import  TabBar       from '../containers/Example/BaseExample/TabBar'
import  Textarea      from '../containers/Example/BaseExample/Textarea'
import  Toast         from '../containers/Example/BaseExample/Toast'
import  WingBlank         from '../containers/Example/BaseExample/WingBlank'
import  WhiteSpace         from '../containers/Example/BaseExample/WhiteSpace'
import InputItem from '../containers/Example/BaseExample/InputItem'
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!Example路由使用，!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    updateHandle(){
        // 统计 PV
        console.log('111每次router变化之后都会触发统计PV')
    }
    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' >
                    <IndexRoute component={Home}/>

                    <Route path='/ClientDemo' component={ClientDemo}/>
                    <Route path='/BaseExample' component={BaseExample}/>

                    <Route path='/Accordion' component={Accordion}/>
                    <Route path='/Badge' component={Badge}/>
                    <Route path='/Button' component={Button}/>
                    <Route path='/Card' component={Card}/>
                    <Route path='/Carousel' component={Carousel}/>
                    <Route path='/Cell' component={Cell}/>
                    <Route path='/List' component={List}/>
                    <Route path='/ListWord' component={ListWord}/>
                    <Route path='/Checkbox' component={Checkbox}/>
                    <Route path='/Countingup' component={Countingup}/>
                    <Route path='/DatetimePicker' component={DatetimePicker}/>
                    <Route path='/Echarts' component={Echarts}/>
                    <Route path='/Flex' component={Flex}/>
                    <Route path='/InkTab' component={InkTab}/>
                    <Route path='/Input' component={Input}/>
                    <Route path='/InputItem' component={InputItem}/>
                    <Route path='/Modal' component={Modal}/>
                    <Route path='/Navigator' component={Navigator}/>
                    <Route path='/NGrids' component={NGrids}/>
                    <Route path='/Picker' component={Picker}/>
                    <Route path='/Radio' component={Radio}/>
                    <Route path='/SegmentTab' component={SegmentTab}/>
                    <Route path='/Switch' component={Switch}/>
                    <Route path='/TabBar' component={TabBar}/>
                    <Route path='/Textarea' component={Textarea}/>
                    <Route path='/Toast' component={Toast}/>
                    <Route path='/WingBlank' component={WingBlank}/>
                    <Route path='/WhiteSpace' component={WhiteSpace}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
