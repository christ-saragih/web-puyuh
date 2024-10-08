import Button from "./Button";

const Modal = (props) => {
  const { open, onClose, children, className, size } = props;

  let sizeClass;

  switch (size) {
    case "sm":
      sizeClass = "w-[42rem]";
      break;
    case "md":
      sizeClass = "w-[48rem]";
      break;
    case "lg":
      sizeClass = "w-[64rem]";
      break;
    default:
      sizeClass = "w-[52rem]";
      break;
  }

  return (
    <div
      onClick={onClose}
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors overflow-y-auto custom-scrollbar ${
        open ? "visible bg-black/40" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        // kalo klik modalnya tidak ke close
        onClick={(e) => e.stopPropagation()}
        className={`relative p-4  max-h-full transition-all ease-in-out duration-300 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } ${sizeClass} ${className}`}
      >
        <div className="relative bg-white rounded-2xl shadow-lg font-poppins">
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = (props) => {
  const { title, onClose, children } = props;
  return (
    <div className="flex items-center p-4 md:px-5 md:pb-2 mt-5">
      <h3 className="text-2xl font-semibold text-[#572618]">{title}</h3>
      {children}
      <button
        onClick={onClose}
        type="button"
        className="absolute top-3 right-3 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

const Body = (props) => {
  const { children, className } = props;
  return <div className={`px-4 pb-4 md:px-5 md:pb-5 ${className}`}>{children}</div>;
};

const Footer = (props) => {
  const { action, onClose, onAction, buttonLabel = "Batal" } = props;
  return (
    <div className="flex items-center p-4 md:px-5 md:pb-5 mt-5 justify-end">
      <Button
        variant={"primary-outline"}
        value={buttonLabel}
        onClick={onClose}
        className={"me-3"}
      />
      {action && <Button onClick={onAction} value={action} />}
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
