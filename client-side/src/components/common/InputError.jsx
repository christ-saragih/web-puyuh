import PropTypes from "prop-types";

const InputError = (props) => {
  const { message, className } = props;

  return message ? (
    <p className={`mt-1 text-sm text-red-500 ${className}`}>{message}</p>
  ) : null;
};

export default InputError;

InputError.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};
