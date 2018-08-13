import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    onTapHandle = (arg) => {
        return () => {
            alert(arg);
        }
    }
    render() {

       // const formatMessage = this.props.intl.formatMessage;
        return (
            <div >
                <p>默认</p>
                <Button onTap={this.onTapHandle('primary')} type="primary"> 默认</Button>
                <Button onTap={this.onTapHandle('primary')} type="primary" active> 点击</Button>
                <Button onTap={this.onTapHandle('primary')} type="primary" disabled> 不可用</Button>
                <p>幽灵</p>
                <Button onTap={this.onTapHandle('ghost')} type="ghost"> 默认</Button>
                <Button onTap={this.onTapHandle('ghost')} type="ghost" active> 点击</Button>
                <Button onTap={this.onTapHandle('ghost')} type="ghost" disabled>不可用</Button>
                <p>警告</p>
                <Button onTap={this.onTapHandle('warning')} type="warning"> warning</Button>
                <Button onTap={this.onTapHandle('warning')} type="warning" active> warning</Button>
                <Button onTap={this.onTapHandle('warning')} type="warning" disabled> warning disabled</Button>
                <p>默认小按钮</p>
                <div>
                    <Button size="small" type="primary" inline>默认</Button>
                    <Button size="small" type="primary" inline active>点击</Button>
                    <Button size="small" type="primary" inline disabled> 不可用</Button>
                </div>
                <p>幽灵小按钮</p>
                <div>
                    <Button size="small" type="ghost" inline>默认</Button>
                    <Button size="small" type="ghost" inline active>点击</Button>
                    <Button size="small" type="ghost" inline disabled> 不可用</Button>
                </div>
                <p>警告小按钮</p>
                <div>
                    <Button size="small" type="warning" inline>默认</Button>
                    <Button size="small" type="warning" inline active>点击</Button>
                    <Button size="small" type="warning" inline disabled> 不可用</Button>
                </div>
                <p>按钮组-竖排</p>
                <Button.Group >
                    <Button type="primary">默认</Button>
                    <Button type="ghost">默认</Button>
                    <Button type="warning">默认</Button>
                </Button.Group>
                <p>按钮组-横排</p>
                <Button.Group horizon>
                    <Button type="primary">默认</Button>
                    <Button type="ghost">默认</Button>
                    <Button type="warning">默认</Button>
                </Button.Group>
            </div>
        )
    }
}

