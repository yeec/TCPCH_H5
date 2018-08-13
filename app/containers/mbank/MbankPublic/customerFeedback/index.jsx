import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../constants/api';
import $native from '../../../../native/native';
import $Fetch from '../../../../fetch/fetch';
import Common from "../../../../util/common.jsx";
//基础组件
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import Textarea from '../../../../components/Base/textarea/index.web.jsx';

export default class CustomerFeedback extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            //客户留言
            customerVoiceInfo: ""
        }
    }
    // 初始化设置
    componentDidMount() {
        // 设置native topbar 标题及返回
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '客户之声',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        })
    }
    // 接收录入信息值
    onTextValue = (value) => {
         //移除焦点
         Common.inputBlur();
        let that = this;
        that.setState({
            customerVoiceInfo: value,
        })
    }
    // 提交方法
    nextStepClick() {
        //移除焦点
        Common.inputBlur();
        let that = this;
        let customerVoiceInfo = that.state.customerVoiceInfo;
        // 判断内容是否为空,是否少于10个汉字
        if (Common.judgeEmpty(customerVoiceInfo) || customerVoiceInfo.length < 10 ) {
            let alertDict = {
                title: "错误信息",
                msg: "留言内容不能少于10个字。",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return

        } 
        
        if ( Common.inputRegExpLoose(customerVoiceInfo)){
            let alertDict = {
                title: "错误信息",
                msg: "留言内容不能输入特殊字符,谢谢!",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
            return
        }
        
            // 获取转账明细确认信息
            $Fetch(API.API_PUBLIC_CUSTOMER_FEEDBACK, {
                //默认固定上送内容
                reqHead: {
                    //场景编码
                    sceneCode: "PU03",
                    //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                    stepCode: "1",
                    //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                    tradeType: "1",
                    //交易标识 1-主，2-副
                    flag: "1",
                    //服务接口版本号 1.0.0
                    serviceVersion: "1.0.0"
                },
                // 上送内容
                data: {
                    customerVoiceInfo: customerVoiceInfo
                }
            }).then((res) => {
                // 判断上送是否成功
                if (Common.returnResult(res.rspHead.returnCode)) {
                    let alertDict = {
                        title: "提交成功",
                        msg: "尊敬的客户，您提交的宝贵意见我们将尽快完善，给您带来的不便深表歉意，感谢您对我行的关心与支持。",
                        success_text: "返回",
                        success:this.goToPage
                    }
                    Common.showAppDialogAlert(alertDict);
                } else {
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
    // 设置跳转页面
    goToPage() {
        $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
    }
    /**** 接口字段说明 
        customerVoiceInfo:  //客户留言
    */
    render() {
        const that = this;
        return (
            <div>
                <WhiteSpace size="md" />
                <WingBlank size="lg">
                    <p>您的意见对我们来说至关重要，我们将不断优化体验</p>
                    <WhiteSpace size="md" />
                    <Textarea onChange={this.onTextValue.bind(this)} value={that.state.customerVoiceInfo}></Textarea>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button onTap={this.nextStepClick.bind(this)} type="primary">吐嘈</Button>
                </WingBlank>
            </div>
        )
    }
}