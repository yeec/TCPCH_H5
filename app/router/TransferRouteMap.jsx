import React from 'react'
import {Router, Route, IndexRoute,hashHistory} from 'react-router'
import NotFound from '../containers/ErrorPage/404'
import MbankTransfer from '../containers/mbank/MbankTransfer/MbankTransferHome'

import MbankTransferQueryDetail from '../containers/mbank/MbankTransfer/MbankTransferQueryDetail'


import MbankTransferBusinessInput from '../containers/mbank/MbankTransfer/MbankTransferBusiness/MbankTransferBusinessInput/index.jsx'
import MbankTransferBusinessConfirm from '../containers/mbank/MbankTransfer/MbankTransferBusiness/MbankTransferBusinessConfirm/index.jsx'
import MbankTransferBusinessResult from '../containers/mbank/MbankTransfer/MbankTransferBusiness/MbankTransferBusinessResult/index.jsx'

// 收款人
import MbankTransferUserAdd from '../containers/mbank/MbankTransfer/MbankTransferUser/MbankTransferUserAdd'
import MbankTransferUserEditOrDel from '../containers/mbank/MbankTransfer/MbankTransferUser/MbankTransferUserEditOrDel'
import MbankTransferUserList from '../containers/mbank/MbankTransfer/MbankTransferUser/MbankTransferUserList'

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
                    <IndexRoute component={MbankTransfer}/>
                    <Route path='/MbankTransfer' component={MbankTransfer}/>
                    <Route path='/MbankTransferQueryDetail' component={MbankTransferQueryDetail}/>

                    <Route path='/MbankTransferUserAdd' component={MbankTransferUserAdd}/>
                    <Route path='/MbankTransferUserEditOrDel' component={MbankTransferUserEditOrDel}/>
                    <Route path='/MbankTransferUserList' component={MbankTransferUserList}/>

                    <Route path='/MbankTransferBusinessInput' component={MbankTransferBusinessInput}/>
                    <Route path='/MbankTransferBusinessConfirm' component={MbankTransferBusinessConfirm}/>
                    <Route path='/MbankTransferBusinessResult' component={MbankTransferBusinessResult}/>


                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

//
// const RouterMap = (props,context) => {
//
//     return (
//         <Router history={hashHistory}>
//             <Route path='/'>
//                 <IndexRoute component={MbankTransfer}/>
//                 <Route path='/MbankTransfer' component={MbankTransfer}/>
//                 <Route path='/MbankTransferQueryDetail' component={MbankTransferQueryDetail}/>
//
//                 <Route path='/MbankTransferUserAdd' component={MbankTransferUserAdd}/>
//                 <Route path='/MbankTransferUserEditOrDel' component={MbankTransferUserEditOrDel}/>
//                 <Route path='/MbankTransferUserList' component={MbankTransferUserList}/>
//
//                 <Route path='/MbankTransferBusinessInput' component={MbankTransferBusinessInput}/>
//                 <Route path='/MbankTransferBusinessConfirm' component={MbankTransferBusinessConfirm}/>
//                 <Route path='/MbankTransferBusinessResult' component={MbankTransferBusinessResult}/>
//
//
//                 <Route path='*' component={NotFound}/>
//             </Route>
//         </Router>
//     )
// };



export default RouterMap
