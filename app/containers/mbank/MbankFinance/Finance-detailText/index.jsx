//API数据接口
import API from "../../../../constants/api";
//公共方法
import $native from "../../../../native/native";
import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import Common from "../../../../util/common.jsx";
import $Fetch from "./../../../../fetch/fetch.js";
//基础组件
import WhiteSpace from "../../../../components/Base/white-space/index.web.jsx";
//业务组件
import MbankPublicTextDetail from "../../../../components/mbank/mbank-pubilc-text-detail/index.web.jsx";
//PDF插件
// import { Document, Page } from 'react-pdf/build/entry.webpack';
import PDF from "react-pdf-js";

export default class MbankFinanceDetailText extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "",
      httpUrl: "",
      numPages: null,
      pageNumber: 1
    };
    // 性能优化 （当数据重复时不做DOM渲染）
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }

  getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
  }

  //跳转至持有页面
  goback = () => {
    let gobackId;
    //获取当前页url
    gobackId = window.location.search.substring(1);
    let prdId = this.getUrl("prdId");
    let isBuy = this.getUrl("isBuy");
    let isSub = this.getUrl("isSub");
    let enterFlag = this.getUrl("enterFlag");

    if (gobackId == "input") {
      Common.setUrl("finance-input/index.html");
    } else {
      Common.setUrl(
        "finance-detail/index.html?" +
          "prdId=" +
          prdId +
          "&isBuy=" +
          isBuy +
          "&isSub=" +
          isSub +
          "&enterFlag=" +
          enterFlag
      );
    }
  };

  //添加回调函数
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  componentDidMount() {
    let that = this;

    $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
      title: this.state.docName,
      leftButton: {
        exist: "true",
        closeFlag: "false",
        success: this.goback
      }
    });

    let file = JSON.parse(
      Common.getSessionData(API.SESSION_FINANCE_PRODUCT_PROTOCOL)
    );

    //理财说明书内容查询
    $Fetch(
      API.API_FINANCIAL_GET_INSTRUCTIONS,
      {
        //默认固定上送报文
        reqHead: {
          //场景编码
          sceneCode: "FA15",
          //步骤编码(根据相应步骤填写字段（1,2,3,4）)
          stepCode: "1",
          //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
          tradeType: "1",
          //交易标识 1-主，2-副
          flag: "1",
          //服务接口版本号 1.0.0
          serviceVersion: "1.0.0"
        },
        //上送数据
        data: {
          fileName: file.docUrl
        }
      },
      true,
      false
    ).then(res => {
      this.setState({
        httpUrl: res.rspBody.httpUrl
      });
      // document.getElementById('showHtml').innerHTML = res.rspBody.content;
    });
  }
  // PDF翻页
  //   onDocumentComplete = (pages) => {
  //     this.setState({ page: 1, pages });
  //   }

  //   handlePrevious = () => {
  //     this.setState({ page: this.state.page - 1 });
  //   }

  //   handleNext = () => {
  //     this.setState({ page: this.state.page + 1 });
  //   }

  //   renderPagination = (page, pages) => {
  //     let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
  //     if (page === 1) {
  //       previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
  //     }
  //     let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
  //     if (page === pages) {
  //       nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
  //     }
  //     return (
  //       <nav>
  //         <ul className="pager">
  //           {previousButton}
  //           {nextButton}
  //         </ul>
  //       </nav>
  //       );
  //   }
  render() {
    const { pageNumber, numPages } = this.state;
    let that = this.state;
    // PDF翻页
    // let pagination = null;
    // if (this.state.pages) {
    //   pagination = this.renderPagination(this.state.page, this.state.pages);
    // }
    return (
      <div>
        <WhiteSpace size="sm" />
        {/* <MbankPublicTextDetail title={that.fileTitle} content={<div id='showHtml'></div>} authore="凉山州商业银行" /> */}

        <div className="pdf">
          <PDF
            className="custom-classname-document"
            file={that.httpUrl}
            // onDocumentComplete={this.onDocumentComplete}
            // onPageComplete={this.onPageComplete}
            // page={pageNumber}
          />
          {/* <Document
                        className="custom-classname-document"
                        // file="http://172.26.2.241:8801/pdf/servicefee.pdf"
                        file={that.httpUrl}
                        onLoadSuccess={this.onDocumentLoad}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document> */}
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}
