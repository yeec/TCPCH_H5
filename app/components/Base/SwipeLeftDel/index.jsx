import React, { Component, PropTypes } from 'react'
import './style/index.css'
import PubSub from 'pubsub-js'
import Common from "../Common"

class SwipeLeftDel extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        let me = this;
        this.changeFunctionStateUseFlag = "";
        // 公共响应事件
        // 当事件被响应，将侧滑、点击事件替换为调用来源组件的监听事件
        PubSub.subscribe('muip000017_swipe_start', (option, flag) => {
            if(me.refs !== undefined){
                me.onChangeFunction(flag, "start")
            }
        });
        // 公共响应事件
        // 当事件被相应，将侧滑、点击事件还原
        PubSub.subscribe('muip000017_swipe_end', (option, flag) => {
            if(me.refs !== undefined){
                me.onChangeFunction(flag, "end")
            }
        });
        // 组件私有事件
        PubSub.subscribe('muip000017_swipe' + this.props.itemKey, (option, flag) => {
            // 将滑动状态还原
            if(me.refs["SwipeLeftDel-container-div" + flag]){
                me.refs["SwipeLeftDel-container-div" + flag].style.transition = "all 0.2s";
                me.refs["SwipeLeftDel-container-div" + flag].style.WebkitTransform = "translateX(" + 0 + "px)";
                // 调用end事件，将所有组件还原
                PubSub.publishSync('muip000017_swipe_end', flag);
            }
        });
    }
    onChangeFunction(flag, state){
        if(state === "start"){
            // 将点击、滑动事件替换为PubSub.publishSync('BMOSOA0101_GoRight'+this.props.groupId, flag);
            this.changeFunctionStateUseFlag = flag
        }else if(state === "end"){
            // 事件还原
            this.changeFunctionStateUseFlag = ""
        }else{
            console.error("参数错误")
        }
    }
    // componentClickAway(){
    //     let obj = this.refs["SwipeLeftDel-container-div" + this.props.itemKey];
    //     obj.style.transition = "all 0.2s";
    //     let objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
    //     obj.style.WebkitTransform = "translateX(" + 0 + "px)";
    //     objX = 0;
    //     PubSub.publishSync('muip000017_swipe_end', this.props.itemKey);
    // }
    touchStartHandle(event){
        // console.log("touchStartHandle");
        this.touchStartTag = false;
        let me = this;
        let touchCount = 0;
        // let initX; //触摸位置
        let initY;
        let moveX;//滑动时的位置
        let moveY;
        let X = 0;//移动距离
        let Y = 0;
        let objX = 0;//目标对象位置
        // let objY = 0;
        if(this.changeFunctionStateUseFlag === ""){
            this.refs["SwipeLeftDel-container-div" + this.props.itemKey].style.transition = "all 0.1s";
            //event.preventDefault();//取消事件的默认行为，IE不支持这个写法,preventDefault是阻止默认行为，touch事件的默认行为就是滚动。
            let obj = this.refs["SwipeLeftDel-container-div" + this.props.itemKey];//event.touches[0].target.parentNode;
            // console.log(event.touches[0]);//特定于事件目标的Touch对象的数组.
            this.initX = event.touches[0].pageX;//特定于事件目标的Touch对象的数组。pageX：触摸目标在页面中的x坐标。
            // console.log(this.initX);
            initY = event.touches[0].pageY;
            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
            // objY = (obj.style.WebkitTransform.replace(/translateY\(/g, "").replace(/px\)/g, "")) * 1;
            if (objX === 0) {
                obj.addEventListener('touchmove', function(event1) {//当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
                    console.log("touchmove")
                    moveX = event1.targetTouches[0].pageX;//touches数组对象获得屏幕上所有的touch，取第一个touch
                    moveY = event1.targetTouches[0].pageY;//touches数组对象获得屏幕上所有的touch，取第一个touch
                    X = moveX - me.initX;
                    Y = moveY - initY;
                    if(touchCount === 0){
                        if(Math.abs(Y) / Math.abs(X) >= 1){
                            me.touchStartTag = true;
                        }else{
                            me.touchStartTag = false;
                        }
                    }
                    touchCount++;
                    let l = Math.abs(X);//如果参数是非负数，则返回该参数，如果参数是负数，则返回该参数的相反数
                    if(me.touchStartTag === undefined || me.touchStartTag === false){
                        if (X >= 0) {
                            if(l > 60){
                                obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                            }
                        } else if (X < 0) {
                            if (l > 60) {
                            l = 60;
                            obj.style.WebkitTransform = "translateX(" + -l + "px)";
                            }
                        }
                    }
                });
            }
        }else{
            this.touchStartTag = true;
            PubSub.publishSync('muip000017_swipe' + this.changeFunctionStateUseFlag, this.changeFunctionStateUseFlag);
        }
    }
    touchEndHandle(){
        // console.log("touchEndHandle--")
        let obj = this.refs["SwipeLeftDel-container-div" + this.props.itemKey];
        obj.style.transition = "all 0.2s";
        let objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        if (objX > -30) {
            obj.style.WebkitTransform = "translateX(" + 0 + "px)";
            objX = 0;
            PubSub.publishSync('muip000017_swipe_end', this.props.itemKey);
        } else {
            obj.style.WebkitTransform = "translateX(" + -0.5 + "rem)";
            objX = -60;
            PubSub.publishSync('muip000017_swipe_start', this.props.itemKey);
        }
        this.touchStartTag = false;
    }
    clickDel(){
        let that = this;
        let delcallback = function(flag){
            if(flag === "1"){
                that.props.delFunc(that.props.shopid);
                that.touchStartTag = true;
                PubSub.publishSync('muip000017_swipe' + that.changeFunctionStateUseFlag, that.changeFunctionStateUseFlag);
            }
        }
        Common.showDialogConfirm("确定申请注销商户吗？", delcallback);
    }
    render(){
        let me = this;
        let refName = "SwipeLeftDel-container-div" + this.props.itemKey;
        return (
            <div style={{overflow: "hidden", position: "relative"}} id={"swipeleftdel" + this.props.itemKey} className={me.props.className}>
                <div ref={refName} className="SwipeLeftDel1-container-div" onTouchStart={this.touchStartHandle.bind(this)} onTouchEnd={this.touchEndHandle.bind(this)}>
                    {me.props.children}
                </div>
                <div ref="SwipeLeftDel-container-item" className="SwipeLeftDel1-item-div-outer" onClick={me.clickDel.bind(me)}>
                    <div className="SwipeLeftDel1-item-div" ref="SwipeLeftDel-item-div" >删除</div>
                </div>
            </div>
        )
    }
}
SwipeLeftDel.propTypes = {
    delFunc: PropTypes.any,
    itemKey: PropTypes.number,
    shopid: PropTypes.string
};

SwipeLeftDel.defaultProps = {
    delFunc: null,
    itemKey: 0,
    shopid: ""
};

SwipeLeftDel.displayName = 'SwipeLeftDel';
export default SwipeLeftDel
