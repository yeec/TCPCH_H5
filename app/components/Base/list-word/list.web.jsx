import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import Icon from '../../../../app/components/Base/icon/index.web.jsx';

const PrefixCls = 'ryt-list';

let listword = (props) => {
    let {
        icon,
        content,
        active,
        single,
        type,
        arrow,
        multiple,
        description,
        onTap,
        className,
        disabled,
        ...others
    } = props;

    if (arrow && typeof  arrow === 'boolean') {
        arrow = 'right';
    }
    const cls = classNames('ryt-list-item', {
        [`ryt-list-item-${type}`]: type,
        // [PrefixCls]: true,
        'ryt-list-item-active': active,
        'ryt-list-item-disabled': disabled,
        [className]: className
    });

    const clsname = classNames('ryt-list-line', {
        'ryt-list-line-multiple': multiple,
        'ryt-list-line-wrap':!single,
    });

    return (
        <Tappable {...others} className={cls} onTap={onTap} component="div">
            <div className={clsname}>

                <div className={`${PrefixCls}-content`}>
                    {
                        content ? <span>{content} </span> : null
                    }
                </div>

                {
                    description ? <div className={`${PrefixCls}-extra`}>{description} </div> : null
                }

                {
                    icon ?
                        <div className={`${PrefixCls}-button`}>
                            <Icon name={icon}/>
                        </div> : null
                }
                {
                    arrow ?
                        <div className={`${PrefixCls}-arrow ryt-list-arrow-horizontal`}>
                        </div> : null
                }
            </div>
        </Tappable>

    )
        ;
};

listword.propTypes = {
    type: React.PropTypes.oneOf(['top', 'middle']),
    arrow: PropTypes.oneOf(['up', 'down', 'right', 'empty', true, false]),
    title: PropTypes.any,
    multiple: React.PropTypes.bool,
    single: React.PropTypes.bool,
    subTitle: PropTypes.any,
    description: PropTypes.any,
    subDescription: PropTypes.any,
    onTap: PropTypes.func
};

listword.defaultProps = {
    type: 'middle',
    single:false,

};

export default listword;
