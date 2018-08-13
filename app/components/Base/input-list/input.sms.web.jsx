/**
 * Created by conivision on 2017/7/27.
 */
import React, {Component, PropTypes} from 'react'
import Common from "../../../util/common.jsx"
import $Fetch from '../../../fetch/fetch.js';
import $native from '../../../native/native.js';
import API from '../../../constants/api';
import './style/index.web';
import $ from 'jquery';

class AuthItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLen: this.props.maxlen,
            getTimes: 0,
            idData: this.props.iddatas,
            inputType: this.props.inputtype,
            leftTitle: this.props.lefttitle ? {display: "block"} : {display: "none"},
            phoneBoxIfClick: "1",
            phoneboxtext: "获取"
        }
    }

    // inputitemcheck(vals) {
    //     document.getElementById(vals).value = "";
    //     let that = this;
    //     //展示光标
    //     $("#" + vals).show();
    //     $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
    //         type: "num",
    //         maxLength: "6",
    //         //关闭键盘回调函数，并传入关闭的光标的Id
    //         cancel: 'cancel',
    //         success: res => {
    //             let jsons = JSON.parse(res);
    //             this.setState({
    //                 accountNo: jsons.text
    //             });
    //         document.getElementById(vals).value = jsons.text.replace(/\D/g, '');
    //         that.props.finalval(jsons.text);

    //         inputitemcheck();
    //         }
    //     });
    //     $("#" + vals).show();
    // }

    cancelKb = val => {
        //隐藏光标
        $("#" + val).hide();
      };

    getauthcodefun() {

        let that = this;
        let requestSmsData;
        let apiUrl;
        let smsData = JSON.parse(Common.getSessionData(API.SESSION_SMS_DATA));
        let smsDataAfterLogin = JSON.parse(Common.getSessionData(API.SESSION_SMS_DATA_AFTER_LOGIN));
        //点击获取短信验证码
        this.props.clickState("0");
        // 用于登录后发短信
        if (Common.judgeEmpty(smsData) && !Common.judgeEmpty(smsDataAfterLogin)) {
            requestSmsData = smsDataAfterLogin;
            apiUrl = API.API_GET_AUTHCODE_AFTER_LOGIN;

            //发送短信验证码
            this.getSmsCodeAfterLogin(requestSmsData)

        }
        // 用于登录前发短信
        if (!Common.judgeEmpty(smsData) && Common.judgeEmpty(smsDataAfterLogin)) {
            requestSmsData = smsData;
            apiUrl = API.API_GET_AUTHCODE;

            if (Common.judgeEmpty(requestSmsData.mobileNo)) {
                let alertDict = {
                    title: "信息提示",
                    msg: "手机号不能为空",
                    success_text: "确认",
                };
                Common.showAppDialogAlert(alertDict);
                return
            }

            if (Common.phoneNumber(requestSmsData.mobileNo)) {  //行方要求将描述修改
                let alertDict = {
                    title: "信息提示",
                    msg: "手机号输入有误，请重新输入",
                    success_text: "确认",
                };
                Common.showAppDialogAlert(alertDict);
                return
            }

            //发送短信验证码
            this.getSmsCodeBeforeLogin()

        }


        //发送交易

        //
        // console.log("successflag  " + successflag);
        // let delaytimer = setTimeout(function () {
        //     if (successflag) {
        //         that.setState({
        //             countdown: "0"
        //         })
        //         // let bbb = that.state.countdown
        //         // console.log("countdown2  "+bbb);
        //     }
        // }, 1000)

    }

    callbackh5(data) {
        let that = this;

        //改为60
        let wait = 60;
        let time = function () {
            //console.log("timefun");
            if (wait == 0) {
                that.setState({
                    phoneBoxIfClick: "1",
                    phoneboxtext: "获取"
                });
                wait = 60;
            } else {
                that.setState({
                    phoneBoxIfClick: "0",
                    phoneboxtext: wait + " 秒后重新发"
                });
                wait--;
                window.authcodetimer = setTimeout(function () {
                    time();
                }, 1000)
            }
        };
        time();

    }

    //登录前获取短信验证码
    getSmsCodeBeforeLogin() {

        let smsData = JSON.parse(Common.getSessionData(API.SESSION_SMS_DATA));

        $Fetch(API.API_GET_AUTHCODE, {//获取短信验证码
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: smsData.sceneCode,
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            data: smsData
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.callbackh5();
            } else if (res.rspHead.returnCode === API.MESSAGE_KEY_INVALID) {
                // 获取随机数
                this.getRandom();
            }else{
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }

        })
    }

    //获取随机数
    getRandom() {
        $native.callClientForBank(API.NATIVE_CODE_GETRANDOM, {
            success: this.getBackData
        });
        // this.getBackData();

    }

    //返回参数判断
    getBackData = (res) => {
        if (res === "1") {
            this.getSmsCodeBeforeLogin();
        } else if (res === "0") {

            this.setState({
                getTimes: this.state.getTimes + 1
            });

            console.log(this.state.getTimes);
            if (this.state.getTimes >= 3) {
                let alertDict = {
                    title: "提示",
                    msg: "交易失败",
                    success_text: "确认",
                    success: () => {
                        $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {})
                    }
                };
                Common.showAppDialogAlert(alertDict);
                this.setState({
                    getTimes: "0"
                });
                return;
            }
            this.getRandom();
        }
    };

    // 登录后获取短信验证码
    getSmsCodeAfterLogin(requestSmsData) {
        $Fetch(API.API_GET_AUTHCODE_AFTER_LOGIN, {//获取短信验证码
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: requestSmsData.sceneCode,
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0"
            },
            data: requestSmsData
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.callbackh5();
            }else{
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }

        })
    }


    stopdefault(e) {
        e.preventDefault();
    }

    render() {
        const {textAlign,
                editable,
                placeholder,
                value,
                onClick,
                id,
                cursorSize} = this.props;
        return (
            <div className="ryt-input-list-item ryt-input-item">
                <div className="ryt-input-label ryt-input-label-6" style={this.state.leftTitle}>短信验证码</div>
                <div className="ryt-input-control">
                    <input type="tel"  placeholder={placeholder}
                           onClick={onClick} maxLength="6" readOnly={!editable}
                           style={{textAlign}} value={value}/>
                    
                    <div id={id}
                        className="ryt-input-cursor"
                        style={{left:this.props.cursorSize * 0.21 +"rem",display:"none"}}
                    />
                    
                </div>
                <div className="ryt-input-extra ryt-input-sms">
                    <div className={this.state.phoneboxtext == "获取" ? "ryt-button ryt-button-ghost ryt-button-small":"ryt-button ryt-button-ghost ryt-button-small ryt-button-disabled"}

                         onClick={this.state.phoneBoxIfClick === "1" ? this.getauthcodefun.bind(this) : null}>
                        <span>{this.state.phoneboxtext}</span></div>
                </div>
            </div>
        );
    }
}

AuthItem.propTypes = {
    clickState: PropTypes.any,
    maxlen: PropTypes.string,
    iddatas: PropTypes.string,
    finalval: PropTypes.any,
    inputtype: PropTypes.string,
    lefttitle: PropTypes.any,
    textAlign: PropTypes.oneOf(['left', 'center', 'right'])
};

AuthItem.defaultProps = {
    clickState: null,
    maxlen: "",
    iddatas: "",
    finalval: null,
    inputtype: "",
    lefttitle: true,
    textAlign: "left",
    editable: true
};

AuthItem.displayName = 'AuthItem';

export default AuthItem
