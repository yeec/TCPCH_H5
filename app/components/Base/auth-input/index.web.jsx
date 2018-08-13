/**
 * Created by conivision on 2017/7/27.
 */
import React, { Component, PropTypes } from 'react'
import Common from "../../../util/common.jsx"
import $Fetch from '../../../fetch/fetch.js';
import API from '../../../constants/api';
import './style/index.web';

class AuthItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLen: this.props.maxlen,
            idData: this.props.iddatas,
            inputType: this.props.inputtype,
            leftTitle: this.props.lefttitle ? { display: "block" } : { display: "none" },
            phoneBoxIfClick: "1",
            phoneboxtext: "获取"
        }
    }
    inputitemcheck(vals) {
        let that = this;
        let valdata = document.getElementById(vals).value + "";
        document.getElementById(vals).value = valdata.replace(/\D/g, '');
        that.props.finalval(valdata);
        // console.log(valdata);
    }
    getauthcodefun() {
        let that = this;
        let setdata1 = Common.getSessionData(API.SESSION_TRANSFER_PHONENUM);
        let setdata1arr = setdata1.split("");
        if (setdata1 === "") {
            Common.showDialogAlert("手机号码输入不能为空");
        } else if (setdata1arr.length < 11) {
            Common.showDialogAlert("请输入正确格式的手机号码");
        } else {
            let successflag = 0;
            let callbackh5 = function (data) {
                // if(data.Flag == "0"){
                //     Common.showDialogAlert("短信动态码发送失败");
                // }else{
                successflag = 1;
                let wait = 60;//改为60
                let time = function () {
                    //console.log("timefun");
                    if (wait == 0) {
                        that.setState({
                            phoneBoxIfClick: "1",
                            phoneboxtext: "获取"
                        })
                        wait = 60;
                    } else {
                        that.setState({
                            phoneBoxIfClick: "0",
                            phoneboxtext: wait + " 秒后重新获取"
                        })
                        wait--;
                        window.authcodetimer = setTimeout(function () {
                            time();
                        }, 1000)
                    }
                }
                time();
                // let aaa = that.state.countdown
                // console.log("countdown1  "+aaa);
                // }  
            }
            let randomID = Math.random() * 1000000;
            Common.addSessionData(API.SESSION_AUTH_CODE_RANDOM, randomID);
            let randomIDs = Common.getSessionData(API.SESSION_AUTH_CODE_RANDOM);
            $Fetch(API.API_GET_AUTHCODE, {//获取短信验证码
                data: {
                    randomID: randomIDs,
                    mobileNo: setdata1
                }
            }).then((res) => {
                callbackh5();
            })
            console.log("successflag  " + successflag);
            let delaytimer = setTimeout(function () {
                if (successflag) {
                    that.setState({
                        countdown: "0"
                    })
                    // let bbb = that.state.countdown
                    // console.log("countdown2  "+bbb);
                }
            }, 1000)
        }
    }
    stopdefault(e) {
        e.preventDefault();
    }
    render() {
        const { textAlign } = this.props;
        return (
            <div className="ryt-list-item ryt-input-item">
                <div className="ryt-input-label ryt-input-label-6" style={this.state.leftTitle}>短信验证码</div>
                <div className="ryt-input-control">
                    <input type="text" id={this.state.idData} placeholder="请输入验证码" onKeyUp={this.inputitemcheck.bind(this, this.state.idData)} maxLength="6" style={{ textAlign }} />
                </div>
                <div className="ryt-input-extra">
                    <div className="ryt-button ryt-button-ghost ryt-button-small" onClick={this.state.phoneBoxIfClick === "1" ? this.getauthcodefun.bind(this) : null}><span>{this.state.phoneboxtext}</span></div>
                </div>
            </div>
        );
    }
}

AuthItem.propTypes = {
    maxlen: PropTypes.string,
    iddatas: PropTypes.string,
    finalval: PropTypes.any,
    inputtype: PropTypes.string,
    lefttitle: PropTypes.any,
    textAlign: PropTypes.oneOf(['left', 'center', 'right'])
};

AuthItem.defaultProps = {
    maxlen: "",
    iddatas: "",
    finalval: null,
    inputtype: "",
    lefttitle: true,
    textAlign: "left"
};

AuthItem.displayName = 'AuthItem';

export default AuthItem
