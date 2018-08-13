import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//API数据接口
import API from './../../../../../constants/api';
//基础组件
import WhiteSpace from '../../../../../components/Base/white-space/index.web.jsx';
import CardNewsDetail from '../../../../../components/Base/card-news-detail/index.web.jsx';
//公共方法
import Common from "../../../../../util/common.jsx";
import $native from './../../../../../native/native';

export default class newsDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Detail:{}
        }
    }
    // 初始化设置
    componentDidMount() {
        // 定义获取新闻列表传递的ID
        // 设置native topbar 标题及是否返回
        $native.callClientForUI(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '新闻资讯',
            leftButton: {
                exist: 'true',
                closeFlag: 'false',
                success: this.goBackPage
            }
        });
        let NewsDate = JSON.parse(Common.getSessionData(API.SESSION_JOURNALISM_INFO));
        document.getElementById('showHtml').innerHTML = NewsDate.content;
        this.setState({
          Detail:NewsDate
        })
    }
    // 返回页面
    goBackPage() {
        Common.setUrl("public-newsList/index.html");
    }
   render() {
        return (
            <div>
                <WhiteSpace size="sm" />
                <CardNewsDetail title={this.state.Detail.title} date={this.state.Detail.createtime}  content={<div id='showHtml'></div>} authore={this.state.Detail.NewsAuthore} />
            </div>
        )
    }

}
