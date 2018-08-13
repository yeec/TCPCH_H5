import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
//API数据接口
import API from "../../../../constants/api";
//证件类型
import document from "../../../../constants/identificationtype";
//公共方法
import $native from "../../../../native/native";
import ContextDecorator from "../../../../util/decorator/context-decorator";
import Common from "../../../../util/common.jsx";
import $Fetch from "./../../../../fetch/fetch.js";
import $ from "jquery";
//基础组件
// import Input from "../../../../components/Base/input-list/index.web.jsx";
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
// import WingBlank from "../../../../components/Base/wing-blank/index.web.jsx";
// import Button from "../../../../components/Base/button/index.web.jsx";
import NoData from "../../../../components/Base/no-data/index.web.jsx";
import SegmentButton from "../../../../components/Base/segment-button/index.web.jsx";
import Assets from "../../../../components/Base/assets/index.web.jsx";
import AssetsList from "../../../../components/Base/assets-list/index.web.jsx";
// import List from "../../../../components/Base/list/index.web.js";
// import Icon from "../../../../components/mbank/mbank-public-icon/index.web";

export default class MbankTotalliaBilities extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //负债总资产
      totalassets: "",
      //贷款名称
      totalassetsname: "",
      //借据号
      totalassetsno: "",
      //剩余未还款
      surplusamount: "",
      //贷款金额
      loanamount: "",
      //还款次数
      frequency: "",
      //本月还款金额
      thismonth: "",
      //利率
      interestrate: "",
      list: []
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  componentDidMount() {
    let that = this;
    // 当前余额
    let kyye = "";

    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "我的贷款",
      leftButton: {
        exist: "true",
        closeFlag: "false"
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
        serviceVersion: "1.0.0"
      },
      // 交易上送报文
      data: {}
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        this.setState({
          totalassets: res.rspBody.sumAmt,
          list: res.rspBody.dkResultList
        });
        if (res.rspBody.dkResultList == "") {
          $(this.refs.shou).hide();
        }
      } else {
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

  //跳转至我的资产
  goFinanceEntrust = () => {
    Common.setUrl("totalassets/index.html");
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
    const { list } = this.state;
    let me = this;
    return (
      <div className="register-box">
        <SegmentButton
          title1="我的资产"
          title2="我的负债"
          active2
          onChange1={this.goFinanceEntrust.bind(this)}
        />
        <WhiteSpace size="md" />
        {list == "" ? <NoData text="查询无数据" /> : null}
        <div ref="shou" style={{display:'none'}}>
          {/* <WhiteSpace size="md"/> */}
          <Assets
            title={"负债"}
            money={Common.setMoneyFormat(this.state.totalassets)}
          />

          {list.map(function(item, index) {
            let hkcs = item.doneSeqId + "/" + item.seqId;
            if (item.businessType == "1110") {
              item.businessType = "个人消费";
            } else if (item.businessType == "1110010") {
              item.businessType = "个人一手住房按揭贷款";
            } else if (item.businessType == "1110020") {
              item.businessType = "个人自用汽车消费贷款";
            } else if (item.businessType == "1110030") {
              item.businessType = "个人住房消费贷款";
            } else if (item.businessType == "1110040") {
              item.businessType = "个人住房装修贷款";
            } else if (item.businessType == "1110050") {
              item.businessType = "商业助学贷款";
            } else if (item.businessType == "1110060") {
              item.businessType = "个人综合消费贷款";
            } else if (item.businessType == "1110070") {
              item.businessType = "个人存单质押贷款";
            } else if (item.businessType == "1110080") {
              item.businessType = "个人工资质押贷款";
            } else if (item.businessType == "1110090") {
              item.businessType = "个人小额信用贷款";
            } else if (item.businessType == "1110100") {
              item.businessType = "其他个人消费贷款";
            } else if (item.businessType == "1110120") {
              item.businessType = "易地扶贫搬迁贷款";
            } else if (item.businessType == "1110130") {
              item.businessType = "居易贷个人二手住房抵押贷款";
            } else if (item.businessType == "1110150") {
              item.businessType = "精英贷";
            } else if (item.businessType == "1120") {
              item.businessType = "个人经营";
            } else if (item.businessType == "1120010") {
              item.businessType = "个人商用用房一手房按揭贷款";
            } else if (item.businessType == "1120020") {
              item.businessType = "个人商铺质押贷款";
            } else if (item.businessType == "1120030") {
              item.businessType = "个人商用汽车消费贷款";
            } else if (item.businessType == "1120040") {
              item.businessType = "工程机械类汽车贷款";
            } else if (item.businessType == "1120050") {
              item.businessType = "个人循环贷款";
            } else if (item.businessType == "1120060") {
              item.businessType = "下岗失业小额担保贷款（个人）";
            } else if (item.businessType == "1120070") {
              item.businessType = "个私业主助业贷款";
            } else if (item.businessType == "1120080") {
              item.businessType = "个人小商贷";
            } else if (item.businessType == "1120090") {
              item.businessType = "个人银团贷款";
            } else if (item.businessType == "1120100") {
              item.businessType = "个人存单质押贷款(经营性)";
            } else if (item.businessType == "1120110") {
              item.businessType = "个人工资质押贷款(经营性)";
            } else if (item.businessType == "1120120") {
              item.businessType = "个人小额信用贷款(经营性)";
            } else if (item.businessType == "1120130") {
              item.businessType = "个人其他经营贷款(经营性)";
            } else if (item.businessType == "1120140") {
              item.businessType = "妇女创业小额担保贷款";
            } else if (item.businessType == "1120150") {
              item.businessType = "扶贫小额贷款";
            } else if (item.businessType == "1130") {
              item.businessType = "委托贷款";
            } else if (item.businessType == "1130010") {
              item.businessType = "个人委托贷款";
            } else if (item.businessType == "1130020") {
              item.businessType = "住房公积金委托贷款";
            } else if (item.businessType == "1130030") {
              item.businessType = "代理发放银团贷款";
            } else if (item.businessType == "2") {
              item.businessType = "表外业务";
            } else if (item.businessType == "21") {
              item.businessType = "对公表外业务";
            } else if (item.businessType == "2110") {
              item.businessType = "银行承兑汇票";
            } else if (item.businessType == "2130") {
              item.businessType = "非融资性保函";
            } else if (item.businessType == "3") {
              item.businessType = "额度业务";
            } else if (item.businessType == "3010") {
              item.businessType = "综合授信额度";
            } else if (item.businessType == "3030") {
              item.businessType = "合作方授信";
            } else if (item.businessType == "3030010") {
              item.businessType = "个人房屋合作方项目按揭额度";
            } else if (item.businessType == "3030020") {
              item.businessType = "汽车经销商合作项目按揭额度";
            } else if (item.businessType == "3030030") {
              item.businessType = "个人其他合作项目额度";
            } else if (item.businessType == "3040") {
              item.businessType = "担保公司担保额度";
            } else if (item.businessType == "4") {
              item.businessType = "联保贷款";
            } else if (item.businessType == "1010080") {
              item.businessType = "一般助学贷款";
            } else if (item.businessType == "1020020") {
              item.businessType = "银行承兑汇票转贴现";
            } else if (item.businessType == "2120") {
              item.businessType = "融资性保函";
            } else if (item.businessType == "1110110") {
              item.businessType = "小金额消费项目";
            } else if (item.businessType == "1121") {
              item.businessType = " 垫款";
            } else if (item.businessType == "112110") {
              item.businessType = "银行承兑汇票垫款";
            } else if (item.businessType == "1130040") {
              item.businessType = "自定义贷款方式";
            } else if (item.businessType == "10") {
              item.businessType = "对公业务";
            } else if (item.businessType == "1010") {
              item.businessType = "流动资金贷款";
            } else if (item.businessType == "1010010") {
              item.businessType = "公共企业流动资金贷款";
            } else if (item.businessType == "1010011") {
              item.businessType = "事业单位流动资金贷款";
            } else if (item.businessType == "1010012") {
              item.businessType = "个体户流动资金贷款";
            } else if (item.businessType == "1010013") {
              item.businessType = "工业流动资金贷款";
            } else if (item.businessType == "1010014") {
              item.businessType = "农业流动资金贷款 ";
            } else if (item.businessType == "1010015") {
              item.businessType = "建筑业流动资金贷款 ";
            } else if (item.businessType == "1010016") {
              item.businessType = "商业流动资金贷款";
            } else if (item.businessType == "1010017") {
              item.businessType = "房地产业流动资金贷款";
            } else if (item.businessType == "1010018") {
              item.businessType = "服务业流动资金贷款";
            } else if (item.businessType == "1010019") {
              item.businessType = "其他贷款";
            } else if (item.businessType == "1010030") {
              item.businessType = "对公企业商铺质押贷款";
            } else if (item.businessType == "1010040") {
              item.businessType = "下岗失业小额担保贷款（单位）";
            } else if (item.businessType == "1010050") {
              item.businessType = "流动资金循环贷款";
            } else if (item.businessType == "1010060") {
              item.businessType = "存货质押贷款";
            } else if (item.businessType == "1010070") {
              item.businessType = "垫款";
            } else if (item.businessType == "1020") {
              item.businessType = "银行承兑汇票";
            } else if (item.businessType == "1020010") {
              item.businessType = "银行承兑汇票贴现";
            } else if (item.businessType == "1025") {
              item.businessType = "房地产开发贷款";
            } else if (item.businessType == "1030") {
              item.businessType = "固定资产贷款";
            } else if (item.businessType == "1030010") {
              item.businessType = " 基本建设贷款";
            } else if (item.businessType == "1030020") {
              item.businessType = "技术改造贷款";
            } else if (item.businessType == "1030025") {
              item.businessType = "土地储备贷款";
            } else if (item.businessType == "1030030") {
              item.businessType = "固定资产购置贷款";
            } else if (item.businessType == "1060010") {
              item.businessType = "银团基本建设贷款";
            } else if (item.businessType == "1060020") {
              item.businessType = "单位银团贷款";
            } else if (item.businessType == "1060030") {
              item.businessType = "银团其他贷款";
            } else if (item.businessType == "1070") {
              item.businessType = "公司委托贷款";
            }
            return (
              <AssetsList
                key={index}
                hkr="下期还款日"
                riqi={item.maturityDate}
                xqdate="贷款到期日"
                hkrq={item.defaultDueDay}
                mag="mgtop"
                show="1"
                label={item.businessType}
                nlv="年利率"
                lv={Number(item.businessRate).toString() + "%"}
                byhk="下期还款额"
                byhkje={Common.setMoneyFormat(item.nextAmt)}
                name="fuzhaiico"
                hkcs="已还期次"
                hkcsje={hkcs}
                dk="贷款总金额"
                dkje={Common.setMoneyFormat(item.businessSum)}
                nametite="fuzhai"
                sywh="剩余未还金额"
                sywhje={Common.setMoneyFormat(item.balance)}
                title="我的贷款"
                money={item.bdSerialno}
              />
            );
          })}
          <WhiteSpace size="md" />
        </div>
      </div>
    );
  }
}
