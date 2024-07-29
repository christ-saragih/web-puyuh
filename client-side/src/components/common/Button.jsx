const Button = (props) => {
  const {
    type = "submit",
    className,
    variant = "primary",
    processing,
    value,
    onClick,
  } = props;

  return (
    <button
      type={type}
      className={`font-semibold text-sm w-28 py-2 px-6 rounded-2xl border-2 ${
        processing && "opacity-30"
      } btn-${variant} ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
