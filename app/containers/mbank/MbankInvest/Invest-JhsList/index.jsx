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


export default class MbankJhsList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // nodata 状态
            noDataState: false,
            // 定期转账列表
            regularList: [],
            // 总金额
            moneyAmount: 0,
            //跳转标识


        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        let flag = Common.getSessionData(API.SESSION_INVEST_JHS_INTRODUCE_TO_LIST);
        if (Common.judgeEmpty(flag)) {
            // 调取客户TopBar功能并设置标题及返回按钮
            $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                title: "金凉山-巨划算",
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
                title: "金凉山-巨划算",
                leftButton: {
                    exist: 'true',
                    closeFlag: 'false',

                }
            });
        }

        that.getData();
    }
    // 获取巨划算列表方法
    getData() {
        let that = this;
        // 获取巨划算列表
        $Fetch(API.API_GET_REGULAR_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN02",
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
                cZhlx: '21',
                signFlag: 'JSA'//JSA/JSB均可，后台判断巨划算A,B列表在一起
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
                        noDataState: res.rspBody.resultList.length === 0 ? true : false,
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

    // 跳转详情页面
    toJhsADetail(e) {
        
        let that = this;
        
        // 将巨划算列表信息存入session
        Common.addSessionData(API.SESSION_INVEST_JHS_LIST_TO_DETAIL, JSON.stringify({
            accountNo: that.state.regularList[$(e.currentTarget).index()].acNo,
            signFlag: that.state.regularList[$(e.currentTarget).index()].signFlag,
            cpzh:that.state.regularList[$(e.currentTarget).index()].cPzh,
            cZhlx:that.state.regularList[$(e.currentTarget).index()].cZhlx
        }));
        // hashHistory.push('/JhsDingZhuanHuo');
        Common.setUrl("invest-jhsDingZhuanHuo/index.html");
    }

    toJhsAHuoZhuanDing() {

        // let fals = "1"
        // Common.addSessionData(API.SESSION_INVEST_JHX_AB_JRBZ, JSON.stringify(fals));
        // Common.addSessionData(API.SESSION_INVEST_JHX_AB_JRBZ,);


        $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
            success: (val) => {
                if (val == '1') {
                    Common.setUrl("invest-jhsHuoZhuanDing1/index.html");    //客户风险等级查询
                } else {
                    $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
                }
            }
        })
        

    }

    // 格式化账户状态
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
        signFlag: 签约业务类型 （JSA-巨划算A）（JSB-巨划算B）

    */
    render() {
        return (
            <div>
                <MbankPublicResult Small title="巨划算总资产" money={this.state.moneyAmount.toString()} message={<div><div>A款：五年定期存款，每月得收益，月月可取息。</div><div>B款：五年定期存款，高收益，高保障。</div></div>} />
                <div className="mbank-savings-list">
                    <WingBlank size="lg">
                        <MbankSavingListsHeader count={this.state.regularList.length} savingType="巨划算" />
                    </WingBlank>
                    <div className="mbank-savings-list-body">
                        {
                            this.state.regularList.map(function (item, index) {
                                return <MbankSavingListsItem key={index}
                                    onClick={this.toJhsADetail.bind(this)}
                                    endDate={moment(item.cDate).format('YYYY-MM-DD')}
                                    amount={formatMoney(item.availBal, { symbol: '' })}
                                    leftContent={item.signFlag == 'JSA' ? '巨划算A款' : (item.cZhlx == 'T2' && item.cPzh == 'ZHCP0000' ? '巨划算B款零整' : '巨划算B款')}
                                    guimian={item.cPzh != 'WYCD0000' ? "(柜面)" : null}
                                // rightContent={this.acStateFormat(item.acState)}
                                />
                            }, this)
                        }
                    </div>

                </div>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button icon="circle-add" type="ghost" children="再存一笔" onClick={this.toJhsAHuoZhuanDing.bind(this)}></Button>
                    {/* <Button type="ghost-gray" onClick={this.toJhsAHuoZhuanDing.bind(this)}>再存一笔</Button> */}
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank size="xxl">
                    <Tips title="温馨提示" content="起存金额一万元整，存期五年。不支持部分支取。按月分期支付利息，到期一次支付本金。提前支取按支取日挂牌公告的活期储蓄利息计息，同时扣除已支付利息，不足时从本金中扣除" />
                </WingBlank>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}
