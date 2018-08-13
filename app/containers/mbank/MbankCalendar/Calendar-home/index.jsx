import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
//API数据接口
import API from "../../../../constants/api";
//公共方法
import $native from "../../../../native/native";
import $Fetch from "../../../../fetch/fetch.js";
import Common from "../../../../util/common.jsx";
//基础组件
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
//业务组件

import Schedule from "../../../../components/mbank/mbank-finance-schedule/index.jsx";
import Parameter from "../../../../components/mbank/mbank-finance-schedule/parameter.js";
import MbankCalendarList from "./Calendar-list/index.web.js";
import "./style/index.web";
export default class MbankSxcAList extends React.Component {
  constructor(props, context) {
    super(props, context);
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      //年
      S_year: Parameter.getFullYear(),
      //月
      S_month: Parameter.getMonth() + 1,
      //日
      S_day: Parameter.getDate(),
      // 标签
      tags: [""],
      // 数据列表
      monthList: [""],
      //当前日期
      inDate: Parameter.getNowFormatDate(),
      //当前选择日期
      selectionDate: "",
      openNoData: false,
      openNoMonth: false
    };
  }
  // 初始化设置
  componentDidMount() {
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "转账",
      leftButton: {
        exist: "true",
        closeFlag: "false"
      }
    }); 
    //返回首页
    $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
    this.upData(Parameter.getNowFormatDate("month"));
    this.selectDay(this.state.S_day);
    this.selectDate();
  }
  upData(n) {
    // 获取数据
    $Fetch(
      API.API_QUERY_FINANCIAL_CALENDAR,
      {
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
          yearMonth: n
        },
        // 交易上送报文
        data: {
          yearMonth: n
        }
      },
      true,
      false
    ).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        this.setState({
          tags: res.rspBody.targs,
          monthList: res.rspBody.returnList
        });
      } else {
        let alertDict = {
          title: "信息提示",
          msg: res.rspHead.returnMsg,
          success_text: "确认",
          success: () => {
            $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});
          }
        };
        Common.showAppDialogAlert(alertDict);
      }
    });
  }
  /**
   * 选择日期
   * @param year
   * @param month
   * @param day
   */

  //当前选择日操作
  selectDate = (year, month, day) => {
    // 当日
    let theDay = Parameter.formatDate(year, month, day);
    // 更新当日日期
    this.setState({
      selectionDate: theDay,
      S_year: year,
      S_month: month,
      S_day: day
    });
    this.selectDay(day);
  };

  /**
   * 上一个月
   * @param year
   * @param month
   */
  onPreviousMonth = (year, month) => {
    this.selectMonthC(year, month);
  };

  /**
   * 下一个月
   * @param year
   * @param month
   */
  onNextMonth = (year, month) => {
    this.selectMonthC(year, month);
  };
  //选择月份操作
  selectMonthC(year, month) {
    let theDate = Parameter.formatMonth(year, month);
    let monthList = [""];
    let tags = [""];
    this.setState({
      tags: tags,
      monthList: monthList,
      S_month: month
    });
    this.selectMonth();
    this.upData(theDate);
  }
  //当月点击操作
  selectMonth = n => {
    let tags = this.state.tags;
    // console.log("月份选择");
    // console.log(tags);
    this.setState({
      openNoMonth: false,
      openNoData: true
    });
    // 判断当前选择月份是否有事件日，如无显示当月无事件
    if (tags.length == 1) {
      // console.log("当前月份无事件");
      this.setState({
        openNoMonth: true,
        openNoData: false
      });
    }
  };
  //当日操作
  selectDay(n) {
    let tags = this.state.tags;
    // console.log("日期选择");
    // console.log(tags);
    this.setState({
      openNoMonth: false,
      openNoData: true
    });
    for (var x in tags) {
      if (tags[x] === n) {
        this.setState({
          openNoData: false
        });
      }
    }
  }

  render() {
    const that = this;
    const { monthList, selectionDate, tags, inDate } = that.state;
    return (
      <div>
        <Schedule
          onSelectDate={this.selectDate}
          onPreviousMonth={this.onPreviousMonth}
          onNextMonth={this.onNextMonth}
          year={this.state.S_year}
          month={this.state.S_month}
          day={this.state.S_day}
          tags={this.state.tags}
        />
        <WhiteSpace size="xs" />
        <div className="mbank-jrrl-title">
          <span>我的金融日程信息</span>
          {/* <span>{this.state.S_month}月</span>
          <span>{this.state.S_day}日</span> */}
        </div>

        {this.state.openNoMonth == false && this.state.openNoData == false ? (
          <MbankCalendarList.Group>
            {monthList.map(function(item, index) {
              if (item.dateTime === selectionDate) {
                return (
                  <MbankCalendarList
                    flag={item.flag}
                    prdAmt={item.prdAmt}
                    prdName={item.prdName}
                    prdEndDate={item.prdEndDate}
                    prdInterest={item.prdInterest}
                    transferAmt={item.transferAmt}
                    transferDate={item.transferDate}
                    resiveOpenBank={item.resiveOpenBank}
                    resiveName={item.resiveName}
                    key={index}
                  />
                );
              }
            })}
          </MbankCalendarList.Group>
        ) : null}
        
        {this.state.openNoData == true ? (
          <div className="no-calendar">
            <div />
            <p>暂无信息</p>
            {/* <a href="#">去理财></a> */}
          </div>
        ) : null}
      </div>
    );
  }
}
