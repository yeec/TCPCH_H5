import React from 'react'
import ReactDOM from 'react-dom'
// 公共方法
import $native from './../native/native';
import DateFormat from './common/date-format';
import $ from 'jquery';
import API from './../constants/api';
// 组件引用
import Modal from '../components/Base/modal/index.web.js';
import Loading from '../components/Base/Loading/index.web.jsx'
import Toast from '../components/Base/toast/index.web.jsx';

// 全局调用名称为 Common.方法名
class Common extends React.Component {
  /*************************************************************************
   * 页面上移方法
   * 1.上移     Common.pageMoveShow(num)
   * 2.还原     Common.pageMoveHide(num)
   **/
  static pageMoveShow(num) {
    let rem= num / 75 +"rem"
    // console.log(rem)
    $("html").css({ height:" 100%","overflow":"hidden","overflow-y":"auto"})
    $("body")
      .css({position: "absolute", left: "0" ,bottom: "0"})
      .animate({ top: "-" + rem });
  }
  static pageMoveHide(num) {
    $("body")
      .css({ position: "initial", left: "0" })
      .animate({ top: "0px" })
  }
  /*************************************************************************
     * 公共URL跳转方法
     * 1.url     Common.setUrl(url) 
     **/
    static setUrl(url) {
        // console.log(url)
        // $native.callClientForUI(API.NATIVE_CODE_LOADNEWPAGE, {
        //     pageUrl: url
        // });
        if (__DEV__) {
            window.location.href = url
        }
        else {
            $native.callClientForUI(API.NATIVE_CODE_LOADNEWPAGE, {
                pageUrl: url
            });
       }
    }
    /*************************************************************************
     * 公共背景颜色方法
     * 1.添加     Common.addBgColor(color) // 默认无参数为白色， 可设置参数颜色 例:“#f00”
     * 2.移除     Common.removeBgColor()
     **/
    //添加
    static addBgColor(color) {
        if (color) {
            $("html,body").css("background-color", color);

        } else {
            $("html,body").css("background-color", "#ffffff");
        }
    }

    //移除
    static removeBgColor() {
        $("html,body").css("background-color", "");
    }

    /*************************************************************************
     * 公共返回结果方法
     * 1.函数     Common.toast()
     * 2.类型     “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
     **/
    static returnResult(n) {
        switch (n) {
            // 成功结果
            case "00000000":
                return true;
                break;
        }
    }

    static messageResult(n) {
        switch (n) {
            // 验证短信错误
            case API.MESSAGE_ERROR:
                return true;
                break;
        }
    }

    static enciperResult(n) {
        switch (n) {
            // 验证密错误
            case API.ENCIPHER_ERROR:
                return true;
                break;
        }
    }

    /*************************************************************************
     * 公共键盘方法
     * 1.函数     Common.toast()
     * 2.类型     “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
     **/
    static toast(type, title) {
        switch (type) {
            case "success":
                Toast.success(title);
                setTimeout(function () {
                    Toast.hide();
                }, 3000)
                break;
            case "error":
                Toast.error(title);
                setTimeout(function () {
                    Toast.hide();
                }, 3000)
                break;
        }
    }

