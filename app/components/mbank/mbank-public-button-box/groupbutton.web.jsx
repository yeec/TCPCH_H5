import React, {PropTypes} from 'react';


const Group = (props) => {
    const {
        header,
        children,
        className,
        ...others
    } = props;


    return (
        <div className="mbank-public-button-box mbank-public-button-box-white">
            <div className="ryt-flex">
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
