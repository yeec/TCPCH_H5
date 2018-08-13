import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import $Fetch from '../../../../../fetch/fetch.js';
import Common from "../../../../../util/common.jsx";
import ContextDecorator from '../../../../../util/decorator/context-decorator';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
import Input from '../../../../../components/Base/input-list/index.web.jsx';
import List from '../../../../../components/Base/list/index.web.js';
//业务组件
import Tips from '../../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';
import Modal from '../../../../../components/mbank/mbank-public-select/mbank-public-select-modal/index.web.js';

@ContextDecorator
export default class MbankLifeSocialSecurityInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //缴费档次
            securityLevel: [
                {
                    label: '40%',
                    value: '01'
                },
                {
                    label: '50%',
                    value: '02'
                },
                {
                    label: '60%',
                    value: '03'
                },
                {
                    label: '70%',
                    value: '04'
                },
                {
                    label: '80%',
                    value: '05'
                },
                {
                    label: '90%',
                    value: '06'
                },
                {
                    label: '100%',
                    value: '07'
                },
            ],
            securityMap:[],
            grade: false,
            accountList: [],
            accountSelect: "",
            timeInput1: "",
            timeInput2: "",
            securityfage:"",
            name: "",
            payGrade: "",    //缴费档次
            // 当前的选择的账户
            currentAccount: {},
            // modal状态
            // modalState: false,
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "社保缴费",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });

        let securityList = JSON.parse(Common.getSessionData(API.SESSION_LIFE_SECURITY_QUERY_INPUT));
        that.setState({
            securityMap: securityList
        })
        if(securityList.aae140_110 == '1'){ //当选择‘城职基本养老保险’时，需要显示‘缴费档次’
            that.setState({
                grade: true
            })
        }
        console.log(this.state.securityMap);

        // 获取付款账户列表
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "LI04",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            // 交易上送报文
            data: {
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                let list = [];
                let cname = '';
                res.rspBody.returnList.map(function (item, index) {
                    if (item.alias == "") {
                        cname = res.rspBody.customerName;
                    } else {
                        cname = item.alias;
                    }
                    list.push({
                        label: Common.setAccountNum2(item.acNo,true) + '(' + cname + ')',
                        value: item.acNo
                    })
                });

                // state 转账账户列表
                that.setState({
                    accountList: list,
                    name: res.rspBody.customerName
                })
                
                // 获取当前账户
                that.state.accountList.map(function (item, i) {
                    item.now = '0';
                    if (i === 0) {
                        item.now = '1';
                        that.setState({
                            currentAccount: item
                        })
                    }
                })


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

    //选择养老缴费档次
    showSecurityfage(value, label){
        let that = this;
        that.setState({
            securityfage: label
        })
    }

    // // 选择转入账户
    // showAccountListBox(value, label) {
    //     this.setState({
    //         accountSelect: label
    //     })
    // }

    // // 显示付款账户列表
    // showAccountListBox() {
    //     let that = this;
    //     // that.setState({
    //     //     modalState: true
    //     // })
    //     let allaccount = that.state.accountList.map(function (item, i) {
    //         return JSON.stringify(item);
    //     });
    //     Modal.transferPaymentAccount({
    //         items: allaccount,
    //         titleText: '选择付款账户',
    //         customerNames: this.state.customerName,
    //         close: () => {
    //             Common.closeModal();
    //             // that.setState({
    //             //     modalState: false
    //             // })
    //         }
    //     }, function (key) {
    //         let accountListNew = that.state.accountList.map(function (item, i) {
    //             item.now = "0"
    //             if (i === key) {
    //                 item.now = "1";
    //                 that.setState({
    //                     currentAccount: item,
    //                     // demandAccount: [that.state.demandAccountList[i].value]
    //                 })
    //             }
    //             return item;
    //         })
    //         that.setState({
    //             accountList: accountListNew,
    //             // modalState: false
    //         })
    //         Common.closeModal();
    //     });
    // }

    //起始日期
    clickTimeStart(val){
        let that = this;
        that.setState({
            timeInput1: val
        })
    }

    //终止日期
    clickTimeEnd(val){
        let that = this;
        that.setState({
            timeInput2: val
        })
    }

    //点击下一步按钮
    nextStepButton = () =>{
        //付款账号页面传值
        Common.removeSessionData(API.SESSION_LIFE_SECURITY_QUERY_ACCOUNT, "");
        Common.addSessionData(API.SESSION_LIFE_SECURITY_QUERY_ACCOUNT, JSON.stringify({            
            account: this.state.accountSelect,
            name: this.state.name,
            payGrade: this.state.securityfage,
            payStartTime: this.state.timeInput1,
            payEndTime: this.state.timeInput2
        }));
        
        let aaa027Input	= "513401";	    //社保机构编码            
        let aff002Input = "C1079951000034";        //银行网点                
        let aae011Input = "MBOP";        //银行经办人              
        let aaz010Input = this.state.securityMap.aaz010;        //当事人信息              
        let aae140_110Input = this.state.securityMap.aae140_110;     //是否缴纳城职基本养老保险
        let aae140_310Input = this.state.securityMap.aae140_310;     //是否缴纳城职基本医疗保险
        let aae140_313Input = this.state.securityMap.aae140_313;     //是否缴纳城职重病医疗保险
        let aae140_330Input = this.state.securityMap.aae140_330;     //是否缴纳城职补充医疗保险
        let aae140_390Input = this.state.securityMap.aae140_390;     //是否参加城乡基本医疗保险
        let aae140_391Input = this.state.securityMap.aae140_391;     //是否参加城乡补充医疗保险
        let yic016Input = this.state.securityfage;        //缴费档次                
        let aae041Input = this.state.timeInput1;       //缴费开始时间            
        let aae042Input = this.state.timeInput2;         //缴费结束时间  

         //个体缴费测算查询（社保）
         $Fetch(API.API_QUERY_SECURITY, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "LI04",
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
                aaa027: aaa027Input,
                aff002: aff002Input,
                aae011: aae011Input,
                aaz010: aaz010Input,
                aae140_110: aae140_110Input,
                aae140_310: aae140_310Input,
                aae140_313: aae140_313Input,
                aae140_330: aae140_330Input,
                aae140_390: aae140_390Input,
                aae140_391: aae140_391Input,
                yic016: yic016Input,
                aae041: aae041Input,
                aae042: aae042Input
            }
        }).then((res) => {
            alert(res.rspHead.returnCode)
            if (Common.returnResult(res.rspHead.returnCode)) {
                Common.removeSessionData(API.SESSION_LIFE_QUERY_SECURITY_BACK, "");
                Common.addSessionData(API.SESSION_LIFE_QUERY_SECURITY_BACK, JSON.stringify(res.rspBody));
                // console.log(JSON.parse(Common.getSessionData(API.SESSION_LIFE_QUERY_SECURITY_BACK)))                
                Common.setUrl('socialSecurity-payFeesConfirm/index.html');

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

    render() {
        let securityMapShow = this.state.securityMap;
        let CurrentAccount = this.state.currentAccount;
        let currentAno = CurrentAccount.acNo;
        let currentAlias = CurrentAccount.alias;
        return (
            <div>
                <WhiteSpace size="sm" />
                {/* {
                    JSON.stringify(CurrentAccount) != '{}' ?
                        <MbankTransferOutItem cardnum={CurrentAccount.acNo} name={this.state.customerName} money={CurrentAccount.availBal} showdetail={this.showAccountListBox.bind(this)} />
                        : null
                } */}
                <List.Group>
                    <List title="用户号" description={securityMapShow.aaz010} />
                    <List title="缴费种类" description={securityMapShow.securityValue} />                    
                </List.Group>
                <WhiteSpace size="sm" />
                
                <Input.Group>
                    { this.state.grade ? 
                        <Input.Click
                            cols="1"
                            cellTitle="养老缴费档次"
                            labelNumber={7}
                            placeholder="请选择缴费档次"
                            title="养老缴费档次"
                            items={this.state.securityLevel}
                            value={this.state.securityfage}
                            onChange={this.showSecurityfage.bind(this)}
                        />
                    : null
                    }

                    <Input placeholder="请输入缴费开始时间" value={this.state.timeInput1} labelNumber={7} type="number" id="keyboardNumber"
                        maxLength="6" rightExtra="true" onChange={this.clickTimeStart.bind(this)}>缴费开始时间</Input>
                    <Input placeholder="请输入缴费开始时间" value={this.state.timeInput2} labelNumber={7} type="number" id="keyboardNumber"
                        maxLength="6" rightExtra="true" onChange={this.clickTimeEnd.bind(this)}>缴费结束时间</Input>
                    {/* <Input.Click
                        cols="1"
                        cellTitle="付款账号"
                        labelNumber={7}
                        placeholder="选择付款账号"
                        title="付款账号"
                        items={this.state.accountList}
                        value={this.state.accountSelect}
                        onChange={this.showAccountListBox.bind(this)}
                        /> */}

                </Input.Group>
                <WhiteSpace size="sm" />

                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.nextStepButton.bind(this)}>下一步</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                <div ref="tips" style={{ display: "block" }}>
                    <Tips title="缴费项目说明" content="缴费日期支持输入格式为：yyyymm,如：201701" />
                </div>    
            </div>
        )
    }
}