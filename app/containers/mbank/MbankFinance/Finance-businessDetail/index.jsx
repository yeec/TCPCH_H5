import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $native from '../../../../native/native';
import API from '../../../../constants/api';
import $Fetch from './../../../../fetch/fetch.js';
import MbankAccountQuery from './../../../../components/mbank/mbank-public-query/index.web';
import MbankAccountQueryFinanceDetail from './../../../../components/mbank/mbank-public-query-detail/mbank-public-query-detail-finance/index.web';
import Common from "../../../../util/common.jsx";
import NoData from '../../../../components/Base/no-data/index.web.jsx';
import ScrollMore from '../../../../components/Base/ScrollMore/index.web.jsx';

export default class MbankFinanceBussinessDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            list: [],
            AccountList:[],
            listHeight: 'auto',
            isloadAll: false,
            startDate: '',
            accountValue: '',
            endDate: '',
            pageNum: '0',
            pageSize: '10',
            noDataState: false
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "理财交易查询",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        this.showAccountListBox();
    }

    //下挂账户列表查询（理财）
    showAccountListBox() {

        $Fetch(API.API_UNDERBAR_REL_ACCOUNT_FIN, {
            //默认固定上送报文
            reqHead:{
                //场景编码
                sceneCode:"FA11",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode:"1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType:"1",
                //交易标识 1-主，2-副
                flag:"2",
                //服务接口版本号 1.0.0
                serviceVersion:"1.0.0"
            },
            // 交易上送报文
            data: {}
        }).then((res) => {
            // State List数据
            if(Common.returnResult(res.rspHead.returnCode)){
                let list = [];
                let cname = '';
                res.rspBody.returnList.map(function (item, i) {
                    if (item.alias == "") {
                        cname = item.cusName;
                    } else {
                        cname = item.alias;
                    }
                    list.push({
                        label: Common.setAccountNum2(item.acNo,true) + '(' + cname + ')',
                        value: item.acNo,
                    });
                });
                this.setState({
                    AccountList: list
                })
            }else{
                let alertDict={
                    title: "错误提示",
                    msg:res.rspHead.returnMsg,
                    success_text:"确认",
                    success:this.wrongBack.bind(this)
                }
                Common.showAppDialogAlert(alertDict);
                return
            }
        });
    }

    wrongBack = () =>{
        Common.setUrl('finance/index.html');
    }

    // picker选择时获取高度
    computeHeight(listHeight) {
        let that = this;
        that.setState({
            listHeight: listHeight
        })
    }

    //调用子组件
    showRES(startDate, accountValue, endDate) {
        //清空数据
        this.setState({
            list: [],
            startDate: startDate,
            accountValue: accountValue,
            endDate: endDate
        });
        //判断数据为空
        if (Common.judgeEmpty(startDate) || Common.judgeEmpty(accountValue) || Common.judgeEmpty(endDate)) {
            let alertDict = {
                title: "信息提示",
                msg: "请选择账号、交易时间",
                success_text: "确认",
            }
            Common.showAppDialogAlert(alertDict);
            return
        }
        this.queryDetail(startDate, accountValue, endDate);
    }

    //点击查询按钮
    queryDetail(startDate1, accountValue1, endDate1) {
        let that = this;

        let pageNum = that.state.pageNum;
        pageNum = "1";
        let pageSize = that.state.pageSize;

        let startDate = startDate1|| that.state.startDate;
        let endDate = endDate1 || that.state.endDate ;
        let accountNo = accountValue1 || that.state.accountValue ;

        //当查询条件变化时，清空list、pageNum
        this.setState({
            list: []
        })

        //初始化查询
        //调用理财历史交易明细查询
        $Fetch(API.API_SELECT_HISTORY_TRANS_DETAILS, {
            //默认固定上送报文
            reqHead:{
                //场景编码
                sceneCode:"FA11",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode:"1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType:"1",
                //交易标识 1-主，2-副
                flag:"1",
                //服务接口版本号 1.0.0
                serviceVersion:"1.0.0"
            },
            data: {
                bankAcct: accountNo,    //银行账户
                prdId: "",    //产品id
                startDate: startDate,       //起始日期
                endDate  : endDate,    //结束日期
                tranBusiCode : "",        //交易类型
                tranStatus: "",       //产品状态
                pageNum : pageNum,     //查询页数
                pageSize: pageSize         //每页条数
            }
        }).then((res) => {
            if(Common.returnResult(res.rspHead.returnCode)){
                this.setState({
                    pageNum: pageNum,
                    list: res.rspBody.returnList,
                    noDataState: [...that.state.list, ...res.rspBody.returnList].length === 0 ? true : false,
                    isloadAll: pageNum*pageSize  >= res.rspBody.totalNum ? true : false
                })
            }else if(res.rspHead.returnCode === '1005'){
                this.setState({
                    noDataState:true
                })
            }else{
                let alertDict={
                    title:"错误提示",
                    msg:res.rspHead.returnMsg,
                    success_text:"确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
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
    
        //调用理财历史交易明细查询查询更多
        $Fetch(API.API_SELECT_HISTORY_TRANS_DETAILS, {
            //默认固定上送报文
            reqHead:{
                //场景编码
                sceneCode:"FA11",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode:"1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType:"1",
                //交易标识 1-主，2-副
                flag:"1",
                //服务接口版本号 1.0.0
                serviceVersion:"1.0.0"
            },
            data: {
                bankAcct: accountNo,    //银行账户
                prdId: "",    //产品id
                startDate: startDate,       //起始日期
                endDate  : endDate,    //结束日期
                tranBusiCode : "",        //交易类型
                tranStatus: "",       //产品状态
                pageNum : pageNum,     //查询页数
                pageSize: pageSize         //每页条数
            }
            }).then((res) => {
                if (Common.returnResult(res.rspHead.returnCode)) {
                    this.setState({
                        pageNum: pageNum,
                        list: [...that.state.list, ...res.rspBody.returnList],
                        noDataState: [...that.state.list, ...res.rspBody.returnList].length === 0 ? true : false,
                        isloadAll: pageNum*pageSize  >= res.rspBody.totalNum ? true : false
                    })                    
                }    
            })
        }

    render() {
        const {
            list,
            listHeight,
            isloadAll
            } = this.state;
        let that = this;
        return (
            <div>
                <MbankAccountQuery accountList={that.state.AccountList} MethodFn={that.showRES.bind(this)}
                     computeHeight={that.computeHeight.bind(this)}/>
                {
                    this.state.noDataState ?<NoData text="查询无数据"/>:null
                }
                {list.length === 0 ? null :
                    <div style={{'height': listHeight}}>
                        <ScrollMore loadMoreData={this.queryDetailMore.bind(this)} isAll={isloadAll}>
                            <MbankAccountQueryFinanceDetail.Group>
                            {
                                list.map(function (item, index) {
                                    return <MbankAccountQueryFinanceDetail
                                        productHold={item.appAmt}
                                        productName={item.prdName}
                                        productDate={item.appAmt}
                                        productID={item.prdId}
                                        channelBusiCode={item.channelBusiCode}
                                        TranDate01={item.tranDate}
                                        TranTime={item.TranTime}
                                        AmountN={item.AmountN}
                                        Balance={item.appAmt}
                                        productState={item.tranStatus}
                                        productType={item.productType}
                                        key={index}
                                    />
                                })
                            }
                            </MbankAccountQueryFinanceDetail.Group>
                        </ScrollMore>
                    </div>
                }
            </div>
        )
    }
}