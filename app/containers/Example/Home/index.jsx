import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $native from './../../../native/native';
import API from './../../../constants/api';
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

    componentDidMount() {
        $native.callClientForComm(API.NATIVE_CODE_UPDATE_TITLE, {
            title: '测试页面',
            leftButton: {
                exist: 'true',
                closeFlag: 'false'
            }
        });
    }


    render() {

        return (
            <div className="a" >
                <Cell.Group header="Demo">
                    <LinkCell link='/BaseExample' arrow title='BaseExample  基础组件' key='/BaseExample'/>
                    <LinkCell link='/ClientDemo' arrow title='ClientDemo  客户端交互' key='/ClientDemo'/>
                </Cell.Group>
            </div>
        )
    }
}

