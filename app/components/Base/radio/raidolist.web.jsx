import React, {PropTypes} from 'react';
import PureRenderHOC from '../../../util/hoc/index';

import Cell from './../cell/cell.web';
import RadioItem from './radio.web';

const RadioList = (props) => {
    const {
        radioProps,
        description,
        onTap,
        ...others
    } = props;

    const id = Math.random().toString(36).substr(2);

    const _onChange = radioProps.onChange || function () {
        };

    const onChange = (chekced, event) => {
        _onChange(chekced, event);
        onTap && onTap(chekced, event);
    };
    radioProps.onChange = onChange;

    return (
        <Cell {...others} description={<RadioItem {...radioProps} id={id}/>} htmlFor={id}/>
    );
};
RadioList.propTypes = {
    radioProps: PropTypes.object
};

RadioList.defaultProps = {
    radioProps: {}
}

export default PureRenderHOC(RadioList);
