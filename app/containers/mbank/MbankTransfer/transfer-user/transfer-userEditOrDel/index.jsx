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
import $ from 'jquery';
//基础组件
import Input from '../../../../../../app/components/Base/input-list/index.web.jsx';
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../../components/Base/button/index.web';
import ModalBase from '../../../../../components/Base/modal/index.web.js';

//业务组件
import MbankTransferBank from '../../../../../components/mbank/mbank-public-select/mbank-transfer-bank/index.web.jsx';



@ContextDecorator
export default class MbankTransferUserEditOrDel extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            // 姓名
            accountName: "",
            // 账号
            accountNo: "",
            // 账户类型----新增不上送，修改需上送
            accountType: "",
            // 行名
            bankName: "",
            // 联行号
            bankNo: "",
            //收款人类型
            payeeType: "2",
            // 手机号
            mobileNo: "",
            // 按钮禁用状态
            buttonDisabled: true,
            // 输入框禁用状态
            inputDisabled: false,
            // modal显示
            modalVisibleBank: false,
            // 收款人唯一记录标识
            payBookId: "",
            // 收款银行点击禁用状态
            onTapDisabled: false,
            figureSizeNum: ""
        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '修改收款人',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: function () {
                    $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
                    Common.setUrl("transfer-userQuery/index.html");
                }
            }
        });
        // state取回的session数据
        let listdata = JSON.parse(Common.getSessionData(API.SESSION_TRANSFER_USER_EDIT_DATA));
        that.setState({
            accountName: listdata.accountName,
            accountType: listdata.accountType,
            bankName: listdata.bankName,
            accountNo: listdata.accountNo,
            mobileNo: listdata.mobileNo,
            payBookId: listdata.payBookId,
            bankNo: listdata.pmsBankNo==""?listdata.unionBankNo:listdata.pmsBankNo
        })
    }

    componentWillUpdate() {
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

    // 收款行名称
    setBankNameValue(vals) {
        this.setState({
            bankName: vals
        })
    }
    // 手机号
      //  “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘 "tradePsw":交易密码键盘 "idcard":身份证键盘

    setPhoneValue = newId => {
        this.setState({
            mobileNo:"",
            figureSizeNum:""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
            type: "num",
            maxLength: "11",
            //关闭键盘回调函数，并传入关闭的光标的Id
            cancel: that.cancelKb.bind(this, newId),
            success: (res) => {
                let jsons = JSON.parse(res);
                this.setState({
                    mobileNo: jsons.text,
                    figureSizeNum: jsons.pswLength
                });
                setPhoneValue();
            }
        });
        $("#" + newId).show();
    }

    cancelKb = val => {
        //隐藏光标
        $("#" + val).hide();
      };

     //收款人银行显示
     showTransferBankBox() {
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

    // 跳转到收款人列表页面
    saveEditClick() {
        let that = this;
        let accountNo = that.state.accountNo; //账号
        let accountName = that.state.accountName; //姓名
        let accountType = that.state.accountType; //账户类型
        let mobileNo = that.state.mobileNo; //手机号码
        let pmsBankNo = that.state.bankNo; //联行号
        let payeeType = that.state.payeeType; //收款人类型
        let unionBankName = that.state.bankName; //行名
        let payBookId = that.state.payBookId //客户唯一号

        let params = {
            //客户账号
            accountNo: accountNo,
            //账户类型
            accountType: accountType,
            //姓名
            accountName: accountName,
            //手机号码
            mobileNo: mobileNo,
            // 联行号
            pmsBankNo: pmsBankNo,
            //收款人类型
            payeeType: payeeType,
            //行名
            pmsBankName: unionBankName,
            //客户唯一号
            payBookId: payBookId
        };
        // 校验手机号格式
        if (that.state.mobileNo != "" && Common.phoneNumber(that.state.mobileNo)) {
            Common.showAppDialogAlert({
                title: '错误提示',
                msg: '您输入的手机号格式错误，请重新输入!',
                success_text: '确定'
            })
            return false;
        }
        // 输入框失去焦点
        Common.inputBlur();
        // 修改收款人接口
        $Fetch(API.API_GET_MODIFY_PAYEE, {

            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF06",
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
            // 若成功
            if (Common.returnResult(res.rspHead.returnCode)) {
                // 弹框成功返回列表
                Common.showAppDialogAlert({
                    title: "信息提示",
                    msg: "修改成功",
                    success: function () {
                        Common.setUrl("transfer-userQuery/index.html");
                        // hashHistory.push('/transfer-userQuery');
                    },
                    success_text: "确认"
                })
            } else {
                // 弹框提示删除失败
                Common.showAppDialogAlert({
                    title: "错误提示",
                    msg: "修改失败，" + res.rspHead.returnMsg,
                    success_text: "确认"
                })
            }
        });
    }

    /**** 显示字段说明

     注：无特殊说明字段均为 String 类型
     accountName: 收款人姓名
     accountNo: 收款人账号
     bankName: 收款行名称
     mobileNo: 收款人手机号

     */

    render() {
        let accountNoNew = /\S{5}/.test(this.state.accountNo) ? this.state.accountNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ") : this.state.accountNo;
        return (
            <div>
                <div ref="myInput">
                <WhiteSpace size="sm" />
                    <Input.Group>
                        <Input value={this.state.accountName} labelNumber={7} maxLength="8"
                            type="text"
                            onChange={this.setNameValue.bind(this)}>
                            收款人姓名
                        </Input>
                        <Input disabled={true} value={accountNoNew} labelNumber={7}>收款人账号</Input>
                        <ModalBase visible={this.state.modalVisibleBank} fullScreen>
                            <MbankTransferBank selectok={this.getTransferBank.bind(this)} />
                        </ModalBase>
                        <Input.Modal disabled={this.state.onTapDisabled} labelNumber={7}
                            onTap={this.showTransferBankBox.bind(this)} selectText={this.state.bankName}
                            rightExtra="true" ExtraIconSuffix="arrow-right">收款银行</Input.Modal>
                        <Input placeholder="请输入收款人手机号" value={this.state.mobileNo} labelNumber={7} type="num" maxLength="11" id="keyboardPhone"
                            onClick={this.setPhoneValue.bind(this,"keyboardPhone")} editable={false} cursorSize={this.state.figureSizeNum}>
                            收款人手机号
                        </Input>
                    </Input.Group>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <Button type="primary" size="default" onTap={this.saveEditClick.bind(this)} disabled={this.state.buttonDisabled}>保存</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }

}
