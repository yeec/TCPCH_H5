import React, {PureComponent} from 'react';
import Animate from 'rc-animate';

import shallowEqual from 'fbjs/lib/shallowEqual';

const shouldComponentUpdate = function (nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}

const pureRender = (comp) => {
  comp.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return comp;
};


const PureRenderHoc = (Comp) => {
  Comp.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return Comp;
};

const TransitionPageHoc = (Comp) => {
  class WrapperComp extends PureComponent {
    componentWillUnmount() {
      console.log(this.getDOMNode());
      this.getDOMNode().display = 'none';
    }
    render() {
      return (
        <Animate transitionName="apollo-am-slide-from-left" transitionAppear>
          <Comp {...this.props}/>
        </Animate>
      );
    }
  }
  return WrapperComp;
};





export {PureRenderHoc as default,TransitionPageHoc};