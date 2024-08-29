import { PiNotePencilBold, PiTrashBold } from "react-icons/pi";
import ActionButton from "../common/ActionButton";
import { Tooltip } from "flowbite-react";
import { NavLink } from "react-router-dom";

const SocialMediaItem = (props) => {
  const { id, nama, icon, url, openModal } = props;
  return (
    <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
      <div className=" w-full">
        <div className="flex items-center gap-3 mb-3 ">
          <img
            src={`http://localhost:3000/api/sosial-media/image/${icon}`}
            alt="Media Sosial"
            className="w-10 h-10 rounded-full"
          />

          {/* GET image dari seeder */}
          {/* <img
            src={icon}
            alt="Media Sosial"
            className="w-10 h-10 rounded-full"
          /> */}

          <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 grow">
            {nama}
          </h3>

          <div className="space-x-2">
            <ActionButton
              icon={PiNotePencilBold}
              className={"text-yellow-600"}
              tooltip={"Ubah"}
              onClick={() =>
                openModal("update_social_media", { id, nama, icon, url })
              }
            />
            <ActionButton
              icon={PiTrashBold}
              className={"text-red-600"}
              tooltip={"Hapus"}
              onClick={() => openModal("delete_social_media", { id })}
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <Tooltip content={url} placement="bottom" arrow={false}>
            <NavLink
              to={url}
              target="_blank"
              className={"inline-block hover:underline decoration-slate-700"}
            >
              {url}
            </NavLink>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaItem;
