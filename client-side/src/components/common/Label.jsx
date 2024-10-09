import PropTypes from "prop-types";

const Label = (props) => {
  const { htmlFor, value, className } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={`mt-4 mb-1 text-base font-medium block ${className}`}
    >
      {value}
    </label>
  );
};

export default Label;

Label.propTypes = {
  htmlFor: PropTypes.string,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};
