import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
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
            <div >
                <p>基本</p>
                <Cell title="这是标题"/>
                <Cell title="这是标题" description="这是描述"/>
                <Cell title="这是标题" subTitle="这是subTitle"/>
                <Cell title="这是标题" subTitle="这是子标题" description="这是描述" subDescription="这是子描述"/>
                <Cell title="这是标题" description="这是描述" arrow/>
                <Cell title="这是标题" description="这是描述" arrow
                      thumb="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg"/>
                <Cell title="这是标题"
                      description={<span><img src="http://firefly.cmbc.com.cn/public/imgs/z4MLLFPkZ1/brown.jpg" style={{width:32,height:32,verticalAlign:'middle'}}/></span>}
                      arrow/>
                <p>列表组</p>
                <Cell.Group header="这是个列表cell">
                    <Cell title="这是标题" description={<span style={{color: 'red'}}>这是描述</span>} arrow/>
                    <Cell title="这是标题" description={<Button size="small">dddd</Button>} arrow/>
                    <Cell title="这是标题" subTitle="这是子标题" description="这是描述" arrow/>
                    <Cell title="这是标题" subTitle="这是子标题" description="这是描述" arrow/>
                </Cell.Group>
                <p>箭头</p>
                <div>
                    <Cell title="默认箭头" description="描述" arrow/>
                    <Cell title="向上箭头" description="描述" arrow="up"/>
                    <Cell title="向下箭头" description="描述" arrow="down"/>
                    <Cell title="空箭头 占位" description="描述" arrow="empty"/>
                </div>
                <p>点击</p>
                <Cell title="这是标题" description="这是描述" arrow onTap={()=>{alert('tap!')}}/>
            </div>
        )
    }
}

