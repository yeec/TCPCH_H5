import React, {PropTypes} from 'react';

const groupPrefixCls = 'evaluate-ryt-cells';

const Group = (props) => {
    const {
        children,
        className,
        keyNo,
        question,
        ...others
    } = props;


    return (


        <div className="evaluate-ryt-cells">
            <div className="evaluate-ryt-cells-content">
                <label className="evaluate-ryt-cell ryt-cell-content-title-bgcolor">
                    <div className="evaluate-ryt-cell-content">
                        <div className="">
                            <div className="evaluate-ryt-cell-content-title">{keyNo}、{question}</div>
                            <div className="evaluate-ryt-cell-content-title-sub"></div>
                        </div>

                    </div>
                </label>

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
