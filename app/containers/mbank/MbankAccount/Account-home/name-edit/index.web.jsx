import React, { PropTypes } from 'react';
import RcCollapse from 'rc-collapse';
import './style/index.web';
import PureRenderMixin from 'react-addons-pure-render-mixin'
//基础组件
import Input from "../../../../../components/Base/input-list/index.web.jsx";
import Button from '../../../../../components/Base/button/index.web.jsx';

export default class MbankAccountNameEdit extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            
        }
    }

    goPageLoss(){
        Common.addSessionData(API.SESSION_EDIT_ANOTHER_NAME, false);
    }

    render() {
        const {props} = this;

        let {
              title,
              money,
              onclick,
              click,
              value,
              onChange
          } = props;

        return (
            <div>
                <div className="edit-body-bg">
                </div>

                <div className="edit-body-box">
                    <div className="edit-body-header">
                        <h>修改别名</h>
                    </div>
                <div className="edit-body-divbox">
                </div>
                    <Input type="text" maxLength={100} placeholder="请输入别名" onChange={onChange} value={value} labelNumber={7}>别名：</Input>
                            
                    <div className="edit-body-divbox">
                    </div>
                    <Button.Group horizon>
                        <Button type="ghost" onClick={onclick}>确认</Button>
                        <Button type="ghost" onClick={click}>取消</Button>
                    </Button.Group>
                </div>
            </div>
        );
    }
}
