import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../constants/api';
//公共方法
import $native from './../../../../native/native';
import Common from "../../../../util/common.jsx";
import $Fetch from './../../../../fetch/fetch';
import $ from 'jquery';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import List from '../../../../components/Base/list/index.web.js';
import Button from '../../../../components/Base/button/index.web.jsx';
import Switch from '../../../../components/Base/switch/index.web.jsx';
//业务组件
//子组件
import MbankAccountDetail from './account-detail/index.js';

export default class AccountDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            detail: {},
            alockcard: false,
            styleColor: "",
            DetailNao: ""
        }
    }

    // 初始化设置
    componentDidMount() {
        let that = this;
        let listmap = "";
        let alockcard1 = "";
        let alockcard2 = "";
        let alockcard3 = "";
        let alockcard4 = "";
        let staetflag = "";
        let alockcard = ""

        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '账户详情',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
        // 接收Session数据
        let sessionData = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA));
        console.log(sessionData)
        // State List数据
        this.setState({
            detail: sessionData.accInfoMap,
            DetailNao: sessionData.accInfoMap.acNo
        })
        //查询锁卡状态
        $Fetch(API.API_SET_ACCOUNT_LOCKING, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC03",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "2",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
                //交易手里标志  0-查询   1开关交易
                reuestFlag: "0",
                //境内外标志 0-境内 1-境外 2-全部
                foreignFlag: "2",
                //卡号
                accountNo: sessionData.accInfoMap.acNo
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                if (res.rspBody.returnList != "") {
                    let listSize = res.rspBody.returnList.length;
                    //循环取回来的List状态
                    res.rspBody.returnList.map(function (item, i) {
                        if (staetflag == "") {
                            staetflag = item.limitStatus
                        } else {
                            if (staetflag != item.limitStatus) {
                                if (!((staetflag == "1" && item.limitStatus == "2") || (staetflag == "2" && item.limitStatus == "1"))) {
                                    alockcard = "1";
                                }
                            }
                        }
                        if((staetflag=="1" || staetflag=="2") && listSize!=4){
                            alockcard = "1";
                        }
                    })
                    
                }
            }

            if (staetflag == "") {
                this.setState({
                    alockcard: false
                })
            }else if(staetflag == "0"){
                if (alockcard != "") {
                    this.setState({
                        alockcard: true,
                        styleColor: "rgba(255, 235, 59, 0.47)"
                    })
                } else {
                    this.setState({
                        alockcard: false
                    })
                }
            }else{
                if (alockcard != "") {
                    this.setState({
                        alockcard: true,
                        styleColor: "rgba(255, 235, 59, 0.47)"
                    })
                } else {
                    this.setState({
                        alockcard: true
                    })
                }
            }
            




            // if(alockcard1 == "1"){
            //     if(alockcard2 == "1"){
            //         if(alockcard3 == "1"){
            //             if(alockcard4 == "1"){
            //                 this.setState({
            //                     alockcard:true
            //                 })
            //             }
            //         }
            //     }

            // };
            // if(alockcard1 == "1"&&alockcard2 != "1"&&alockcard3 != "1"&&)

        })

    }

    // 返回页面设置
    goBackPage() {
        Common.setUrl('account/index.html');
    }

    // 账户解绑页面跳转
    goPageRemove() {
        Common.setUrl('account-remove/index.html');
    }

    //解约页面跳转
    goPageLoss() {
        Common.setUrl('account-loss/index.html');
    }

    // 一键锁定页面跳转
    goPageLockCard() {
        Common.setUrl('account-lockCard/index.html');
    }

    /**** 接口字段说明
     openOrg:        //开卡机构
     foldCardFlag:   //账户类型: 卡折标志 (0-卡) (1-存折)( 2-卡折关联)
     accountNo:      //账号
     alias:          //别名
     accountStat:    //签约状态: (0-未签约) (1-签约)
     accountSign:    //主账户: (0-非主账户)(1-主账户)
     balance:        //账户总额
     usableBalance:  //可用余额
     accountStatus:  //账户状态: (0-正常) (1-销户) (2-长期不动户) (3-不动转收益)

     acNo	        //账号
     alias	        //账号别名
     currency	    //币种
     cRFlag	        //钞汇标志
     balance	    //当前余额
     availBal	    //可用余额
     holdBalance	//冻结余额
     acStateRemark	//账户状态描述
     acState	    //账户状态
     deptId	        //开户机构号
     deptName	    //机构名称
     bankAcType	    //凭证类型
     expireDate	    //到期日期


     */
    //一键锁卡 事件
    clickalockcard = (checked) => {
        console.log(checked)
        this.setState({
            alockcard: checked
        })
        if (checked) {
            this.setState({

                styleColor:"#4dd865"
            })
            $(this.refs.myResult).hide()
            //给上送的状态赋值
            this.jumpnextpage({
                //境内外标志 2 全部
                foreignFlag: "2",
                //限制状态 2 关闭
                limitStatus: "2",
                //交易类型 1 开关交易
                reuestFlag: "1"
            })
        } else {
            this.setState({

                styleColor:"#bbb"
            })
            //给上送的状态赋值
            this.jumpnextpage({
                //境内外标志 2 全部
                foreignFlag: "2",
                //限制状态 0 开放
                limitStatus: "0",
                //交易类型 1 开关交易
                reuestFlag: "1"
            })
        }
    }

    //发送交易
    jumpnextpage(param) {
        let that = this;
        
        $Fetch(API.API_SET_ACCOUNT_LOCKING, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC03",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "2",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
                //交易请求标志
                reuestFlag: param.reuestFlag,
                //境内外标志
                foreignFlag: param.foreignFlag,
                //卡号
                accountNo: this.state.DetailNao,
                //交易类型 POS ATM
                transType: param.transType,
                //限制状态  开始  关闭  限制
                limitStatus: param.limitStatus,
                //限制时间
                limitTime: param.limitTime,
                //限制金额
                limitAmount: param.limitAmount
            }
        }).then((res) => {
            //返回状态判断
            if (Common.returnResult(res.rspHead.returnCode)) {
                console.log(param.limitStatus)
                if(param.limitStatus == "2"){   //行方要求将提示信息修改为如下
                    
                    let alertDict = {
                        title: "提示",
                        msg: "一键锁卡成功，境内外ATM/POS将无法进行交易",
                        success_text: "确认"
                    }
                    Common.showAppDialogAlert(alertDict);
                }else if(param.limitStatus == "0"){
                    let alertDict = {
                        title: "提示",
                        msg: "解锁成功",
                        success_text: "确认"
                    }
                    Common.showAppDialogAlert(alertDict);
                }
                
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
    }

    render() {
        let that = this;
        let Color = {
            backgroundColor: that.state.styleColor,
            borderColor:that.state.styleColor
        }
        // 账户状态字段转换
        let accountStatus = that.state.detail.acState;
        if (accountStatus == 0) {
            that.state.detail.accountStatus = '正常';
        }
        // 账户类型字段转换
        let foldCardFlag = that.state.detail.foldCardFlag;
        if (foldCardFlag == 0) {
            that.state.detail.foldCardFlag = '储蓄卡';
        }
        else if (foldCardFlag == 1) {
            that.state.detail.foldCardFlag = '存折';
        }
        else if (foldCardFlag == 2) {
            that.state.detail.foldCardFlag = '卡折关联';
        }
        return (
            <div>
                <MbankAccountDetail
                    accountNo={this.state.detail.acNo}
                    alias={this.state.detail.alias}
                    balance={this.state.detail.balance}
                    usableBalance={this.state.detail.availBal}
                    accountStatus={this.state.detail.acState}
                />
                <List.Group header="账户信息">
                    <List title="开户机构" description={this.state.detail.deptName} />
                    <List title="状态" description={that.state.detail.acStateRemark} />
                    {/* <List title="一键锁定/解锁" description="" onClick={this.goPageLockCard} link="设置" arrow/> */}
                    <Switch styleColo={Color} value={this.state.alockcard} onChange={this.clickalockcard} onClic={this.goPageLockCard.bind(this)} title="一键锁卡" />
                </List.Group>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button.Group horizon>
                        <Button type="ghost" onClick={this.goPageRemove.bind(this)}>解绑</Button>
                        <Button type="ghost" onClick={this.goPageLoss.bind(this)}>挂失</Button>
                    </Button.Group>
                </WingBlank>
            </div>
        )
    }
}
