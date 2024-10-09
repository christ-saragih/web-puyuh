import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const {
    type,
    name,
    value,
    defaultValue,
    className,
    variant = "primary",
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    isError,
    isDisabled,
  } = props;

  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      defaultValue={defaultValue}
      className={`block w-full px-4 py-2 text-sm border-2 rounded-2xl shadow ${
        isError ? "input-error" : `input-${variant}`
      }  ${className}`}
      ref={input}
      autoComplete={autoComplete}
      required={required}
      onChange={(e) => handleChange(e)}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  );
};

// membuat validasi untuk props yang sudah dibuat
Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "date",
    "file",
    "search",
  ]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "primary-outline",
    "primary-outline-search",
    "error",
    "disabled",
  ]),
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  isFocused: PropTypes.bool,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default Input;
