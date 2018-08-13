import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Card from '../../../../../app/components/Base/card-news/index.web.jsx';
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
                <p>示例1</p>
                <Card>
                    <Card.Header content="《中国进入新时代》" description="说明"
                                 thumb="http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg"/>
                    <Card.Body>
                        <img src="http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg"/>
                        <p>央视网消息：2017年10月19日，北京。党的十九大贵州省代表团讨论正在热烈进行：代表们从十九大报告说起，脱贫攻坚、教育医疗、基层党建……</p>
                    </Card.Body>
                    <Card.Footer content="说明文字" description="说明文字"/>
                </Card>

                <p>示例2</p>
                <Card>
                    <Card.Header  content={<span>人民日报微视频《中国进入新时代》
                        <p>10月1号</p></span>}/>
                    <Card.Body>
                        <img src="http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg"/>
                        <p>央视网消息：2017年10月19日，北京。党的十九大贵州省代表团讨论正在热烈进行：代表们从十九大报告说起，脱贫攻坚、教育医疗、基层党建……</p>
                    </Card.Body>
                    <Card.Footer content="阅读全文" description=">"/>
                </Card>

            </div>
        )
    }
}

