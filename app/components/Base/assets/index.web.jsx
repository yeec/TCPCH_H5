import React, { PropTypes } from 'react';
import RcCollapse from 'rc-collapse';
import './style/index.web';

const Assets = function (props, context) {

    const {
      disabled,
        title,
        money
        
    } = props;


    return (
        <div className="rit-assets">
            <div className="rit-assets-box">
                <div className="rit-assets-box-txt">{title}<span>(元)</span></div>
                <div className="rit-assets-box-money">{money}</div>
            </div>

        </div>
    )
}
export default Assets;