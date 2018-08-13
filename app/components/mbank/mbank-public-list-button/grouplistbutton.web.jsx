import React, {PropTypes} from 'react';
import classNames from 'classnames';

const groupPrefixCls = 'mbank-public-list-button';

const Group = (props) => {
    const {
        header,
        children,
        className,
        ...others
    } = props;
    const cls = classNames({
        [groupPrefixCls]: true,
        [className]: className
    });

    return (
        <div {...others} className={cls}>

            {
                header ?

                    <div className={`${groupPrefixCls}-header`}>{header}</div>
                    : null
            }
            <div className={`${groupPrefixCls}-body`}>
                {
                    children
                }
            </div>
        </div>
    );
};

Group.propTypes = {
    header: PropTypes.string
};

export default Group;
