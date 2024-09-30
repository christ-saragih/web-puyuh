import PropTypes from "prop-types";

const Textarea = (props) => {
  const {
    name,
    value,
    placeholder,
    required,
    rows,
    variant,
    className,
    handleChange,
    isDisabled,
    isError,
    errorMessage,
  } = props;

  return (
    <div className="mb-4">
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-2 mt-2 text-sm border-2 rounded-2xl shadow ${
          isError ? "textarea-error" : `textarea-${variant}`
        } ${className}`}
        onChange={(e) => handleChange(e)}
        disabled={isDisabled}
      />
      {isError && errorMessage && (
        <p className="-mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Textarea;

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["primary", "primary-outline", "error", "disabled"]),
  className: PropTypes.string,
  handleChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};
