import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Tappable from 'react-tappable';
//API数据接口
import API from './../../../../../constants/api';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import CardNews from '../../../../../components/Base/card-news/index.web.jsx';
//公共方法
import $ from 'jquery';
import Common from "../../../../../util/common.jsx";
import $native from './../../../../../native/native';
import $Fetch from './../../../../../fetch/fetch';

export default class newsList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: [],
            sta: ""
        }
    }

    // 初始化设置
    componentDidMount() {
        // 设置native topbar 标题及返回
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '新闻资讯',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
        // 获取新闻接口数据
        $Fetch(API.API_PUBLIC_NEWS_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "PU01",
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
                type: "0",
                // operatechannel: "D",
                stt: "0",
                pageNo: "1",
                pageSize: "10"
            }
        }).then((res) => {
            // 判断返回结果
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.setState({
                    list: res.rspBody.bankManagementReturnList
                });
                let i = 0;
                let returnlist = res.rspBody.bankManagementReturnList;
                // for (i; i < returnlist.length; i++) {
                //     document.getElementById(i).innerHTML = returnlist[i].content;
                // }
            } else {
                // 弹框提示
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
    }

    // startDate		资讯创建开始时间
    // endDate		资讯创建开始时间
    // stt		资讯状态			0：正常（已发布）
    // 1：已过期
    // 2：已撤销
    // 3：待发布"
    // pageNo		当前页数			1	O
    // pageSize		每页显示记录数			10	O
    
    // 设置新闻参数传递参数
    NewsDetailSet(value) {
        //保存新闻信息
        let className = $(value.currentTarget).attr('class')
        let spstr = className.split("");
        Common.addSessionData(API.SESSION_JOURNALISM_INFO, JSON.stringify(this.state.list[spstr[spstr.length - 1]]));
        // hashHistory.push('/MbankPublicNewsDetail/' + value)
        // let params = JSON.stringify(value)
        //传值
        // $native.callClientForUI(API.NATIVE_CODE_STOREDATA, {params});
        Common.setUrl('public-newsDetail/index.html');
    }
    // 设置跳转页面
    goBackPage() {
        $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
    }
    render() {
        const {
            list
        } = this.state;
        const that = this;
        return (
            <div>
                    <WhiteSpace size="md" />
                    {
                        list.map(function (item, index) {
                            return <Tappable className={"a" + index} onClick={that.NewsDetailSet.bind(that)}
                                component="div" key={index}>
                                <CardNews>
                                    <CardNews.Header content={item.title} />
                                    {/* <CardNews.Footer content={item.content} /> */}
                                    <CardNews.Footer content={item.createtime} />
                                </CardNews>
                                <WhiteSpace size="md" />
                            </Tappable>
                        })
                    }
            </div>
        )
    }
}