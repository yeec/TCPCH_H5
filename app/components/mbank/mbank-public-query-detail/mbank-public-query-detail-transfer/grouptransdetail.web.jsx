import React, {PropTypes} from 'react';


const Group = (props) => {
    const {
        header,
        children,
        className,
        ...others
    } = props;


    return (
        <div className="mbank-public-query-detail">
            <div className="mbank-public-query-detail-body">
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
