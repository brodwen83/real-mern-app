import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  type
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
