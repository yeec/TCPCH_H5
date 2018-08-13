import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//公共方法
import $native from './../../../../native/native';
import $Fetch from './../../../../fetch/fetch';
import Common from "../../../../util/common.jsx";
import $ from 'jquery';
//API数据接口
import API from './../../../../constants/api';
//基础组件
import NoData from '../../../../components/Base/no-data/index.web.jsx';
import ScrollMore from '../../../../components/Base/ScrollMore/index.web.jsx';
import Modal from "../../../../components/mbank/mbank-public-select-click/mbank-public-select-modal/index.web.js";
//业务组件
import Tips from './../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';
import MbankAccountQueryDetail from './../../../../components/mbank/mbank-public-query-detail/mbank-public-query-detail-business/index.web';
import MbankAccountQuery from './../../../../components/mbank/mbank-public-query/index.web';

export default class MbankJhsQueryDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            show: true,
            AccountList: [],
            list: [],
            startDate: '',
            accountValue: '',
            endDate: '',
            listHeight: 'auto',
            isloadAll: false,
            pageNum: '0',
            pageSize: '10',
            accountNo: "",
            noDataState: false
        }
    }

    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '交易明细',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
        
        let accountMessage = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_AB_ACCOUNT))

        // //拼接账号picker需要的数组
        let that = this;

        let list = [];

        list.push({
            label: Common.setAccountNum2(accountMessage.account,true) + '(' + accountMessage.accountName + ')',
            value: accountMessage.account,
        });

        this.setState({
            AccountList: list
        })

    }
    // 返回页面设置
    goBackPage() {
        Common.setUrl("invest-jhsDingZhuanHuo/index.html");
    }

    //调用子组件
    showRES(startDate, accountValue, endDate) {
        console.log(startDate, accountValue, endDate)
        let sessionInveseLiXiMessage = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIXI_MESSAGE));
        let accountMessageValue = accountValue ? accountValue : sessionInveseLiXiMessage.account;
        
        //清空数据
        this.setState({
            startDate: startDate,
            accountValue: accountMessageValue,
            endDate: endDate
        });
        //判断数据为空
        if (Common.judgeEmpty(startDate) || Common.judgeEmpty(accountMessageValue) || Common.judgeEmpty(endDate)) {
            let alertDict = {
                title: "信息提示",
                msg: "请选择账号、交易时间",
                success_text: "确认",

            };
            Common.showAppDialogAlert(alertDict);
            return
        }
        this.queryDetail(startDate, accountMessageValue, endDate);

    }

    // picker选择时获取高度
    computeHeight(listHeight) {
        let that = this;
        that.setState({
            listHeight: listHeight
        })
    }

    //点击查询按钮
    queryDetail(startDate1, accountValue1, endDate1) {

        let that = this;
        let pageNum = that.state.pageNum;


        pageNum = "1";

        let pageSize = that.state.pageSize;

        let startDate = startDate1 || that.state.startDate;
        let endDate = endDate1 || that.state.endDate;
        let accountNo = accountValue1 || that.state.accountValue;

        //查询时清空list[]
        this.setState({
            list: []
        })


        //初始化查询
        $Fetch(API.API_QUERY_REGULAR_MX, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN11",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "2",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",

            },
            data: {
                accountNo: accountNo,
                startDate: startDate,
                endDate: endDate,
                pageNum: pageNum,
                pageSize: pageSize
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                // 隐藏录入页面
                $(this.refs.tips).hide();

                that.setState({
                    pageNum: pageNum,
                    list: res.rspBody.jhsResultList,
                    noDataState: [...that.state.list, ...res.rspBody.jhsResultList].length === 0 ? true : false,
                    isloadAll: pageNum * pageSize >= res.rspBody.strokeCount ? true : false
                })
            }

        })
    }
    //滑动
    queryDetailMore(startDate1, accountValue1, endDate1) {

        let that = this;
        let pageNum = that.state.pageNum;


        pageNum = (Number(pageNum) + 1) + "";

        let pageSize = that.state.pageSize;

        let startDate = startDate1 || that.state.startDate;
        let endDate = endDate1 || that.state.endDate;
        let accountNo = accountValue1 || that.state.accountValue;

        //当查询条件变化时，清空list、pageNum
        if (startDate != this.state.startDate || accountNo != this.state.accountValue || endDate != this.state.endDate) {
            this.setState({
                list: []
            })
            pageNum = 1 + "";
        }

        //初始化查询
        $Fetch(API.API_QUERY_REGULAR_MX, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN11",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "2",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",

            },
            data: {
                accountNo: accountNo,
                startDate: startDate,
                endDate: endDate,
                pageNum: pageNum,
                pageSize: pageSize
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                // 隐藏录入页面
                $(this.refs.tips).hide();

                that.setState({
                    pageNum: pageNum,
                    list: [...that.state.list, ...res.rspBody.jhsResultList],
                    noDataState: [...that.state.list, ...res.rspBody.jhsResultList].length === 0 ? true : false,
                    isloadAll: pageNum * pageSize >= res.rspBody.strokeCount ? true : false
                })
            }

        })
    }

    /*
    transDate	交易日期
    transTime	交易时间
    startDate	记账日期
    amount	金额
    channeld	交易渠道
    currency	币种
    cRFlag	钞汇标志
    cTFlag	现转标志
    dCFlag	借贷标志
    balance	余额
    partnerInfo	对方名称
    partnerAcct	对方账号
    remark	摘要
    deptId	交易机构
    jnlNo	记账流水号
     */

    render() {
        const {
            list,
            show,
            listHeight,
            isloadAll
        } = this.state;
        let that = this;

        return (
            <div>
                <MbankAccountQuery accountList={that.state.AccountList} MethodFn={that.showRES.bind(this)}
                    computeHeight={that.computeHeight.bind(this)}/>

                <div ref="tips" style={{ display: "block" }}>
                    <Tips title="温馨提示" content="手机银行仅支持一年内交易明细查询。一年以上的交易明细查询请到我行网点办理。" />
                </div>
                {
                    this.state.noDataState ? <NoData text="查询无数据" /> : null
                }
                {
                    list.length === 0 ? null :
                        <div style={{ 'height': listHeight }}>
                            <ScrollMore loadMoreData={this.queryDetailMore.bind(this)} isAll={isloadAll}>
                                <MbankAccountQueryDetail.Group>
                                    {
                                        list.map(function (item, index) {
                                            return <MbankAccountQueryDetail
                                                show={!show}
                                                Flag={item.dCFlag}
                                                Loanflag={item.remark}
                                                TranDate01={item.transDate}
                                                TranTime={item.transTime}
                                                AmountN={item.amount}
                                                Balance={item.balance}

                                                Account={item.Account}
                                                AccountName={item.AccountName}
                                                AccountType={item.AccountType}
                                                AccountStat={item.AccountStat}
                                                AccountSign={item.AccountSign}

                                                BankName={item.BankName}
                                                key={index}
                                                type={index}
                                            />
                                        })
                                    }
                                </MbankAccountQueryDetail.Group>
                            </ScrollMore>
                        </div>
                }
            </div>
        )
    }
}

