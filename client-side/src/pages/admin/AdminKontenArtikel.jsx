import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminContentContainerLayout from "../../layouts/AdminContentContainerLayout";
import AdminContentLayout from "../../layouts/AdminContentLayout";
import Input from "../../components/common/Input";
import InputSearch from "../../components/common/InputSearch";
import Dropdown from "../../components/common/Dropdown";
import {
  PiBookOpenTextFill,
  PiEyeBold,
  PiNotePencilBold,
  PiPlusCircle,
  PiTagFill,
  PiTrashBold,
} from "react-icons/pi";
import { getArticles } from "../../services/article.service";
import ArticleList from "../../components/common/ArticleList";
import Modal from "../../components/common/Modal";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Label from "../../components/common/Label";
import Pagination from "../../components/common/Pagination";
import { Tabs } from "flowbite-react";
import ActionButton from "../../components/common/ActionButton";
import {
  getArticleTags,
  addArticleTag,
  updateArticleTag,
  deleteArticleTag,
} from "../../services/article-tag.service";

const AdminKontenArtikel = () => {
  const [articles, setArticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const options = ["4", "8", "16", "32", "Semua"];
  const [selectedValue, setSelectedValue] = useState("4");
  const [currentPage, setCurrentPage] = useState(1);
  const [articleTags, setArticleTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTag, setNewTag] = useState("");

  // get data tag artikel
  useEffect(() => {
    getArticleTags((data) => {
      setArticleTags(data);
    });
  }, []);

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

  const handleChange = (e) => {
    setNewTag(e.target.value);
  };

  // get data artikel
  useEffect(() => {
    getArticles((data) => {
      // menampilkan urutan artikel yang terbaru -> terlama
      const latestArticles = data.reverse();
      setArticles(latestArticles);
    });
  }, []);

  // modal logic
  const openModal = (type, tag = null) => {
    setModalType(type);
    setIsModalOpen(true);
    setSelectedTag(tag);
    if (type === "update_article_tag") {
      setNewTag(tag.nama);
    }
  };
  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    setNewTag("");
  };
  // buat size modal delete menjadi lebih kecil
  const modalSize = modalType === "delete" ? "small" : "large";

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
    <AdminContentContainerLayout>
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <AdminContentLayout isHovered={isHovered} setIsHovered={setIsHovered}>
        <div className="flex flex-col gap-8">
          <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
            <h1 className="text-3xl font-semibold">
              Halaman Managemen Artikel
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
              maiores earum magni corrupti nesciunt rem eaque neque, debitis
              molestiae distinctio dolorem inventore. Dolores doloremque unde
              culpa? Sequi aperiam rem molestias?
            </p>
          </div>

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
                  <InputSearch
                    handleChange={(e) => setSearch(e.target.value)}
                  />

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
                  <InputSearch
                    handleChange={(e) => setSearch(e.target.value)}
                  />

                  <button
                    className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
                    onClick={() => openModal("add")}
                  >
                    <PiPlusCircle className="w-6 h-6 me-1" />
                    <p>Tambah</p>
                  </button>

                  <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    size={modalSize}
                  >
                    {modalType === "add" && (
                      <>
                        <Modal.Header
                          title={"Tambah Artikel"}
                          onClose={closeModal}
                        />
                        <Modal.Body>
                          <Label
                            htmlFor={"article_title"}
                            value={"Judul Artikel"}
                          />
                          <Input
                            type={"text"}
                            name={"article_title"}
                            placeholder={"Masukkan judul artikel.."}
                            variant={"primary-outline"}
                            className={"mt-1 mb-4"}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={"author"}
                                value={"Nama Penulis"}
                              />
                              <Input
                                type={"text"}
                                name={"author"}
                                placeholder={"Masukkan nama penulis.."}
                                variant={"primary-outline"}
                                className={"mt-1"}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={"article_tags"}
                                value={"Tag Artikel"}
                              />
                              <Input
                                type={"text"}
                                name={"article_tags"}
                                placeholder={"Masukkan tag artikel.."}
                                variant={"primary-outline"}
                                className={"mt-1 mb-4"}
                              />
                            </div>
                          </div>
                          <Label
                            htmlFor={"article_description"}
                            value={"Isi Artikel"}
                          />
                          <ReactQuill
                            value={articleContent}
                            onChange={setArticleContent}
                            modules={{
                              toolbar: [
                                [
                                  { header: "1" },
                                  { header: "2" },
                                  { font: [] },
                                ],
                                [{ size: [] }],
                                [
                                  "bold",
                                  "italic",
                                  "underline",
                                  "strike",
                                  "blockquote",
                                ],
                                [
                                  { list: "ordered" },
                                  { list: "bullet" },
                                  { indent: "-1" },
                                  { indent: "+1" },
                                ],
                                ["link", "image", "video"],
                                ["clean"],
                              ],
                            }}
                            formats={[
                              "header",
                              "font",
                              "size",
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                              "list",
                              "bullet",
                              "indent",
                              "link",
                              "image",
                              "video",
                            ]}
                            className="mt-1 mb-4"
                          />
                          <Label
                            htmlFor={"article_image"}
                            value={"Gambar Artikel"}
                          />
                          <div className="flex items-center justify-center w-full mt-1">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </Modal.Body>
                        <Modal.Footer action={"Tambah"} onClose={closeModal} />
                      </>
                    )}

                    {modalType === "detail" && (
                      <>
                        <Modal.Header
                          title={"Detail Artikel"}
                          onClose={closeModal}
                        />
                        <Modal.Body className={"md:pb-6"}>
                          Halaman Detail Artikel
                        </Modal.Body>
                      </>
                    )}

                    {modalType === "update" && (
                      <>
                        <Modal.Header
                          title={"Ubah Artikel"}
                          onClose={closeModal}
                        />
                        <Modal.Body>
                          <Label
                            htmlFor={"article_title"}
                            value={"Judul Artikel"}
                          />
                          <Input
                            type={"text"}
                            name={"article_title"}
                            placeholder={"Masukkan judul artikel.."}
                            variant={"primary-outline"}
                            className={"mt-1 mb-4"}
                            value={"Harum vivo campana absconditus."}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={"author"}
                                value={"Nama Penulis"}
                              />
                              <Input
                                type={"text"}
                                name={"author"}
                                placeholder={"Masukkan nama penulis.."}
                                variant={"primary-outline"}
                                className={"mt-1"}
                                value={"Olivia Braun"}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={"article_tags"}
                                value={"Tag Artikel"}
                              />
                              <Input
                                type={"text"}
                                name={"article_tags"}
                                placeholder={"Masukkan tag artikel.."}
                                variant={"primary-outline"}
                                className={"mt-1 mb-4"}
                                value={"#stultus . #amoveo . #caritas"}
                              />
                            </div>
                          </div>
                          <Label
                            htmlFor={"article_description"}
                            value={"Isi Artikel"}
                          />
                          <ReactQuill
                            value={articleContent}
                            onChange={setArticleContent}
                            modules={{
                              toolbar: [
                                [
                                  { header: "1" },
                                  { header: "2" },
                                  { font: [] },
                                ],
                                [{ size: [] }],
                                [
                                  "bold",
                                  "italic",
                                  "underline",
                                  "strike",
                                  "blockquote",
                                ],
                                [
                                  { list: "ordered" },
                                  { list: "bullet" },
                                  { indent: "-1" },
                                  { indent: "+1" },
                                ],
                                ["link", "image", "video"],
                                ["clean"],
                              ],
                            }}
                            formats={[
                              "header",
                              "font",
                              "size",
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                              "list",
                              "bullet",
                              "indent",
                              "link",
                              "image",
                              "video",
                            ]}
                            className="mt-1 mb-4"
                          />
                          <Label
                            htmlFor={"article_image"}
                            value={"Gambar Artikel"}
                          />
                          <div className="flex items-center justify-center w-full mt-1">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </Modal.Body>
                        <Modal.Footer action={"Ubah"} onClose={closeModal} />
                      </>
                    )}

                    {modalType === "delete" && (
                      <>
                        <Modal.Header
                          title={"Hapus Artikel"}
                          onClose={closeModal}
                        />
                        <Modal.Body>
                          {/* Konten untuk delete artikel */}

                          <p>Apakah Anda yakin ingin menghapus artikel ini?</p>
                        </Modal.Body>
                        <Modal.Footer action={"Hapus"} onClose={closeModal} />
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
      </AdminContentLayout>
    </AdminContentContainerLayout>
  );
};

export default AdminKontenArtikel;
