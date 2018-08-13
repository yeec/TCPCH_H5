import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import Icon from '../../../../app/components/mbank/mbank-public-icon/index.web.jsx';

const cellPrefixCls = 'mbank-public-list-button-list';

let Listbutton = (props) => {
    let {
        arrow,
        title,
        subTitle,
        icon,
        description,
        subDescription,
        onTap,
        className,
        ...others
    } = props;

    if (arrow && typeof  arrow === 'boolean') {
        arrow = 'right';
    }
    const cls = classNames({
        //[cellPrefixCls]: true,
        [className]: className
    });

    return (
        <Tappable {...others} className={cellPrefixCls} onTap={onTap} component="div">
            {
                icon ?
                    <Icon size="l" className={icon}></Icon>
                    : null
            }

            <div className={`${cellPrefixCls}-content`}>
                {
                    title ?
                        <span> {title}</span>
                        : null
                }
            </div>
        </Tappable>
    );
};

Listbutton.propTypes = {
    thumb: PropTypes.any,
    thumbWidth: PropTypes.number,
    thumbHeight: PropTypes.number,
    arrow: PropTypes.oneOf(['up', 'down', 'right', 'empty', true, false]),
    title: PropTypes.any,
    subTitle: PropTypes.any,
    description: PropTypes.any,
    subDescription: PropTypes.any,
    onTap: PropTypes.func
};

export default Listbutton;
