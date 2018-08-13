import React from 'react'
import $ from 'jquery'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import $Fetch from '../../../../fetch/fetch.js';
import Common from "../../../../util/common.jsx";
import ContextDecorator from '../../../../util/decorator/context-decorator';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
//业务组件
import MbankSxcAListsItem from '../../../../components/mbank/mbank-sxc-lists-item/index.a.web'


export default class MbankSxcAList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // 账户列表
            accountList: [],
            // 点击的账号
            clickAccount: '',
            // box类名
            boxCls: 'mbank-sxc-list-item-box',
            // 右侧箭头方向状态---up/dn
            arrowState: 'dn',
            // 签约状态,默认未签约
            status: '1',
            // 签约日期
            signDate: '',
            // 解约日期
            // endDate: '',
        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        let flag = Common.getSessionData(API.SESSION_INVEST_SXC_INTRODUCE_TO_LIST);
        if (Common.judgeEmpty(flag)) {
            // 调取客户TopBar功能并设置标题及返回按钮
            $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                title: "金凉山-随心存A款",
                leftButton: {
                    exist: 'true',
                    closeFlag: 'false',
                }
            });
            // //返回首页
            // $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
        } else {
            // 调取客户TopBar功能并设置标题及返回按钮
            $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                title: "金凉山-随心存A款",
                leftButton: {
                    exist: 'true',
                    closeFlag: 'false',
                    success: successFun
                }
            });
        }

        that.getAccountList();
    }
    // 获取账户列表
    getAccountList() {
        let that = this;
        // 获取账户列表
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "ZH01",
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
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                Common.checkUnderAccount(res.rspBody.returnList);
                // state 转账账户列表
                that.setState({
                    accountList: res.rspBody.returnList
                });
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

    // 点击查看状态
    showDetail(e) {
        let that = this;
        that.setState({
            clickAccount: typeof (e) === 'string' ? e : e.currentTarget.id
        })
        if (typeof (e) === 'string') {
            that.getSxcAList(e);
        } else {
            if(that.state.arrowState == 'dn'){
                that.getSxcAList(e.currentTarget.id);
                $(e.currentTarget).closest('.' + that.state.boxCls).next().show()
            }else{
                $(e.currentTarget).closest('.' + that.state.boxCls).next().hide()
            }
            that.setState({
                arrowState: that.state.arrowState == 'dn' ? 'up' : 'dn'
            })
        }
    }

    // 获取随心存A列表方法
    getSxcAList(account) {
        let that = this;
        // 获取随心存列表
        $Fetch(API.API_GET_SXC_A_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN07",
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
                sceneCode: "IN07",
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

    /**** 接口字段说明 
    
    注：无特殊说明字段均为 String 类型 
        states: 存期
        signDate: 签约日期 
        endDate: 解约日期
     onClick={this.toSet.bind(this)}
     showStateClick={this.showDetail.bind(this)}
     arrowState={this.state.arrowState}
    
    */

    render() {
        return (
            <div>
                {
                    this.state.accountList.map(function (item, index) {
                        return <div key={index}>
                            <WhiteSpace size="md" />
                            <MbankSxcAListsItem
                                index={index}
                                status={this.state.status}
                                arrowState={this.state.arrowState}
                                accountNo={item.acNo}
                                availBal = {item.availBal}//可用余额
                                signDate={this.state.signDate}
                                boxCls={this.state.boxCls}
                            // endDate={this.state.endDate}
                            />
                        </div>
                    }, this)
                }
                <WhiteSpace size="md" />
            </div>
        )
    }
}
