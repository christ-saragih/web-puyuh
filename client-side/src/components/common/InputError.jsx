import PropTypes from "prop-types";

const InputError = (props) => {
  const { message } = props;

  return <p className="mt-1 text-sm text-red-500">{message}</p>;
};

export default InputError;

InputError.propTypes = {
  message: PropTypes.string,
};
