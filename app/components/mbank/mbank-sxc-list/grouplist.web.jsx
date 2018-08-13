import React, {PropTypes} from 'react';
import classNames from 'classnames';

const groupPrefixCls = 'mbank-sxc-list-new';

const Group = (props) => {
    const {
        children,
        className,
        ...others
    } = props;


    return (
            <div className={groupPrefixCls}>
                {
                    children
                }
            </div>
    );
};

Group.propTypes = {
    header: PropTypes.string
};

export default Group;
