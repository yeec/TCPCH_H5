import React, { PropTypes } from "react";

const Group = props => {
  const { date, children, className, ...others } = props;

  return (
    <div className="mbank-jrrl">
      {children}
    </div>
  );
};

Group.propTypes = {
  header: PropTypes.string
};

export default Group;
