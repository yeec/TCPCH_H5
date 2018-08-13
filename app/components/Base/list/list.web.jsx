import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import Icon from '../icon/index.web.jsx';

const PrefixCls = 'ryt-list';

let list = (props) => {
    let {
        icon,
        thumb,
        link,
        multiple,
        arrow,
        title,
        title2,
        description,
        description2,
        isMoneyDescription,
        onTap,
        subTitle,
        active,
        className,
        disabled,
        subDescription,
        date,
        ...others
    } = props;

    if (arrow && typeof arrow === 'boolean') {
        arrow = 'right';
    }

    const cls = classNames('ryt-list-item ryt-list-item-middle', {
        // [PrefixCls]: true,
        'ryt-list-item-active': active,
        'ryt-list-item-disabled': disabled,
        'ryt-list-item-date-select': date,
        [className]: className
    });

    return (
        <Tappable {...others} className={cls} onTap={onTap} component="div">

            {subTitle ?
                <div className={`${PrefixCls}-line ryt-list-line-multiple`}>
                    {
                        thumb ?
                            <div className={`${PrefixCls}-thumb`}>
                                <Icon name={thumb} />
                            </div> : null
                    }
                    <div className={`${PrefixCls}-content`}>
                        <span>
                            {
                                title ?
                                    <div>{title}</div> : null
                            }{subTitle ?
                                <div className={`${PrefixCls}-brief`}>
                                    {subTitle}
                                </div> : null
                            }
                        </span>
                    </div>

                    {
                        description ? <div className={`${PrefixCls}-extra`}>
                            <div>{isMoneyDescription ? description + '元' : description}</div>
                            <span>{subDescription}</span></div> : null
                    }


                    {
                        icon ?
                            <div className={`${PrefixCls}-button`}>
                                <Icon name={icon} />
                            </div> : null
                    }
                    {
                        arrow ?
                            <div className={`${PrefixCls}-arrow ryt-list-arrow-horizontal`}>
                            </div> : null
                    }
                </div>
                : <div className={`${PrefixCls}-line`}>
                    {
                        thumb ?
                            <div className={`${PrefixCls}-thumb`}>
                                <Icon name={thumb} />
                            </div> : null
                    }
                    <div className={`${PrefixCls}-content`}>
                        {
                            title ? <span>{title} </span> : null
                        }
                        {
                            title2 ?
                                <div className="title2">{title2}</div> : null
                        }

                    </div>

                    {
                        description ? <div className={`${PrefixCls}-extra`}>{isMoneyDescription ? description + '元' : description}</div> : null
                    }
                    {
                        description2 ? <div className={`${PrefixCls}-extra`}>
                            <div className="description2">{description2}</div>
                        </div> : null
                    }

                    {
                        icon ?
                            <div className={`${PrefixCls}-button`}>
                                <Icon name={icon} />
                            </div> : null
                    }
                    {
                        link ?
                            <div className={`${PrefixCls}-button`}>
                                <span className="link">{link}</span>
                            </div> : null
                    }
                    {
                        arrow ?
                            <div className={`${PrefixCls}-arrow ryt-list-arrow-horizontal`}>
                            </div> : null
                    }
                </div>
            }
        </Tappable>

    );
};

list.propTypes = {
    thumb: PropTypes.any,
    thumbWidth: PropTypes.number,
    thumbHeight: PropTypes.number,
    arrow: PropTypes.oneOf(['up', 'down', 'right', 'empty', true, false]),
    title: PropTypes.any,
    title2: PropTypes.any,
    subTitle: PropTypes.any,
    description: PropTypes.any,
    description2: PropTypes.any,
    isMoneyDescription: PropTypes.bool,
    subDescription: PropTypes.any,
    onTap: PropTypes.func
};

export default list;
