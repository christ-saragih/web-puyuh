const Label = (props) => {
  const { htmlFor, value, className } = props;

  return (
    <label htmlFor={htmlFor} className={`text-base font-medium block ${className}`}>
      {value}
    </label>
  );
};

export default Label;
