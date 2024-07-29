import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

const Modal = (props) => {
  const { open, onClose, children, className, size } = props;

  const sizeClass = size === "small" ? "w-[30rem]" : "w-[52rem]";

  return (
    <div
      onClick={onClose}
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors overflow-y-auto ${
        open ? "visible bg-black/40" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        // kalo klik modalnya tidak ke close
        onClick={(e) => e.stopPropagation()}
        className={`relative p-4 w-[52rem] max-w-4xl max-h-full transition-all ease-in-out duration-300 ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
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
  const { title, onClose } = props;
  return (
    <div className="flex items-center justify-between p-4 md:px-5 md:pb-2 mt-5">
      <h3 className="text-2xl font-semibold text-[#572618]">{title}</h3>

      <button
        onClick={onClose}
        type="button"
        className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
  return <div className={`p-4 md:px-5 md:pb-2 ${className}`}>{children}</div>;
};

const Footer = (props) => {
  const { action, onClose } = props;
  return (
    <div className="flex items-center p-4 md:px-5 md:pb-5 mt-5 justify-end">
      <Button
        variant={"primary-outline"}
        value={"Batal"}
        onClick={onClose}
        className={"me-3"}
      />
      <Button value={action} />
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
