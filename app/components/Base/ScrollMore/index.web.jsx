/*
 * @ryt
 * @name ScrollMore
 * @param loadMoreData <function> 当瀑布流上拉后回调函数，一般方法内定义数据加载相关逻辑
 * @param isAll <boolean> 数据是否加载完毕表示
 * @param style 样式设定，使用普遍流必须设置瀑布流height样式
 * @desc 实现瀑布流功能，向上拖动加载更多
 */
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Swiper from 'swiper'
import './style/swiper.css'
import './style/index.web';

class ScrollMore extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let that = this;
        that.swiperObj = new Swiper(that.refs["swiper-container"], {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            onTouchMove: that.onScroll.bind(this),
            onTransitionEnd: that.onScrollEnd.bind(this)
        });
        window.swiperO = that.swiperObj;
    }
    componentDidUpdate() {
        this.onRefresh();
        this.swiperObj.updateSlidesSize();
    }
    onRefresh() {
        let pullUp = this.refs["ryt-scrollmore-pullup"];
        let pullUpLabel = this.refs["ryt-scrollmore-pullup-label"];
        if (this.props.isAll) {
            pullUp.className = '';
            pullUpLabel.innerHTML = this.props.loadAllText;
        } else {
            if (pullUp.className.match('loadMore')) {
                pullUp.className = '';
                pullUpLabel.innerHTML = this.props.waitingText;
            }
        }
    }
    onScroll(swiper, event) {
        let that = this;
        let pullUp = that.refs["ryt-scrollmore-pullup"];
        let pullUpLabel = that.refs["ryt-scrollmore-pullup-label"];
        if (!that.props.isAll) {
            if (-swiper.translate > (swiper.virtualSize - swiper.size + that.props.scrollHeight) && !pullUp.className.match('flip')) {
                pullUp.className = 'flip'
                pullUpLabel.innerHTML = that.props.readyText;
            } else if (-swiper.translate < (swiper.virtualSize - swiper.size + that.props.scrollHeight) && pullUp.className.match('flip')) {
                pullUp.className = '';
                pullUpLabel.innerHTML = that.props.waitingText;
            }
        }
        swiper.update();
    }
    onScrollEnd(swiper, event) {
        let pullUp = this.refs["ryt-scrollmore-pullup"];
        let pullUpLabel = this.refs["ryt-scrollmore-pullup-label"];
        if (!this.props.isAll) {
            if (pullUp.className.match('flip')) {
                pullUp.className = 'loadMore';
                pullUpLabel.innerHTML = '<div class="ryt-scrollmore-pullup-label-load"></div>' + '<div >' + this.props.loadingText + '</div>';
                this.props.loadMoreData();
            }
        }
    }
    render() {
        let classname = classnames(
            this.props.className,
            "swiper-container",
            "swiper-container-vertical",
            "swiper-container-free-mode"
        );
        let label = this.props.waitingText;
        if (this.props.isAll) {
            label = this.props.loadAllText;
        }
        return (
            <div style={this.props.style} className={classname} ref="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide swiper-slide-active">
                        {this.props.children}
                        <div ref="ryt-scrollmore-pullup" >
                            <div ref="ryt-scrollmore-pullup-label" className="ryt-scrollmore-pullup-label">{label}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ScrollMore.propTypes = {
    scrollHeight: React.PropTypes.number,
    loadingText: React.PropTypes.string,
    waitingText: React.PropTypes.string,
    readyText: React.PropTypes.string,
    loadAllText: React.PropTypes.string,
    loadMoreData: React.PropTypes.func,
    isAll: React.PropTypes.bool,
    className: React.PropTypes.string,
    children: React.PropTypes.any,
    style: React.PropTypes.object
};

ScrollMore.defaultProps = {
    scrollHeight: 50,
    loadingText: "加载中",
    waitingText: "上拉加载更多",
    readyText: "松手开始加载",
    loadAllText: "已加载全部数据",
    loadMoreData: function () { },
    isAll: false,
    className: '',
    style: {}
};

ScrollMore.displayName = 'ScrollMore';

export default ScrollMore;
