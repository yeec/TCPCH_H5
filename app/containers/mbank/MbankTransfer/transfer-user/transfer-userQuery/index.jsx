import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import { hashHistory } from 'react-router'
import ContextDecorator from '../../../../../util/decorator/context-decorator';
//API数据接口
import API from '../../../../../constants/api';
//公共方法
import $native from '../../../../../native/native';
import Common from "../../../../../util/common.jsx";
import $Fetch from '../../../../../fetch/fetch.js';
import $ from 'jquery';
//基础组件
import Button from '../../../../../components/Base/button/index.web.jsx';
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../../components/Base/wing-blank/index.web.jsx';
//业务组件
import MbankPublicListSelectPeople from '../../../../../components/mbank/mbank-public-list/mbank-public-list-select-people/index.web.jsx';

@ContextDecorator
export default class MbankTransferUserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            citylist1style: { display: "block" },
            citylist2style: { display: "none" },
            payBookId: '',
            a: [],
            b: [],
            c: [],
            d: [],
            e: [],
            f: [],
            g: [],
            h: [],
            i: [],
            j: [],
            k: [],
            l: [],
            m: [],
            n: [],
            o: [],
            p: [],
            q: [],
            r: [],
            s: [],
            t: [],
            u: [],
            v: [],
            w: [],
            x: [],
            y: [],
            z: [],
            other: [],
            a2: [],
            dataArr: []
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    // 初始化设置
    componentDidMount() {
        // 调取客户TopBar功能并设置标题及返回按钮
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: "收款人管理",
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: function(){
                    Common.setUrl("transfer/index.html");
                    // hashHistory.push('/MbankTransfer')
                }
            }
        });
        
        let that = this;
        that.getListData();
    }

    // 获取收款人列表接口
    getListData() {
        let that = this;
        $Fetch(API.API_GET_TRANSFER_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF04",
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
            data: {

            }
        }).then((res) => {
            // 判断返回结果
            if (Common.returnResult(res.rspHead.returnCode)) {
                that.showList(res.rspBody.resultList || [])
            } else {
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

    // 显示列表
    showList(data) {
        let that = this;
        let a1 = [], b1 = [], c1 = [], d1 = [], e1 = [], f1 = [], g1 = [], h1 = [], i1 = [], j1 = [], k1 = [], l1 = [],
        m1 = [], n1 = [], o1 = [], p1 = [], q1 = [], r1 = [], s1 = [], t1 = [], u1 = [], v1 = [], w1 = [], x1 = [],
        y1 = [], z1 = [], a2 = [], other1 = [];
        // 搜索使用字段
        // that.setState({
        //     dataArr: data.body
        // });
        for (var i = 0; i < data.length; i++) {
            if (data[i].firstLetter == "A") {
                a1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "B") {
                b1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "C") {
                c1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "D") {
                d1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "E") {
                e1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "F") {
                f1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "G") {
                g1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "H") {
                h1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "I") {
                i1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "J") {
                j1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "K") {
                k1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "L") {
                l1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "M") {
                m1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "N") {
                n1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "O") {
                o1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "P") {
                p1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "Q") {
                q1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "R") {
                r1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "S") {
                s1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "T") {
                t1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "U") {
                u1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "V") {
                v1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "W") {
                w1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "X") {
                x1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "Y") {
                y1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            } else if (data[i].firstLetter == "Z") {
                z1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            }else{
                other1.push(
                    <MbankPublicListSelectPeople key={i}
                        info={data[i]}
                        deleteFun={that.deleteFun.bind(this)}
                        transferFun={that.transferFun.bind(this)}
                        editFun={that.editFun.bind(this)}
                    />
                );
            }
        }
        // state拼接好的数据
        that.setState({
            a: a1,
            b: b1,
            c: c1,
            d: d1,
            e: e1,
            f: f1,
            g: g1,
            h: h1,
            i: i1,
            j: j1,
            k: k1,
            l: l1,
            m: m1,
            n: n1,
            o: o1,
            p: p1,
            q: q1,
            r: r1,
            s: s1,
            t: t1,
            u: u1,
            v: v1,
            w: w1,
            x: x1,
            y: y1,
            z: z1,
            other: other1
        })
    }

    // 点击转账
    transferFun() {
        //转账结果界面跳转传值
        Common.removeSessionData(API.SESSION_TRANSFER_RESULTCALLBACK);
        Common.addSessionData(API.SESSION_TRANSFER_RESULTCALLBACK, 'transferMain');
        Common.setUrl("transfer-businessInput/index.html");
        // hashHistory.push('/transfer-businessInput');
    }

    // 点击编辑
    editFun() {
        Common.setUrl("transfer-userEditOrDel/index.html");
        // hashHistory.push('/transfer-userEditOrDel')
    }

    // 点击删除
    deleteFun(val) {
        let that = this;
        Common.showAppDialogAlert({
            title: "信息提示",
            msg: "确定删除该收款人吗？",
            success_text: "确认",
            cancel_text: '取消',
            success: function () {
                that.deleteTransfer(val);
            }
        })
    }
    // 删除收款人
    deleteTransfer(val) {
        let that = this;
        $Fetch(API.API_GET_DELETE_PAYEE, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "TF07",
                //步骤编码(根据相应步骤填写字段（1,2,3,4）)
                stepCode: "1",
                //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
                tradeType: "1",
                //交易标识 1-主，2-副
                flag: "1",
                //服务接口版本号 1.0.0
                serviceVersion: "1.0.0",
                //客户端版本
                // appId: "mac",
                // //客户号
                // cstNo: "1005979731"
            },

            // 交易上送报文
            data: {
                list: [
                    val
                ]
            }
        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                // 弹框成功返回列表
                Common.showAppDialogAlert({
                    title: "信息提示",
                    msg: "删除成功",
                    success: function () {
                        that.setState({
                            a: [],
                            b: [],
                            c: [],
                            d: [],
                            e: [],
                            f: [],
                            g: [],
                            h: [],
                            i: [],
                            j: [],
                            k: [],
                            l: [],
                            m: [],
                            n: [],
                            o: [],
                            p: [],
                            q: [],
                            r: [],
                            s: [],
                            t: [],
                            u: [],
                            v: [],
                            w: [],
                            x: [],
                            y: [],
                            z: [],
                            other: []
                        })
                        that.getListData()
                    },
                    success_text: "确认"
                })
            } else {
                // 弹框提示删除失败
                Common.showAppDialogAlert({
                    title: "错误提示",
                    msg: "删除失败，" + res.rspHead.returnMsg,
                    success_text: "确认"
                })
            }
        });
    }

    // 点击导航
    clickNum(index) {
        let scr = $('#citylist1').children().eq(index).offset().top;
        $(document).scrollTop(scr);
    }

    // 搜索收款人
    /*searchCity() {
        let that = this;

        var name = document.getElementById('username').value;
        var nameLength = name.length;
        var dataArr1 = this.state.dataArr;
        var a2List = [];
        var keyval = "";
        if (nameLength) {
            for (var i = 0; i < dataArr1.peopleList.length; i++) {
                keyval = dataArr1.peopleList[i].name.substr(0, nameLength);
                if (keyval == name) {
                    a2List.push(
                        <MbankPublicListSelectPeople key={i}
                            username={dataArr1.peopleList[i].name}
                            bankicon={dataArr1.peopleList[i].icon}
                            banknum={dataArr1.peopleList[i].accountNum}
                            bankname={dataArr1.peopleList[i].bank} />
                    );
                }

            }
            this.setState({
                a2: a2List,
                citylist1style: { display: "none" },
                citylist2style: { display: "block" }
            })
        } else {
            this.setState({
                a2: a2List,
                citylist1style: { display: "block" },
                citylist2style: { display: "none" }
            })
        }
    }*/
    // 跳转新增页面
    goAdd() {
        Common.setUrl("transfer-userAdd/index.html");
        // hashHistory.push('/transfer-userAdd');
    }

    render() {
        let _this = this;
        return (
            <div>
                {/*<div className="mbank-public-list-seach" id="searchBank">
                    <input type="text" name="" placeholder="输入收款人名称" onInput={this.searchCity.bind(this)}
                           id="username"/>
                </div>*/}
                <WhiteSpace size="lg" />
                <WingBlank size="lg" >
                    <Button onClick={this.goAdd.bind(this)} type="ghost" icon="circle-add" >新增收款人</Button>
                </WingBlank>
                <div>
                    <div className="mbank-public-list mbank-public-list-skr" style={this.state.banklist2style}
                        id="banklist2">
                        {this.state.a2}
                    </div>
                    <div style={this.state.citylist1style}
                        id="citylist1">
                        <div id="a" className="mbank-public-list mbank-public-list-skr" style={this.state.a.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">A</div>
                            {this.state.a}
                        </div>
                        <div id="b" className="mbank-public-list mbank-public-list-skr" style={this.state.b.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">B</div>
                            {this.state.b}
                        </div>
                        <div id="c" className="mbank-public-list mbank-public-list-skr" style={this.state.c.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">C</div>
                            {this.state.c}
                        </div>
                        <div id="d" className="mbank-public-list mbank-public-list-skr" style={this.state.d.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">D</div>
                            {this.state.d}
                        </div>
                        <div id="e" className="mbank-public-list mbank-public-list-skr" style={this.state.e.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">E</div>
                            {this.state.e}
                        </div>
                        <div id="f" className="mbank-public-list mbank-public-list-skr" style={this.state.f.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">F</div>
                            {this.state.f}
                        </div>
                        <div id="g" className="mbank-public-list mbank-public-list-skr" style={this.state.g.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">G</div>
                            {this.state.g}
                        </div>
                        <div id="h" className="mbank-public-list mbank-public-list-skr" style={this.state.h.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">H</div>
                            {this.state.h}
                        </div>
                        <div id="i" className="mbank-public-list mbank-public-list-skr" style={this.state.i.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">I</div>
                            {this.state.i}
                        </div>
                        <div id="j" className="mbank-public-list mbank-public-list-skr" style={this.state.j.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">J</div>
                            {this.state.j}
                        </div>
                        <div id="k" className="mbank-public-list mbank-public-list-skr" style={this.state.k.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">K</div>
                            {this.state.k}
                        </div>
                        <div id="l" className="mbank-public-list mbank-public-list-skr" style={this.state.l.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">L</div>
                            {this.state.l}
                        </div>
                        <div id="m" className="mbank-public-list mbank-public-list-skr" style={this.state.m.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">M</div>
                            {this.state.m}
                        </div>
                        <div id="n" className="mbank-public-list mbank-public-list-skr" style={this.state.n.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">N</div>
                            {this.state.n}
                        </div>
                        <div id="o" className="mbank-public-list mbank-public-list-skr" style={this.state.o.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">O</div>
                            {this.state.o}
                        </div>
                        <div id="p" className="mbank-public-list mbank-public-list-skr" style={this.state.p.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">P</div>
                            {this.state.p}
                        </div>
                        <div id="q" className="mbank-public-list mbank-public-list-skr" style={this.state.q.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">Q</div>
                            {this.state.q}
                        </div>
                        <div id="r" className="mbank-public-list mbank-public-list-skr" style={this.state.r.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">R</div>
                            {this.state.r}
                        </div>
                        <div id="s" className="mbank-public-list mbank-public-list-skr" style={this.state.s.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">S</div>
                            {this.state.s}
                        </div>
                        <div id="t" className="mbank-public-list mbank-public-list-skr" style={this.state.t.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">T</div>
                            {this.state.t}
                        </div>
                        <div id="u" className="mbank-public-list mbank-public-list-skr" style={this.state.u.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">U</div>
                            {this.state.u}
                        </div>
                        <div id="v" className="mbank-public-list mbank-public-list-skr" style={this.state.v.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">V</div>
                            {this.state.v}
                        </div>
                        <div id="w" className="mbank-public-list mbank-public-list-skr" style={this.state.w.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">W</div>
                            {this.state.w}
                        </div>
                        <div id="x" className="mbank-public-list mbank-public-list-skr" style={this.state.x.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">X</div>
                            {this.state.x}
                        </div>
                        <div id="y" className="mbank-public-list mbank-public-list-skr" style={this.state.y.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">Y</div>
                            {this.state.y}
                        </div>
                        <div id="z" className="mbank-public-list mbank-public-list-skr" style={this.state.z.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">Z</div>
                            {this.state.z}
                        </div>
                        <div id="other" className="mbank-public-list mbank-public-list-skr" style={this.state.other.length > 0 ? { display: "block" } : { display: "none" }}>
                            <div className="mbank-public-list-header">#</div>
                            {this.state.other}
                        </div>
                    </div>
                    {/*<div className="mbank-public-list-nav">
                        {
                            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(function (item, index) {
                                return <a key={index} className="daohangBtn"
                                          onClick={_this.clickNum.bind(_this, index)}>{item}</a>
                            })
                        }
                    </div>*/}
                </div>
            </div>
        );
    }
}