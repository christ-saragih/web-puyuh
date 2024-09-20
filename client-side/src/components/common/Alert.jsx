import PropTypes from "prop-types";

const Alert = (props) => {
  const { Icon, message, variant } = props;

  // Tentukan warna berdasarkan variant
  let color;
  switch (variant) {
    case "success":
      color = "#138A36";
      break;
    case "danger":
      color = "#E71D36";
      break;
    case "warning":
      color = "#FFA90B";
      break;
    default:
      color = "#5766CE";
  }

  return (
    <div className="flex justify-center mt-3">
      <div
        className="flex items-center w-full max-w-xl px-4 py-3 mb-4 text-sm sm:text-base rounded-2xl shadow"
        role="alert"
        style={{
          color: color,
          backgroundColor: `${color}1A`,
          borderColor: `${color}4D`,
          borderWidth: "1px",
        }}
      >
        <div
          className="rounded-xl w-9 h-9 p-[6px] me-2 flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-full h-full text-white object-cover" />
        </div>

        <div>
          <span className="font-medium">Pemberitahuan!</span> {message}
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "danger", "warning", "info"]).isRequired,
};

Alert.defaultProps = {
  variant: "info",
};

export default Alert;
