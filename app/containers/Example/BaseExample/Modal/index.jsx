import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from '../../../../../app/components/Base/button/index.web.jsx';
import Modal from '../../../../../app/components/Base/modal/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';

@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            modalVisible: false,
            modalVisible1: false,
            modalVisible2: false,

        };
    }

    modalHandle = () => {
        let modalVisible = !this.state.modalVisible;
        this.setState({modalVisible});
    }

    modalHandle1 = () => {
        let modalVisible1 = !this.state.modalVisible1;
        this.setState({modalVisible1});
    }

    modalHandle2 = () => {
        let modalVisible2 = !this.state.modalVisible2;
        this.setState({modalVisible2});
    }

    alertHandle = () => {
        Modal.alert('我弹弹弹')
    }

    alertHandle1 = () => {
        Modal.alert('1个button', [{text: '点我试试'}])
    }

    alertHandle2 = () => {
        Modal.alert('2个button', [{text: '点我试试'}, {text: '试试就试试'}])
    }

    alertHandle3 = () => {
        Modal.alert('多个button', [{text: '点我试试', onTap: this.test}, {text: '试试就试试'}, {text: '你猜我是谁?'}])
    }

    actionsheetHandle = () => {
        Modal.actionsheet({
            items: ['第一项', '第二项', '第三项', '第四项', '取消'],
            titleText: '标题',
            cancelIndex: 4
        }, function (key) {
            console.log(key)
        });
    }


    render() {
        return (
            <div>
                    <p>popup形式</p>
                    <Button onTap={this.modalHandle}>点我开启</Button>
                    <Modal visible={this.state.modalVisible}>
                        <Button onTap={this.modalHandle}>点我关闭</Button>
                    </Modal>

                    <p>alert形式</p>
                    <Button onTap={this.modalHandle1}>点我开启</Button>
                    <Modal visible={this.state.modalVisible1} type="alert">
                        <Button onTap={this.modalHandle1}>点我关闭</Button>
                    </Modal>

                    <p>全屏</p>
                    <Button onTap={this.modalHandle2}>点我开启</Button>
                    <Modal visible={this.state.modalVisible2} fullScreen>
                        <Button onTap={this.modalHandle2}>点我关闭</Button>
                    </Modal>
                <p>alert框</p>
                    <Button onTap={this.alertHandle}>默认</Button>
                    <Button onTap={this.alertHandle1}>自定义1个按钮</Button>
                    <Button onTap={this.alertHandle2}>自定义2个按钮</Button>
                    <Button onTap={this.alertHandle3}>自定义3个按钮</Button>
                <p>动作面板</p>
                <Button onTap={this.actionsheetHandle}>动作面板</Button>

            </div>
        )
    }
}

