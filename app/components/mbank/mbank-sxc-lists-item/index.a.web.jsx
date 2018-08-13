import React from 'react';
import './style/index.web';
import $ from 'jquery';
import $Fetch from '../../../fetch/fetch'
import API from '../../../constants/api'
import Icon from '../mbank-public-icon/index.web'
import Common from '../../../util/common.jsx'
import formatMoney from '../../../util/common/accounting-js/formatMoney.js';
import moment from 'moment';


export default class MbankJhsAListsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            status:"",
            signDate:"",
            clickAccount:"",
            arrowState:"dn"

        }
    }

    // 点击查看状态
    showDetail(e) {
        // console.log( e.currentTarget.id)
        let that = this;
        that.setState({
            clickAccount: typeof (e) === 'string' ? e : e.currentTarget.id
        })
        if (typeof (e) === 'string') {
            that.getSxcAList(e);
        } else {
            if(that.state.arrowState == 'dn'){
                that.getSxcAList(e.currentTarget.id);
                $(e.currentTarget).closest('.' + that.props.boxCls).next().show()
            }else{
                $(e.currentTarget).closest('.' + that.props.boxCls).next().hide()
            }
            that.setState({
                arrowState: that.state.arrowState == 'dn' ? 'up' : 'dn'
            })
        }
    }

    // 点击'签约/解约按钮'
    toSet(e) {
        let that = this;
        let msg = ($(e.currentTarget).attr('name') == '0' ? '解约' : '签约') + '成功';
        let param = {
            accountNo: $(e.currentTarget).attr('id')
        }
        if ($(e.currentTarget).attr('name') == '0') {
            param.businessType = '2';
            param.status = '1';
        } else {
            param.businessType = '1';
            param.interestBearType = '12';
            param.interestBearCode = '01';
        }
        // 随心存状态修改
        $Fetch(API.API_SET_SXC_A_INFOT, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN05",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: param
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                // 弹出成功信息
                let alertDict = {
                    title: "信息提示",
                    msg: msg,
                    success_text: "确认",
                    success: () => {
                        that.showDetail(that.state.clickAccount);
                    }
                }
                Common.showAppDialogAlert(alertDict);
            } else {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        });
    }

    // 获取随心存A列表方法
    getSxcAList(account) {
        console.log(account);
        let that = this;
        // 获取随心存列表
        $Fetch(API.API_GET_SXC_A_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "0001",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
                status: '0',
                accountNo: account
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                if (res.rspBody.returnList) {
                    that.setState({
                        status: res.rspBody.returnList[0].status,
                        signDate: res.rspBody.returnList[0].signDate,
                        // endDate: res.rspBody.returnList[0].endDate,
                    });
                } else {
                    // 若没有查询到，则回到初始状态
                    that.setState({
                        status: '1',
                        signDate: '',
                    });
                }
            } else {
                // 弹出错误信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        });
    }

//     onClick={this.toSet.bind(this)}
// showStateClick={this.showDetail.bind(this)}
// arrowState={this.state.arrowState}

    render() {

        const {
            show
        } = this.state;


        const { props } = this;

        const {
            accountNo,
            availBal,
            signDate,
            endDate,
            status,
            onClick,
            showStateClick,
            arrowState,
            index,
            boxCls,
            ...others
        } = props;
        let acNo = Common.setAccountNum2(accountNo, true)



        return (
            <div className="mbank-sxc-list-item">
                <div id={accountNo} onClick={this.showDetail.bind(this)} className={boxCls}>
                    <div><Icon name="logo-313684093748" /></div>
                    <div className="cardNum">
                        <p>盛京银行</p>
                        <span>{acNo}</span>
                        <p>可用余额：{` ${formatMoney(availBal, { symbol: '￥' })}元`}</p>
                    </div>
                    <div className="button">
                        <Icon name={`arrow-${this.state.arrowState}`} />
                    </div>
                </div>
                <div style={{ 'display': 'none' }}>
                    <div className="mbank-sxc-list-item-content">
                        <div><p>{this.state.signDate ? moment(this.state.signDate).format('YYYY-MM-DD') : '无'}</p><span>签约日期</span> </div>
                        {/* <div><p>{endDate ? moment(endDate).format('YYYY-MM-DD') : '未解约'}</p><span>解约日期</span></div> */}
                        <div><p>{this.state.status == '0' ? '已签约' : '未签约'}</p><span>状态</span> </div>
                    </div>
                    <div id={accountNo} name={this.state.status} className="mbank-sxc-list-item-button" onClick={this.toSet.bind(this)}>
                        <span>{this.state.status == '0' ? '解约' : '签约'}</span>
                    </div>
                </div>
            </div>
        );
    }
}

// const MbankJhsAListsItem = function (props, context) {
//
//     const {
//         accountNo,
//         availBal,
//         signDate,
//         endDate,
//         status,
//         onClick,
//         showStateClick,
//         arrowState,
//         index,
//         boxCls,
//         ...others
//     } = props;
//     let acNo = Common.setAccountNum(accountNo, true)
//     return (
//         <div className="mbank-sxc-list-item">
//             <div id={accountNo} onClick={showStateClick} className={boxCls}>
//                 <div><Icon name="logo-313684093748" /></div>
//                 <div className="cardNum">
//                     <p>盛京银行</p>
//                     <span>{acNo}</span>
//                     <p>可用余额：{` ${formatMoney(availBal, { symbol: '￥' })}元`}</p>
//                 </div>
//                 <div className="button">
//                     <Icon name={`arrow-${arrowState}`} />
//                 </div>
//             </div>
//             <div style={{ 'display': 'none' }}>
//                 <div className="mbank-sxc-list-item-content">
//                     <div><p>{signDate ? moment(signDate).format('YYYY-MM-DD') : '未签约'}</p><span>签约日期</span> </div>
//                     {/* <div><p>{endDate ? moment(endDate).format('YYYY-MM-DD') : '未解约'}</p><span>解约日期</span></div> */}
//                     <div><p>{status == '0' ? '启用' : '未启用'}</p><span>状态</span> </div>
//                 </div>
//                 <div id={accountNo} name={status} className="mbank-sxc-list-item-button" onClick={onClick}>
//                     <span>{status == '0' ? '解约' : '签约'}</span>
//                 </div>
//             </div>
//         </div>
//     )
// };
//
// export default MbankJhsAListsItem;



