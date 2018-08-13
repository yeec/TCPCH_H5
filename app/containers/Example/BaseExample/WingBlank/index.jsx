import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import WingBlank from '../../../../../app/components/Base/wing-blank/index.web.jsx';
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
                <p>左右间距 - 小</p>
                <WingBlank size="sm"><Button type="primary">确定</Button></WingBlank>
                <p>左右间距 - 中</p>
                <WingBlank size="md"><Button type="primary">确定</Button></WingBlank>
                <p>左右间距 - 大</p>
                <WingBlank size="lg"><Button type="primary">确定</Button></WingBlank>
            </div>
        )
    }
}

