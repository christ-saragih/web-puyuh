import { useState } from "react";
import { Link } from "react-router-dom";

const ActionButton = (props) => {
  const { icon: Icon, className, variant = "bg-white", tooltip, onClick } = props;
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={`w-10 h-10 shadow-md rounded-full p-2 ${variant} ${className}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={onClick}
      >
        {Icon && <Icon className="w-full h-full" />}
      </button>

      {visible && (
        <div
          className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-600 rounded-lg shadow-sm opacity-100"
          style={{
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "0.5rem",
          }}
        >
          {tooltip}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rotate-45"
            style={{ bottom: "-0.25rem" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
