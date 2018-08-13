import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Icon from '../../../../../app/components/Base/icon/index.web.jsx';
import NGrids from '../../../../../app/components/Base/n-grids/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }
    createGridsData = (data, length) => {
        return new Array(length).fill(data);
    }
    render() {
        return (
            <div>
                <p>NGrids N宫格</p>
                <NGrids data={this.createGridsData({content:'hehe'},17)} column={3}/>
                <p>ICON N宫格</p>
                <NGrids
                    data={this.createGridsData({
                        text: '文字',
                        icon: <Icon size="xl" name="error"/>
                    },12)}
                    border={false}
                    onTap={(data,index)=>{console.log(data);console.log(index)}}
                />
            </div>
        )
    }
}

