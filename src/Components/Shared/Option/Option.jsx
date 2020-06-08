import React from "react";
import PropTypes from "prop-types";

const Option = props => {
  const { value, info, ...rest } = props;
  return (
    <option value={value} {...rest}>
      {info}
    </option>
  );
};

Option.propTypes = {
  value: PropTypes.number,
  info: PropTypes.string
};

Option.defaultProps = {
  value: 0,
  info: ""
};

export default Option;
