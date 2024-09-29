import PropTypes from "prop-types";
import { LuBadgeAlert } from "react-icons/lu";

const Alert = (props) => {
  const { message, type } = props;

  // Tentukan warna berdasarkan type
  let color;
  switch (type) {
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
    <div
      className="flex items-center w-full max-w-xl px-4 py-3 mt-3 mb-4 text-sm sm:text-base rounded-2xl shadow"
      role="alert"
      style={{
        color: color,
        backgroundColor: `${color}1A`,
        borderColor: `${color}4D`,
        borderWidth: "1px",
      }}
    >
      <div
        className="rounded-xl w-9 h-9 p-[6px] me-2 flex items-center justify-center shrink-0"
        style={{ backgroundColor: color }}
      >
        <LuBadgeAlert className="w-full h-full text-white object-cover" />
      </div>

      <span className="sr-only">{type}</span>

      <div>
        <span className="font-medium">Pemberitahuan!</span> {message}
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "danger", "warning", "info"]).isRequired,
};

Alert.defaultProps = {
  type: "info",
};

export default Alert;
