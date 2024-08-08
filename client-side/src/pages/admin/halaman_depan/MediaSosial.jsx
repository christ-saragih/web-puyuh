import {
  PiEyeBold,
  PiNotePencilBold,
  PiPlusCircle,
  PiTrashBold,
  PiUserBold,
} from "react-icons/pi";
import Button from "../../../components/common/Button.jsx";
import Input from "../../../components/common/Input.jsx";
import InputSearch from "../../../components/common/InputSearch.jsx";
import Label from "../../../components/common/Label.jsx";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import Dropdown from "../../../components/common/Dropdown";
import { Modal, Tooltip } from "flowbite-react";
import { useState } from "react";
import Admin from "../../../assets/images/admin.svg";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import ActionButton from "../../../components/common/ActionButton.jsx";

const MediaSosial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // modal logic
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    // setSelectedTag(tag);
    // if (type === "update_article_tag") {
    //   setNewTag(tag.nama);
    // }
  };
  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    // setNewTag("");
  };

  const modalSize = modalType === "delete_article" ? "small" : "large";

  return (
    <AdminLayout title={"Halaman Depan / Media Sosial"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex gap-5 mb-6">
            <Dropdown
              options={[1, 2, 3, 4]}
              label="Tampilkan"
              // onOptionSelect={handleOptionSelect}
            />

            {/* FITUR SEARCHING */}
            <InputSearch
            // handleChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_sosial_media")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            <Modal
              open={isModalOpen}
              onClose={closeModal}
              size={modalSize}
              className={"w-[35rem]"}
            >
              {modalType === "add_sosial_media" && (
                <>
                  <Modal.Header
                    title={"Tambah Tag Artikel"}
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label htmlFor={"article_tags"} value={"Nama Tag"} />
                    <Input
                      type={"text"}
                      name={"article_tags"}
                      placeholder={"Masukkan nama tag artikel.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      // value={newTag}
                      // handleChange={handleChange}
                    />
                  </Modal.Body>
                  <Modal.Footer
                    action={"Tambah"}
                    // onAction={handleAddTag}
                    onClose={closeModal}
                  />
                </>
              )}

              {/*
                    {modalType === "update_article_tag" && (
                      <>
                        <Modal.Header
                          title="Ubah Tag Artikel"
                          onClose={closeModal}
                        />
                        <Modal.Body>
                          <Label htmlFor="article_tags" value="Nama Tag" />
                          <Input
                            type="text"
                            name="article_tags"
                            variant="primary-outline"
                            className="mt-1 mb-4"
                            value={newTag}
                            handleChange={handleChange}
                          />
                        </Modal.Body>
                        <Modal.Footer
                          action="Ubah"
                          onAction={handleUpdateTag}
                          onClose={closeModal}
                        />
                      </>
                    )}

                    {modalType === "delete_article_tag" && (
                      <>
                        <Modal.Header
                          title="Hapus Tag Artikel"
                          onClose={closeModal}
                        />
                        <Modal.Body>
                          <p>
                            Apakah Anda yakin ingin menghapus tag artikel ini?
                          </p>
                        </Modal.Body>
                        <Modal.Footer
                          action="Hapus"
                          onAction={handleDeleteTag}
                          onClose={closeModal}
                        />
                      </>
                    )} */}
            </Modal>
          </div>

          <div className="grid grid-cols-3 gap-x-10 gap-y-8 mb-4">
            <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
              <div className="relative w-full">
                <FaFacebook className="w-14 h-14 text-blue-600 mb-2" />

                <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 ">
                  Facebook
                </h3>
                <div className="overflow-hidden">
                  <Tooltip
                    content="https://www.instagram.com/bennefitchristy/bennefitchristy"
                    placement="bottom"
                    className="bg-gray-600"
                    arrow={false}
                  >
                    <NavLink
                      to={
                        "https://www.instagram.com/bennefitchristy/bennefitchristy"
                      }
                      target="_blank"
                      className={"w-[80%] max-w-full truncate inline-block"}
                    >
                      https://www.instagram.com/bennefitchristy/bennefitchristy/
                    </NavLink>
                  </Tooltip>
                </div>

                <div className="absolute top-2 right-0 space-x-2">
                  <ActionButton
                    icon={PiNotePencilBold}
                    className={"text-yellow-600"}
                    tooltip={"Ubah"}
                    onClick={() => openModal("update_article")}
                  />
                  <ActionButton
                    icon={PiTrashBold}
                    className={"text-red-600"}
                    tooltip={"Hapus"}
                    onClick={() => openModal("delete_article")}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
              <div className="relative w-full">
                <FaFacebook className="w-14 h-14 text-blue-600 mb-2" />

                <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 ">
                  Facebook
                </h3>
                <div className="overflow-hidden">
                  <Tooltip
                    content="https://www.instagram.com/bennefitchristy/bennefitchristy"
                    placement="bottom"
                    className="bg-gray-600"
                    arrow={false}
                  >
                    <NavLink
                      to={
                        "https://www.instagram.com/bennefitchristy/bennefitchristy"
                      }
                      target="_blank"
                      className={"w-[80%] max-w-full truncate inline-block"}
                    >
                      https://www.instagram.com/bennefitchristy/bennefitchristy/
                    </NavLink>
                  </Tooltip>
                </div>

                <div className="absolute top-2 right-0 space-x-2">
                  <ActionButton
                    icon={PiNotePencilBold}
                    className={"text-yellow-600"}
                    tooltip={"Ubah"}
                    onClick={() => openModal("update_article")}
                  />
                  <ActionButton
                    icon={PiTrashBold}
                    className={"text-red-600"}
                    tooltip={"Hapus"}
                    onClick={() => openModal("delete_article")}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
              <div className="relative w-full">
                <FaFacebook className="w-14 h-14 text-blue-600 mb-2" />

                <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 ">
                  Facebook
                </h3>
                <div className="overflow-hidden">
                  <Tooltip
                    content="https://www.instagram.com/bennefitchristy/bennefitchristy"
                    placement="bottom"
                    className="bg-gray-600"
                    arrow={false}
                  >
                    <NavLink
                      to={
                        "https://www.instagram.com/bennefitchristy/bennefitchristy"
                      }
                      target="_blank"
                      className={"w-[80%] max-w-full truncate inline-block"}
                    >
                      https://www.instagram.com/bennefitchristy/bennefitchristy/
                    </NavLink>
                  </Tooltip>
                </div>

                <div className="absolute top-2 right-0 space-x-2">
                  <ActionButton
                    icon={PiNotePencilBold}
                    className={"text-yellow-600"}
                    tooltip={"Ubah"}
                    onClick={() => openModal("update_article")}
                  />
                  <ActionButton
                    icon={PiTrashBold}
                    className={"text-red-600"}
                    tooltip={"Hapus"}
                    onClick={() => openModal("delete_article")}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
              <div className="relative w-full">
                <FaFacebook className="w-14 h-14 text-blue-600 mb-2" />

                <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 ">
                  Facebook
                </h3>
                <div className="overflow-hidden">
                  <Tooltip
                    content="https://www.instagram.com/bennefitchristy/bennefitchristy"
                    placement="bottom"
                    className="bg-gray-600"
                    arrow={false}
                  >
                    <NavLink
                      to={
                        "https://www.instagram.com/bennefitchristy/bennefitchristy"
                      }
                      target="_blank"
                      className={"w-[80%] max-w-full truncate inline-block"}
                    >
                      https://www.instagram.com/bennefitchristy/bennefitchristy/
                    </NavLink>
                  </Tooltip>
                </div>

                <div className="absolute top-2 right-0 space-x-2">
                  <ActionButton
                    icon={PiNotePencilBold}
                    className={"text-yellow-600"}
                    tooltip={"Ubah"}
                    onClick={() => openModal("update_article")}
                  />
                  <ActionButton
                    icon={PiTrashBold}
                    className={"text-red-600"}
                    tooltip={"Hapus"}
                    onClick={() => openModal("delete_article")}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
              <div className="relative w-full">
                <FaFacebook className="w-14 h-14 text-blue-600 mb-2" />

                <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 ">
                  Facebook
                </h3>
                <div className="overflow-hidden">
                  <Tooltip
                    content="https://www.instagram.com/bennefitchristy/bennefitchristy"
                    placement="bottom"
                    className="bg-gray-600"
                    arrow={false}
                  >
                    <NavLink
                      to={
                        "https://www.instagram.com/bennefitchristy/bennefitchristy"
                      }
                      target="_blank"
                      className={"w-[80%] max-w-full truncate inline-block"}
                    >
                      https://www.instagram.com/bennefitchristy/bennefitchristy/
                    </NavLink>
                  </Tooltip>
                </div>

                <div className="absolute top-2 right-0 space-x-2">
                  <ActionButton
                    icon={PiNotePencilBold}
                    className={"text-yellow-600"}
                    tooltip={"Ubah"}
                    onClick={() => openModal("update_article")}
                  />
                  <ActionButton
                    icon={PiTrashBold}
                    className={"text-red-600"}
                    tooltip={"Hapus"}
                    onClick={() => openModal("delete_article")}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap">
              <div className="relative w-full">
                <FaFacebook className="w-14 h-14 text-blue-600 mb-2" />

                <h3 className="text-2xl mb-1 font-bold tracking-tight text-gray-900 ">
                  Facebook
                </h3>
                <div className="overflow-hidden">
                  <Tooltip
                    content="https://www.instagram.com/bennefitchristy/bennefitchristy"
                    placement="bottom"
                    className="bg-gray-600"
                    arrow={false}
                  >
                    <NavLink
                      to={
                        "https://www.instagram.com/bennefitchristy/bennefitchristy"
                      }
                      target="_blank"
                      className={"w-[80%] max-w-full truncate inline-block"}
                    >
                      https://www.instagram.com/bennefitchristy/bennefitchristy/
                    </NavLink>
                  </Tooltip>
                </div>

                <div className="absolute top-2 right-0 space-x-2">
                  <ActionButton
                    icon={PiNotePencilBold}
                    className={"text-yellow-600"}
                    tooltip={"Ubah"}
                    onClick={() => openModal("update_article")}
                  />
                  <ActionButton
                    icon={PiTrashBold}
                    className={"text-red-600"}
                    tooltip={"Hapus"}
                    onClick={() => openModal("delete_article")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MediaSosial;
