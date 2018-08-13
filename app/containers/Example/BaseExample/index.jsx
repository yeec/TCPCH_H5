import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $native from '.././../../native/native';
import API from '.././../../constants/api';
import Cell from '../../../../app/components/Base/cell/index.web.js';
import LinkCell from '../../../components/mbank/mbank-public-link-cell/index';
import ContextDecorator from '../../../util/decorator/context-decorator';

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
                <Cell.Group header="所有Base页面">
                    <LinkCell link='/Accordion' arrow title='Accordion 手风琴' key='/Accordion'/>
                    <LinkCell link='/Badge' arrow title='Badge 徽标' key='/Badge'/>
                    <LinkCell link='/Button' arrow title='Button 按钮' key='/Button'/>
                    <LinkCell link='/Card' arrow title='Card 卡片' key='/Card'/>
                    <LinkCell link='/Carousel' arrow title='Carousel 跑马灯' key='/Carousel'/>
                    <LinkCell link='/Cell' arrow title='Cell 列表' key='/Cell'/>
                    <LinkCell link='/List' arrow title='List 列表展示' key='/List'/>
                    <LinkCell link='/ListWord' arrow title='ListWord 文字排版' key='/ListWord'/>
                    <LinkCell link='/Checkbox' arrow title='Checkbox 多选框' key='/Checkbox'/>
                    <LinkCell link='/Countingup' arrow title='Countingup 金额数字动画' key='/Countingup'/>
                    <LinkCell link='/DatetimePicker' arrow title='DatetimePicker 时间选择器' key='/DatetimePicker'/>
                    <LinkCell link='/Echarts' arrow title='Echarts 图表' key='/Echarts'/>
                    <LinkCell link='/Flex' arrow title='Flex 布局' key='/Flex'/>
                    <LinkCell link='/InkTab' arrow title='InkTab 切换标签' key='/InkTab'/>
                    <LinkCell link='/Input' arrow title='Input 输入框' key='/Input'/>
                    <LinkCell link='/InputItem' arrow title='Input-item 输入' key='/InputItem'/>
                    <LinkCell link='/Modal' arrow title='Modal 模态框' key='/Modal'/>
                    <LinkCell link='/Navigator' arrow title='Navigator 导航栏' key='/Navigator'/>
                    <LinkCell link='/NGrids' arrow title='NGrids N宫格' key='/NGrids'/>
                    <LinkCell link='/Picker' arrow title='Picker 选择器' key='/Picker'/>
                    <LinkCell link='/Radio' arrow title='Radio 单选框' key='/Radio'/>
                    <LinkCell link='/SegmentTab' arrow title='SegmentTab 分段器' key='/SegmentTab'/>
                    <LinkCell link='/Switch' arrow title='Switch 开关' key='/Switch'/>
                    <LinkCell link='/TabBar' arrow title='TabBar 标签栏' key='/TabBar'/>
                    <LinkCell link='/Textarea' arrow title='Textarea 多行文本输入' key='/Textarea'/>
                    <LinkCell link='/Toast' arrow title='Toast 提示' key='/Toast'/>
                    <LinkCell link='/WingBlank' arrow title='WingBlank 左右间距' key='/WingBlank'/>
                    <LinkCell link='/WhiteSpace' arrow title='WhiteSpace 上下间距' key='/WhiteSpace'/>
                </Cell.Group>
            </div>
        )
    }
}