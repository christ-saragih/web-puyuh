import ActionButton from "../common/ActionButton";
import ToggleButton from "../common/ToggleButton";
import { PiNotePencilBold, PiTrashBold } from "react-icons/pi";
import { Tooltip } from "flowbite-react";

const FaqAdminItem = (props) => {
  const { id, pertanyaan, jawaban, status, openModal, handleToggleStatus } =
    props;
  return (
    <div className="bg-white flex flex-col gap-2 py-3 px-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900">
          {pertanyaan}
        </h3>
        <div className="flex items-center gap-2">
          <ActionButton
            icon={PiNotePencilBold}
            className={"text-yellow-600"}
            tooltip={"Ubah"}
            onClick={() => openModal("update_faq", { id, pertanyaan, jawaban })}
          />
          <ActionButton
            icon={PiTrashBold}
            className={"text-red-600"}
            tooltip={"Hapus"}
            onClick={() => openModal("delete_faq", { id })}
          />

          <Tooltip
            content={status === "aktif" ? "Sembunyikan FAQ" : "Tampilkan FAQ"}
            placement="top"
          >
            <ToggleButton
              isChecked={status === "aktif"}
              handleToggleStatus={() =>
                handleToggleStatus(
                  id,
                  status === "aktif" ? "tidak-aktif" : "aktif"
                )
              }
            />
          </Tooltip>
        </div>
      </div>
      <p>{jawaban}</p>
    </div>
  );
};

export default FaqAdminItem;
