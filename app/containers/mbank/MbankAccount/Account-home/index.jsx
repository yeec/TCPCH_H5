import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../constants/api';
//公共方法
import $native from './../../../../native/native';
import $Fetch from './../../../../fetch/fetch';
import Common from "../../../../util/common.jsx";
//基础组件
import Button from '../../../../components/Base/button/index.web.jsx';
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
//业务组件
import MbankAccountList from './account-list/index.web.js';
import MbankAccountNameEdit from './name-edit/index.web.jsx';

export default class AccountHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: [],
            accInfoMap: {},
            customerName: "",
            repeat_token: "",
            editFlag: false,
            otherName:"",
            accountValue: ""
        }
    }
    // 初始化设置
    componentDidMount() {
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '账户管理',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });

        Common.addSessionData(API.SESSION_EDIT_ANOTHER_NAME, true);
        //返回首页
        $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
        this.queryAccountList();
    }
    //获取客户账户下挂列表
    queryAccountList = () => {
        // 获取账户列表数据
        $Fetch(API.API_QUERY_ACCOUNT_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC01",
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

            }
        }).then((res) => {

            if (Common.returnResult(res.rspHead.returnCode)) {
                // 获取当前账号信息传入session
                Common.addSessionData(API.SESSION_ACCOUNT_DATA_LIST, JSON.stringify(res.rspBody));
                this.setState({
                    customerName: res.rspBody.customerName,
                    list: res.rspBody.returnList
                })
            }else{
                let alertDict = {
                    title: "信息提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    success: ()=>{
                        $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
                    }
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
    }
    //接收子组件传值并做页面跳转
    GoPage = (url, info) => {
        // 接收Session数据
        let sessionData = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA_LIST));
        let params = {
            customerName: sessionData.customerName,
            //账户信息
            accInfoMap: info,
        };
        // 获取当前选中账号信息传入session
        Common.addSessionData(API.SESSION_ACCOUNT_DATA, JSON.stringify(params));
        // 判断交易跳转页面
        switch (url) {
            case 0:
                //账户详情
                Common.setUrl('account-detail/index.html');
                // hashHistory.push('/Accountdetail');
                break;
            case 1:
                //交易明细
                Common.setUrl('account-query/index.html');
                // hashHistory.push('/AccountQuery');
                break;
            case 2:
                //账户设置
                Common.setUrl('account-set/index.html');
                // hashHistory.push('/AccountSet');
                break;
            case 3:
                //账户挂失
                Common.setUrl('account-loss/index.html');
                // hashHistory.push('/AccountLoss');
                break;
        }
    };

    // 追加签约跳转页面
    addAccount = () => {
        // Common.setUrl('account-add/index.html');
        Common.setUrl('account-add/index.html');
        
    };

    /**** 接口字段说明
     acNo    账号
     alias    账号别名
     currency    币种
     cRFlag    钞汇标志
     balance    当前余额
     availBal    可用余额
     holdBalance    冻结余额
     acStateRemark    账户状态描述
     acState    账户状态
     deptId    开户机构号
     deptName    机构名称
     bankAcType    凭证类型
     expireDate    到期日期
     */

     //编辑按钮
    editPreName(val){
        Common.addSessionData(API.SESSION_EDIT_ANOTHER_NAME, false);
        
        this.setState({
            editFlag: true,
            accountValue: val
        })

    }

    //取消
    goPageLoss() {
        this.setState({
            editFlag: false
        })
    }

    //账号别名修改
    goPageRemove(){
        $Fetch(API.API_UPDATE_ACCOUNT_ALIAS, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "AC08",
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
                alias: this.state.otherName,
                accNo: this.state.accountValue                
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.setState({
                    editFlag: false
                })
                Common.setUrl('account/index.html');
            }else{
                // 弹框提示
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
    }

    setOtherNameinputval(val){
        this.setState({
            otherName: val
        })
    }

    render() {
        const {
            list,
            customerName
        } = this.state;
        let that = this;

        return (
            <div>
            <div id="mainInterface">
                <WhiteSpace size="md"/>
                <MbankAccountList.Group>
                    {
                        list.map(function (item, index) {
                            return <MbankAccountList
                                customerName={customerName}
                                acNo={item.acNo}
                                alias={item.alias}
                                availBal={item.availBal}
                                acState={item.acState}
                                deptName={item.deptName}
                                MethodFn={that.GoPage}
                                key={index}
                                accInfo={item}
                                onTop={that.editPreName.bind(that,item.acNo)}
                            />

                        })
                    }
                </MbankAccountList.Group>
                <WhiteSpace size="lg"/>
                {/* <WhiteSpace size="lg"/> */}
                <WingBlank size="lg">
                    <Button icon="circle-add" type="ghost" children="添加下挂卡" onClick={this.addAccount}></Button>
                </WingBlank>
                <WhiteSpace size="lg"/>
            </div>
                {
                    that.state.editFlag ?
                        <div>
                            <MbankAccountNameEdit
                            title="请输入别名"
                            onclick={this.goPageRemove.bind(this)}
                            click={this.goPageLoss.bind(this)}
                            onChange={this.setOtherNameinputval.bind(this)}
                            value={this.state.otherName}/>
                        </div>
                    : null
                }

            </div>
        )
    }
}
