import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../constants/api';
//证件类型
import document from '../../../../constants/identificationtype';
//公共方法
import $native from '../../../../native/native';
import ContextDecorator from '../../../../util/decorator/context-decorator';
import Common from "../../../../util/common.jsx";
import $Fetch from './../../../../fetch/fetch.js';
import $ from "jquery";
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
import Button from '../../../../components/Base/button/index.web.jsx';
import Input from '../../../../components/Base/input-list/index.web.jsx';
import Prompt from '../../../../components/Base/ocr-prompt/index.web.jsx';
import Modal from "../../../../components/mbank/mbank-public-select-click/mbank-public-select-modal/index.web.js";
//样式引入
import '../style/index.web.js';

export default class PasswordResetHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //客户名称
            nameInputVal: "",
            //证件类型
            documentTypeNow: [],
            /*证件类型value*/
            documentTypeNowval: '10100',
            //证件号码
            documentInputVal: "",
            //手机号
            mobileNo: "",
            Prompt: "",
            zjhSizeNum: "",
            phoneSizeNum: "",
            keyKbHide:"",
            smsFigureSizeNum:""
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    // 初始化
    componentDidMount() {
        // 添加背景颜色
        Common.addBgColor()
        let that = this;
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "预约开户",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
    }

    //获取证件类型value
    documentTypeNowCalues(val,label) {
        let that = this;
        console.log(label)
        that.setState({
            documentTypeNowval: label,
            // documentTypeNow: val
        })
    }

     //获取证件号
     setDocumentinputval = newId => {
        this.cancelKbGb(newId);
        this.setState({
            documentInputVal:"",
            zjhSizeNum: ""
        })
        let that = this;
        //展示光标
        $("#" + newId).show();
        $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
          type: "idcard",
          maxLength: "18",
          //关闭键盘回调函数，并传入关闭的光标的Id
          cancel: that.cancelKb.bind(this, newId),
          success: res => {
            let jsons = JSON.parse(res);
            this.setState({
              documentInputVal: jsons.text,
              zjhSizeNum: jsons.pswLength
            });
            setDocumentinputval();
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
      };

    //   getBankID (出参：卡号bank_NUM， 卡名bank_NAME，)  
    //   getCardID获取身份证信息（出参：身份证号ID_NUM，
    //   姓名ID_NAME，
    //   性别ID_SEX，
    //   民族ID_FOLK，
    //   出生日期ID_BIRT，
    //   地址ID_ADDRESS）
    //////调用OCR事件
    ocrClick() {
        let that = this;
        $native.callClientForBank(API.NATIVE_CODE_CARDID_OCR, {
            success: (res) => {
                let certNo = JSON.parse(res);
                that.setState({
                    documentInputVal: certNo.ID_NUM,
                    nameInputVal: certNo.ID_NAME,
                    Prompt: "1",
                })

            }
        })
    }


    //获取手机号
    showKeyBoard = newId => {
        this.cancelKbGb(newId);
        this.setState({
            mobileNo: "",
            phoneSizeNum: ""
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
      
                // 注册模板
                let data = {
                    templateNo: "sms00000003",
                    mobileNo: jsons.text,
                    sceneCode: "PW01"
                };
                Common.addSessionData(API.SESSION_SMS_DATA, JSON.stringify(data));
                showKeyBoard();
            }
          });
          $("#" + newId).show();
    }

    //获取客户姓名
    setNameinputval(val) {
        let that = this;
        that.setState({
            nameInputVal: val
        })
    }

    setNameOnclickinputval(){
        $native.callClientForBank(API.NATIVE_CODE_HIDEKEYBOARD, {});
    }


    // 预约开户提交
    sunmitInfo(){
        let that = this;
        //客户名称
        let name = that.state.nameInputVal;
        //证件类型
        let documenttype = this.state.documentTypeNowval;
        //证件号码
        let documentnum = this.state.documentInputVal;
        //手机号
        let phone = this.state.mobileNo;

         // 预约开户
        $Fetch(API.API_ADD_PRE_OPENACCINFO, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN01",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",
                mobileNo:phone,
                custName:name,
                certType:documenttype,
                certNo:documentnum
            },
            // 交易上送报文
            data: {
                mobileNo:phone,
                custName:name,
                certType:documenttype,
                certNo:documentnum
            }
        } ,true,false).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                // 跳转到结果页面
                Common.setUrl("openAcdount-success/index.html");
            } else{
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    cancel_text: "取消"
                  };
                  Common.showAppDialogAlert(alertDict);
            }
        });
    }

    render() {
        return (
            <div className="register-box">
                <Input.Group>
                    <Input placeholder="请输入客户姓名" value={this.state.nameInputVal} labelNumber={6}
                        onChange={this.setNameinputval.bind(this)} onClick={this.setNameOnclickinputval.bind(this)}>客户姓名</Input>
                    <Input.Click
                       cols="1"
                       cellTitle="证件类型"
                       labelNumber={6}
                       placeholder="居民身份证"
                       title="证件类型"
                       items={document}
                       onChange={this.documentTypeNowCalues.bind(this)}
                       value={this.state.documentTypeNowval}
                       data={document}
                    />
                    <Input placeholder="请输入开户证件号" type="idcard" maxLength={23} value={this.state.documentInputVal} labelNumber={6} id="keyboardSfz" editable={false} cursorSize={this.state.zjhSizeNum}
                        onClick={this.setDocumentinputval.bind(this,"keyboardSfz")} rightExtra="true" ExtraIconSuffix="ocr" onExtraClick={this.ocrClick.bind(this)}>证件号</Input>
                    {/* ocr提示信息 */}
                    <Prompt title="请核对证件信息" money={this.state.Prompt}></Prompt>
                    <Input onClick={this.showKeyBoard.bind(this,"keyboardNumber")} editable={false} placeholder="请输入签约手机号码" maxLength={11} value={this.state.mobileNo} labelNumber={6}
                        id="keyboardNumber" type="num" cursorSize={this.state.phoneSizeNum} 
                    >手机号码</Input>

                </Input.Group>
                <WhiteSpace size="lg" />
                <Button type="primary" size="default" onTap={this.sunmitInfo.bind(this)} disabled={!(this.state.nameInputVal && this.state.documentTypeNowval && this.state.documentInputVal && this.state.mobileNo)} >提交</Button>
            </div>
        )
    }
}