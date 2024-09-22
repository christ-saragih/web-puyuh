import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import ActionButton from "../../../components/common/ActionButton";
import Modal from "../../../components/common/Modal";
import {
  addArticleTag,
  deleteArticleTag,
  getArticleTags,
  updateArticleTag,
} from "../../../services/article-tag.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiNotePencilBold, PiPlusCircle, PiTrashBold } from "react-icons/pi";
import { LuBadgeInfo } from "react-icons/lu";

const TagArtikel = () => {
  const [articleTags, setArticleTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [filteredArticleTags, setFilteredArticleTags] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getArticleTags((data) => {
      setArticleTags(data);
      setFilteredArticleTags(data);
    });
  }, []);

  //   CRUD: Start
  const handleInputChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    addArticleTag({ nama: newTag }, (data) => {
      setArticleTags([...articleTags, data]);
      closeModal();
    });
  };

  const handleUpdateTag = () => {
    updateArticleTag(selectedTag.id, { nama: newTag }, (updatedTag) => {
      setArticleTags(
        articleTags.map((tag) => (tag.id === selectedTag.id ? updatedTag : tag))
      );
      closeModal();
    });
  };

  const handleDeleteTag = () => {
    deleteArticleTag(selectedTag.id, () => {
      setArticleTags(articleTags.filter((tag) => tag.id !== selectedTag.id));
      closeModal();
    });
  };
  //   CRUD: End

  // Modal: Start
  const openModal = (type, tag = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === "update_article_tag") {
      setSelectedTag(tag);
      setNewTag(tag.nama);
    }
    if (type === "delete_article_tag" && tag) {
      setSelectedTag(tag);
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTag("");
  };
  // Modal: End

  // Search: Start
  const searchQuery = searchParams.get("search") || "";
  const currentTab = searchParams.get("tab") || "tag-artikel";

  useEffect(() => {
    if (searchQuery) {
      const filtered = articleTags.filter((articleTag) =>
        articleTag.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticleTags(filtered);
    } else {
      setFilteredArticleTags(articleTags);
    }
  }, [searchQuery, articleTags]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    // Pastikan parameter 'tab' tetap ada di URL saat melakukan pencarian
    const params = {};
    if (currentTab) params.tab = currentTab;
    if (value) {
      params.search = value;
    } else {
      params.search = ""; // Hapus search jika input kosong
    }
    setSearchParams(params);
  };
  // Search: End

  return (
    <>
      <div className="flex mb-6 justify-between">
        <div className="max-w-lg grow">
          <div className="flex rounded-2xl shadow">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <input
                type="text"
                className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl  border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
                placeholder="Masukkan nama tag artikel ..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e)}
                required
              />
            </div>
          </div>
        </div>
        <button
          className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
          onClick={() => openModal("add_article_tag")}
        >
          <PiPlusCircle className="w-6 h-6 me-1" />
          <p>Tambah</p>
        </button>

        <Modal
          open={isModalOpen}
          onClose={closeModal}
          size={modalType === "delete_article_tag" ? "sm" : ""}
        >
          {modalType === "add_article_tag" && (
            <>
              <Modal.Header title={"Tambah Tag Artikel"} onClose={closeModal} />
              <Modal.Body>
                <Label htmlFor={"article_tags"} value={"Nama Tag"} />
                <Input
                  type={"text"}
                  name={"article_tags"}
                  placeholder={"Masukkan nama tag artikel.."}
                  variant={"primary-outline"}
                  className={"mt-1 mb-4"}
                  value={newTag}
                  handleChange={handleInputChange}
                />
              </Modal.Body>
              <Modal.Footer
                action={"Tambah"}
                onAction={handleAddTag}
                onClose={closeModal}
              />
            </>
          )}

          {modalType === "update_article_tag" && (
            <>
              <Modal.Header title="Ubah Tag Artikel" onClose={closeModal} />
              <Modal.Body>
                <Label htmlFor="article_tags" value="Nama Tag" />
                <Input
                  type="text"
                  name="article_tags"
                  variant="primary-outline"
                  className="mt-1 mb-4"
                  value={newTag}
                  handleChange={handleInputChange}
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
              <Modal.Header title="Hapus Tag Artikel" onClose={closeModal} />
              <Modal.Body>
                <p>Apakah Anda yakin ingin menghapus tag artikel ini?</p>
              </Modal.Body>
              <Modal.Footer
                action="Hapus"
                onAction={handleDeleteTag}
                onClose={closeModal}
              />
            </>
          )}
        </Modal>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white text-sm text-gray-700 uppercase border-b-2">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Tag
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredArticleTags) &&
            filteredArticleTags.length > 0 ? (
              filteredArticleTags.map((articleTag, index) => (
                <tr
                  key={articleTag.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{articleTag.nama} </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <ActionButton
                      icon={PiNotePencilBold}
                      className="text-yellow-600"
                      tooltip="Ubah"
                      onClick={() =>
                        openModal("update_article_tag", articleTag)
                      }
                    />
                    <ActionButton
                      icon={PiTrashBold}
                      className="text-red-600"
                      tooltip="Hapus"
                      onClick={() =>
                        openModal("delete_article_tag", articleTag)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td scope="col" colSpan={3}>
                  <div className="flex justify-center mt-3">
                    <div
                      className="flex items-center w-full max-w-xl px-4 py-3 mb-4 text-sm sm:text-base text-[#5766CE] rounded-2xl bg-[#EEEFFA] border border-[#ccd1f0] shadow"
                      role="alert"
                    >
                      <div className="bg-[#5766CE] rounded-xl w-9 h-9 p-[6px] me-2 ">
                        <LuBadgeInfo className="w-full h-full text-white object-cover" />
                      </div>

                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Pemberitahuan!</span> Nama
                        tag artikel tidak ditemukan.
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TagArtikel;
