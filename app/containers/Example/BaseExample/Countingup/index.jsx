import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Countingup from '../../../../../app/components/Base/counting-up/index.web.js';
import 'echarts/lib/chart/bar';
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
                <p>金额滚动</p>
                <Countingup end={500.00} prefix="¥ " suffix=" 元" useGrouping={false}></Countingup>
            </div>


        )
    }
}

