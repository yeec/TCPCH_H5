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
import formatMoney from '../../../../util/common/accounting-js/formatMoney.js';
import moment from 'moment';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import NoData from '../../../../components/Base/no-data/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankSavingListsHeader from '../../../../components/mbank/mbank-saving-lists-header/index.web'
import MbankSavingListsItem from '../../../../components/mbank/mbank-saving-lists-dh-item/index.web'
import MbankPublicButtonGray from '../../../../components/mbank/mbank-public-button-gray/index.web'
import Tips from '../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';
import Button from '../../../../components/Base/button/index.web';
import MbankSxcAListsItem from '../../../../components/mbank/mbank-sxc-lists-item/index.a.web'

export default class MbankSxcBList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // 定期转账列表
            regularList: [],
            // 总金额
            moneyAmount: 0,            // 账户列表
            accountList: [],            
            // 签约状态,默认未签约
            status: '1',
            // 签约日期
            signDate: '',
            // box类名
            boxCls: 'mbank-sxc-list-item-box',
            // 点击的账号
            clickAccount: '',
            // 右侧箭头方向状态---up/dn
            arrowState: 'dn',
        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        let flag = Common.getSessionData(API.SESSION_INVEST_SXC_INTRODUCE_TO_LIST);
        if (Common.judgeEmpty(flag)) {
            // 调取客户TopBar功能并设置标题及返回按钮
            $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                title: "金凉山-随心存B款",
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
                title: "金凉山-随心存B款",
                leftButton: {
                    exist: 'true',
                    closeFlag: 'false'
                    
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
                    this.getData();
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


    // 获取随心存列表方法
    getData() {
        let that = this;
        // 获取随心存列表
        $Fetch(API.API_GET_REGULAR_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN08",
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
                cZhlx: 'T1',
                signFlag: 'SXB'
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                if (res.rspBody.resultList) {
                    // 获取总金额，map之后相加
                    let sum = 0;
                    res.rspBody.resultList.map(function (item, i) {
                        sum += Number(item.availBal);
                    })
                    // State 定期列表，总金额
                    that.setState({
                        regularList: res.rspBody.resultList,
                        moneyAmount: sum.toFixed(2)
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

    // 跳转详情页面
    toDetail(e) {
        let that = this;
        console.log(that.state.regularList[$(e.currentTarget).index()].cPzh)
        // 将随心存列表信息存入session
        Common.addSessionData(API.SESSION_INVEST_SXC_B_INFO, JSON.stringify({
            acNo: that.state.regularList[$(e.currentTarget).index()].acNo,
            cpzh:that.state.regularList[$(e.currentTarget).index()].cPzh,
            iseq:that.state.regularList[$(e.currentTarget).index()].iSeq,
        }));
        // Common.addSessionData(API.SESSION_INVEST_SXC_B_INFO, that.state.regularList[$(e.currentTarget).index()].acNo);
        
        // hashHistory.push('/SxcBDingZhuanHuo');
         Common.setUrl("invest-sxcBDingZhuanHuo/index.html");
    }

    toAdd() {
        $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
            success: (val) => {
                if(val == '1') {
                    Common.setUrl("invest-sxcBHuoZhuanDing/index.html");    //客户风险等级查询
                }else{
                    $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
                }
            }
        })     
        // hashHistory.push('/SxcBHuoZhuanDing');
        
    }

    // // 格式化账户状态
    // acStateFormat(val) {
    //     let that = this;
    //     let arr = val.split('');
    //     let label = '';
    //     for (let [i, item] of new Map(arr.map((item, i) => [i, item]))) {
    //         if (item === '0') {
    //             continue;
    //         } else {
    //             switch (i) {
    //                 case 0:
    //                     switch (item) {
    //                         case '1': label += '销户,'; break;
    //                         case '2': label += '长期不动户,'; break;
    //                         case '3': label += '不动户转收益,'; break;
    //                     }
    //                     break;
    //                 case 1: label += '冻结,'; break;
    //                 case 2: label += '止付,'; break;
    //                 case 3: label += '挂失,'; break;
    //             }
    //         }
    //     }
    //     label = val === '0000' ? '正常' : label.substring(0, label.length - 1);
    //     return label;
    // }

    /**** 接口字段说明 

    注：无特殊说明字段均为 String 类型 
        cDate: 到期日期
        availBal: 可用余额

    */
    render() {
        return (
            <div>
                <MbankPublicResult Small title="随心存B款总资产" money={this.state.moneyAmount.toString()} message={<div><p>起存金额三万元起，存期三年。</p>提前支取靠档计息；期限灵活，收益稳定。</div>} />
                <div className="mbank-savings-list">
                    <WingBlank size="lg">
                        <MbankSavingListsHeader count={this.state.regularList.length} savingType="定期存款" />
                    </WingBlank>
                    <WingBlank size="lg">
                    <MbankSavingListsHeader savingType="随心存A款" showType="hideCount"/>
                    </WingBlank>
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

                    <WingBlank size="lg">

                    <MbankSavingListsHeader savingType="随心存B款" savingType1="定期存款" showType="hideCount" />
                    </WingBlank>

                    <div className="mbank-savings-list-body">
                        {
                            this.state.regularList.map(function (item, index) {
                                return <MbankSavingListsItem key={index}
                                    onClick={this.toDetail.bind(this)}
                                    endDate={moment(item.cDate).format('YYYY-MM-DD')}
                                    amount={formatMoney(item.availBal, { symbol: '' })}
                                    leftContent='随心存B款'
                                    guimian={item.cPzh != 'WYCD0000' ? "(柜面)" : null}
                                    // rightContent={item.acState}
                                />
                            }, this)
                        }
                    </div>
                    
                </div>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                <Button icon="circle-add" type="ghost" children="再存一笔" onClick={this.toAdd.bind(this)}></Button>
                    
                </WingBlank>
                <WhiteSpace size="lg" />
                
            </div>
        )
    }
}
