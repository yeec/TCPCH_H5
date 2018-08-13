import React, {PropTypes} from 'react';
import './style/index.web';

const PrefixCls = 'mbank-public-button';

let Confirminfo = (props) => {
    let {
        title,
        content,

        ...others
    } = props;


    return (
        <div className="mbank-public-confirm-detail-item-h">
            <div className="mbank-public-confirm-detail-title">{title}</div>
            <div className="mbank-public-confirm-detail-text"><span>{content}</span>
            </div>
        </div>

    );
};


export default Confirminfo;
