import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Navigator from '../../../../../app/components/Base/navigator/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    render() {
        return (
            <div >


                <h2><span>Navigator 导航栏</span></h2>
                <div>
                    <Navigator>默认</Navigator>
                    <br/>
                    <Navigator type="light">light</Navigator>
                    <br/>
                    <Navigator type="dark">dark</Navigator>
                    <br/>
                    <Navigator back>有返回</Navigator>
                    <br/>
                    <Navigator leftText="左边文字" leftIcon="back" rightText="右边文字"
                               rightIcon="right-arrow-light">文字+图标</Navigator>
                    <br/>
                    <Navigator back rightTap={()=> {
                        alert("右边")
                    }} leftTap={()=> {
                        alert('点点点')
                    }}>点左边试试</Navigator>
                </div>

                <br/>
                <Navigator back leftTap={()=> {
                    alert('点点点')
                }} rightTap={()=> {
                    alert("右边")
                }}>

                    <span style={{color: 'yellow'}}>自定义</span>
                </Navigator>
            </div>
        )
    }
}

