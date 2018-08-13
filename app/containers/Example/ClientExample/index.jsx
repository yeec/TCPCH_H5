import React, {PureComponent} from 'react';
import API from './../../../constants/api';
import $Fetch from './../../../fetch/fetch';
import $native from './../../../native/native';
import {hashHistory} from 'react-router';
import 'whatwg-fetch'
import 'es6-promise'


export default class DepositHKD extends PureComponent {

    constructor() {
        super();
        this.state = {
            list: [],
            inputdata: ""
        }
    }

    componentDidMount() {
        //this.testUpdateTitle();
        // this.setNavgationBar();

        $native.callClientForComm(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '1212sss',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.cancel111
            }
        });
    }


    test = () => {
        alert(111);
    }

    cancel111 = () => {
        alert("取消");
    }

    success111 = () => {
        alert("成功");
    }

    // //弹窗
    //function test() {
    //   alert(111);
    // }

    //弹窗
    setAlertInfo() {
        // $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO,
        var js = {
            title: "alert标题",
            msg: "alert内容",
            cancel_text: "取消",
            cancel: this.cancel111,
            success_text: "确认",
            success: this.success111
        };
        this.setAlertInfoTest(js);
        // );
    }

    //弹窗
    setAlertInfoTest(jsDict) {
        $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO, jsDict);
    }

    testUpdateTitle() {
        var js = {
            title: "1212sss",
            leftButton: {
                exist: "true",
                closeFlag: "false",
                success: this.success111
            },
            rightButton: {
                exist: "true",
                closeFlag: "false",
                name: "help",
                success: this.setAlertInfo
            }
        };
        this.updateTitle(js);
    }

    //更新标题closeFlag: 'false',
    updateTitle() {
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "native交易查询",
            sub_title: "查询",
            leftButton: {
                exist: "true",
                name: "取消",
                img: "www.1234.com",
                success: this.setAlertInfo()
            },
            rightButton: {
                exist: "true",
                name: "确定",
                img: "www.1234.com",
                success: this.setAlertInfo()
            },
            rightButton2nd: {
                exist: "true",
                name: "确定2",
                img: "www.1234.com",
                success: this.setAlertInfo()
            }
        });
    }

    //隐藏或显示客户端标题栏//visible : 显示 unvisible : 隐藏
    setTitleVisible() {
        $native.callClientForUI(API.NATIVE_CODE_SET_TITLE_VISIBLE, {
            state: "visible",
            success: "success"
        });
    }

    //visible : 显示 unvisible : 隐藏
    setTitleUnvisible() {
        $native.callClientForUI(API.NATIVE_CODE_SET_TITLE_VISIBLE, {
            state: "unvisible",
            success: "success"
        });
    }

    //设置客户端导航栏默认返回按钮 : left : 左right : 右
    showWebviewBackButton() {
        $native.callClientForUI(API.NATIVE_CODE_SHOW_WEBVIEW_BACKBUTTON, {
            side: "right",
            success: "success"
        });
    }


    //设置客户端导航栏关闭按钮 : 显示 : 1    不显示 : 0
    showCloseButton() {
        $native.callClientForUI(API.NATIVE_CODE_SHOW_CLOSEBUTTON, {
            flag: "1",
            success: "success"
        });
    }

    //显示或隐藏等待层//1：打开 0：关闭  等待层状态
    setWatiPanel() {
        $native.callClientForUI(API.NATIVE_CODE_SET_WAIT_PANEL, {
            Status: "1",
            success: "success"
        });
    }

    //判断设备是否支持NFC
    isSupportNFC() {
        $native.callClientForBank(API.NATIVE_CODE_IS_SUPPORT_NFC, {
            success: this.initData()
        })
    }

    // NFC接口功能
    toNFC() {
        $native.callClientForBank(API.NATIVE_CODE_TONFC, {
            progress: "",
            success: this.initData
        })
    }

    //是否支持指纹验证
    isSupportFingerprintVerify() {
        $native.callClientForBank(API.NATIVE_CODE_IS_SUPPORT_FINGERPRINT, {
            success: this.initData
        })
    }

    // 调指纹验证接口功能
    toFingerprintVerify() {
        $native.callClientForBank(API.NATIVE_CODE_TO_FINGERPRINT_VERIFY, {
            progress: "",
            success: this.initData
        })
    }


    rsaencryptData() {
        $native.callClientForBank(API.NATIVE_CODE_ENCRYPTDATA, {
            type: "rsa",
            msg: "测试明文",
            success: this.initData
        })
    }

    // aes加密
    aesEncryptData() {
        $native.callClientForBank(API.NATIVE_CODE_ENCRYPTRQBODY, {
            data: "test",
            success: this.initData
        })
    }

    // aes解密
    aesDecryptData() {
        $native.callClientForBank(API.NATIVE_CODE_DECRYPTRQBODY, {
            data: "xifsRwaPFHvXYeXCII31KA==",
            success: this.initData
        })
    }


    // ras加密
    rsaEncryptData() {
        $native.callClientForBank(API.NATIVE_CODE_RSAENCRYPTDATA, {
            data: "test",
            success: this.initData
        })
    }

    // 调用客户端键盘接口 
    //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
    showKeyBoard() {
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "amount",
            cancel: "cancel",
            success: (res) => {
                this.setState({
                    inputdata: res
                })
            }
        })
    }

    //登录
    toLogin() {
        $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
    }

    //返回
    goBack() {
        $native.callClientForBank(API.NATIVE_CODE_TO_GOBACK, {})
    }

    //关闭
    close() {
        $native.callClientForBank(API.NATIVE_CODE_CLOSE, {})
    }

    //获取图片photo：客户端相册 camera：拍照
    selectPic() {
        $native.callClientForBank(API.NATIVE_CODE_SELECTPIC, {
            type: "camera",
            success: this.initData
        })
    }


    //二维码识别
    scanQRCode() {
        $native.callClientForUI(API.NATIVE_CODE_SCAN_QRCODE, {
            success: this.showqrresult
        })
    }

    //扫描结果回调函数
    showqrresult(res) {
        $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO, {
            title: "扫描结果",
            msg: JSON.parse(res),
            cancel_text: "确定",
            cancel: "",
            success_text: "",
            success: ""
        });
    }

    // 获取位置信息
    getLocation() {
        $native.callClientForBank(API.NATIVE_CODE_GET_LOCATION, {
            success: this.initData
        })
    }

    // 分享
    shareWeb() {
        $native.callClientForBank(API.NATIVE_CODE_SHAREWEB, {
            title: "这是一个分享",
            description: "这是一个分享测试",
            url: "www.baidu.com"
        })
    }

    //获取客户信息
    getClientInfo() {
        $native.callClientForBank(API.NATIVE_CODE_GET_CLIENT_INFO, {
            success: (res) => {

                alert(JSON.stringify(res));
            }
        })
    }


    //设置导航栏success: 'this.goUserPage()',
    setNavgationBar() {
        $native.callClientForUI(API.NATIVE_CODE_SET_NAVGATIONBAR, {
            title: "JS设置导航栏",
            leftButton: {
                success: 'this.goUserPage()',
                name: "返回",
                imageUrl: ""
            },
            rightButton: {
                success: this.test(),
                name: "help",
                imageUrl: ""
            }
        })
    }

    //刷新
    refreshWebview() {
        $native.callClientForBank(API.NATIVE_CODE_REFRESHWEBVIEW, {})
    }

    //格式化返回信息
    initData(res) {
        alert(JSON.stringify(res));
    }

    goUserPage() {
        hashHistory.push('/')
    }

    render() {
        return (
            < div >
                <h1 onClick={ this.setAlertInfo.bind(this) }> 提示弹框 </h1><br/>
                <h1 onClick={ this.updateTitle.bind(this) }> 标题更新 </h1><br/>
                <h1 onClick={ this.setTitleVisible.bind(this) }> 显示客户端标题栏 </h1><br/>
                <h1 onClick={ this.setTitleUnvisible.bind(this) }> 隐藏客户端标题栏 </h1><br/>
                <h1 onClick={ this.showWebviewBackButton.bind(this) }> 设置客户端导航栏默认返回按钮 </h1><br/>
                <h1 onClick={ this.showCloseButton.bind(this) }> 设置客户端导航栏关闭按钮 </h1><br/>
                <h1 onClick={ this.setWatiPanel.bind(this) }> 显示或隐藏等待层 </h1><br/>
                <h1 onClick={ this.isSupportNFC.bind(this) }> 判断设备是否支持NFC </h1><br/>
                <h1 onClick={ this.toNFC.bind(this) }> 调NFC(预留接口) </h1><br/>
                <h1 onClick={ this.isSupportFingerprintVerify.bind(this) }> 是否支持指纹验证 </h1><br/>
                <h1 onClick={ this.toFingerprintVerify.bind(this) }> 调指纹验证接口功能(预留接口) </h1><br/>
                <h1 onClick={ this.rsaencryptData.bind(this) }> ras加密1 </h1><br/>
                <h1 onClick={ this.aesEncryptData.bind(this) }> aes加密 </h1><br/>
                <h1 onClick={ this.aesDecryptData.bind(this) }> aes解密 </h1><br/>
                <h1 onClick={ this.rsaEncryptData.bind(this) }> ras加密 </h1><br/>
                <h1 onClick={ this.showKeyBoard.bind(this) }> 调用客户端键盘 </h1>
                <input type="password" readOnly="readOnly" value={this.state.inputdata} onClick={ this.showKeyBoard.bind(this)}></input > <br/>
                <h1 onClick={ this.toLogin.bind(this) }> 登录(预留接口) </h1><br/> { // <
                // h1 onClick = { this.goBack.bind(this) } > 返回(预留接口) </h1><br/>
                // <
                // h1 onClick = { this.close.bind(this) } > 关闭(预留接口) </h1><br/>
                // <
                // h1 onClick = { this.selectPic.bind(this) } > 获取图片（ 接口预留） </h1><br/>
                // <
                // h1 onClick = { this.showKeyBoard.bind(this) } > 根据ID跳转菜单（ 接口预留） </h1><br/>
            }
                <h1 onClick={ this.scanQRCode.bind(this) }> 扫描二维码 </h1><br/>
                <h1 onClick={ this.shareWeb.bind(this) }> 分享 </h1><br/>
                <h1 onClick={ this.getClientInfo.bind(this) }> 获取客户信息 </h1><br/>
                <h1 onClick={ this.getLocation.bind(this) }> 获取位置信息 </h1><br/>
                <h1 onClick={ this.setNavgationBar.bind(this) }> 设置导航栏 </h1><br/>
                <h1 onClick={ this.refreshWebview.bind(this) }> 刷新 </h1><br/>
            </div>
        )
    }
}