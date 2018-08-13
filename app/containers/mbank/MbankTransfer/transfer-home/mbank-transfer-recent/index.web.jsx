import React from "react";
// import {hashHistory} from 'react-router'
import $ from "jquery";
//公共方法
import PureRenderHoc from "../../../../../util/hoc/index";
import Common from "../../../../../util/common.jsx";
import $Fetch from "../../../../../fetch/fetch.js";
//业务组件
import MbankAccountIcon from "./../../../../../../app/components/mbank/mbank-public-icon/index.web.jsx";
//API数据接口
import API from "./../../../../../../app/constants/api";

import "./style/index.web";

class MbankTransferRecent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      List: this.props.list,
      noDataBox: { display: "none" },
      dataBox: { display: "block" },
      fages: ""
    };
  }
  componentDidMount() {
    $Fetch(API.API_SAVE_PAYEE_QUERYREAL, {
      //默认固定上送报文
      reqHead: {
        //场景编码
        sceneCode: "TF02",
        //步骤编码(根据相应步骤填写字段（1,2,3,4）)
        stepCode: "1",
        //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
        tradeType: "1",
        //交易标识 1-主，2-副
        flag: "2",
        //服务接口版本号 1.0.0
        serviceVersion: "1.0.0"
      },
      data: {
        path: "HVPS"
      }
    }).then(res => {
      if (Common.returnResult(res.rspHead.returnCode)) {
        this.setState({
          fages: res.rspBody.flag
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let that = this;

    if (nextProps.list.length < 1) {
      that.setState({
        name: nextProps.name,
        List: nextProps.list,
        noDataBox: { display: "block" },
        dataBox: { display: "none" }
      });
    } else {
      that.setState({
        name: nextProps.name,
        List: nextProps.list,
        noDataBox: { display: "none" },
        dataBox: { display: "block" }
      });
    }
  }

  showOwnAccount(e) {
    let that = this;
    if (
      $(e.currentTarget)
        .find(".ryt-icon-xxs")
        .attr("class") === "ryt-icon ryt-icon-xxs ryt-icon-arrow-dn"
    ) {
      $(e.currentTarget)
        .find(".ryt-icon-xxs")
        .attr("class", "ryt-icon ryt-icon-xxs ryt-icon-arrow-up");
      $(e.currentTarget)
        .next()
        .css("display", "block");
    } else {
      $(e.currentTarget)
        .find(".ryt-icon-xxs")
        .attr("class", "ryt-icon ryt-icon-xxs ryt-icon-arrow-dn");
      $(e.currentTarget)
        .next()
        .css("display", "none");
    }
  }

  MbankTransferList() {
    Common.setUrl("transfer-userQuery/index.html");
    // hashHistory.push('/transfer-userQuery')
  }

  // 收款人列表的转账点击
  goTransfer = val => {
    //转账结果界面跳转传值

    Common.removeSessionData(API.SESSION_TRANSFER_RESULTCALLBACK);
    Common.removeSessionData(API.SESSION_TRANSFER_USER_TONGDAO);
    Common.addSessionData(API.SESSION_TRANSFER_RESULTCALLBACK, "transferMain");
    Common.addSessionData(API.SESSION_TRANSFER_USER_DATA, JSON.stringify(val));
    Common.addSessionData(API.SESSION_TRANSFER_USER_TONGDAO, this.state.fages);
    Common.setUrl("transfer-businessInput/index.html");
    // hashHistory.push('/transfer-businessInput')
  };

  render() {
    const { props } = this;

    let { list, transferList, name, onClick } = props;

    let that = this;
    //联行号
    let unionBankNo = "";
    //行名
    let pmsBankName = "";

    //
    // let all = list.map(function (item, i) {
    //
    //
    //
    //
    //     if (item.list.length >= 2) {
    //
    //         let ownAccount = item.list.map(function (item, i) {
    //
    //             // 银行名称对应图标
    //             let bankIcon = 'bank';
    //             let bankNum = item.unionBankNo == '313684093748' ? '313684093748' : item.unionBankNo.substring(0, 3);
    //             let arr = [313684093748, 102, 103, 104, 105, 308, 307, 301, 302, 309, 303, 305, 403];
    //             for (let val of arr) {
    //                 if (Number(bankNum) === val) {
    //                     bankIcon = 'logo-' + bankNum;
    //                     break;
    //                 }
    //             }
    //             return <p key={i} onClick={that.goTransfer.bind(this, item)}><MbankAccountIcon size="l"
    //                 name={bankIcon} /><span
    //                 >{item.unionBankName}({Common.setPhoneNumFour(item.accNo)})</span>
    //             </p>
    //         });
    //
    //         return (
    //             <div className="mbank-transfer-recent-body" key={i}>
    //                 <div className="mbank-transfer-recent-item mbank-transfer-recent-item-middle"
    //                     onClick={that.showOwnAccount.bind(that)}>
    //                     <div className="mbank-transfer-recent-line mbank-transfer-recent-line-multiple">
    //                         <div className="mbank-transfer-recent-thumb">
    //                             <MbankAccountIcon size="l" name={"benren"} />
    //                         </div>
    //                         <div className="mbank-transfer-recent-content">
    //                             {item.name}
    //                         </div>
    //                         <div ref="icon" className="ryt-icon ryt-icon-xxs ryt-icon-arrow-dn"></div>
    //                     </div>
    //                 </div>
    //                 <div className="mbank-transfer-recent-item mbank-transfer-recent-item-middle showDiv">
    //                     <div className="mbank-transfer-recent-line mbank-transfer-recent-line-multiple">
    //                         <div className="mbank-transfer-recent-content">
    //                             <div className="mbank-transfer-recent-list-info">{ownAccount}</div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //
    //
    //             // 银行名称对应图标
    //             let bankIcon = 'bank';
    //             let bankNum = item.list[0].unionBankNo == '313684093748' ? '313684093748' : item.list[0].unionBankNo.substring(0, 3);
    //             let arr = [313684093748, 102, 103, 104, 105, 308, 307, 301, 302, 309, 303, 305, 403];
    //             for (let val of arr) {
    //                 if (Number(bankNum) === val) {
    //                     bankIcon = 'logo-' + bankNum;
    //                     break;
    //                 }
    //             }
    //
    //         return (
    //             <div className="mbank-transfer-recent-body" key={i}>
    //                 <div className="mbank-transfer-recent-item mbank-transfer-recent-item-middle">
    //                     <div className="mbank-transfer-recent-line mbank-transfer-recent-line-multiple">
    //                         <div className="mbank-transfer-recent-thumb">
    //                             <MbankAccountIcon size="l" name={bankIcon} />
    //                         </div>
    //                         <div className="mbank-transfer-recent-content" onClick={that.goTransfer.bind(this, item.list[0])} >
    //                             {item.name}
    //                             <div
    //                                 className="mbank-transfer-recent-brief">{item.list[0].unionBankName}<span> 尾号{Common.setPhoneNumFour(item.list[0].accNo)}</span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    // });

    let all = list.map(function(item, i) {
      {
        //二代支付行名

        pmsBankName = item.pmsBankName;
        //二代支付行号
        unionBankNo = item.pmsBankNo;
        if (Common.judgeEmpty(unionBankNo)) {
          unionBankNo = item.unionBankNo;
          pmsBankName = item.unionBankName;
        }
        // 银行名称对应图标
        let bankIcon = "bank";
        let bankNum =
          unionBankNo == "313684093748"
            ? "313684093748"
            : unionBankNo.substring(0, 3);
        let arr = [
          313684093748,
          102,
          103,
          104,
          105,
          308,
          307,
          301,
          302,
          309,
          303,
          305,
          403
        ];
        // for (let val of arr) {
        //     if (Number(bankNum) === val) {
        //         bankIcon = 'logo-' + bankNum;
        //         break;
        //     }
        // }
        for (let i = 0; i < arr.length; i++) {
          let checkNum = arr[i];

          if (Number(bankNum) === checkNum) {
            bankIcon = "logo-" + bankNum;
            break;
          }
        }

        return (
          <div className="mbank-transfer-recent-body" key={i}>
            <div className="mbank-transfer-recent-item mbank-transfer-recent-item-middle">
              <div className="mbank-transfer-recent-line mbank-transfer-recent-line-multiple">
                <div className="mbank-transfer-recent-thumb">
                  <MbankAccountIcon size="l" name={bankIcon} />
                </div>
                <div
                  className="mbank-transfer-recent-content"
                  onClick={that.goTransfer.bind(this, item)}
                >
                  {item.accName}
                  <div className="mbank-transfer-recent-brief">
                    {pmsBankName}<span>({Common.setAccountNumForSpace(item.accNo)})</span>
                  </div>
                  {/* <div className="mbank-transfer-recent-brief">
                    <span></span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    return (
      <div className="mbank-transfer-recent mbank-transfer-recent">
        <div className="mbank-transfer-recent-body">{all}</div>
      </div>
    );
  }
}

MbankTransferRecent.propTypes = {
  list: React.PropTypes.array
};

MbankTransferRecent.defaultProps = {
  list: []
};

export default PureRenderHoc(MbankTransferRecent);
