import React from 'react';
import Tappable from 'react-tappable';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import Icon from '../../mbank/mbank-public-icon/index.web.jsx';
import './style/index.web';

const PrefixCls = 'mbank-public-button';

const MbankButton = (props) => {
    const {
        type,
        size,
        disabled,
        active,
        className,
        icon,
        inline,
        onTap,
        children,
        debounced,
        ...others
    } = props;
    const cls = classNames({
        [PrefixCls]: true,
        [`mbank-public-button-${type}`]: type,
        [className]: className
    });
    return (
        <Tappable {...others}
                  onTap={disabled ? null : (debounced ? debounce(onTap, 500): onTap)}
                  className={cls}
                  disabled={disabled}
                  component="div">
            {icon ? <Icon className={icon}></Icon> : null}
            <span>{children}</span></Tappable>
    )
};

MbankButton.propTypes = {
    type: React.PropTypes.oneOf(['primary', 'ghost', 'warning']),
    size: React.PropTypes.oneOf(['small', 'default']),
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    className: React.PropTypes.string,
    onTap: React.PropTypes.func
};

MbankButton.defaultProps = {
    // type: 'default',
    size: 'default',
    // plain: false,
    inline: false,
    disabled: false
};

export default MbankButton;
