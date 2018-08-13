import React from 'react';


const Group = (props) => {
    const {
        children,
        title,
        content,
        ...others
    } = props;


    return (
        <div className="mbank-public-confirm">
            <div className="mbank-public-confirm-detail">
                <div className="mbank-public-confirm-detail-item">
                {
                    children
                }
                </div>
            </div>
        </div>

    );
};



export default Group;
