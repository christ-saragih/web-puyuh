const Textarea = (props) => {
  const { id, placeholder, required, rows, variant, className } = props;

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`w-full px-4 py-2 mt-2 mb-4 text-sm border-2 rounded-2xl shadow textarea-${variant} ${className}`}
    />
  );
};

export default Textarea;
