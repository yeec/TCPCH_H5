# Schedule 金融日历

> PS: 用于展示客户最近 1 个月即将到期的存款产品和预约转账的事项等，到期提醒包括金额、产品名称和到期日期，预计利息等；预约转账包括转账金金额、转账日期、收款人开户行，收款人姓名等信息

## 组件引用

```js
import Schedule from "components/business/schedule";
```

## 组件示例

<!--DemoStart-->

```js
class Demo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: "",
      tags: [5, 21, 22]
    };
  }
  /**
   * 选择日期
   * @param year
   * @param month
   * @param day
   */
  selectDate = (year, month, day) => {
    console.log("选择时间为：" + year + "年" + month + "月" + day + "日");
    alert("点击回调");
  };

  /**
   * 上一个月
   * @param year
   * @param month
   */
  onPreviousMonth = (year, month) => {
    console.log("当前日期为：" + year + "年" + month + "月");
    this.setState({
      tags: [7, 11]
    });
  };

  /**
   * 下一个月
   * @param year
   * @param month
   */
  onNextMonth = (year, month) => {
    console.log("当前日期为：" + year + "年" + month + "月");
    this.setState({ tags: [8, 23] });
  };
  render() {
    return (
      <Page transition={true} infiniteLoader={false} ptr={false}>
        <Schedule
          onSelectDate={this.selectDate}
          onPreviousMonth={this.onPreviousMonth}
          onNextMonth={this.onNextMonth}
          year="2018"
          month="8"
          day="9"
          tags={this.state.tags}
        />
      </Page>
    );
  }
}
```

<!--End-->

## 组件 API

| 属性            | 类型       | 说明                       | 默认值 |
| --------------- | ---------- | -------------------------- | ------ |
| onSelectDate    | `function` | 当前日期选择回调           | -      |
| onPreviousMonth | `function` | 上月日期选择回调           | -      |
| onNextMonth     | `function` | 下月日期选择回调           | -      |
| year            | `string`   | 当前`年`                   | -      |
| month           | `string`   | 当前`月`                   | -      |
| day             | `string`   | 当前`日`                   | -      |
| tags            | `array`    | 事件标签 [2,3,5] 范围 1-31 | -      |
