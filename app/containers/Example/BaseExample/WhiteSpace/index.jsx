import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import Whitespace from '../../../../../app/components/Base/white-space/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化（当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Button type="primary">确定</Button>
                <Whitespace size="xs"></Whitespace>
                <Button type="primary">确定</Button>
                <Whitespace size="sm"></Whitespace>
                <Button type="primary">确定</Button>
                <Whitespace size="md"></Whitespace>
                <Button type="primary">确定</Button>
                <Whitespace size="lg"></Whitespace>
                <Button type="primary">确定</Button>
                <Whitespace size="xl"></Whitespace>
                <Button type="primary">确定</Button>
                <Whitespace size="xxl"></Whitespace>
                <Button type="primary">确定</Button>
            </div>
        )
    }
}

