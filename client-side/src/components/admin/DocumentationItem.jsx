import ActionButton from "../common/ActionButton";
import { PiNotePencilBold, PiTrashBold } from "react-icons/pi";

const DocumentationItem = (props) => {
  const { id, nama, image, openModal } = props;

  return (
    <div className="bg-white flex gap-2 py-3 px-6 rounded-2xl shadow-lg flex-wrap justify-center">
      <h3 className="font-medium">{nama}</h3>
      <div className="w-[19rem] h-64">
        <img
          src={`http://localhost:3000/api/dokumentasi-frontpage/image/${image}`}
          alt={nama}
          className="w-full h-full object-top object-cover rounded-xl"
        />
      </div>
      <div className="space-x-2 mb-2">
        <ActionButton
          icon={PiNotePencilBold}
          className={"text-yellow-600"}
          tooltip={"Ubah"}
          onClick={() => openModal("update_documentation", { id, nama, image })}
        />
        <ActionButton
          icon={PiTrashBold}
          className={"text-red-600"}
          tooltip={"Hapus"}
          onClick={() => openModal("delete_documentation", { id })}
        />
      </div>
    </div>
  );
};

export default DocumentationItem;
