import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import $Fetch from '../../../../../fetch/fetch.js';
import Common from "../../../../../util/common.jsx";
import ContextDecorator from '../../../../../util/decorator/context-decorator';
import $ from 'jquery';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web.jsx';
import Input from '../../../../../components/Base/input-list/index.web.jsx';
//业务组件
import Tips from '../../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';

@ContextDecorator
export default class MbankLifeElectricityQuery extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            company:"",
            //缴费单位列表
            electricityComp: [
                {
                    label: '西昌电力股份有限公司',
                    value: '51520'
                },
                {
                    label: '凉山电业局',
                    value: '51409'
                }
            ],
            userNumber:"",   //用户编号
            beginTime: "",   //电费交易关闭开始时间
            endTime: ""     //电费交易关闭结束时间
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    //后期会改跳转路径
    goBack = () =>{
        Common.setUrl('account/index.html');
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "电费查询",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });
        this.setState({
            company: "51520"
        });

        //查询交易关闭时间
        $Fetch(API.API_QUERY_TRANS_CONTROL,{
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "LI01",
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
                code: "FE01"    //FE01-电费
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.setState({
                    beginTime: res.rspBody.beginTime,
                    endTime: res.rspBody.endTime
                })
                
                if(res.rspBody.flag){ //当前时间点在23：00~1：00之间
                    // 弹出错误信息
                    let alertDict = {
                        title: "提示",
                        msg: "系统维护中，如给您带来不便敬请谅解！",
                        success_text: "确认",
                        success: this.goBack.bind(this)
                    }
                    Common.showAppDialogAlert(alertDict);
                    return;
                }else{

                }
            }
        })
    }

    // 选择转入账户
    showAccountListBox(value, label) {
        this.setState({
            company: label
        })
    }

    //用户编号取值
    setNumberinputval(val){
        let that = this;
        this.setState({
            userNumber: val
        })
    }
    
    nextTopButton(){
        let numberInput = this.state.userNumber;   //用户编号
        let bureauInput =  this.state.company;     //代收单位编号
        //查询电费
        $Fetch(API.API_QUERY_ELECTRICITY_FEE,{
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "LI01",
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
                number: numberInput,
                bureau: bureauInput 
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                console.log(res.rspBody)
                //传值给录入页面
                Common.removeSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_MESSAGE,"");
                Common.addSessionData(API.SESSION_LIFE_ELECTRICITY_QUERY_MESSAGE, JSON.stringify(res.rspBody));
                Common.setUrl('electricity-payFeesInput/index.html');
            }
        })
    }

    render() {
        let contentText = "缴纳电费在"+this.state.beginTime+"~"+this.state.endTime+"为系统维护时间，给您带来的不便敬请谅解！"
        return (
            <div>
                <WhiteSpace size="sm" />
                <Input.Group>
                    <Input.Click
                        cols="1"
                        cellTitle="缴费单位"
                        labelNumber={6}
                        placeholder="西昌电力股份有限公司"
                        title="缴费单位"
                        items={this.state.electricityComp}
                        onChange={this.showAccountListBox.bind(this)}
                        value={this.state.company}
                    />
                </Input.Group>
                <WhiteSpace size="sm" />
                <Input placeholder="请输入用户编号" labelNumber={6} type="number" value={this.state.userNumber}
                        onChange={this.setNumberinputval.bind(this)}>用户编号</Input>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" disabled={Common.judgeEmpty(this.state.userNumber)} onTap={this.nextTopButton.bind(this)}>下一步</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                <div ref="tips" style={{ display: "block" }}>
                    <Tips title="温馨提示" content={contentText} />
                </div>           
            </div> 
        )
    }
}