import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $ from 'jquery';
//API数据接口
import API from '../../../../constants/api';
//公共方法
import Common from '../../../../util/common';
import $Fetch from '../../../../fetch/fetch.js';
import PureRenderHoc from '../../../../util/hoc/index';
//业务组件
import MbankPublicListSelectBank from '../../../mbank/mbank-public-list/mbank-public-list-select-bank/index.web.jsx';
import Tips from './../../../../components/mbank/mbank-pubilc-tips/index.web.jsx';

import WhiteSpace from '../../../Base/white-space/index.web.jsx';
import WingBlank from '../../../Base/wing-blank/index.web.jsx';
import Button from '../../../Base/button/index.web.jsx';
//样式引入
import './style/index.web';


class MbankTransferBank extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showSelect: false,
            showMore: false,
            hotBank: [],
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
            a3: [],
            dataArr: []
        }
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    componentDidMount() {
        let a1 = [], b1 = [], c1 = [], d1 = [], e1 = [], f1 = [], g1 = [], h1 = [], i1 = [], j1 = [], k1 = [], l1 = [], m1 = [], n1 = [], o1 = [], p1 = [], q1 = [], r1 = [], s1 = [], t1 = [], u1 = [], v1 = [], w1 = [], x1 = [], y1 = [], z1 = [], a2 = [], hot = [];
        let me = this;
        // this.selectOK = this.selectOK.bind(this);
        let callbackQK0101 = function (data) {
            me.setState({
                dataArr: data.rspBody
            });
            for (var i = 0; i < data.rspBody.list.length; i++) {
                if (!isNaN(data.rspBody.list[i].serialNum)) {
                    hot.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankicon={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                }
            }
            for (var i = 0; i < data.rspBody.list.length; i++) {
                if (data.rspBody.list[i].serialNum == "A") {
                    a1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "B") {
                    b1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "C") {
                    c1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "D") {
                    d1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "E") {
                    e1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "F") {
                    f1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "G") {
                    g1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "H") {
                    h1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "I") {
                    i1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "J") {
                    j1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "K") {
                    k1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "L") {
                    l1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "M") {
                    m1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "N") {
                    n1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "O") {
                    o1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "P") {
                    p1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "Q") {
                    q1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "R") {
                    r1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "S") {
                    s1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "T") {
                    t1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "U") {
                    u1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "V") {
                    v1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "W") {
                    w1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "X") {
                    x1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "Y") {
                    y1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                } else if (data.rspBody.list[i].serialNum == "Z") {
                    z1.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={data.rspBody.list[i].bankName}
                                                   bankNo={data.rspBody.list[i].bankNo}/>
                    );
                }
            }
            me.setState({
                hotBank: hot,
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

        //获取转出银行列表
        $Fetch(API.API_GET_TRANSFER_BANK, {
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
            data: {
                pageNo: '1',
                pageSize: '10000'
            }


        }).then((res) => {

            if (Common.returnResult(res.rspHead.returnCode)) {
                {
                    callbackQK0101(res)
                }
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        })
    }

    clickNum(index) {
        // let hed=$('#hotBank').outerHeight();
        // let sec=$('#searchBank').outerHeight();
        let boxnow = $("#checkBankBox").scrollTop();
        let scr = $('#banklist1').children().eq(index).position().top;
        $("#checkBankBox").scrollTop(scr + boxnow);
    }

    selectOK(val, bankNo) {
        this.props.selectok(val, bankNo);
    }

    //模糊查询
    searchbank() {
        let me = this;
        var name = document.getElementById('bankName').value;
        var nameLength = name.length;
        var dataArr1 = this.state.dataArr;
        var a2List = [];
        var keyval = "";

        for (var i = 0; i < dataArr1.list.length; i++) {
            keyval = dataArr1.list[i].bankName.indexOf(name);
            if (keyval > -1) {
                a2List.push(
                    <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                               bankname={dataArr1.list[i].bankName} bankNo={dataArr1.list[i].bankNo}/>
                );
            }
        }
        // console.log(a2List);
        // console.log(a2List.length)
        if (a2List.length == 0) {
            me.setState({
                showSelect: a2List.length == 0 ? true : false,
                showMore: true,
                a2: a2List
            })

        } else {
            me.setState({
                showSelect: nameLength ? true : false,
                showMore: false,
                a2: a2List
            })

        }


    }

    //查询更多
    searMorechbank() {
        let me = this;
        var name = document.getElementById('bankName').value;
        var nameLength = name.length;
        var dataArr1 = this.state.dataArr;
        var a2List = [];
        var keyval = "";
        // console.log(name)
        // bankName		行名匹配条件	String	20		O
        // pageNo		当前页	String	9	1	O
        // pageSize		每页显示记录数	String	2	10	O

        //获取转出子银行列表
        $Fetch(API.API_GET_TRANSFER_SUBBANKNO, {
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
            data: {
                bankName: name,
                pageNo: '1',
                pageSize: '10000'
            }


        }).then((res) => {
            if (Common.returnResult(res.rspHead.returnCode)) {
                for (var i = 0; i < res.rspBody.list.length; i++) {
                    a2List.push(
                        <MbankPublicListSelectBank key={i} onclick={me.selectOK.bind(me)}
                                                   bankname={res.rspBody.list[i].bankName}
                                                   bankicon={res.rspBody.list[i].bankName}
                                                   bankNo={res.rspBody.list[i].bankNo}/>
                    );
                }
                me.setState({
                    showMore: false,
                    showSelect: true,
                    a2: a2List
                })
            } else {
                let alertDict = {
                    title: "错误提示",
                    msg: res.rspHead.returnMsg,
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
            }
        });

    }


    render() {
        let _this = this;
        // alert(_this.state.a2);
        return (
            <div id="checkBankBox" className="mbank-transfer-bank-box">
                <div className="mbank-public-list-seach" id="searchBank">
                    <input type="text" name="" placeholder="输入银行名称" onChange={this.searchbank.bind(this)}
                           id="bankName"/>
                </div>

                {
                    this.state.showSelect ?
                        <div className="mbank-public-list mbank-public-list-select-bank" id="banklist2">
                            <div className="mbank-public-list-header"></div>
                            <div className="mbank-public-list-body">{this.state.a2}</div>
                        </div>
                        :
                        <div className="mbank-public-list-select">
                            <div className="mbank-public-list mbank-public-list-select-bank" id="hotBank">
                                <div className="mbank-public-list-header">热门银行</div>
                                <div className="mbank-public-list-body">{this.state.hotBank}</div>
                            </div>
                            <div className="mbank-public-list mbank-public-list-select-bank" id="banklist1">
                                <div id="a" style={this.state.a.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">A</div>
                                    <div className="mbank-public-list-body">{this.state.a}</div>
                                </div>
                                <div id="b" style={this.state.b.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">B</div>
                                    <div className="mbank-public-list-body">{this.state.b}</div>
                                </div>
                                <div id="c" style={this.state.c.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">C</div>
                                    <div className="mbank-public-list-body">{this.state.c}</div>
                                </div>
                                <div id="d" style={this.state.d.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">D</div>
                                    <div className="mbank-public-list-body">{this.state.d}</div>
                                </div>
                                <div id="e" style={this.state.e.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">E</div>
                                    <div className="mbank-public-list-body">{this.state.e}</div>
                                </div>
                                <div id="f" style={this.state.f.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">F</div>
                                    <div className="mbank-public-list-body">{this.state.f}</div>
                                </div>
                                <div id="g" style={this.state.g.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">G</div>
                                    <div className="mbank-public-list-body">{this.state.g}</div>
                                </div>
                                <div id="h" style={this.state.h.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">H</div>
                                    <div className="mbank-public-list-body">{this.state.h}</div>
                                </div>
                                <div id="i" style={this.state.i.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">I</div>
                                    <div className="mbank-public-list-body">{this.state.i}</div>
                                </div>
                                <div id="j" style={this.state.j.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">J</div>
                                    <div className="mbank-public-list-body">{this.state.j}</div>
                                </div>
                                <div id="k" style={this.state.k.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">K</div>
                                    <div className="mbank-public-list-body">{this.state.k}</div>
                                </div>
                                <div id="l" style={this.state.l.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">L</div>
                                    <div className="mbank-public-list-body">{this.state.l}</div>
                                </div>
                                <div id="m" style={this.state.m.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">M</div>
                                    <div className="mbank-public-list-body">{this.state.m}</div>
                                </div>
                                <div id="n" style={this.state.n.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">N</div>
                                    <div className="mbank-public-list-body">{this.state.n}</div>
                                </div>
                                <div id="o" style={this.state.o.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">O</div>
                                    <div className="mbank-public-list-body">{this.state.o}</div>
                                </div>
                                <div id="p" style={this.state.p.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">P</div>
                                    <div className="mbank-public-list-body">{this.state.p}</div>
                                </div>
                                <div id="q" style={this.state.q.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">Q</div>
                                    <div className="mbank-public-list-body">{this.state.q}</div>
                                </div>
                                <div id="r" style={this.state.r.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">R</div>
                                    <div className="mbank-public-list-body">{this.state.r}</div>
                                </div>
                                <div id="s" style={this.state.s.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">S</div>
                                    <div className="mbank-public-list-body">{this.state.s}</div>
                                </div>
                                <div id="t" style={this.state.t.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">T</div>
                                    <div className="mbank-public-list-body">{this.state.t}</div>
                                </div>
                                <div id="u" style={this.state.u.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">U</div>
                                    <div className="mbank-public-list-body">{this.state.u}</div>
                                </div>
                                <div id="v" style={this.state.v.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">V</div>
                                    <div className="mbank-public-list-body">{this.state.v}</div>
                                </div>
                                <div id="w" style={this.state.w.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">W</div>
                                    <div className="mbank-public-list-body">{this.state.w}</div>
                                </div>
                                <div id="x" style={this.state.x.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">X</div>
                                    <div className="mbank-public-list-body">{this.state.x}</div>
                                </div>
                                <div id="y" style={this.state.y.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">Y</div>
                                    <div className="mbank-public-list-body">{this.state.y}</div>
                                </div>
                                <div id="z" style={this.state.z.length > 0 ? {display: "block"} : {display: "none"}}>
                                    <div className="mbank-public-list-header">Z</div>
                                    <div className="mbank-public-list-body">{this.state.z}</div>
                                </div>
                            </div>
                            <div className="mbank-public-list-nav">
                                {
                                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(function (item, index) {
                                        return <a key={index} className="daohangBtn"
                                                  onClick={_this.clickNum.bind(_this, index)}>{item}</a>
                                    })
                                }
                            </div>
                        </div>
                }
                {
                    this.state.showMore ? <WhiteSpace size="sm"><WingBlank size="lg">
                        <Button onTap={this.searMorechbank.bind(this)} type="ghost">查询更多</Button>
                    </WingBlank>
                        <Tips title="温馨提示" content="手机银行转账银行查询无记录时，请点击查询更多。确保输入银行汉字名称足够准确。如有疑问请拨打客户电话：0834-96834"/>
                    </WhiteSpace> : null
                }


            </div>
        );
    }
}
MbankTransferBank.propTypes = {
    selectok: React.PropTypes.any
};

MbankTransferBank.defaultProps = {
    selectok: ""
};
export default PureRenderHoc(MbankTransferBank);
