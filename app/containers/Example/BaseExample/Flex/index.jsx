import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import Flex from '../../../../../app/components/Base/flex/index.web.jsx';
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

                <p>横向</p>
                <Flex>
                    <Button>2个</Button>
                    <Button>2个</Button>
                </Flex>

                <p>纵向</p>
                <Flex direction="column">
                    <Button>2个</Button>
                    <Button>2个</Button>
                </Flex>

                <p>不同大小</p>
                    <Flex>
                        <Flex.Item size={3}><Button>2个</Button></Flex.Item>
                        <Flex.Item><Button>2个</Button></Flex.Item>
                    </Flex>
                    <p>某个flex固定大小</p>
                    <Flex>
                        <Flex.Item style={{width:70}}><Button>2个</Button></Flex.Item>
                        <Flex.Item><Button>3个</Button></Flex.Item>
                        <Flex.Item><Button>3个</Button></Flex.Item>
                    </Flex>
                    <p>不换行</p>
                    <Flex>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                    </Flex>
                    <p>换行</p>
                    <Flex wrap="wrap">
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                        <Button size="small">2个</Button>
                    </Flex>

                <p>主轴对齐</p>
                    <p>左对齐</p>
                    <Flex>
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                    </Flex>
                    <p>end 右对齐</p>
                    <Flex justify="end">
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                    </Flex>
                    <p>center 居中</p>
                    <Flex justify="center">
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                    </Flex>
                    <p>between 两端对齐</p>
                    <Flex justify="between">
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                    </Flex>
                    <p>around 间隔对齐</p>
                    <Flex justify="around">
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                        <Button size="small" style={{margin:0}}>2个</Button>
                    </Flex>
                    <p>交叉轴对齐</p>
                        <p>start(默认): 交叉轴起点对齐</p>
                        <Flex>
                            <Button style={{margin:0}}>2个</Button>
                            <Button size="small" style={{margin:0}}>2个</Button>
                        </Flex>
                        <p>end: 交叉轴终点对齐</p>
                        <Flex align="end">
                            <Button style={{margin:0}}>2个</Button>
                            <Button size="small" style={{margin:0}}>2个</Button>
                        </Flex>
                        <p>center: 交叉轴中点对齐</p>
                        <Flex align="center">
                            <Button style={{margin:0}}>2个</Button>
                            <Button size="small" style={{margin:0}}>2个</Button>
                        </Flex>
                        <p>baseline: 第一行文字基线</p>
                        <Flex align="baseline">
                            <Button style={{margin:0}}>2个</Button>
                            <Button size="small" style={{margin:0}}>2个</Button>
                        </Flex>
                        <p>stretch: 拉伸对齐</p>
                        <Flex align="stretch">
                            <Button style={{margin:0}}>2个</Button>
                            <Button size="small" style={{margin:0}}>2个</Button>
                        </Flex>
            </div>
        )
    }
}

