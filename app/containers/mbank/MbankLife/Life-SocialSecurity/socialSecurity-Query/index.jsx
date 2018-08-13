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
//业务组件
import Tips from '../../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';

@ContextDecorator
export default class MbankLifeSocialSecurityQuery extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //缴费种类
            socialSecurityComp: [
                {
                    label: '城职基本养老保险',
                    value: 'aae140_110'
                },
                {
                    label: '城职基本医疗保险',
                    value: 'aae140_310'
                },
                {
                    label: '城职重病医疗保险',
                    value: 'aae140_313'
                },
                {
                    label: '城职补充医疗保险',
                    value: 'aae140_330'
                },
                {
                    label: '城乡基本医疗保险',
                    value: 'aae140_390'
                },
                {
                    label: '城乡补充医疗保险',
                    value: 'aae140_391'
                }
            ],
            securityType: "",
            keyMap:{},
            userNumberInput:''
        }

        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "社保查询",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });
    }

    // 选择缴费类型
    showAccountListBox(value, label) {
        this.setState({
            securityType: label,
            securityValue: value
        });
    }

    userNumberClick(val){
        this.setState({
            userNumberInput: val
        });
    }


    nextTopButton(){
        let keyMap={};
        if(this.state.securityType == 'aae140_110'){
            keyMap={
                aae140_110:'1',
                aae140_310:'0',
                aae140_313:'0',
                aae140_330:'0',
                aae140_390:'0',
                aae140_391:'0',
                aaz010:this.state.userNumberInput,
                securityValue:this.state.securityValue
            }
        }else if(this.state.securityType == 'aae140_310'){
            keyMap={
                aae140_110:'0',
                aae140_310:'1',
                aae140_313:'0',
                aae140_330:'0',
                aae140_390:'0',
                aae140_391:'0',
                aaz010:this.state.userNumberInput,
                securityValue:this.state.securityValue
            }
        }else if(this.state.securityType == 'aae140_313'){
            keyMap={
                aae140_110:'0',
                aae140_310:'0',
                aae140_313:'1',
                aae140_330:'0',
                aae140_390:'0',
                aae140_391:'0',
                aaz010:this.state.userNumberInput,
                securityValue:this.state.securityValue
            }
        }else if(this.state.securityType == 'aae140_330'){
            keyMap={
                aae140_110:'0',
                aae140_310:'0',
                aae140_313:'0',
                aae140_330:'1',
                aae140_390:'0',
                aae140_391:'0',
                aaz010:this.state.userNumberInput,
                securityValue:this.state.securityValue
            }
        }else if(this.state.securityType == 'aae140_390'){
            keyMap={
                aae140_110:'0',
                aae140_310:'0',
                aae140_313:'0',
                aae140_330:'0',
                aae140_390:'1',
                aae140_391:'0',
                aaz010:this.state.userNumberInput,
                securityValue:this.state.securityValue
            }
        }else if(this.state.securityType == 'aae140_391'){
            keyMap={
                aae140_110:'0',
                aae140_310:'0',
                aae140_313:'0',
                aae140_330:'0',
                aae140_390:'0',
                aae140_391:'1',
                aaz010:this.state.userNumberInput,
                securityValue:this.state.securityValue
            }
        }
        Common.removeSessionData(API.SESSION_LIFE_SECURITY_QUERY_INPUT, "");
        Common.addSessionData(API.SESSION_LIFE_SECURITY_QUERY_INPUT, JSON.stringify(keyMap));
        Common.setUrl('socialSecurity-payFeesInput/index.html');
    }

    render() {
        
        return (
            <div>
                <WhiteSpace size="sm" />
                <Input.Group>
                    <Input.Click
                        cols="1"
                        cellTitle="缴费种类"
                        labelNumber={6}
                        placeholder="选择缴费种类"
                        items={this.state.socialSecurityComp}
                        title="缴费种类"
                        onChange={this.showAccountListBox.bind(this)}
                        value={this.state.securityType}
                    />
                </Input.Group>
                <WhiteSpace size="sm" />
                <Input placeholder="请输入用户号" labelNumber={6} type="number" onChange={this.userNumberClick.bind(this)} rightExtra="true" title="请核对用户号">用户号</Input>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default"  onTap={this.nextTopButton.bind(this)}>下一步</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                <div ref="tips" style={{ display: "block" }}>
                    <Tips title="说明" content="用户号支持输入格式：身份证号码（18位）、社保卡号（9位）、个人编码（16位）" />
                </div> 
            </div>
        )
    }
}