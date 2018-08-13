import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { hashHistory } from 'react-router'
import ContextDecorator from '../../../../../util/decorator/context-decorator';
//API数据接口
import API from './../../../../../constants/api';
//公共方法
import $native from './../../../../../native/native';
import $Fetch from '../../../../../fetch/fetch.js';
import Common from "../../../../../util/common.jsx";
import $ from 'jquery'
//基础组件
import Input from '../../../../../../app/components/Base/input-list/index.web.jsx';
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web';
import ModalBase from '../../../../../components/Base/modal/index.web.js';
import Prompt from '../../../../../components/Base/ocr-prompt/index.web.jsx';
//业务组件
import MbankPublicResult from '../../../../../components/mbank/mbank-public-result/index.web.jsx';
import MbankPublicConfirm from '../../../../../../app/components/mbank/mbank-public-confirm-info/index.web';
import MbankTransferBank from '../../../../../components/mbank/mbank-public-select/mbank-transfer-bank/index.web.jsx';

@ContextDecorator
export default class MbankTransferUserAdd extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // 姓名
            accountName: "",
            // 账号
            accountNo: "",
            // 联行号
            bankNo: "",
            //收款人类型
            payeeType: "2",
            // 手机号
            mobileNo: "",
            // 行名
            bankName: "",
            // modal显示
            modalVisibleBank: false,
            // 按钮禁用状态
            buttonDisabled: true,
            // 收款银行点击禁用状态
            onTapDisabled: false,
            // 接口返回码
            returnCode: '',
            // 接口返回信息
            returnMsg: '',
            Prompt:"",
            accountSizeNum:"",
            phoneSizeNum:"",
            keyKbHide: ""
        }
    }

    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '新增收款人',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: function () {
                    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
                    Common.setUrl("transfer-userQuery/index.html");
                }
            }
        });
    }

    // 组件更新调用
    componentDidUpdate() {
        let that = this;
        // 控制按钮禁用状态
        if (!(that.state.accountName == "" || that.state.accountNo == "" || that.state.bankName == "")) {
            that.setState({
                buttonDisabled: false
            });
        } else {
            that.setState({
                buttonDisabled: true
            });
        }
    }

    // 姓名
    setNameValue(vals) {
        this.setState({
            accountName: vals
        })
    }

    setNameOnclickValue(){
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    }

    // 账号
    setAccountValue = newId => {
        this.cancelKbGb(newId);
        this.setState({
            accountNo:"",
            accountSizeNum:""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength: "19",
            //关闭键盘回调函数，并传入关闭的光标的Id
          cancel: that.cancelKb.bind(this, newId),
          success: res => {
            let jsons = JSON.parse(res);
            this.setState({
                accountNo: jsons.text,
                accountSizeNum:jsons.pswLength
            });

            // 校验卡bin是否为本行账号 IC卡-623199 磁条卡-9400279003，6221359003，621057
            let arr = [623199, 9400279003, 6221359003, 621057];
            for (let i = 0; i < arr.length; i++) {
                if (jsons.text.replace(/\s/g, "").indexOf(arr[i]) === 0) {
                    that.setState({
                        bankName: '凉山州商业银行',
                        bankNo: '313684093748',
                        onTapDisabled: true,
                        payeeType: '1',
                        accountNo: jsons.text
                    });
                    break;
                } else {
                    that.setState({
                        bankName: '',
                        bankNo: '',
                        onTapDisabled: false,
                        payeeType: '2',
                        accountNo: jsons.text
                    })
                }
            }
            setAccountValue();
        }
    });
        $("#" + newId).show();
    }

    cancelKbGb = val => {
        let kbId=this.state.keyKbHide
        if(kbId){
          $("#" + kbId).hide();
          this.setState({
            keyKbHide:val
         })
        }else{
          this.setState({
            keyKbHide:val
         })
        }
    };

    cancelKb = val => {
        //隐藏光标
        $("#" + val).hide();
        //还原上移
        Common.pageMoveHide();
      };

    // 调用客户端键盘接口
    //  "amount":金额键盘，"num":纯数字键盘，"pwd":数字字母组合键盘，"idcard"身份证键盘，"tradePsw":交易密码键盘
    // 手机号
    setPhoneValue = newId => {
        this.cancelKbGb(newId);
        this.setState({
            mobileNo:"",
            phoneSizeNum:""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength: "11",
            //关闭键盘回调函数，并传入关闭的光标的Id
          cancel: that.cancelKb.bind(this, newId),
          success: res => {
            let jsons = JSON.parse(res);
            this.setState({
                mobileNo: jsons.text,
                phoneSizeNum: jsons.pswLength
            });
            setPhoneValue();
        }
    });
            //展示光标
            $("#" + newId).show();
    }

    //收款人银行显示
    showTransferBankBox() {
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
        // 输入框失去焦点
        Common.inputBlur();
        this.setState({
            modalVisibleBank: true
        });
    }

    //收款人银行返回
    getTransferBank(val, bankNo) {
        this.setState({
            bankName: val,
            bankNo: bankNo,
            modalVisibleBank: false

        });

    }

    // 显示结果页面
    toResult() {

        let that = this;
        let accountNo = that.state.accountNo; //账号
        let accountName = that.state.accountName; //姓名
        let mobileNo = that.state.mobileNo; //手机号码
        let pmsBankNo = that.state.bankNo; //联行号
        let payeeType = that.state.payeeType; //收款人类型
        let unionBankName = that.state.bankName; //行名

        let params = {
            //客户账号
            accountNo: accountNo,
            //姓名
            accountName: accountName,
            //手机号码
            mobileNo: mobileNo,
            // 联行号
            pmsBankNo: pmsBankNo,
            //收款人类型
            payeeType: payeeType,
            //行名
            pmsBankName: unionBankName
        }
        // 校验手机号格式
        if (that.state.mobileNo != "" && Common.phoneNumber(that.state.mobileNo)) {
            Common.showAppDialogAlert({
                title: '错误提示',
                msg: '您输入的手机号格式错误，请重新输入',
                success_text: '确定'
            })
            return false;
        }
        // 输入框失去焦点
        Common.inputBlur();
        // 保存收款人接口
        $Fetch(API.API_GET_NEWPAYEE_PAYEE, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF05",
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
            that.setState({
                successInfo: res.rsqBody,
                returnCode: res.rspHead.returnCode,
                returnMsg: res.rspHead.returnMsg
            })
            $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
            // 隐藏录入页面
            $(that.refs.myInput).hide();
            // 显示结果页面
            $(that.refs.myResult).show();
        });
    }

    // 继续添加收款人
    continueAdd() {
        // 隐藏结果页面
        $(this.refs.myResult).hide();
        // 显示录入页面
        $(this.refs.myInput).show();

        this.setState({
            // 姓名
            accountName: "",
            // 账号
            accountNo: "",
            // 行名
            bankName: "",
            // 手机号
            mobileNo: "",
            // 按钮禁用状态
            buttonDisabled: true,
            // 输入框禁用状态
            onTapDisabled: false
        })
        // 清空所有输入框的值
        $('input').val('');
    }

    // 跳转转账页面
    toTransferAccount() {
        
        let that = this;
        Common.addSessionData(API.SESSION_TRANSFER_USER_DATA, JSON.stringify({
            accName: that.state.accountName,
            accNo: that.state.accountNo,
            mobile: that.state.mobileNo,
            pmsBankName: that.state.bankName,
            pmsBankNo: that.state.bankNo,
            useAdd:"useAdd",
            aaa:"1"
        }));
        // hashHistory.push('/transfer-businessInput');
        Common.setUrl("transfer-businessInput/index.html");
    }

    // 跳转列表页面
    returnList() {
        // hashHistory.push('/transfer-userQuery');
        Common.setUrl("transfer-userQuery/index.html");
    }

    /**** 显示字段说明

     注：无特殊说明字段均为 String 类型
     accountName: 收款人姓名
     accountNo: 收款人账号
     bankName: 收款行名称
     mobileNo: 收款人手机号

     */
    //   getBankID (出参：卡号bank_NUM， 卡名bank_NAME，)
    ocrClick() {
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_BANK_OCR, {
            success: (res) => {
                let certNo = JSON.parse(res);
               
        // 校验卡bin是否为本行账号 IC卡-623199 磁条卡-9400279003，6221359003，621057
        let arr = [623199, 9400279003, 6221359003, 621057];
        for (let i = 0; i < arr.length; i++) {
            if (certNo.bank_NUM.replace(/\s/g, "").indexOf(arr[i]) === 0) {
                that.setState({
                    bankName: '凉山州商业银行',
                    bankNo: '313684093748',
                    onTapDisabled: true,
                    payeeType: '1',
                    accountNo: certNo.bank_NUM,
                    Prompt:"1",
                });
                break;
            } else {
                that.setState({
                    bankName: '',
                    bankNo: '',
                    onTapDisabled: false,
                    payeeType: '2',
                    accountNo: certNo.bank_NUM,
                    Prompt:"1",
                })
            }
        }
                // that.setState({
                //     accountNo: certNo.bank_NUM
                // })
            }
        })
    }
    render() {
        return (
            <div>
                <div ref="myInput">
                    <WhiteSpace size="sm" />
                    <Input.Group>
                        <Input placeholder="请输入收款人姓名" value={this.state.accountName} labelNumber={7} maxLength="8"
                            type="text" onClick={this.setNameOnclickValue.bind(this)}
                            onChange={this.setNameValue.bind(this)}>
                            收款人姓名
                        </Input>
                        <Input placeholder="请输入收款人账号" value={this.state.accountNo} labelNumber={7} maxLength="19" type="num" id="keyboardNumber" editable={false} cursorSize={this.state.accountSizeNum}
                            onClick={this.setAccountValue.bind(this,"keyboardNumber")} rightExtra="true" ExtraIconSuffix="ocr" onExtraClick={this.ocrClick.bind(this)}>
                            收款人账号
                        </Input>
                        {/* ocr提示信息 */}
                        <Prompt title="请核对账户信息" money={this.state.Prompt}></Prompt>
                        <ModalBase visible={this.state.modalVisibleBank} fullScreen>
                            <MbankTransferBank selectok={this.getTransferBank.bind(this)} />
                        </ModalBase>
                        {/*收款行*/}
                        <Input.Modal disabled={this.state.onTapDisabled} labelNumber={7}
                            onTap={this.showTransferBankBox.bind(this)} selectText={this.state.bankName}
                            rightExtra="true" ExtraIconSuffix="arrow-right">收款银行</Input.Modal>

                        <Input type='num' id="keyboardPhone" placeholder="请输入收款人手机号" value={this.state.mobileNo} labelNumber={7}
                            maxLength="11" editable={false} cursorSize={this.state.phoneSizeNum}
                            onClick={this.setPhoneValue.bind(this,"keyboardPhone")}>
                            收款人手机号
                        </Input>
                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.toResult.bind(this)}
                            disabled={this.state.buttonDisabled}>保存</Button>
                    </WingBlank>
                </div>
                <div ref="myResult" style={{ display: "none" }}>
                    {
                        Common.returnResult(this.state.returnCode) ?
                            <div>
                                <div className="savings-zhiququereng-democode">
                                    <MbankPublicResult type="success" title="保存成功" />
                                    <WhiteSpace size="sm" />
                                    <div className="savings-zhiququereng-boder"></div>
                                    <WhiteSpace size="sm" />
                                    <MbankPublicConfirm.Group>
                                        <MbankPublicConfirm title="收款人姓名" content={this.state.accountName} />
                                        <MbankPublicConfirm title="收款人账号" content={this.state.accountNo} />
                                        <MbankPublicConfirm title="收款行名称" content={this.state.bankName} />
                                        <MbankPublicConfirm title="收款人手机号" content={this.state.mobileNo} />
                                    </MbankPublicConfirm.Group>
                                </div>
                                <WhiteSpace size="lg" />
                                <WingBlank size="lg">
                                    <Button.Group horizon>
                                        <Button type="ghost" onClick={this.continueAdd.bind(this)}>继续添加</Button>
                                        <Button type="ghost" onClick={this.toTransferAccount.bind(this)}>向ta汇款</Button>
                                    </Button.Group>
                                </WingBlank>
                            </div>
                            :
                            <MbankPublicResult type="error" title="新增失败"
                                message={
                                    <div>尊敬的用户，您进行的支取操作失败。
                                        <br />错误编码：<b>{this.state.returnCode}</b>
                                        <br />错误信息：<b>{this.state.returnMsg}</b>
                                    </div>
                                }
                            />
                    }
                    {
                        Common.returnResult(this.state.returnCode) ?
                            null
                            :
                            <WhiteSpace size="lg" />
                    }
                    <WingBlank size="lg">
                        <Button type="ghost" size="default" onTap={this.returnList.bind(this)}>返回收款人列表</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }

}