import { useEffect, useRef, useState } from "react";
import Input from "../../components/common/Input.jsx";
import InputSearch from "../../components/common/InputSearch.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import {
  PiBookOpenTextFill,
  PiNotePencilBold,
  PiPlusCircle,
  PiTagFill,
  PiTrashBold,
} from "react-icons/pi";
import {
  addArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} from "../../services/article.service.js";
import ArticleList from "../../components/common/ArticleList.jsx";
import Modal from "../../components/common/Modal.jsx";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Label from "../../components/common/Label.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { Tabs } from "flowbite-react";
import ActionButton from "../../components/common/ActionButton.jsx";
import {
  getArticleTags,
  addArticleTag,
  updateArticleTag,
  deleteArticleTag,
} from "../../services/article-tag.service.js";
import MultiSelect from "../../components/common/MultiSelect.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx/index.jsx";

const AdminArtikel = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const options = ["4", "8", "16", "32", "Semua"];
  const [selectedValue, setSelectedValue] = useState("4");
  const [currentPage, setCurrentPage] = useState(1);
  const [articleTags, setArticleTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTag, setNewTag] = useState("");

  const [formArticle, setFormArticle] = useState({
    judul: "",
    penulis: "",
    tags: [],
    deskripsi: "",
    tanggal: "",
    gambar: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // get data tag artikel
  useEffect(() => {
    getArticleTags((data) => {
      setArticleTags(data);
    });
  }, []);

  const articleTagsOption = articleTags.map((articleTag) => ({
    value: articleTag.id,
    label: articleTag.nama,
  }));

  const handleChange = (e) => {
    setNewTag(e.target.value);
  };

  // tambah tag artikel
  const handleAddTag = () => {
    addArticleTag({ nama: newTag }, (data) => {
      setArticleTags([...articleTags, data]);
      closeModal();
    });
  };

  // update tag artikel
  const handleUpdateTag = () => {
    updateArticleTag(selectedTag.id, { nama: newTag }, (updatedTag) => {
      setArticleTags(
        articleTags.map((tag) => (tag.id === selectedTag.id ? updatedTag : tag))
      );
      closeModal();
    });
  };

  //  delete tag artikel
  const handleDeleteTag = () => {
    deleteArticleTag(selectedTag.id, () => {
      setArticleTags(articleTags.filter((tag) => tag.id !== selectedTag.id));
      closeModal();
    });
  };

  // get data artikel
  useEffect(() => {
    getArticles((data) => {
      setArticles(data);
    });
  }, []);

  const handleArticleImageChange = (e) => {
    const file = e.target.files[0];
    setFormArticle({ ...formArticle, gambar: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleArticleInputChange = (e) => {
    const { name, value } = e.target;
    setFormArticle({
      ...formArticle,
      [name]: value,
    });
  };

  const handleArticleDescriptionChange = (value) => {
    setFormArticle({
      ...formArticle,
      deskripsi: value,
    });
  };

  const articleTagSelected = formArticle.tags.map((tag) => ({
    value: tag.id,
    label: tag.nama,
  }));

  const editorRef = useRef(null);

  const handleAddArticle = () => {
    const form = new FormData();
    form.append("judul", formArticle.judul);
    form.append("penulis", formArticle.penulis);
    form.append(
      "tags",
      formArticle.tags.map((tag) => tag.id)
    );
    form.append("deskripsi", formArticle.deskripsi);
    form.append("gambar", formArticle.gambar);
    form.append("tanggal", formArticle.tanggal);

    addArticle(form, (response) => {
      setArticles([response, ...articles]);
      setCurrentPage(1);
      closeModal();
      resetForm();
    });
  };

  const handleUpdateArticle = () => {
    const form = new FormData();
    form.append("judul", formArticle.judul);
    form.append("penulis", formArticle.penulis);
    form.append(
      "tags",
      formArticle.tags.map((tag) => tag.id)
    );
    form.append("deskripsi", formArticle.deskripsi);
    form.append("tanggal", formArticle.tanggal);

    if (formArticle.gambar instanceof File) {
      form.append("gambar", formArticle.gambar);
    }

    // update Article api
    updateArticle(selectedArticle.id, form, (updateData) => {
      setArticles((prevArticles) =>
        prevArticles.map((item) =>
          item.id === updateData.id ? updateData : item
        )
      );
      closeModal();
      resetForm();
    });
  };

  const handleDeleteArticle = () => {
    deleteArticle(selectedArticle.id, () => {
      setArticles(
        articles.filter((article) => article.id !== selectedArticle.id)
      );
      closeModal();
    });
  };

  // modal logic
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
    if (type === "update_article" && tag) {
      setSelectedArticle(tag);
      setFormArticle({
        judul: tag.judul,
        penulis: tag.penulis,
        tags: tag.Tags,
        deskripsi: tag.deskripsi,
        tanggal: tag.tanggal,
        gambar: tag.gambar,
      });

      setPreviewImage(`http://localhost:3000/api/artikel/image/${tag.gambar}`);
    }
    if (type === "delete_article" && tag) {
      setSelectedArticle(tag);
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTag("");
    setFormArticle({
      judul: "",
      penulis: "",
      tags: [],
      deskripsi: "",
      tanggal: "",
      gambar: null,
    });
    setPreviewImage("");
    setSelectedArticle(null);
  };

  // buat size modal delete menjadi lebih kecil
  const modalSize = modalType === "delete_article" ? "small" : "large";

  // search artikel
  useEffect(() => {
    if (search !== "") {
      const result = articles.filter((article) => {
        return article.judul.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(result);
    } else {
      setSearchResult(articles);
    }
    setCurrentPage(1); // malakukan reset ke halaman pertama setiap kali pencarian berubah
  }, [articles, search]);

  // filtering & pagination logic
  const articlesPerPage =
    selectedValue === "Semua" ? articles.length : parseInt(selectedValue);
  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    setCurrentPage(1);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = searchResult.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout title={"Halaman Managemen Artikel"}>
      <div className="flex flex-col gap-8">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <Tabs aria-label="Tabs with underline" variant="underline">
            <Tabs.Item active title="Tag Artikel" icon={PiTagFill}>
              <div className="flex gap-5 mb-6">
                <Dropdown
                  options={options}
                  label="Tampilkan"
                  onOptionSelect={handleOptionSelect}
                />

                {/* FITUR SEARCHING */}
                <InputSearch handleChange={(e) => setSearch(e.target.value)} />

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
                  size={modalSize}
                  className={"w-[35rem]"}
                >
                  {modalType === "add_article_tag" && (
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
                          value={newTag}
                          handleChange={handleChange}
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
                    {articleTags.map((articleTag, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </Tabs.Item>

            <Tabs.Item title="Konten Artikel" icon={PiBookOpenTextFill}>
              <div className="flex gap-5 mb-6">
                <Dropdown
                  options={options}
                  label="Tampilkan"
                  onOptionSelect={handleOptionSelect}
                />

                {/* FITUR SEARCHING */}
                <InputSearch handleChange={(e) => setSearch(e.target.value)} />

                <button
                  className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
                  onClick={() => openModal("add_article")}
                >
                  <PiPlusCircle className="w-6 h-6 me-1" />
                  <p>Tambah</p>
                </button>

                <Modal open={isModalOpen} onClose={closeModal} size={modalSize}>
                  {(modalType === "add_article" ||
                    modalType === "update_article") && (
                    <>
                      <Modal.Header
                        title={
                          modalType === "add_article"
                            ? "Tambah Artikel"
                            : "Ubah Artikel"
                        }
                        onClose={closeModal}
                      />
                      <Modal.Body>
                        <Label
                          htmlFor={"article_title"}
                          value={"Judul Artikel"}
                        />
                        <Input
                          type={"text"}
                          name={"judul"}
                          placeholder={"Masukkan judul artikel.."}
                          variant={"primary-outline"}
                          className={"mt-1 mb-4"}
                          value={formArticle.judul}
                          handleChange={handleArticleInputChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={"penulis"} value={"Nama Penulis"} />
                            <Input
                              type={"text"}
                              name={"penulis"}
                              placeholder={"Masukkan nama penulis.."}
                              variant={"primary-outline"}
                              className={"mt-1 mb-4"}
                              value={formArticle.penulis}
                              handleChange={handleArticleInputChange}
                            />
                          </div>

                          <div>
                            <Label htmlFor={"tags"} value={"Tag Artikel"} />
                            <MultiSelect
                              name={"tags"}
                              options={articleTagsOption}
                              defaultValue={articleTagSelected}
                              placeholder={"Pilih tag artikel.."}
                              handleChange={(selectedOptions) =>
                                setFormArticle({
                                  ...formArticle,
                                  tags: selectedOptions.map((option) => ({
                                    id: option.value,
                                    nama: option.label,
                                  })),
                                })
                              }
                            />
                          </div>
                        </div>
                        <Label htmlFor={"deskripsi"} value={"Isi Artikel"} />

                        <ReactQuill
                          theme="snow"
                          value={formArticle.deskripsi}
                          onChange={handleArticleDescriptionChange}
                          className="mt-1 mb-4"
                        />

                        <Label htmlFor={"tanggal"} value={"Tanggal"} />

                        <input
                          type="date"
                          id="tanggal"
                          name="tanggal"
                          defaultValue={formArticle.tanggal}
                          placeholder="Masukkan tanggal.."
                          onChange={handleArticleInputChange}
                        />

                        <Label htmlFor={"image"} value={"Gambar"} />
                        <div className="flex flex-col items-center justify-center w-full py-4 mt-2 mb-4 h-full border-2 rounded-2xl bg-gray-50 shadow border-gray-300">
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="object-top w-56 h-52 mb-4 object-cover rounded-xl border-2 border-gray-300"
                            />
                          )}

                          <label
                            htmlFor="image"
                            className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                              !previewImage && "h-32"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className="flex items-center gap-2 mb-2">
                                <svg
                                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
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
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Unggah gambar di sini
                                  </span>
                                </p>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="image"
                              type="file"
                              className="hidden"
                              onChange={handleArticleImageChange}
                            />
                          </label>
                        </div>
                      </Modal.Body>
                      <Modal.Footer
                        action={modalType === "add_article" ? "Tambah" : "Ubah"}
                        onAction={
                          modalType === "add_article"
                            ? handleAddArticle
                            : handleUpdateArticle
                        }
                        onClose={closeModal}
                      />
                    </>
                  )}

                  {modalType === "delete_article" && (
                    <>
                      <Modal.Header
                        title="Hapus Artikel"
                        onClose={closeModal}
                      />
                      <Modal.Body>
                        <p>Apakah Anda yakin ingin menghapus artikel ini?</p>
                      </Modal.Body>
                      <Modal.Footer
                        action="Hapus"
                        onAction={handleDeleteArticle}
                        onClose={closeModal}
                      />
                    </>
                  )}
                </Modal>
              </div>

              <ArticleList
                articles={currentArticles}
                role="admin"
                openModal={openModal}
              />

              <Pagination
                articlesPerPage={articlesPerPage}
                totalArticles={searchResult.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminArtikel;
