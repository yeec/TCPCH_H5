import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import ListWord from '../../../../../app/components/Base/list-word/index.web.js';
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
            <div>
                <ListWord.Group header="这是个列表List">
                    <ListWord single={true} content="银行是金融机构之一，银行按类型分为：中央银行，政策性银行，商业银行，投资银行，世界银行，它们的职责各不相同"/>
                    <ListWord content="银行是金融机构之一，银行按类型分为：中央银行，政策性银行，商业银行，投资银行，世界银行，它们的职责各不相同"/>
                    <ListWord type="top" multiple description="实例文本" content="银行是金融机构之一，银行按类型分为：中央银行，政策性银行，商业银行，投资银行，世界银行，它们的职责各不相同"/>
                    <ListWord arrow content="银行是金融机构之一，银行按类型分为：中央银行，政策性银行，商业银行，投资银行，世界银行，它们的职责各不相同"/>
                </ListWord.Group>
            </div>
        )
    }
}

