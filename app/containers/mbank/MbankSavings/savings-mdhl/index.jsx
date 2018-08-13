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
            moneyAmount: 0
        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        let flag = Common.getSessionData(API.SESSION_INVEST_JHS_INTRODUCE_TO_LIST);
        if (Common.judgeEmpty(flag)) {
            // 调取客户TopBar功能并设置标题及返回按钮
            $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
                title: "定活互转",
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
                title: "定活互转",
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
                sceneCode: "SA02",
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
                signFlag: '99'//JSA/JSB均可，后台判断巨划算A,B列表在一起

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
    toSavingFixedDetail(e) {
        let that = this;
        console.log(that.state.regularList[$(e.currentTarget).index()])
        
        // 将定活互转列表信息存入session
        //Common.addSessionData(API.SESSION_SAVING_REGULAR_AC_NO, that.state.regularList[$(e.currentTarget).index()].acNo);
        Common.addSessionData(API.SESSION_SAVING_REGULAR_AC_NO, JSON.stringify({
            acNo: that.state.regularList[$(e.currentTarget).index()].acNo,
            cpzh:that.state.regularList[$(e.currentTarget).index()].cPzh,
            iseq:that.state.regularList[$(e.currentTarget).index()].iSeq,
        }));
        Common.setUrl("saving-dingZhuanHuo/index.html");
    }

    toSavingFixed() {
        $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
            success: (val) => {
                if(val == '1') {
                    Common.setUrl("saving-huoZhuanDing/index.html");   //客户风险等级查询
                }else{
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
                <MbankPublicResult Small title="整存整取总资产" money={this.state.moneyAmount.toString()} message={<div>整存整取，50元起存。</div>} />
                <div className="mbank-savings-list">
                    <WingBlank size="lg">
                        <MbankSavingListsHeader count={this.state.regularList.length} savingType="定期存款" />
                    </WingBlank>
                    <div className="mbank-savings-list-body">
                        {
                            this.state.regularList.map(function (item, index) {
                                return <MbankSavingListsItem key={index}
                                    onClick={this.toSavingFixedDetail.bind(this)}
                                    endDate={moment(item.cDate).format('YYYY-MM-DD')}
                                    amount={formatMoney(item.availBal, { symbol: '' })}
                                    leftContent='定期一本通'
                                    guimian={item.cPzh != 'WYCD0000' ? "(柜面)" : null}
                                    // rightContent={this.acStateFormat(item.acState)}
                                />
                            }, this)
                        }
                    </div>
                    
                </div>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                <Button icon="circle-add" type="ghost" children="再存一笔" onClick={this.toSavingFixed.bind(this)}></Button>
                    {/* <Button type="ghost-gray" onClick={this.toJhsAHuoZhuanDing.bind(this)}>再存一笔</Button> */}
                </WingBlank>
                <WhiteSpace size="lg" />
                
                
            </div>
        )
    }
}
