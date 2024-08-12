import { PiNotePencilBold, PiTrashBold } from "react-icons/pi";
import slide_image_1 from "../../assets/images/quail.jpg";
import ActionButton from "../common/ActionButton";

const DocumentationItem = (props) => {
  const { nama, image } = props;
  return (
    <div className="bg-white flex gap-2 py-3 px-6 rounded-2xl shadow-lg flex-wrap justify-center">
      <h3 className="font-medium">{nama}</h3>
      <div className="w-[19rem] h-64">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="space-x-2 mb-2">
        <ActionButton
          icon={PiNotePencilBold}
          className={"text-yellow-600"}
          tooltip={"Ubah"}
          //   onClick={() =>
          //     openModal("update_social_media", { id, nama, icon, url })
          //   }
        />
        <ActionButton
          icon={PiTrashBold}
          className={"text-red-600"}
          tooltip={"Hapus"}
          // onClick={() => openModal("delete_social_media", { id })}
        />
      </div>
    </div>
  );
};

export default DocumentationItem;
