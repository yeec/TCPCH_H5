import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Badge from '../../../../../app/components/Base/badge/index.web.jsx';
import Cell from '../../../../../app/components/Base/cell/index.web.js';
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
                <Cell.Group header="列表式Badge">
                    <Cell title={<span>列表1 <Badge/></span>}/>
                    <Cell title={<span>列表2 <Badge type="text" text="new"/></span>}/>
                    <Cell title='列表3' description={<Badge type="text" text={100}/>} arrow/>
                </Cell.Group>
                    <p>小红点</p>
                    <Badge>
                        <div style={{width: 60, height: 60, backgroundColor: '#ccc'}}>
                        </div>
                    </Badge>
                    <p>数字</p>
                    <Badge type="text" text={10}>
                        <div style={{width: 60, height: 60, backgroundColor: '#ccc'}}>
                        </div>
                    </Badge>
                    <div style={{marginBottom: 15}}></div>
                    <Badge type="text" text={20} maxNum={15}>
                        <div style={{width: 60, height: 60, backgroundColor: '#ccc'}}>
                        </div>
                    </Badge>
                    <p>文字</p>
                    <Badge type="text" text='new'>
                        <div style={{width: 60, height: 60, backgroundColor: '#ccc'}}>
                        </div>
                    </Badge>
                    <p>小文字</p>
                    <Badge type="text" text='small' small>
                        <div style={{width: 60, height: 60, backgroundColor: '#ccc'}}>
                        </div>
                    </Badge>

            </div>
        )
    }
}

