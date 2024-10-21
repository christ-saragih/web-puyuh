import PropTypes from "prop-types";

const InputError = (props) => {
  const { message } = props;

  return message ? (
    <p className="mt-1 text-sm text-red-500">{message}</p>
  ) : null;
};

export default InputError;

InputError.propTypes = {
  message: PropTypes.string,
};
