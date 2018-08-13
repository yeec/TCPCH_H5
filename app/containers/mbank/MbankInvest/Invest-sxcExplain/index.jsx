import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { hashHistory } from 'react-router'
//API数据接口
import API from '../../../../constants/api';
//公共方法
import $native from '../../../../native/native';
import $Fetch from '../../../../fetch/fetch.js';
import Common from "../../../../util/common.jsx";
import ContextDecorator from '../../../../util/decorator/context-decorator';
//基础组件
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
//业务组件
import './style/index.web'
import SxcList from '../../../../components/mbank/mbank-sxc-list/index.web';


export default class MbankSxcAList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            list: [],
            buttonText:"",
        }
    }
    // 初始化设置
    componentDidMount() {
        let that = this;
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "金凉山-随心存",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
            },
            rightButton: {
                exist: 'true',
                name:"我的",
                closeFlag: 'false',
                success:() => {
                    $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
                        success: (val) => {
                            if(val == '1') {
                                Common.setUrl("invest-sxcBList/index.html");
                            }else{
                                $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
                            }
                        }
                    })     
                }
                
            }
        });
        //返回首页
        $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});

        // 获取随心存列表数据
        $Fetch(API.API_GET_SXCLIST_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "IN06",
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
                proType: "SXC",
                pageNo: "1",
                pageSize: "10"

            }
        },true,false).then((res) => {
            let that = this;
            if (Common.returnResult(res.rspHead.returnCode)) {

                this.setState({

                    list: res.rspBody.returnList
                })

            } else {
                let alertDict = {
                    title: "信息提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    success: () => {
                        $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
                    }
                }
                Common.showAppDialogAlert(alertDict);
            }
        })

    }
    /**** 接口字段说明 
    
    注：无特殊说明字段均为 String 类型 
        depositPeriod: 存期
        payoutDate: 起息日期 
        endDate: 到期日期
    
    */
    // goJhs() {
    //     // 判断是否登录
    //     $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
    //         success: (val) => {
    //             if (val == '1') {
    //                 Common.addSessionData(API.SESSION_INVEST_JHS_INTRODUCE_TO_LIST, 'JHS');
    //                 // hashHistory.push('/MbankJhsList');
    //                 Common.setUrl("invest/index.html");
    //             } else {
    //                 $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
    //             }
    //         }
    //     });
    // }
    test(index) {
        $native.callClientForBank(API.NATIVE_CODE_IS_LOGIN, {
            success: (val) => {
                if(val == '1') {
                    if (index == 0) {
                        Common.setUrl('invest-sxcAList/index.html');
            
                    } else if (index == 1) {
                        Common.setUrl('invest-sxcBHuoZhuanDing/index.html');
            
                    }
                    
                }else{
                    $native.callClientForBank(API.NATIVE_CODE_TO_LOGIN, {})
                }
            }
        })  


    }
    render() {
        
        const {
            list

        } = this.state;
        let that = this;
        return (
            <div>
                <WhiteSpace size="md" />
                <SxcList.Group>
                    {
                        list.map(function (item, index) {
                            return <SxcList title={item.tprProductname}
                                explain={item.tprProductdes}
                                sum={item.proRate}
                                zglv={item.rateDis}
                                key={index}
                                buttonText={item.tprProductname == "金凉山随心存A款" ? "立即签约" : "立即购买"}
                                onClick={that.test.bind(this,index)}
                            />

                        })
                    }

                </SxcList.Group>
            </div>
        )
    }
}
