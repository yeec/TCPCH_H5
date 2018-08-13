import React from 'react';
import className from  'classnames';
import './style/index.less';

const NoData = (props) => {
    const {
        text,
        ...others
    } = props;
    return (
        <div className="ryt-no-data">
            <div></div>
            <p>{text}</p>
        </div>
    )
};

export default NoData;