import React, { PropTypes } from 'react';
import RcCollapse from 'rc-collapse';
import './style/index.web';

const Assets = function (props, context) {

    const {
      disabled,
        titl,
        lv
        
    } = props;


    return (
        <div className="rit-left-list">
            <div className="rit-left-list-left">{titl}</div>
            <div className="rit-left-list-right">{lv}</div>
        </div>
    )
}
export default Assets;