    /*************************************************************************
     * 公共键盘方法
     * 1.函数     Common.showKeyBoard()
     * 2.类型     “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
     **/
    // 键盘
    static showKeyBoard(n) {
        if (__DEV__) {
            // 不调用
        } else {
            // native 键盘
            $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
                type: "amount",
                cancel: "cancel",
                success: res => {
                    this.setState({
                        inputdata: res
                    });
                }
            });
        }
    }

    /*************************************************************************
     * 公共校验方法
     * 1.卡号               Common.cardNumber()
     * 2.密码、短信验证码     Common.PasswordSmsNumber()
     * 3.是否为空            Common.judgeEmpty()
     * 4.特殊字符            Common.inputRegExp()
     * 5.手机号              Common.phoneNumber()
     * 6.判断ios/android     Common.phoneType()
     * 7.金额输入             Common.moneyType()
     * 8.身份证不合法          Common.validateIDCard()
     **/
    // 卡号
    static cardNumber(n) {
        if (this.judgeEmpty(n) || n.length < 10 || n.length > 20) {
            return true;
        }
    }

    // 密码、短信验证码
    static PasswordSmsNumber(n) {
        if (this.judgeEmpty(n) || n.length < 6) {
            return true;
        }
    }

    // 是否为空
    static judgeEmpty(n) {
        if (n === "" || n === null || n === undefined) {
            return true;
        }
    }

    //特殊字符
    static inputRegExp(n) {
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
        if ((pattern.test(n))) {
            return true;
        }
    }

    //特殊字符
    static inputRegExpLoose(n) {
        let pattern = new RegExp("[`@#$^&*()=|{}\\[\\].<>/~@#（）——|{}【】]");
        if ((pattern.test(n))) {
            return true;
        }
    }

    //手机号
    static phoneNumber(n) {
        //  let pattern = new RegExp("/^1[3|4|5|7|8|9]\d{9}$/");
        if (!(/^1\d{10}$/.test(n)) || n.length < 11) {
            return true;
        }
    }

    //判断ios/android
    static phoneType(n) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (n == 'android') {
            return isAndroid;
        }
    }

    //金额输入
    static moneyTyp(n) {
        let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        if (n.split('.')[0].length > 12 || !reg.test(n)) {
            return true;
        }
    }

    static getFloatStr(num) {
        num += '';
        num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
        
        if(/^0+/) //清除字符串开头的0
            num = num.replace(/^0+/, '');
        if(!/\./.test(num)) //为整数字符串在末尾添加.00
            num += '.00';
        if(/^\./.test(num)) //字符以.开头时,在开头添加0
            num = '0' + num;
        num += '00';        //在字符串末尾补零
        num = num.match(/\d+\.\d{2}/)[0];
        return num;
	};

    //身份证不合法
    static validateIDCard(code) {
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var tip = "";
        var pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        // if(!pass){alert(tip)} ;
        return pass;
    }

    /*************************************************************************
     * 公共格式化方法
     * 1.卡号              Common.setAccountNum()
     * 2.手机号             Common.setPhoneNumFour()
     * 3.金额              Common.setMoneyFormat()
     * 3.数字去除多余的0     Common.setNumberFormat()   例: '0001.12000'->'1.12'
     **/
    // 卡号 四位空格 中间四位为星号
    static setAccountNum(cardNum, starsMore) {
        
        let cardnumnew = "";
        if (typeof cardNum !== "string") {
            cardNum = cardNum + "";
        }
        let cardnumstr = cardNum;
        let cardnumarr = cardNum.split("");
        
        cardnumstr =cardnumstr.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");//四位数字一组，以空格分割
        
        
        cardnumnew = cardnumstr.replace(/^(.{10})(.{4})(.*)$/, '$1 **** $3');

        return cardnumnew;
    }

    

    // 卡号 四位空格
    static setAccountNumForSpace(cardNum) {
        if (typeof cardNum !== "string") {
            cardNum = cardNum + "";
        }
        let cardnumstr = cardNum;
        cardnumstr =cardnumstr.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");//四位数字一组，以空格分割
        return cardnumstr;
    }

    // 卡号  前四位 中间四个星  后四位
    static setAccountNum2(cardNum, starsMore) {
        let cardnumnew = "";
        if (typeof cardNum !== "string") {
            cardNum = cardNum + "";
        }
        let cardnumstr = cardNum;
        let cardnumarr = cardNum.trim().split("");
        let cardnumstr2 = cardnumarr.slice(-4).join("");
        console.log(cardnumstr2)
        cardnumnew = cardnumstr.slice(0, 4) + (starsMore ? " **** **** " : " **** ") + cardnumstr2;
        return cardnumnew;
    }

    // 卡号  四个星  后四位
    // static setAccountNum(cardNum, starsMore) {
    //     let cardnumnew = "";
    //     if (typeof cardNum !== "string") {
    //         cardNum = cardNum + "";
    //     }
    //     let cardnumstr = cardNum;
    //     let cardnumarr = cardNum.split("");
    //     let cardnumstr2 = cardnumarr.reverse().slice(0, 4).reverse().join("");
        
    //     cardnumnew = "****" + " " + cardnumstr2 
    //     console.log(cardnumnew)
    //     return cardnumnew;
    // }

    // 手机号
    static setPhoneNumFour(phoneNum) {
        let phoneNumnew = "";
        if (typeof phoneNum !== "string") {
            phoneNum = phoneNum + "";
        }
        let phonenumarr = phoneNum.split("");
        phoneNumnew = phonenumarr.reverse().slice(0, 4).reverse().join("");
        return phoneNumnew;
    }

    // 通讯录手机号格式化
    static setPhoneNum(phoneNum) {

        let phoneNumnew = "";
        if (typeof phoneNum !== "string") {
            phoneNum = phoneNum + "";
        }
        let phonenumarr = phoneNum.replace(/-/g, "").replace("+86", "");

        //let phoneNumnew = phonenumarr.replace(/+86/,"");

        return phonenumarr;
    }

    // 金额
    static setMoneyFormat(money) {
        let moneynew = "";
        if (typeof money !== "string") {
            money = money + "";
        }
        let moneyarr = money.split(".");

        let moneyarr0 = moneyarr[0].split("").reverse();
        let moneyarr0new = [];
        for (let i = 0; i < moneyarr0.length; i++) {
            let flag = i % 3;
            moneyarr0new.push(moneyarr0[i]);
            if (flag === 2) {
                moneyarr0new.push(",");
            }
        }
        let moneyarr0re = moneyarr0new.reverse();
        if (moneyarr0re[0] === ",") {
            moneyarr0re.splice(0, 1);
        }
        if (moneyarr.length === 1) {
            moneynew = moneyarr0re.join("") + ".00"
        } else {
            moneynew = moneyarr0re.join("") + "." + moneyarr[1];
        }

        return moneynew;
    }

    // 数字去除多余的0
    static setNumberFormat(str, decimalNum) {
        let val = Number(str).toFixed(Number(decimalNum) == NaN ? 2 : Number(decimalNum) || 2).toString();
        return val;
    }

    /*************************************************************************
     * 公共弹窗
     * 1.公共弹框（类型判断H5+APP）   Common.showAppDialogAlert()
     * 2.展现H5弹框                    Common.showDialogAlert()
     * 3.隐藏H5弹框                     Common.hideDialog()
     **/
    // 公共弹框
    static showAppDialogAlert(alertDict) {
        $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO, alertDict);
        // if (__DEV__) {
        //   // H5弹窗
        //   this.showDialogAlert(alertDict);
        // } else {
        //   // native弹窗
        //   $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO, alertDict);
        // }
    }

    /* 弹框组件字段说明
     {
       title: "alert标题",
       msg: "alert内容",
       cancel_text: "取消",
       cancel: this.cancel,
       success_text: "确认",
       success: this.success
     }
   */

    // 展现H5弹框
    /* H5组件，若success/cancel参数有赋值，需加上Common.closeModal()进行关闭alert
        success: ()=>{
            //业务逻辑 
            Common.closeModal()
        }
    */

    static showDialogAlert(alertParam) {
        let content = {
            title: alertParam.title || '信息提示',
            msg: alertParam.msg
        }
        let buttonList = [];
        alertParam.cancel_text ? buttonList.push({
            text: alertParam.cancel_text,
            onTap: alertParam.cancel || this.closeModal
        }) : null;
        alertParam.success_text ? buttonList.push({
            text: alertParam.success_text,
            onTap: alertParam.success || this.closeModal
        }) : null;
        Modal.alert(content, buttonList);
    }

    // 隐藏H5弹框
    static hideDialog() {
        if (this.dialog) {
            document.body.removeChild(this.dialog);
            this.dialog = null;
        }
    }

    /*************************************************************************
     * 模态框关闭
     * 1.关闭modal
     * 1.关闭picker
     **/

    static closeModal() {
        let containerId = 'mbankModal';
        ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
        document.getElementById(containerId).parentNode.removeChild(document.getElementById(containerId));
    };

    static closePicker() {
        let containerId = 'mbankPicker';
        ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
        document.getElementById(containerId).parentNode.removeChild(document.getElementById(containerId));
    };

    /*************************************************************************
     * 页面刷公共方法
     * 1.页面刷新 Common.bindPageRefresh.bind(this)
     * 1.页面去除所有输入框的焦点 Common.inputBlur()
     **/
    // 页面刷新
    static bindPageRefresh() {
        $("input").on("blur", function () {
            setTimeout(
                function () {
                    window.scrollTo(0, 0)
                }, 500);
        });
        $("textarea").on("blur", function () {
            setTimeout(
                function () {
                    window.scrollTo(0, 0)
                }, 500);
        });
    }

    // 页面去除所有输入框的焦点
    static inputBlur() {
        $('input').blur();
    }

    /*************************************************************************
     * session 公共方法
     * 1.添加 Common.addSessionData(key, dataStr)
     * 2.接收 Common.getSessionData(key)
     * 3.清除 Common.removeSessionData(n)
     * 4.清除并返回值 Common.removeSessionDataReturn(key)
     **/
    // 添加
    static addSessionData(key, dataStr) {
        if (typeof dataStr !== "object") {
            sessionStorage.setItem(key, dataStr);
        }
    }

    // 接收
    static getSessionData(key) {
        return sessionStorage.getItem(key);
    }

    // 清除
    static removeSessionData(n) {
        sessionStorage.removeItem(n);
    }

    // 清除并返回
    static removeSessionDataReturn(key) {
        return sessionStorage.removeItem(key);
    }

    /*************************************************************************
     * Loading 公共方法
     * 1.打开     Common.showLoading()
     * 2.关闭     Common.hideLoading()
     **/
    // 打开
    static showLoading() {
        if (this.loading == null) {
            this.loading = document.createElement('div');
            document.body.appendChild(this.loading);
            ReactDOM.render(
                <Loading />,
                this.loading
            )
        }
    }

    // 关闭
    static hideLoading() {
        if (this.loading) {
            document.body.removeChild(this.loading);
            this.loading = null;
        }
    }

    // 获取当前日期（上送需要的格式）
    static getCurrentDate(formatStr) {
        let currentDate = DateFormat.date(new Date().getTime(), formatStr);
        return currentDate;
    }

    // 获取格式化日期（上送需要的格式）
    static getDateFormat(date, formatStr) {
        let currentDate = DateFormat.date(date, formatStr);
        return currentDate;
    }


    // 检查下挂账户
    static checkUnderAccount(data) {
        if (this.judgeEmpty(data)) {
            let alertDict = {
                title: "信息提示",
                msg: "该账户没有下挂账户无法进行转账",
                success_text: "添加账户",
                success: () => {
                    //跳转至转账录入模块
                    $native.callClientForUI(API.NATIVE_CODE_LOADNEWPAGE, {
                        pageUrl: 'account.html'
                    });
                }
            };
            Common.showAppDialogAlert(alertDict);
            return;
        }
    }

}

export default Common