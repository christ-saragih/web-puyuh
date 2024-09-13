import ToggleButton from "../common/ToggleButton";
import ActionButton from "../common/ActionButton";
import { NavLink } from "react-router-dom";
import { PiFolderFill, PiNotePencilBold, PiTrashBold } from "react-icons/pi";
import { Tooltip } from "flowbite-react";

const DocumentItem = (props) => {
  const { id, nama, file, status, openModal, handleToggleStatus } = props;

  return (
    <div className="bg-white flex flex-col gap-2 py-3 px-6 rounded-2xl shadow-lg justify-center">
      <div className="flex items-center justify-between">
        <NavLink
          to={`http://localhost:3000/api/dokumen-frontpage/file/${file}`}
          target="_blank"
        >
          <PiFolderFill className="-ms-1 w-11 h-11 text-[#FFA000]" />
        </NavLink>
        <ToggleButton
          isChecked={status === "aktif"}
          handleToggleStatus={() =>
            handleToggleStatus(id, status === "aktif" ? "tidak-aktif" : "aktif")
          }
        />
      </div>
      <div className="mb-3 grow">
        <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900">
          {nama}
        </h3>
        <div className="overflow-hidden">
          <Tooltip content={file} placement="bottom" arrow={false}>
            <NavLink
              to={`http://localhost:3000/api/dokumen-frontpage/file/${file}`}
              target="_blank"
              className={"inline-block hover:underline decoration-slate-700"}
            >
              {file}
            </NavLink>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mb-2">
        <ActionButton
          icon={PiNotePencilBold}
          className={"text-yellow-600"}
          tooltip={"Ubah"}
          onClick={() => openModal("update_document", { id, nama, file })}
        />
        <ActionButton
          icon={PiTrashBold}
          className={"text-red-600"}
          tooltip={"Hapus"}
          onClick={() => openModal("delete_document", { id })}
        />
      </div>
    </div>
  );
};

export default DocumentItem;
