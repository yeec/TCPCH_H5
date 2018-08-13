import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from '../../../../constants/api';
//证件类型
// import document from '../../../../constants/identificationtype';
//公共方法
import $native from '../../../../native/native';
// import ContextDecorator from '../../../../util/decorator/context-decorator';
import Common from "../../../../util/common.jsx";
import $Fetch from './../../../../fetch/fetch.js';
import $ from 'jquery';
import moment from 'moment';
//基础组件
// // import Input from '../../../../components/Base/input-list/index.web.jsx';
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
// import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
// import Button from '../../../../components/Base/button/index.web.jsx';

import SegmentButton from '../../../../components/Base/segment-button/index.web.jsx';
import Assets from '../../../../components/Base/assets/index.web.jsx';
import AssetsList from '../../../../components/Base/assets-list/index.web.jsx';
import List from '../../../../components/Base/list/index.web.js';
import List1 from '../../../../components/Base/assLIst/index.web.jsx';
import Icon from '../../../../components/mbank/mbank-public-icon/index.web';
// import Alert from '../../../../components/Base/modal/alert.web';

export default class MbankTotalAssets extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            //总资产
            totalassets: "",
            //活期总资产
            currentassets: "",
            currentassetslist: [],
            arrowState1: 'dn',
            /*定期资产*/
            regularassets: "",
            regularassetslist: [],
            arrowState2: 'dn',
            //随心存资产
            sxcassets: "",
            sxcassetslist: [],
            arrowState3: 'dn',
            //巨划算资产
            jhsassets: "",
            jhsassetslist: [],
            arrowState4: 'dn',
            //理财资产
            lcassets: "",
            lcassetslist: [],
            arrowState5: 'dn',
            //定期子3级下拉
            arrowState6: 'dn',
            arrowState7: 'dn',
            arrowState8: 'dn',
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount() {
        let that = this;
        // 当前余额
        let kyye = '';
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "我的财富",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',

            }
        });
        
        // 查询资产
        $Fetch("account/totalAssetsForCustomer", {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "RE01",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "2",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",
            },
            // 交易上送报文
            data: {}
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                this.setState({
                    //总资产
                    totalassets: Common.setMoneyFormat(res.rspBody.sumbalance),
                    //活期
                    currentassets: Common.setMoneyFormat(res.rspBody.htotalbalance),
                    //定期
                    regularassets: Common.setMoneyFormat(res.rspBody.dtotalbalance),
                    //随心存
                    sxcassets: Common.setMoneyFormat(res.rspBody.stotalbalance),
                    //巨划算
                    jhsassets: Common.setMoneyFormat(res.rspBody.jtotalbalance),
                    //理财
                    lcassets: Common.setMoneyFormat(res.rspBody.lccanUseVol),
                })
                //活期数据
                if (res.rspBody.hqResultList.length != "") {
                    this.setState({
                        currentassetslist: res.rspBody.hqResultList
                    })
                } else {
                    this.setState({
                        currentassets: "0.00"
                    })
                }
                //定期数据
                if (res.rspBody.dResultList.length != "") {
                    this.setState({
                        regularassetslist: res.rspBody.dResultList
                    })
                } else {
                    this.setState({
                        regularassets: "0.00"
                    })
                }
                //随心存数据
                if (res.rspBody.sxcResultList.length != "") {
                    this.setState({
                        sxcassetslist: res.rspBody.sxcResultList
                    })
                } else {
                    this.setState({
                        sxcassets: "0.00"
                    })
                }
                //聚划算数据
                if (res.rspBody.jhsResultList.length != "") {
                    this.setState({
                        jhsassetslist: res.rspBody.jhsResultList
                    })
                } else {
                    this.setState({
                        jhsassets: "0.00"
                    })
                }
                //理财数据
                if (res.rspBody.lcResultList.length != "") {
                    this.setState({
                        lcassetslist: res.rspBody.lcResultList
                    })
                } else {
                    this.setState({
                        lcassets: "0.00"
                    })
                }
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认",
                    cancel_text: "取消"
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
    }
    //定期
    staeclick = (ind, abc) => {
        let a1 = "#a" + ind;
        let d1 = "#d" +ind;
        $(a1).toggle();
        
        if($(d1).css("transform")=="matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)"){
            $(d1).css("transform","rotate(0deg)")
        }else{
            $(d1).css("transform","rotate(180deg)")
        }
        }
    //随心存
    staeclick1 = (ind, abc) => {
        let e1 = "#e" + ind;
        $("#b" + ind).toggle();
        if($(e1).css("transform")=="matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)"){
            $(e1).css("transform","rotate(0deg)")
        }else{
            $(e1).css("transform","rotate(180deg)")
        }
    }
    //巨划算
    staeclick2 = (ind, abc) => {
        let f1 = "#f" + ind;
        $("#c" + ind).toggle();
        if($(f1).css("transform")=="matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)"){
            $(f1).css("transform","rotate(0deg)")
        }else{
            $(f1).css("transform","rotate(180deg)")
        }
    }
    //跳转至我的负债
    goFinanceEntrust = () => {
        Common.setUrl("totalliabilities/index.html");
    };
    //我的活期点击事件
    currentassets() {
        if (this.state.currentassetslist != "") {
            $(this.refs.huo).toggle();
        }
        if (this.state.arrowState1 == "dn") {
            this.setState({
                arrowState1: "up"
            })
        } else {
            this.setState({
                arrowState1: "dn"
            })
        }
    };
    //定期点击事件
    regularassets() {
        if (this.state.regularassetslist != "") {
            $(this.refs.ding).toggle();

        }
        if (this.state.arrowState2 == "dn") {
            this.setState({
                arrowState2: "up"
            })
        } else {
            this.setState({
                arrowState2: "dn"
            })
        }

    };
    // /随心存
    sxcassets() {
        if (this.state.sxcassetslist != "") {
            $(this.refs.sxc).toggle();
        }
        if (this.state.arrowState3 == "dn") {
            this.setState({
                arrowState3: "up"
            })
        } else {
            this.setState({
                arrowState3: "dn"
            })
        }
    };
    // /巨划算
    jhsassets() {
        if (this.state.jhsassetslist != "") {
            $(this.refs.jhs).toggle();
        }
        if (this.state.arrowState4 == "dn") {
            this.setState({
                arrowState4: "up"
            })
        } else {
            this.setState({
                arrowState4: "dn"
            })
        }
    };
    // /理财
    lcassets() {
        if (this.state.lcassetslist != "") {
            $(this.refs.lc).toggle();
        }
        if (this.state.arrowState5 == "dn") {
            this.setState({
                arrowState5: "up"
            })
        } else {
            this.setState({
                arrowState5: "dn"
            })
        }
    };

    /**** 接口字段说明
    注：无特殊说明字段均为 String 类型
        certType:证件类型
        certNo:证件号码
        custerName：客户名称
        phone: 手机号码
        smsCode: 短信验证码
    */

    render() {
        let me = this;
        const {
            currentassetslist,
            regularassetslist,
            sxcassetslist,
            jhsassetslist,
            lcassetslist
        } = this.state;
        
        let ndata4 = "M3";
        
        return (
            <div className="register-box">
                <WhiteSpace size="md" />
                <SegmentButton title1="我的资产" title2="我的负债" active1 onChange2={this.goFinanceEntrust.bind(this)} />
                <WhiteSpace size="md"/>
                <Assets title={"总资产"} money={this.state.totalassets}></Assets>

                {this.state.currentassets != "0.00" ? <AssetsList namebg="huoqibg" cick={this.currentassets.bind(this)} label="人民币" name="huoqiico" icon={this.state.arrowState1} nametite="huoqi" title="我的活期" money={this.state.currentassets}></AssetsList> : null}
                <div ref="huo" style={{ display: 'none' }}>
                    <List.Group>

                        {
                            currentassetslist.map(function (item, index) {
                                return <List title={Common.setAccountNum2(item.acNo)}
                                    description={Common.setMoneyFormat(item.balance)}
                                    key={index}
                                />
                            })
                        }

                    </List.Group>
                </div>

               {this.state.regularassets != "0.00" ? <AssetsList namebg="dingqibg" cick={this.regularassets.bind(this)} label="人民币" name="dingqiico" icon={this.state.arrowState2} nametite="dingqi" title="我的定期" money={this.state.regularassets}></AssetsList> : null} 
                <div ref="ding" style={{ display: 'none' }}>
                    <List.Group>
                        {
                            regularassetslist.map(function (item, index) {
                                
                                return <List1
                                    title={Common.setAccountNum2(item.acNo)}
                                    description={Common.setMoneyFormat(item.balance)}
                                    click={me.staeclick.bind(this, index)}
                                    key={index}
                                    styl={{ display: "none" }}
                                    fefse={"a" + index}
                                    icon={me.state.arrowState6}
                                    icoico={"d" + index}
                                    ndata={item.iCq}
                                    val=""
                                    lv={Number(item.cLv).toString() + "%"}
                                    enddata={moment(item.cDate).format('YYYY-MM-DD')}
                                />
                            })
                        }
                    </List.Group>
                </div>

                {this.state.sxcassets != "0.00" ? <AssetsList namebg="sxcbg" cick={this.sxcassets.bind(this)} label="人民币" money={this.state.regularassets} icon={this.state.arrowState3} name="sxcico" nametite="suixincun" title="我的随心存" money={this.state.sxcassets}></AssetsList> :null}
                <div ref="sxc" style={{ display: 'none' }}>
                    <List.Group>
                        {
                            sxcassetslist.map(function (item, index) {
                                return <List1
                                    title={Common.setAccountNum2(item.acNo)}
                                    description={Common.setMoneyFormat(item.balance)}
                                    key={index}
                                    click={me.staeclick1.bind(this, index)}
                                    styl={{ display: "none" }}
                                    fefse={"b" + index}
                                    icon={me.state.arrowState6}
                                    icoico={"e" + index}
                                    ndata={item.iCq}
                                    val=""
                                    lv={Number(item.cLv).toString() + "%"}
                                    enddata={moment(item.cDate).format('YYYY-MM-DD')}
                                    enddataA={moment(item.cDate)}
                                />
                            })
                        }
                    </List.Group>
                </div>

                {this.state.jhsassets != "0.00" ? <AssetsList namebg="jhsbg" cick={this.jhsassets.bind(this)} label="人民币" name="jhsico" nametite="juhuasuan" icon={this.state.arrowState4} title="我的巨划算" money={this.state.jhsassets}></AssetsList> : null}
                <div ref="jhs" style={{ display: 'none' }}>
                    <List.Group>
                        {
                            jhsassetslist.map(function (item, index) {
                                return <List1
                                    title={Common.setAccountNum2(item.acNo)}
                                    description={Common.setMoneyFormat(item.balance)}
                                    key={index}
                                    click={me.staeclick2.bind(this, index)}
                                    styl={{ display: "none" }}
                                    fefse={"c" + index}
                                    icoico={"f" + index}
                                    icon={me.state.arrowState6}
                                    ndata={item.iCq}
                                    val=""
                                    lv={Number(item.cLv).toString() + "%"}
                                    enddata={moment(item.cDate).format('YYYY-MM-DD')}
                                />
                            })
                        }
                    </List.Group>
                </div>

                {this.state.lcassets != "0.00" ? <AssetsList namebg="lcbg" cick={this.lcassets.bind(this)} label="人民币" name="lcico" nametite="licai" icon={this.state.arrowState5} title="我的理财" money={this.state.lcassets}></AssetsList> :null}
                <div ref="lc" style={{ display: 'none' }}>
                    <List.Group>
                        {
                            lcassetslist.map(function (item, index) {
                                return <List title={item.prdName}
                                    description={Common.setMoneyFormat(item.canUseVol)}
                                    key={index}
                                />
                            })
                        }
                    </List.Group>
                </div>
            </div>
        )
    }
}
