import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $ from 'jquery';
//API数据接口
import API from '../../../constants/api';
//证件类型
import document from '../../../constants/identificationtype';
//公共方法
import $native from '../../../native/native';
import ContextDecorator from '../../../util/decorator/context-decorator';
import Common from "../../../util/common.jsx";
import $Fetch from './../../../fetch/fetch.js';

//基础组件
import WhiteSpace from '../../../components/Base/white-space/index.web.jsx';
import Button from '../../../components/Base/button/index.web.jsx';
import Input from '../../../components/Base/input-list/index.web.jsx';
import List from '../../../components/Base/list/index.web.js';
import WingBlank from '../../../components/Base/wing-blank/index.web.jsx';

import Tips from './../../../components/mbank/mbank-pubilc-tips/index.web.jsx';

import MbankPublicResult from '../../../components/mbank/mbank-public-result/index.web.jsx';
//样式引入
import './style/index.web.js';

@ContextDecorator
export default class MbankYunZhengTong extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //客户名称
            nameInputVal: "",
            //证件类型
            documentTypeNow: [],
            /*证件类型value*/
            documentTypeNowval: [10100],
            //证件号码
            documentInputVal: "",
            //手机号
            mobileNo: "",
            //借记卡号
            accountInputVal: "",
            //交易密码
            passwordInputVal: "",
            passwordInputValm: "",
            // clickState:"1",
            //短信验证码
            AuthCode: ""

        };
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        // 添加背景颜色
        Common.addBgColor()
        // 初始化离开钩子
        // this.props.router.setRouteLeaveHook(
        //     this.props.route,
        //     Common.removeBgColor.bind(this)
        // )
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "云证通",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            }
        });


        //验证云证通是否开通
        // 函数名：vertifyYZTStatus    入参：成功回调函数    出参：状态码（0开通且证书可用、1开通证书不可用或失效、2未开通）
        $native.callClientForBank(API.NATIVE_CODE_VERTIFY_YZT_STATUS, {
            success: (res)=> {

                if (res == 0) {
                    //0开通且证书可用    展示结果
                    $(this.refs.myInput).hide();
                    $(this.refs.myResult).hide();
                    $(this.refs.mySuccess).show();
                } else if (res == 1) {
                    //1开通证书不可用或失效 下载可用
                    $(this.refs.myInput).hide();
                    $(this.refs.myResult).show();
                    $(this.refs.mySuccess).hide();
                } else if (res == 2) {
                    //2未开通 展示开通页面
                    $(this.refs.myInput).show();
                    $(this.refs.myResult).hide();
                    $(this.refs.mySuccess).hide();

                }
            }
        });

        // // 发短信模板
        // let data = {
        //     templateNo: "sms00000003"
        // };
        // Common.addSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN, JSON.stringify(data));

    }

    //获取客户姓名
    setNameinputval(val) {
        let that = this;
        that.setState({
            nameInputVal: val
        })

    }

    //获取证件类型value
    documentTypeNowCalues(val) {
        let that = this;
        that.setState({
            documentTypeNowval: val
        })


    }

    //获取证件号
    setDocumentinputval(val) {
        let that = this;
        that.setState({
            documentInputVal: val
        })

    }

    //获取手机号的值
    setmobileNo(val) {
        let that = this;
        that.setState({
            mobileNo: val
        })
    }

    //获取获取卡号
    setAccountinputval(val) {
        let that = this;
        that.setState({
            accountInputVal: val
        })
    }

    //获取交易密码
    setPasswordinputval(val) {
        let that = this;
        that.setState({
            passwordInputVal: val
        })
    }

    //获取短信验证码
    setAuthinputval(val) {
        let that = this;
        that.setState({
            AuthCode: val
        })
    }

    // //短信验证码点击事件
    // setClickState(vals){
    //     this.setState({
    //         clickState: vals
    //     })
    // }

    // 调用客户端键盘接口
    //  “amount”:金额键盘，“num”:纯数字键盘，“tradePsw”:交易密码，“pwd”:登录密码

    showKeyBoard1() {
        this.setState({
            passwordInputVal: "",
            passwordInputValm: ""
        });
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "tradePsw",
            cancel: "cancel",
            success: (res) => {
                let jsons = JSON.parse(res);
                let a = "";
                for (var i = 0; i < jsons.pswLength; i++) {
                    a = a + "2"
                }
                this.setState({
                    passwordInputValm: jsons.pswText,
                    passwordInputVal: a
                })
            }
        })
    }

    //点击提交
    showCheckNext() {
        //客户名称
        let name = this.state.nameInputVal;
        //证件类型
        let documenttype = this.state.documentTypeNowval.join('');
        //证件号码
        let documentnum = this.state.documentInputVal;
        //手机号
        let phone = this.state.mobileNo;
        //账号
        let accountNo = this.state.accountInputVal;
        //密码
        let cipher = this.state.passwordInputValm;
        // alert(name + " " + documenttype + " " + documentnum + " " + phone + " " + accountNo + " " + cipher + " ");

        //身份证校验
        if (documenttype == "10100" || documenttype == "10300") {
            if (!Common.validateIDCard(documentnum)) {
                let alertDict = {
                    title: "提示信息",
                    msg: "请输入正确的身份证号码",
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }
        }

        //交易密码
        if (Common.judgeEmpty(cipher)) {
            let alertDict = {
                title: "错误提示",
                msg: "请输入交易密码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
            return;
        }

        //验证手机号位数
        if (Common.phoneNumber(phone)) {
            let alertDict = {
                title: "错误提示",
                msg: "请输入正确的手机号码",
                success_text: "确认"
            };
            Common.showAppDialogAlert(alertDict);
            return;
        }

        let params = {
            //客户名称
            custerName: name,        // custerName		客户名称
            //证件类型
            certType: documenttype,  // certType		证件类型
            //证件号码
            certNo: documentnum,     // certNo		证件号码
            //手机号码
            mobileNo: phone,        // mobileNo		手机号
            //卡号
            accountNo: accountNo,    // accountNo		签约账号
            //密码
            cipher: cipher           // cipher		卡密码

        };

        // 提交云证通信息
        $Fetch(API.API_GET_CHECK_OPEN_YZTUSER_INFO, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "YZ01",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",
            },
            // 交易上送报文
            data: params


        }).then((res) => {
            // alert(res.rspHead.returnCode);
            if (Common.returnResult(res.rspHead.returnCode)) {
                //成功回调开通云证通
                this.openYZTWithUserInfo();

            } else {
                this.setState({
                    passwordInputVal: ""
                });
                let alertDict = {
                    title: "开通云证通验证失败",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                };
                Common.showAppDialogAlert(alertDict);
            }
        })

    }

    // 云证通开通
    // 函数名：openYZTWithUserInfo NATIVE_CODE_OPEN_YZTWITHUSER_INFO
    // 入参：成功回调函数+客户信息（用户名：userName、证件号：certNo、证件类型：certType、手机号：mobile）
    // 出参：状态码（（0未开通、1开通）
    openYZTWithUserInfo() {
        let that = this
        // alert(that.state.nameInputVal + " " + that.state.documentInputVal + " " + that.state.documentTypeNowval.join('') + " " + that.state.mobileNo);
        $native.callClientForBank(API.NATIVE_CODE_OPEN_YZTWITHUSER_INFO, {
            userName: that.state.nameInputVal,
            certNo: that.state.documentInputVal,
            certType: that.state.documentTypeNowval.join(''),
            mobile: that.state.mobileNo,
            success: (res)=> {
                that.openInfoCallBack(res);
            }
        })
    }

    openInfoCallBack(res) {
        // alert(res);
        if (res == 0) {
            //开通失败
            let alertDict = {
                title: "信息提示",
                msg: "云证通开通失败，请重新认证",
                success_text: "确认",
            };
            Common.showAppDialogAlert(alertDict);
        } else if (res == 1) {
            //开通成功 跳转至下载页面
            $(this.refs.myInput).hide();
            $(this.refs.myResult).show();
            $(this.refs.mySuccess).hide();

        }
    }


    // 云证通下载证书
    // 函数名：downLoadCertificate  NATIVE_CODE_DOWNLOAD_CERTIFICATE
    // 入参：成功回调函数
    // 出参：状态码（（0下载失败、1下载成功）

    downLoadCertificate() {
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_DOWNLOAD_CERTIFICATE, {
            success: (res)=> {

                if (res == 0) {
                    //下载失败
                    let alertDict = {
                        title: "信息提示",
                        msg: "云证通下载证书失败，请重新下载",
                        success_text: "确认",
                        //success: this.nextStepClick.bind(this)
                    };
                    Common.showAppDialogAlert(alertDict);
                } else if (res == 1) {
                    //下载成功
                    $(that.refs.myInput).hide();
                    $(that.refs.myResult).hide();
                    $(that.refs.mySuccess).show();

                }
            }
        })
    }


    /**** 接口字段说明

     注：无特殊说明字段均为 String 类型
     certType:证件类型
     certNo:证件号码
     custerName：客户名称
     phone: 手机号码
     smsCode: 短信验证码
     */

    // 设置跳转页面
    goToPage() {
        $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {});
    }


    render() {
        return (
            <div>
                <div ref="myInput" style={{display: "none"}}>
                    <Input.Group>
                        <Input placeholder="请输入开户姓名" value={this.state.nameInputVal} labelNumber={6}
                               onChange={this.setNameinputval.bind(this)}>姓名</Input>
                        <Input.Pick cols="1" cellTitle="证件类型" labelNumber={6} data={document}
                                    placeholder="居民身份证" title="证件类型"
                                    onChange={this.documentTypeNowCalues.bind(this)}
                                    value={this.state.documentTypeNowval}/>
                        <Input placeholder="请输入开户证件号" type="idcard" maxLength={23}
                               value={this.state.documentInputVal}
                               labelNumber={6}
                               onChange={this.setDocumentinputval.bind(this)}>证件号</Input>
                        <Input type="number" placeholder="请输入常用手机号码" maxLength={11} value={this.state.mobileNo}
                               labelNumber={6}
                               onChange={this.setmobileNo.bind(this)}>手机号码</Input>
                        {/*<Input placeholder="请输入下挂手机银行账号" maxLength={19} type="bankCard" inputType="name"*/}
                               {/*value={this.state.accountInputVal} labelNumber={6}*/}
                               {/*onChange={this.setAccountinputval.bind(this)}>下挂账户</Input>*/}
                        {/*<Input onClick={this.showKeyBoard1.bind(this)} type="password" placeholder="请输入签约账号交易密码"*/}
                               {/*maxLength={6} inputType="name" value={this.state.passwordInputVal} labelNumber={6}*/}
                               {/*editable={false}*/}
                               {/*onChange={this.setPasswordinputval.bind(this)}>交易密码</Input>*/}

                    </Input.Group>
                    <WhiteSpace size="lg"/>
                    <WingBlank size="lg">
                        <Button type="primary" size="default"
                                disabled={!(this.state.nameInputVal && this.state.documentTypeNowval && this.state.documentInputVal && this.state.mobileNo )}
                                onTap={this.openYZTWithUserInfo.bind(this)}>下一步</Button>
                        {/*&& this.state.accountInputVal && this.state.passwordInputVal  showCheckNext*/}
                    </WingBlank>
                </div>

                <div ref="myResult" style={{display: "none"}}>
                    <List.Group>
                        <List title="状态" description="证书不可用或失效"/>
                    </List.Group>

                    <WhiteSpace size="lg"/>
                    <WingBlank size="lg">
                        <Button type="primary" size="default"
                                onTap={this.downLoadCertificate.bind(this)}>下载证书</Button>
                    </WingBlank>
                    <WhiteSpace size="lg"/>
                    <Tips title="温馨提示" content="云证通开通后，请下载证书，否则不能正常使用云证通。证书下载成功后，提高转账额度，且更安全！"/>
                </div>


                <div ref="mySuccess" style={{display: "none"}}>
                    <MbankPublicResult type="success" title="云证通证书下载成功" message={<div>证书下载成功后，提高转账额度，且更安全！</div>}/>
                    <WhiteSpace size="lg"/>
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={this.goToPage.bind(this)}>完成</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
