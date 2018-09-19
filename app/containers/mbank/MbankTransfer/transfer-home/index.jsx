import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
// import { hashHistory } from 'react-router'
//公共方法
import $Fetch from "./../../../../fetch/fetch.js";
import $native from "../../../../native/native";
import Common from "../../../../util/common.jsx";
//API数据接口
import API from "../../../../constants/api";
//基础组件
import NoData from "../../../../components/Base/no-data/index.web.jsx";
import WhiteSpace from '../../../../components/Base/white-space/index.web.jsx';
import WingBlank from '../../../../components/Base/wing-blank/index.web.jsx';
// import MbankTransferPeople from '../../../../components/mbank/mbank-public-list/mbank-pubilc-list-transfer-people/index.web.jsx'
//业务组件
import MbankTransferWay from "./mbank-transfer-way/index.web.jsx";
import MbankTransferRecent from "./mbank-transfer-recent/index.web.jsx";

import "./mbank-transfer-recent/style/index.web";

export default class Transfer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [],
      returnCode: ""
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }

  componentDidMount() {
    let that = this;
    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: "转账 ",
      leftButton: {
        exist: "true",
        closeFlag: "false"
      }
    });

    //返回首页
    $native.callClientForUI(API.NATIVE_CODE_SHOW_BACK_BUTTON, {});

    $Fetch(API.API_GET_TRANSFER_LIST, {
      //API_GET_RECENT_TRANSFER获取最近转账列表

      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF01",
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
      data: {}
    }).then(res => {
      // 判断返回结果
      if (Common.returnResult(res.rspHead.returnCode)) {
        that.setState({
          list: res.rspBody.resultList,
          returnCode: res.rspHead.returnCode
        });
      }
    });
  }

  // 收款人列表的转账点击
  goTransfer = val => {
    Common.addSessionData(
      API.SESSION_TRANSFER_USER_DATA,
      JSON.stringify(val.info)
    );
    Common.setUrl("transfer-businessInput/index.html");
    // hashHistory.push('/transfer-businessInput')
  };

  render() {
    let transferList = this.state.list;
    return (
      <div>
        <MbankTransferWay />
        <WhiteSpace size="sm" />
        <div className="mbank-transfer-recent mbank-transfer-recent">
          <div className="mbank-transfer-recent-header">最近转账伙伴</div>
        </div>
        {/* <MbankTransferPeople showAdd={false}  selectok={this.goTransfer.bind(this)}/> */}
        {transferList.length > 0 ? (
          <div>
            <MbankTransferRecent list={transferList} />
          </div>
        ) : (
          <NoData text="暂无收款人记录" />
        )}
      </div>
    );
  }
}
