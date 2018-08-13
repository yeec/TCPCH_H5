import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import {hashHistory} from 'react-router';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import PureRenderHoc from '../../../../util/hoc/index';
import $Fetch from '../../../../fetch/fetch.js';
import Common from "../../../../util/common.jsx";

//基础页面
import WhiteSpace from '../../../Base/white-space/index.web.jsx';
import WingBlank from '../../../Base/wing-blank/index.web.jsx';

import Button from '../../../Base/button/index.web.jsx';

//业务组件
import MbankPublicListSelectPeople from '../mbank-public-list-select-people/index.web.jsx';


class MbankTransferPeople extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            peoplelist1style: {display: "block"},
            peoplelist2style: {display: "none"},
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
            a2: [],
            dataArr: []
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let a1 = [], b1 = [], c1 = [], d1 = [], e1 = [], f1 = [], g1 = [], h1 = [], i1 = [], j1 = [], k1 = [], l1 = [],
            m1 = [], n1 = [], o1 = [], p1 = [], q1 = [], r1 = [], s1 = [], t1 = [], u1 = [], v1 = [], w1 = [], x1 = [],
            y1 = [], z1 = [], a2 = [], hot = [];
        let me = this;
        // 获取收款人列表接口
        $Fetch(API.API_GET_TRANSFER_LIST, {
            //默认固定上送报文
            reqHead: {
                //场景编码
                sceneCode: "0001",
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
            data: {}
        }).then((res) => {
            // 判断返回结果
            if (Common.returnResult(res.rspHead.returnCode)) {
                callbackQK0101(res.rspBody.resultList)
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
        let callbackQK0101 = function (data) {
            // me.setState({
            //     dataArr: data.body
            // });
            // for (var i = 0; i < data.body.hotpeople.length; i++) {
            //     hot.push(
            //         <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)} info={data.body.hotpeople[i]} />
            //     );
            // }
            for (var i = 0; i < data.length; i++) {
                if (data[i].firstLetter == "A") {
                    a1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "B") {
                    b1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "C") {
                    c1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "D") {
                    d1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "E") {
                    e1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "F") {
                    f1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "G") {
                    g1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "H") {
                    h1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "I") {
                    i1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "J") {
                    j1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "K") {
                    k1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "L") {
                    l1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "M") {
                    m1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "N") {
                    n1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "O") {
                    o1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "P") {
                    p1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "Q") {
                    q1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "R") {
                    r1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "S") {
                    s1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "T") {
                    t1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "U") {
                    u1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "V") {
                    v1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "W") {
                    w1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "X") {
                    x1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "Y") {
                    y1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                } else if (data[i].firstLetter == "Z") {
                    z1.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     info={data[i]}/>
                    );
                }
            }
            me.setState({
                // hotpeople: hot,
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
                z: z1
            })
        }
    }

    selectOK(val) {
        this.props.selectok(val);
    }

    searchpeople() {
        let me = this;
        var name = document.getElementById('peopleName').value;
        var nameLength = name.length;
        var dataArr1 = this.state.dataArr;
        var a2List = [];
        var keyval = "";
        if (nameLength) {
            for (var i = 0; i < dataArr1.people.length; i++) {
                keyval = dataArr1.people[i].pname.substr(0, nameLength);
                if (keyval == name) {
                    a2List.push(
                        <MbankPublicListSelectPeople key={i} clickflag={true} onclick={me.selectOK.bind(me)}
                                                     banknum={dataArr1.people[i].paccount}
                                                     username={dataArr1.people[i].pname}
                                                     bankname={dataArr1.people[i].pbank}
                                                     bankicon={dataArr1.people[i].picon}/>
                    );
                }
            }

            this.setState({
                a2: a2List,
                peoplelist1style: {display: "none"},
                peoplelist2style: {display: "block"}
            })
        } else {
            this.setState({
                a2: a2List,
                peoplelist1style: {display: "block"},
                peoplelist2style: {display: "none"}
            })
        }
    }


    // 跳转新增页面
    goAdd() {
        Common.setUrl("transfer-userAdd.html");
        // hashHistory.push('/transfer-userAdd');
    }

    render() {
        let _this = this;

        const { props } = this;

        let {
            showAdd,
        } = props;


        return (



            <div id="checkPeopleBox" className="mbank-transfer-bank-box">
                {/*<div className="mbank-public-list-seach" id="searchPeople">*/}
                {/*<input type="text" name="" placeholder="输入银行名称" onInput={this.searchpeople.bind(this)} id="peopleName" />*/}
                {/*</div>*/}
                {/*<div className="mbank-public-list mbank-public-list-skr" id="hotpeople" style={this.state.peoplelist1style}>*/}
                {/*<div className="mbank-public-list-header">最近转账</div>*/}
                {/*{this.state.hotpeople}*/}
                {/*</div>*/}
                {/*<WingBlank size="lg">*/}
                {/*<Button type="ghost" size="default"*/}
                {/*onTap={this.selectOK.bind(this)}>确认</Button>*/}
                {/*</WingBlank>*/}

                <WhiteSpace size="sm"/>
                {showAdd ?  <WingBlank size="lg">
                    <Button onClick={this.goAdd.bind(this)} type="ghost" icon="circle-add">新增收款人</Button>
                </WingBlank> : null}

                <div>
                    <div className="mbank-public-list  mbank-public-list-skr" style={this.state.peoplelist2style}
                         id="peoplelist2">
                        <div className="mbank-public-list-header"></div>
                        {this.state.a2}
                    </div>
                    <div className="mbank-public-list  mbank-public-list-skr" style={this.state.peoplelist1style}
                         id="peoplelist1">
                        <div id="a" style={this.state.a.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">A</div>
                            {this.state.a}
                        </div>
                        <div id="b" style={this.state.b.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">B</div>
                            {this.state.b}
                        </div>
                        <div id="c" style={this.state.c.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">C</div>
                            {this.state.c}
                        </div>
                        <div id="d" style={this.state.d.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">D</div>
                            {this.state.d}
                        </div>
                        <div id="e" style={this.state.e.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">E</div>
                            {this.state.e}
                        </div>
                        <div id="f" style={this.state.f.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">F</div>
                            {this.state.f}
                        </div>
                        <div id="g" style={this.state.g.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">G</div>
                            {this.state.g}
                        </div>
                        <div id="h" style={this.state.h.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">H</div>
                            {this.state.h}
                        </div>
                        <div id="i" style={this.state.i.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">I</div>
                            {this.state.i}
                        </div>
                        <div id="j" style={this.state.j.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">J</div>
                            {this.state.j}
                        </div>
                        <div id="k" style={this.state.k.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">K</div>
                            {this.state.k}
                        </div>
                        <div id="l" style={this.state.l.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">L</div>
                            {this.state.l}
                        </div>
                        <div id="m" style={this.state.m.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">M</div>
                            {this.state.m}
                        </div>
                        <div id="n" style={this.state.n.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">N</div>
                            {this.state.n}
                        </div>
                        <div id="o" style={this.state.o.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">O</div>
                            {this.state.o}
                        </div>
                        <div id="p" style={this.state.p.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">P</div>
                            {this.state.p}
                        </div>
                        <div id="q" style={this.state.q.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">Q</div>
                            {this.state.q}
                        </div>
                        <div id="r" style={this.state.r.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">R</div>
                            {this.state.r}
                        </div>
                        <div id="s" style={this.state.s.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">S</div>
                            {this.state.s}
                        </div>
                        <div id="t" style={this.state.t.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">T</div>
                            {this.state.t}
                        </div>
                        <div id="u" style={this.state.u.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">U</div>
                            {this.state.u}
                        </div>
                        <div id="v" style={this.state.v.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">V</div>
                            {this.state.v}
                        </div>
                        <div id="w" style={this.state.w.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">W</div>
                            {this.state.w}
                        </div>
                        <div id="x" style={this.state.x.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">X</div>
                            {this.state.x}
                        </div>
                        <div id="y" style={this.state.y.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">Y</div>
                            {this.state.y}
                        </div>
                        <div id="z" style={this.state.z.length > 0 ? {display: "block"} : {display: "none"}}>
                            <div className="mbank-public-list-header">Z</div>
                            {this.state.z}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MbankTransferPeople.propTypes = {
    showAdd: React.PropTypes.bool,
    selectok: React.PropTypes.any,
    transfertypeapi: React.PropTypes.string
};

MbankTransferPeople.defaultProps = {
    showAdd: true,
    selectok: "",
    transfertypeapi: API.API_GET_TRANSFER_PEOPLE
};
export default PureRenderHoc(MbankTransferPeople);
