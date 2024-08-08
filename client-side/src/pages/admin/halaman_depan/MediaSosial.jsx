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
import { Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import ActionButton from "../../../components/common/ActionButton.jsx";
import Modal from "../../../components/common/Modal";
import { getSocialMedia } from "../../../services/social-media.service.js";
import SocialMediaList from "../../../components/admin/SocialMediaList.jsx";

const MediaSosial = () => {
  const [socialMedias, setSocialMedias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getSocialMedia((data) => {
      setSocialMedias(data);
    });
  }, []);
 

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
                    title={"Tambah Media Sosial"}
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label htmlFor={"icon"} value={"Icon"} />
                    <div className="flex items-center justify-center w-full mt-2 mb-4">
                      <label
                        htmlFor="icon"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 rounded-2xl cursor-pointer bg-gray-50 shadow"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Unggah gambar di sini
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="icon"
                          type="file"
                          className="hidden"
                          // onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <Label htmlFor={"media_sosial"} value={"Media Sosial"} />
                    <Input
                      type={"text"}
                      name={"media_sosial"}
                      placeholder={"Masukkan media sosial.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      // value={newTag}
                      // handleChange={handleChange}
                    />
                    <Label htmlFor={"link"} value={"Link"} />
                    <Input
                      type={"text"}
                      name={"link"}
                      placeholder={"Masukkan nama link.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      // value={newTag}
                      // handleChange={handleChange}
                    />
                  </Modal.Body>
                  <Modal.Footer
                    action={"Tambah"}
                    // onAction={}
                    onClose={closeModal}
                  />
                </>
              )}

              {modalType === "update_social_media" && (
                <>
                  <Modal.Header title="Ubah Media Sosial" onClose={closeModal} />
                  <Modal.Body>
                    <Label htmlFor={"icon"} value={"Icon"} />
                    <div className="flex items-center justify-center w-full mt-2 mb-4">
                      <label
                        htmlFor="icon"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 rounded-2xl cursor-pointer bg-gray-50 shadow"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Unggah gambar di sini
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="icon"
                          type="file"
                          className="hidden"
                          // onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <Label htmlFor={"media_sosial"} value={"Media Sosial"} />
                    <Input
                      type={"text"}
                      name={"media_sosial"}
                      placeholder={"Masukkan media sosial.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      // value={newTag}
                      // handleChange={handleChange}
                    />
                    <Label htmlFor={"link"} value={"Link"} />
                    <Input
                      type={"text"}
                      name={"link"}
                      placeholder={"Masukkan nama link.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      // value={newTag}
                      // handleChange={handleChange}
                    />
                  </Modal.Body>
                  <Modal.Footer
                    action="Ubah"
                    // onAction={handleUpdateTag}
                    // onClose={closeModal}
                  />
                </>
              )}

              {modalType === "delete_social_media" && (
                <>
                  <Modal.Header
                    title="Hapus Media Sosial"
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus media sosial ini?</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    // onAction={handleDeleteTag}
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
          </div>

          <SocialMediaList socialMedias={socialMedias} openModal={openModal}/>

          {/* Media Sosial List */}
          {/* <div className="grid grid-cols-3 gap-x-10 gap-y-8 mb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              // Media Sosial Item
              <div
                key={i}
                className="bg-white flex gap-3 py-3 px-5 rounded-2xl shadow-lg flex-wrap items-center xl:flex-nowrap"
              >
                <div className="relative w-full">
                  <img
                    src={FaFacebook}
                    alt="Media Sosial"
                    className="w-14 h-14 text-blue-600 mb-2"
                  />

                  <img src={PiPlusCircle} alt="" />

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
            ))}
          </div> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MediaSosial;
