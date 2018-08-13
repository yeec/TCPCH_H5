import React from 'react';
//公共方法
import time from '../../../../mock/FetchDemo/time';
import DateFormat from './../../../util/common/date-format';
import Common from "../../../util/common.jsx";
//基础组件
import Input from '../../../components/Base/input-list/index.web.jsx';
import Button from '../../../components/Base/button/index.web.jsx';
import WingBlank from '../../../components/Base/wing-blank/index.web.jsx';
import WhiteSpace from '../../../components/Base/white-space/index.web.jsx';
import DatePickerDemo from '../../../components/Base/date-picker/index.web';
import './style/index.web';
import Modal from "../mbank-public-select-click/mbank-public-select-modal/index.web.js"
//API数据接口
import API from '../../../constants/api';

const prefixCls = 'ryt-account-collection-record';


export default class MbankAccountDate extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            pickerDateValue: ["today"],
            pickerDateValue1: "",
            pickerAccountValue: [],
            
            pakval:"",
            endDate: "",
            starDate: "",
            visible: false,
            show: true,
            list: [],
            fages: "",
        }
    }

    componentDidMount() {

        setTimeout(() => {
            let sessionAccountData = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA));

            this.setState({
                fages: sessionAccountData.fages
            })

            let isNull = Common.judgeEmpty(sessionAccountData) ? true : Common.judgeEmpty(sessionAccountData.accInfoMap) ? true : Common.judgeEmpty(sessionAccountData.accInfoMap.acNo) ? true : false;

            if (!isNull) {
                this.setState({
                    //在session中获取帐号。赋值在帐号下拉框
                    pickerAccountValue: [sessionAccountData.accInfoMap.acNo],
                    pakval:"true"                    
                });                
            }
            // this.onPickerDateValueChange(["today"]);
        }, 1000);

        let sessionInveseLiXiMessagePakValOne = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIXI_MESSAGE));
        let accountTitleOne = Common.judgeEmpty(sessionInveseLiXiMessagePakValOne) ? null : sessionInveseLiXiMessagePakValOne.accountTitle;
        if(!Common.judgeEmpty(accountTitleOne)){
            this.setState({
                pakval:"true"                    
            });    
        }

        this.props.computeHeight((document.documentElement.clientHeight - document.getElementsByClassName('mbank-public-query-box')[0].offsetHeight) + 'px')
    }

    //格式化规则
    getDateBefore = (num, unit) => {
        let _unit = 1;
        switch (unit) {
            case 's': {
                break;
            }
            case 'm': {
                _unit = 60;
                break;
            }
            case 'h': {
                _unit = 60 * 60;
                break;
            }
            case 'd': {
                _unit = 60 * 60 * 24;
                break;
            }
            case 'M': {
                _unit = 60 * 60 * 24 * 30;
                break;
            }
            case 'y': {
                _unit = 60 * 60 * 24 * 365;
                break;
            }
            default:
                break;
        }

        const msecondsBefore = num * _unit * 1000;
        return new Date().getTime() - msecondsBefore;
    };


    //日期取值
    onPickerDateValueChange = (value, label) => {
        if(value == "选择查询区间"){
            this.setState({
                visible: true,
            });
        }else{
            this.setState({
                visible: false,
            });
        }
        this.setState({
            pickerDateValue: label,
            
        });


        this.requestDataHandle(label);

        this.props.computeHeight((document.documentElement.clientHeight - document.getElementsByClassName('mbank-public-query-box')[0].offsetHeight) + 'px')
    };


    //账号取值
    onPickerAccountValueChange = (value,label) => {
        
        this.setState({
            pickerAccountValue: label,
            pickerAccountleabe:value,
            pakval:label
            
        });
        console.log(this.state.pickerAccountleabe)
        //this.requestDataHandle();
    };

    //起始日期取值
    onStarDateValueChange = (val) => {
        this.setState({
            starDate: val
        })
    };

    //结束日期取值
    onEndDateValueChange = (val) => {
        this.setState({
            endDate: val
        })
    };

    //点击事件
    requestDataClick(value) {
        let that = this;

        const formatStr = 'yyyy-MM-dd';

        let nowDate = DateFormat.date(new Date().getTime(), formatStr);

        let starDate = that.state.starDate;
        let endDate = that.state.endDate;

        // alert(starDate)
        if (this.state.visible == true) {
            if (Common.judgeEmpty(starDate)) {
                let alertDict = {
                    title: "信息提示",
                    msg: "请选择开始日期",
                    success_text: "确认",
                }
                Common.showAppDialogAlert(alertDict);
                return
            }
            if (Common.judgeEmpty(endDate)) {

                let alertDict = {
                    title: "信息提示",
                    msg: "请选择结束日期",
                    success_text: "确认",
                }
                Common.showAppDialogAlert(alertDict);
                return
            }
        }
        if (Common.judgeEmpty(starDate)) {
            starDate = nowDate;


            // let alertDict = {
            //     title: "信息提示",
            //     msg: "请选择开始日期",
            //     success_text: "确认",
            // }
            // Common.showAppDialogAlert(alertDict);
            // return
        }
        if (Common.judgeEmpty(endDate)) {
            endDate = nowDate;


            // let alertDict = {
            //     title: "信息提示",
            //     msg: "请选择开始日期",
            //     success_text: "确认",
            // }
            // Common.showAppDialogAlert(alertDict);
            // return
        }


        // if (Common.judgeEmpty(endDate)) {
        //     endDate = "today"
        //     // alert(endDate)
        //     // let alertDict = {
        //     //     title: "信息提示",
        //     //     msg: "请选择结束日期",
        //     //     success_text: "确认",
        //     // }
        //     // Common.showAppDialogAlert(alertDict);
        //     // return
        // }

        if (!Common.judgeEmpty(starDate) && (starDate.indexOf("-")) > -1 && !Common.judgeEmpty(endDate) && (endDate.indexOf("-")) > -1) {

            if (nowDate < starDate) {
                let alertDict = {
                    title: "信息提示",
                    msg: "开始日期大于当前日期，请重新选择",
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }

            if (nowDate < endDate) {
                let alertDict = {
                    title: "信息提示",
                    msg: "结束日期大于当前日期，请重新选择",
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }


            if (starDate > endDate) {
                let alertDict = {
                    title: "信息提示",
                    msg: "开始日期大于结束日期，请重新选择",
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }

            //开始日期不能早于两年
            let now = new Date(nowDate.replace(/-/g, "/"));
            let star = new Date(starDate.replace(/-/g, "/"));
            let end = new Date(endDate.replace(/-/g, "/"));

            //换算成秒后 算出天数
            let betweenNowAndStar = (now.getTime() - star.getTime()) / (1000 * 24 * 3600);
            let betweenEndAndStar = (end.getTime() - star.getTime()) / (1000 * 24 * 3600);
            if (betweenNowAndStar > 365) {
                let alertDict = {
                    title: "信息提示",
                    msg: "开始日期大于一年，请重新选择",
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }

            if (betweenEndAndStar > 365) {
                let alertDict = {
                    title: "信息提示",
                    msg: "开始日期与结束日期间隔大于一年，请重新选择",
                    success_text: "确认"
                }
                Common.showAppDialogAlert(alertDict);
                return
            }


            //删除日期的-
            starDate = starDate.replace(/-/g, "");
            endDate = endDate.replace(/-/g, "");

        }

        if(this.state.pakval){
            this.props.MethodFn(starDate, that.state.pickerAccountValue.toString(), endDate);
        }else{
            let alertDict = {
                title: "信息提示",
                msg: "请选择账号",
                success_text: "确认",

            };
            Common.showAppDialogAlert(alertDict);
            return
        }
        

        
        
    }

    //为起始日期，结束日期，账号赋值
    requestDataHandle(val) {

        const {
            date,
            pickerDateValue,
            pickerAccountValue
        } = this.state;
        let that = this;

        const formatStr = 'yyyyMMdd';

        let endDate = DateFormat.date(new Date().getTime(), formatStr);
        let accountValue = pickerAccountValue.toString();
        
        let startDate = '';

        switch (val.toString()) {
            case "today": {
                startDate = DateFormat.date(this.getDateBefore(0, 'd'), formatStr);
                
                //将子页面赋值给父页面
                // this.props.MethodFn(startDate, accountValue, endDate);
                break;
            }
            case "last7Days": {
                startDate = DateFormat.date(this.getDateBefore(7, 'd'), formatStr);
                
                //将子页面赋值给父页面
                // this.props.MethodFn(startDate, accountValue, endDate);
                break;
            }
            case "last1Month": {
                startDate = DateFormat.date(this.getDateBefore(1, 'M'), formatStr);
                
                //将子页面赋值给父页面
                // this.props.MethodFn(startDate, accountValue, endDate);
                break;
            }
            case "last3Months": {
                startDate = DateFormat.date(this.getDateBefore(3, 'M'), formatStr);
               
                //将子页面赋值给父页面
                // this.props.MethodFn(startDate, accountValue, endDate);
                break;
            }
            case "last6Months": {
                startDate = DateFormat.date(this.getDateBefore(6, 'M'), formatStr);
                
                //将子页面赋值给父页面
                // this.props.MethodFn(startDate, accountValue, endDate);
                break;
            }
            case "last1Year": {
                startDate = DateFormat.date(this.getDateBefore(1, 'y'), formatStr);
                
                //将子页面赋值给父页面
                //this.props.MethodFn(startDate, accountValue, endDate);
                break;
            }
            // case "select":
            // {
            //
            //     startDate = "";
            //     endDate = "";
            //     break;
            // }
            // default: {
            //     startDate = DateFormat.date(this.getDateBefore(7, 'd'), formatStr);
            //     this.props.MethodFn(startDate, accountValue, endDate);
            //     break;
            // }

        }

        this.setState({
            starDate: startDate,
            endDate: endDate,
        });

        //this.props.MethodFn(startDate, accountValue, endDate);
    };
    //列表点击选择modal框
    showListClickBox() {
        let that = this;
        // this.setState({
        //   pickerVisible: true
        // });
        // let typeList = document.map(function(item, i) {
        //   item.cusName = that.state.customerName;
        //   return JSON.stringify(item);
        // });
        
    }

    render() {
        console.log(this.state.pickerDateValue1)
        let me =this;
        const { props } = this;
        
        let {
            MethodFn,
            type,
            onClick,
            accountList,
            
        } = props;
        let sessionInveseLiXiMessage = JSON.parse(Common.getSessionData(API.SESSION_INVEST_JHS_LIXI_MESSAGE));
        
        let accountTitle = Common.judgeEmpty(sessionInveseLiXiMessage) ? null : sessionInveseLiXiMessage.accountTitle;
        
        let sessionAccountAndName = JSON.parse(Common.getSessionData(API.SESSION_ACCOUNT_DATA));
        let checkIsNull = Common.judgeEmpty(sessionAccountAndName) ? true : Common.judgeEmpty(sessionAccountAndName.accInfoMap) ? true : Common.judgeEmpty(sessionAccountAndName.accInfoMap.acNo) ? true : false;
        
        let showAccountMessage = checkIsNull ? (Common.judgeEmpty(accountTitle) ?  "选择账号": accountTitle): Common.setAccountNum2(sessionAccountAndName.accInfoMap.acNo,true) + '(' +sessionAccountAndName.accInfoMap.alias + ')';
       
        // if(this.state.pickerAccountValue == ""){
        //     this.setState({
        //         pickerDateValue:"today"
        //     })
        // }
        // alert(this.state.pickerDateValue)
        return (
            <div className="mbank-public-query-box">
                <WhiteSpace size="sm" />
                <Input.Group>
                    {/* <Input.Pick cellTitle="账号" data={accountList}
                        placeholder="选择账号" title="选择账号"
                        cols="1"
                        onChange={this.onPickerAccountValueChange.bind(this)}
                        value={this.state.pickerAccountValue}
                    /> */}

                    <Input.Click
                        cols="1"
                        // cellTitle={this.state.pickerAccountValue}
                        labelNumber={4}
                        placeholder={showAccountMessage}
                        type={accountList}
                        title="选择账号"
                        items={accountList}
                        onChange={this.onPickerAccountValueChange.bind(this)}
                        value={this.state.pickerAccountValue}
                        data={accountList}
                    />




                    {/* <Input.Pick cellTitle="交易时间" data={time}
                        cols="1"
                        placeholder="选择时间" title="选择时间"
                        onPickerChange={this.onPickerDateValueChange.bind(this)}
                        value={this.state.pickerDateValue}/> */}

                    <Input.Click
                        cols="1"
                        cellTitle="选择时间"
                        labelNumber={4}
                        placeholder="当天"
                        title="选择时间"
                        items={time}
                        onChange={this.onPickerDateValueChange.bind(this)}
                        value={this.state.pickerDateValue}

                    />



                </Input.Group>
                {this.state.visible ?
                    <div className="ryt-input-list-item ryt-input-item">
                        <div className="ryt-input-label ryt-input-label-4">选择时间</div>
                        <div className="ryt-input-control">
                            <div className="mbank-date-select">
                                <DatePickerDemo
                                    minDate={new Date(new Date().getFullYear()-1,new Date().getMonth(),new Date().getDate())}
                                    maxDate={new Date()}
                                    onChange={this.onStarDateValueChange.bind(this)}
                                    content='开始日期'
                                    returnType='formatValue'
                                />
                                <div>至</div>
                                <DatePickerDemo
                                    minDate={new Date(new Date().getFullYear()-1,new Date().getMonth(),new Date().getDate())}
                                    maxDate={new Date()}
                                    onChange={this.onEndDateValueChange.bind(this)}
                                    content='结束日期'
                                    returnType='formatValue'
                                />
                            </div>
                        </div>
                    </div>

                    // <div className="mbank-date-input">
                    //     <div className="mbank-date-input-body">
                    //         <div
                    //             className="mbank-date-input-item mbank-date-input-item-middle mbank-date-input-item-date-select">
                    //             <div className="mbank-date-input-line">
                    //                 <div className="mbank-date-input-content">日期区间</div>
                    //                 <div className="mbank-date-input-extra">
                    //                     <DatePickerDemo
                    //                         mixDate={new Date(2015, 8, 15)}
                    //                         maxDate={new Date(2018, 8, 15)}
                    //                         onChange={this.onStarDateValueChange.bind(this)}
                    //                     />
                    //                     <div>至</div>
                    //                     <DatePickerDemo
                    //                         mixDate={new Date(2015, 8, 15)}
                    //                         maxDate={new Date(2018, 8, 15)}
                    //                         onChange={this.onEndDateValueChange.bind(this)}
                    //                     />
                    //                 </div>
                    //                 <div className="mbank-date-input-button"
                    //                     onClick={this.requestDataHandle.bind(this)}>
                    //                     <i className="ryt-icon ryt-icon-md mbank-icon-search-blue"></i></div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>

                    : null}

                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Button type="primary" size="default"
                        onTap={this.requestDataClick.bind(this)}>查询</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
            </div>





        )
    }
}
