import React, { PropTypes } from 'react';
import RcCollapse from 'rc-collapse';
import './style/index.web.jsx';

const ocrprompt = function (props, context) {

    const {
      disabled,
        title,
        money
        
    } = props;


    return (
        money ?<div className="ocr-prompt">
            <div>{title}</div>
        </div> :null
    )
}
export default ocrprompt;