import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Carousel from '../../../../../app/components/Base/carousel/index.web.js';
import ContextDecorator from '../../../../util/decorator/context-decorator';


@ContextDecorator
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    onClickHandle = (index) => {
        return  () => {
            console.log('图片' + index);
            // alert(index);
        }
    }

    carouselRender = () => {
        const arr = ['http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg','http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg','http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg'];
        return arr.map((item,index) => {
            return (
                <img
                    style={{height:300}}
                    src={item}
                    onClick={this.onClickHandle(index)}
                    key={index}
                />
            )
        });
    }
    render() {
        return (
            <div >
                <p>示例</p>
                <Carousel>
                    <img
                        style={{height:300}}
                        src="http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg"
                        onClick={()=>{alert('点击事件')}}
                    />
                    <img
                        style={{height:300}}
                        src="http://mpic.tiankong.com/4dc/2c4/4dc2c4cfbb0ef6c8d68456532521956a/640.jpg"
                        onClick={()=>{alert('点击事件')}}
                    />
                </Carousel>

                <p>示例-点击</p>
                <Carousel>
                    {this.carouselRender()}
                </Carousel>

            </div>
        )
    }
}

