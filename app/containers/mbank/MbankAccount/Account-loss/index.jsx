import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../constants/api';
//公共方法
import $Fetch from './../../../../fetch/fetch';
import $native from './../../../../native/native';
import Common from "../../../../util/common.jsx";
import $ from 'jquery';
//基础组件
import List from '../../../../components/Base/list/index.web.js';
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import Input from '../../../../components/Base/input-list/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../components/mbank/mbank-public-result/index.web.jsx';

export default class AccountLoss extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detail: {},
            //设置结果页面
            result: "",
            //密码
            cipher: "",
            customerName: "",
            passwordInputVal: "",
            returnCode: "",
            returnMsg: ""
        };
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取native Bar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '银行卡挂失',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
        // 接收Session数据
        let sessionData = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA));
        //console.log(sessionData)
        // State List数据
        this.setState({
            customerName: sessionData.customerName,
            detail: sessionData.accInfoMap
        })
    }

    // 监听卡号
    setAccountNoValue(vals) {
        this.setState({
            accountNo: vals
        })
    }


    // 调用客户端键盘接口
    //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
    showKeyBoard1() {
        this.setState({
            passwordInputVal: ""
        });
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            cancel: "cancel",
            hint:"请输入交易密码",
            success: (res) => {
                let jsons = JSON.parse(res);
                let a = "";
                for (var i = 0; i < jsons.pswLength; i++) {
                    a = a + "2"
                }
                this.setState({
                    cipher: jsons.pswText,
                    passwordInputVal: a
                })
            }
        })
    }


    // 提交确认
    checkTips() {
        let that = this;
        let cipher = that.state.passwordInputVal;
        // 输入项校验
        if (Common.PasswordSmsNumber(cipher)) {
            // 调取弹出框提示信息
            let alertDict = {
                title: "错误提示",
                msg: "请填写正确的交易密码",
                success_text: "确认"
            }
            Common.showAppDialogAlert(alertDict);
        } else {
            // 调取弹出框提示信息, 设置回调方法
            let alertDict = {
                title: "信息提示",
                msg: "尊敬的用户，您当前为紧急挂失，有效期为三天，正式挂失请三天内至我行柜台进行办理",
                cancel_text: "取消",
                success_text: "确认",
                success: that.nextStepClick.bind(this)
            };
            Common.showAppDialogAlert(alertDict);
        }
    }

    // 下一步
    nextStepClick() {
        let that = this;
        // 挂失接口
        $Fetch(API.API_SET_ACCOUNT_LOSS, {
            // 固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC06",
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
                //银行账号
                accountNo: that.state.detail.acNo,
                //交易密码
                cipher: that.state.cipher
            }
        }).then((res) => {
            //验证密码失败
            if (Common.enciperResult(res.rspHead.returnCode)) {
                // 调取弹出框提示信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
                return
            } else if (Common.messageResult(res.rspHead.returnCode)) {
                //短信验证码失败
                // 调取弹出框提示信息
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
                return
            } else {
                this.setState({
                    returnCode: res.rspHead.returnCode,
                    returnMsg: res.rspHead.returnMsg
                });
                // 隐藏录入页面
                $(this.refs.myInput).hide();
                // 显示结果页面-成功
                $(this.refs.myResult).show();
            }
        })
    }

    // 返回页面设置
    goBackPage() {
        Common.setUrl('account/index.html');
    }

    /**** 接口字段说明
     openOrg:  //开卡机构
     foldCardFlag:  //账户类型: 卡折标志 (0-卡) (1-存折)( 2-卡折关联)
     accountNo:  //账号
     name: //别名
     alias: //别名
     accountStat: //签约状态: (0-未签约) (1-签约)
     accountSign: //主账户: (0-非主账户)(1-主账户)
     balance: //账户总额
     usableBalance: //可用余额
     accountStatus: //账户状态: (0-正常) (1-销户) (2-长期不动户) (3-不动转收益)

     acNo            //账号
     alias            //账号别名
     currency        //币种
     cRFlag            //钞汇标志
     balance        //当前余额
     availBal        //可用余额
     holdBalance    //冻结余额
     acStateRemark    //账户状态描述
     acState        //账户状态
     deptId            //开户机构号
     deptName        //机构名称
     bankAcType        //凭证类型
     expireDate        //到期日期
     */
    render() {
        let that = this;
        return (
            <div>
                <WhiteSpace size="sm" />
                {/*****************输入页面*******************/}
                <div ref="myInput">
                    <List.Group>
                        <List title="账号" description={Common.setAccountNum2(that.state.detail.acNo,true)} />
                        <List title="姓名" description={that.state.customerName} />
                        {that.state.detail.alias ? <List title="别名" description={that.state.detail.alias} /> : null}
                        <List title="开户行" description={that.state.detail.deptName} />
                    </List.Group>
                    <WhiteSpace size="sm" />
                    <Input.Group>
                        <Input type="password" textAlign="left" labelNumber={6} maxLength="6"
                            placeholder="请输入交易密码"
                            editable={false} value={this.state.passwordInputVal} onClick={this.showKeyBoard1.bind(this)}
                        >交易密码</Input>
                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" disabled={!(that.state.cipher)}
                            onTap={that.checkTips.bind(this)}>确认</Button>
                    </WingBlank>
                </div>
                {/*****************结果页面*******************/}
                <div ref="myResult" style={{ display: "none" }}>
                    {
                        Common.returnResult(this.state.returnCode) ?
                            <MbankPublicResult type="success" title="挂失成功"
                                message={<div>尊敬的用户，您当前为紧急挂失，<b>有效期为三天</b>，正式挂失请三天内至我行柜台进行办理。</div>} />
                            : <MbankPublicResult type="error" title="挂失失败"
                                message={<div>尊敬的用户，您进行的绑定操作失败。
                                                     <br />错误编码：<b>{this.state.returnCode}</b>
                                    <br />错误信息：<b>{this.state.returnMsg}</b>
                                </div>} />
                    }
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={that.goBackPage.bind(this)}>返回</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}