import { PiFolderFill, PiNotePencilBold, PiTrashBold } from "react-icons/pi";
import ToggleButton from "../common/ToggleButton";
import ActionButton from "../common/ActionButton";

const DocumentItem = () => {
  return (
    <div className="bg-white flex flex-col gap-2 py-3 px-6 rounded-2xl shadow-lg justify-center">
      <div className="flex items-center justify-between">
        <PiFolderFill className="w-10 h-10 text-[#FFA000]" />
        <ToggleButton />
      </div>
      <div className="mb-3">
        <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900">
          Nama Dokumen
        </h3>
        <p className="truncate">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-2">
        <ActionButton
          icon={PiNotePencilBold}
          className={"text-yellow-600"}
          tooltip={"Ubah"}
          // onClick={() =>
          //   openModal("update_documentation", { id, nama, image })
          // }
        />
        <ActionButton
          icon={PiTrashBold}
          className={"text-red-600"}
          tooltip={"Hapus"}
          // onClick={() => openModal("delete_documentation", { id })}
        />
      </div>
    </div>
  );
};

export default DocumentItem;
