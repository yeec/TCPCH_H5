import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../constants/api';
//公共方法
import $Fetch from './../../../../fetch/fetch';
import $native from './../../../../native/native';
import Common from "../../../../util/common.jsx";
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import InputItem from '../../../../components/Base/input-item/index.web.jsx';
//业务组件

export default class AccountSet extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountNo: "",
            alias: ""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    // 返回页面设置
    goBackPage() {
        Common.setUrl('account/index.html');
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '账户设置',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success:this.goBackPage
            }
        });
        // 接收Session数据
        let sessionData = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA));
        // 获取账户详细信息
        $Fetch(API.API_QUERY_ACCOUNT_DETAIL_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "0001",
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
                accountNo: sessionData
            }
        }).then((res) => {
            // State List数据
            this.setState({
                accountNo: res.accountNo,
                alias: res.alias,
            })
        })
    }
    // 别名
    setAliasValue(vals) {
        this.setState({
            alias: vals
        })
    }
    // 提交下一步
    nextStepClick() {
        let that = this;
        let alias = that.state.alias;
        let accountNo = that.state.accountNo.split(" ").join("");
        // 输入项校验
        if (Common.judgeEmpty(alias) || Common.inputRegExp(alias)) {
            // 调取弹出框提示信息
            let alertDict = {
                title: "信息提示",
                msg: "请填写别名",
                success_text: "确认",
            }
            Common.showAppDialogAlert(alertDict);
        } else {
            // 添加下挂账户接口
            $Fetch(API.API_YINZHENG_DETAIL, {
                // 固定上送报文
                reqHead: {
                    //场景编码
                    sceneCode: "0001",
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
                    //卡号
                    accountNo: that.state.accountNo,
                    //别名
                    alias: that.state.alias,
                }
            }).then((res) => {
                //接口返回数据及操作 
                // 判断上送是否成功
                if ("00000000" == "00000000") {
                    // 调取弹出框提示信息
                    let alertDict = {
                        title: "信息提示",
                        msg: "别名修改成功",
                        success_text: "返回",
                        success: that.goToPage.bind(this)
                    }
                    Common.showAppDialogAlert(alertDict);
                } else {
                    // 调取弹出框提示信息
                    let alertDict = {
                        title: "信息提示",
                        msg: "别名修改成功",
                        success_text: "返回",
                        success: that.goToPage.bind(this)
                    }
                    Common.showAppDialogAlert("交易出错", this.goToPage);
                }
            })
        }
    }
    goToPage() {
        Common.setUrl('account/index.html');
    }
    render() {
        return (
            <div>
                <InputItem placeholder="请输入卡号" value={this.state.accountNo} disabled labelNumber={6} maxLength="24" type="bankCard"
                >
                    卡号
                </InputItem>
                <InputItem placeholder="请输入别名" value={this.state.alias} labelNumber={6} maxLength="8" type="text"
                    onChange={this.setAliasValue.bind(this)}>
                    别名
                </InputItem>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default" onTap={this.nextStepClick.bind(this)}>确认</Button>
                </WingBlank>
            </div>
        )
    }

}

