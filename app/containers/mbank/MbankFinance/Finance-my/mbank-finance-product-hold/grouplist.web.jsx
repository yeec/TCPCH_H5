import React, {PropTypes} from 'react';

const groupPrefixCls = 'mbank-financing-product-list';

const Group = (props) => {
    const {
        children,
        className,
        ...others
    } = props;


    return (
        <div className="mbank-financing-product-list-my-box">
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
