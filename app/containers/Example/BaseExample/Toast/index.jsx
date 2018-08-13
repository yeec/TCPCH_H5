import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import Toast from '../../../../../app/components/Base/toast/index.web.jsx';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            pickerVisible: false,
            checked:true,
            modalVisible: false,
            modalVisible1: false,
            modalVisible2: false,
            time: new Date(),
            isOpen: false,
        };
    }

    successHandle = () => {
        Toast.success('success!');
    }
    errorHandle = () => {
        Toast.error('fail!');
    }

    infoHandle = () => {
        Toast.info('info!');
    }

    loadingHandle = () => {
        Toast.loading('loading',3, function () {
            Toast.info('info!');
        });
    }

    loadingHandle1 = () => {
        Toast.loading('loading');
        setTimeout(function () {
            Toast.hide();
        },3000)
    }

    render() {
        return (
            <div >
                <p>Toast 提示</p>
                <div>
                    <Button onTap={this.successHandle}>success</Button>
                    <Button onTap={this.errorHandle}>error</Button>
                    <Button onTap={this.infoHandle}>info</Button>
                    <Button onTap={this.loadingHandle}>loading,自动关闭</Button>
                    <Button onTap={this.loadingHandle1}>loading,主动关闭</Button>
                </div>
            </div>
        )
    }
}

