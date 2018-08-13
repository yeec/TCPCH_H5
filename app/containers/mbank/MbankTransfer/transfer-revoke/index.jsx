import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { hashHistory } from 'react-router'
//公共方法
import $native from './../../../../native/native';
import $Fetch from './../../../../fetch/fetch';
import Common from "../../../../util/common.jsx";
import ContextDecorator from '../../../../util/decorator/context-decorator';
//API数据接口
import API from './../../../../constants/api';
//基础组件
import NoData from '../../../../components/Base/no-data/index.web.jsx';
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import ScrollMore from '../../../../components/Base/ScrollMore/index.web.jsx';
//业务组件
import MbankAccountQueryTransferDetail from './../../../../components/mbank/mbank-public-query-detail/mbank-public-query-detail-transfer/index.web';
import MbankAccountQuery from './../../../../components/mbank/mbank-public-query/index.web';



export default class MbankTransferQueryDetail extends React.Component {
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
            noDataState: false
        }
    }

    //转账成功按钮
    goFirstPage = () => {
        hashHistory.push('/MbankTransfer');
    };

    componentDidMount() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '转账撤销',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });

        // this.showAccountListBox();

        Common.addSessionData('selfFriendParam',
            {
                pageNo: 0,
                friendName: '',
                more: true,
                isLastPage: false
            });

            let that = this;
            let pageNum = that.state.pageNum;
    
    
            pageNum = "1";
    
            let pageSize = that.state.pageSize;
    
            //this.props.computeHeight((document.documentElement.clientHeight - document.getElementsByClassName('mbank-public-query-detail')[0].offsetHeight) + 'px')
    
            //当查询条件变化时，清空list、pageNum
            //查询时清空list[]
            this.setState({
                list: []
            });
                    //初始化查询
        $Fetch(API.API_QUERY_REVOKE_DETAIL, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF03",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",

            },
            data: {
                pageNo: pageNum,
                pageSize: pageSize,
            }
        }).then((res) => {

            if (Common.returnResult(res.rspHead.returnCode)) {

                this.setState({
                    pageNum: pageNum,
                    list: res.rspBody.returnList,
                    noDataState: [...that.state.list, ...res.rspBody.returnList].length === 0 ? true : false,
                    isloadAll: (pageNum * pageSize) >= res.rspBody.totalNum ? true : false
                })
            }
        })
    }

    picker选择时获取高度
    computeHeight(listHeight) {
        let that = this;
        that.setState({
            listHeight: listHeight
        })
    }

    // //账户列表查询初始化
    // showAccountListBox() {

    //     $Fetch(API.API_GET_OWN_ACCOUNTS, {
    //         //默认固定上送报文
    //         reqHead: {
    //             //场景编码
    //             sceneCode: "TF03",
    //             //步骤编码(根据相应步骤填写字段（1,2,3,4）)
    //             stepCode: "1",
    //             //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
    //             tradeType: "1",
    //             //交易标识 1-主，2-副
    //             flag: "2",
    //             //服务接口版本号 1.0.0
    //             serviceVersion: "1.0.0"
    //         },
    //         // 交易上送报文
    //         data: {}
    //     }).then((res) => {
    //         let params1 = {
    //             customerName: res.rspBody.customerName,
    //             //账户信息
    //             accInfoMap: res.rspBody.returnList[0],
    //         };
    //         Common.addSessionData(API.SESSION_ACCOUNT_DATA, JSON.stringify(params1));
    //         // State List数据
    //         let list = [];
    //         let cname = '';
    //         res.rspBody.returnList.map(function (item, i) {
    //             console.log(res.rspBody.customerName)
    //             if(item.alias == ""){
    //                 cname = res.rspBody.customerName;
    //             }else{
    //                 cname = item.alias;
    //             }
    //             list.push({
    //                 label: Common.setAccountNum(item.acNo) + '(' + cname + ')',
    //                 value: item.acNo,
    //             });
    //         });
    //         this.setState({
    //             AccountList: list
    //         })
            
    //     });
    // }


    //调用子组件
    showRES(startDate, accountValue, endDate) {
        console.log(startDate, accountValue, endDate)
        //清空数据
        this.setState({
            startDate: startDate,
            accountValue: accountValue,
            endDate: endDate
        });
        // //判断数据为空
        // if (Common.judgeEmpty(startDate) || Common.judgeEmpty(accountValue) || Common.judgeEmpty(endDate)) {
        //     let alertDict = {
        //         title: "信息提示",
        //         msg: "请选择账号、交易时间",
        //         success_text: "确认",

        //     };
        //     Common.showAppDialogAlert(alertDict);
        //     return
        // }
       

    }

    // //点击查询按钮
    // queryDetail(startDate1, accountValue1, endDate1) {
    //     let that = this;
    //     let pageNum = that.state.pageNum;


    //     pageNum = "1";

    //     let pageSize = that.state.pageSize;

    //     let startDate = startDate1 || that.state.startDate;
    //     let endDate = endDate1 || that.state.endDate;
    //     let accountNo = accountValue1 || that.state.accountValue;

    //     //当查询条件变化时，清空list、pageNum
    //     //查询时清空list[]
    //     this.setState({
    //         list: []
    //     });


    //     //初始化查询
    //     $Fetch(API.API_QUERY_TRANSFER_DETAIL, {
    //         //默认固定上送报文
    //         reqHead: {
    //             //场景编码
    //             sceneCode: "TF03",
    //             //步骤编码(根据相应步骤填写字段（1,2,3,4）)
    //             stepCode: "1",
    //             //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
    //             tradeType: "1",
    //             //交易标识 1-主，2-副
    //             flag: "1",
    //             //服务接口版本号 1.0.0
    //             serviceVersion: "1.0.0",

    //         },
    //         data: {

    //             payAccNo: accountNo,
    //             transStartTime: startDate,
    //             transEndTime: endDate,
    //             pageNo: pageNum,
    //             pageSize: pageSize
    //         }
    //     }).then((res) => {

    //         if (Common.returnResult(res.rspHead.returnCode)) {

    //             this.setState({
    //                 pageNum: pageNum,
    //                 list: res.rspBody.returnList,
    //                 noDataState: [...that.state.list, ...res.rspBody.returnList].length === 0 ? true : false,
    //                 isloadAll: (pageNum * pageSize) >= res.rspBody.totalNum ? true : false
    //             })
    //         }
    //     })

    // }

    //滑动查询按钮
    queryMoreDetail() {
        let that = this;
        let pageNum = that.state.pageNum;


        pageNum = (Number(pageNum) + 1) + "";

        let pageSize = that.state.pageSize;

        // let startDate = startDate1 || that.state.startDate;
        // let endDate = endDate1 || that.state.endDate;
        // let accountNo = accountValue1 || that.state.accountValue;

        // //当查询条件变化时，清空list、pageNum
        // if (startDate != this.state.startDate || accountNo != this.state.accountValue || endDate != this.state.endDate) {
        //     this.setState({
        //         list: []
        //     });
        //     pageNum = 1+"";
        // }

        //初始化查询
        $Fetch(API.API_QUERY_REVOKE_DETAIL, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF03",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",

            },
            data: {
                pageNo: pageNum,
                pageSize: pageSize,
            }
        }).then((res) => {

            if (Common.returnResult(res.rspHead.returnCode)) {

                this.setState({
                    pageNum: pageNum,
                    list: [...that.state.list, ...res.rspBody.returnList],
                    noDataState: [...that.state.list, ...res.rspBody.returnList].length === 0 ? true : false,
                    isloadAll: (pageNum * pageSize) >= res.rspBody.totalNum ? true : false
                })
            }
        })

    }


    revoke(inx) {
        $Fetch(API.API_REVOKE_REVOCABLE_DETAIL, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF03",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",

            },
            data: {
                flowNo:inx
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)){
                let alertDict = {
                    title: "提示",
                    msg: "次日到账撤销成功,可进入转账查询查看撤销状态",
                    success_text: "确认",
                    success: () => {
                        Common.setUrl("transfer-query/index.html")
                    }
                };
                Common.showAppDialogAlert(alertDict);
            }else{
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    cancel_text: "取消"
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
       
    }

    render() {
        const {
            list,
            pickerDateValue,
            show,
            listHeight,
            isloadAll
        } = this.state;
        let that = this;
        
        return (
            <div>
                <div style={{display:"none"}}>
                 <MbankAccountQuery 
                    
                    computeHeight={that.computeHeight.bind(this)}
                />
                </div>
                
                {
                    this.state.noDataState ?<NoData text="查询无数据"/>:null
                }
                {list.length === 0 ? null :
                    <div style={{ 'height': listHeight }}>
                        <ScrollMore loadMoreData={this.queryMoreDetail.bind(this)} isAll={isloadAll}>
                            <MbankAccountQueryTransferDetail.Group>
                                {
                                      list.map(function (item, index) {
                                        return <MbankAccountQueryTransferDetail
                                            fages="1"
                                            returnCode={item.returnCode}
                                            returnMsg={item.returnMsg}
                                            payAccNo={item.payAccNo}
                                            payAccName={item.payAccName}
                                            resiveAccNo={item.resiveAccNo}
                                            resiveAccName={item.resiveAccName}
                                            zhuanchuAccNo={item.payAccNo}
                                            zhuanchuAccName={item.payAccName}
                                            resiveBankName={item.resiveBankName}
                                            transAmt={item.transAmt}
                                            postscript={item.postscript}
                                            isPosthaste={item.isPosthaste}
                                            tranDate={item.tranDate}
                                            tranTime={item.tranTime}
                                            transStartTime={item.transStartTime}
                                            transtt={item.transtt}
                                            key={index}
                                            type={index}
                                            onTAB={that.revoke.bind(this,item.gblflowSeq)}
                                        />
                                    })
                                }
                            </MbankAccountQueryTransferDetail.Group>
                        </ScrollMore>
                    </div>
                }
            </div>
        )
    }

}

