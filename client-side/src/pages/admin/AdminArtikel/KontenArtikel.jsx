import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import InputError from "../../../components/common/InputError";
import Modal from "../../../components/common/Modal";
import MultiSelect from "../../../components/common/MultiSelect";
import ArticleList from "../../../components/common/ArticleList";
import { showToast } from "../../../utils/toast.js";
import { formatDate } from "../../../utils/formatDate";
import {
  addArticle,
  deleteArticle,
  getArticleBySlug,
  getArticles,
  updateArticle,
} from "../../../services/article.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { PiPlusCircle } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";

const KontenArtikel = (props) => {
  const { articleTags } = props;
  const [articles, setArticles] = useState([]);
  const [formArticle, setFormArticle] = useState({
    judul: "",
    penulis: "",
    tags: [],
    deskripsi: "",
    tanggal: "",
    gambar: null,
  });
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [errors, setErrors] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getArticles((data) => {
      setArticles(data);
    });
  }, []);

  useEffect(() => {
    // Update local articles when articleTags change
    setArticles((prevArticles) =>
      prevArticles.map((article) => ({
        ...article,
        Tags: article.Tags.map(
          (tag) => articleTags.find((t) => t.id === tag.id) || tag
        ),
      }))
    );
  }, [articleTags]);

  const articleTagsOption = articleTags.map((articleTag) => ({
    value: articleTag.id,
    label: articleTag.nama,
  }));

  // Input Validation: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formArticle.judul.trim()) {
      newErrors.judul = "Judul artikel wajib diisi";
    }
    if (!formArticle.penulis.trim()) {
      newErrors.penulis = "Nama penulis wajib diisi";
    }
    if (
      !formArticle.deskripsi.trim() ||
      formArticle.deskripsi.replace(/<[^>]*>/g, "").trim() === ""
    ) {
      newErrors.deskripsi = "Isi artikel wajib diisi";
    }
    if (formArticle.tags.length === 0) {
      newErrors.tags = "Pilih setidaknya satu tag";
    }
    if (!formArticle.tanggal) {
      newErrors.tanggal = "Tanggal wajib diisi";
    }
    if (!formArticle.gambar && modalType === "add_article") {
      newErrors.gambar = "Gambar wajib diunggah";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (fieldName) => {
    const fieldNames = {
      judul: "Judul artikel",
      penulis: "Nama penulis",
      tanggal: "Tanggal",
    };

    return `${fieldNames[fieldName] || fieldName} wajib diisi`;
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  // Input Validation: End

  //   CRUD: Start

  const handleArticleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        setFormArticle({ ...formArticle, gambar: file });
        setPreviewImage(URL.createObjectURL(file));
        clearError("gambar");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          gambar: "File harus berupa SVG, PNG, JPG, atau JPEG",
        }));
        // Clear the file input
        e.target.value = null;
      }
    }
  };

  const handleArticleInputChange = (e) => {
    const { name, value } = e.target;
    setFormArticle({
      ...formArticle,
      [name]: value,
    });

    // Validasi input setiap kali ada perubahan
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: getErrorMessage(name),
      }));
    } else {
      clearError(name);
    }
  };

  const handleArticleDescriptionChange = (value) => {
    setFormArticle({
      ...formArticle,
      deskripsi: value,
    });

    // Check if the content is empty or just contains empty paragraphs
    if (!value.trim() || value.replace(/<[^>]*>/g, "").trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        deskripsi: "Isi artikel wajib diisi",
      }));
    } else {
      clearError("deskripsi");
    }
  };

  const articleTagSelected = formArticle.tags.map((articleTag) => ({
    value: articleTag.id,
    label: articleTag.nama,
  }));

  // Modifikasi MultiSelect untuk menangani perubahan
  const handleTagChange = (selectedOptions) => {
    setFormArticle({
      ...formArticle,
      tags: selectedOptions.map((option) => ({
        id: option.value,
        nama: option.label,
      })),
    });

    if (selectedOptions.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tags: "Pilih setidaknya satu tag",
      }));
    } else {
      clearError("tags");
    }
  };

  const handleAddArticle = () => {
    setIsDescriptionFocused(false);

    if (validateForm()) {
      const form = new FormData();
      form.append("judul", formArticle.judul);
      form.append("penulis", formArticle.penulis);
      form.append(
        "tags",
        formArticle.tags.map((articleTag) => articleTag.id)
      );
      form.append("deskripsi", formArticle.deskripsi);
      form.append("gambar", formArticle.gambar);
      form.append("tanggal", formArticle.tanggal);

      addArticle(form, (response) => {
        setArticles([response, ...articles]);
        closeModal();
        showToast("Artikel berhasil ditambahkan");
      });
    }
  };

  const handleUpdateArticle = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("judul", formArticle.judul);
      form.append("penulis", formArticle.penulis);
      form.append(
        "tags",
        formArticle.tags.map((articleTag) => articleTag.id)
      );
      form.append("deskripsi", formArticle.deskripsi);
      form.append("tanggal", formArticle.tanggal);

      if (formArticle.gambar instanceof File) {
        form.append("gambar", formArticle.gambar);
      }

      updateArticle(selectedArticle.id, form, (updateData) => {
        setArticles((prevArticles) =>
          prevArticles.map((item) =>
            item.id === updateData.id ? updateData : item
          )
        );
        closeModal();
        showToast("Artikel berhasil diubah");
      });
    }
  };

  const handleDeleteArticle = () => {
    deleteArticle(selectedArticle.id, () => {
      setArticles(
        articles.filter((article) => article.id !== selectedArticle.id)
      );
      closeModal();
      showToast("Artikel berhasil diubah");
    });
  };
  //   CRUD: End

  // Search: Start
  const searchQuery = searchParams.get("search") || "";
  const currentTab = searchParams.get("tab") || "konten-artikel";

  useEffect(() => {
    if (searchQuery) {
      const filtered = articles.filter((article) =>
        article.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = {};
    if (currentTab) params.tab = currentTab;
    if (value) {
      params.search = value;
    } else {
      params.search = "";
    }
    setSearchParams(params);
  };
  // Search: End

  // Modal: Start
  const openModal = (type, article = null) => {
    setModalType(type);
    setIsModalOpen(true);
    setErrors({}); // Reset errors when opening modal
    if (type === "update_article" && article) {
      setSelectedArticle(article);
      setFormArticle({
        judul: article.judul,
        penulis: article.penulis,
        tags: article.Tags,
        deskripsi: article.deskripsi,
        tanggal: article.tanggal,
        gambar: article.gambar,
      });
      setPreviewImage(
        `http://localhost:3000/api/artikel/image/${article.gambar}`
      );
    } else if (type === "delete_article" && article) {
      setSelectedArticle(article);
    } else if (type === "detail_article" && article) {
      setSelectedArticle(article);
      getArticleBySlug(article.slug, (article) => {
        setFormArticle({
          judul: article.judul,
          penulis: article.penulis,
          tags: article.Tags,
          deskripsi: article.deskripsi,
          tanggal: article.tanggal,
          gambar: article.gambar,
        });
      });
    } else {
      resetForm(); // Reset form for add_article
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    resetForm();
    setErrors({}); // Reset errors when closing modal
  };

  const resetForm = () => {
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
  // Modal: End

  return (
    <>
      <div className="flex mb-6 justify-between">
        <div className="max-w-md grow">
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
                placeholder="Masukkan judul artikel ..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e)}
              />
            </div>
          </div>
        </div>
        <button
          className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
          onClick={() => openModal("add_article")}
        >
          <PiPlusCircle className="w-6 h-6 me-1" />
          <p>Tambah</p>
        </button>

        <Modal
          open={isModalOpen}
          onClose={closeModal}
          size={modalType === "delete_article" ? "sm" : ""}
        >
          {modalType === "detail_article" && (
            <>
              <Modal.Header onClose={closeModal} />
              <Modal.Body>
                <div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F5F5F5] text-slate-800 p-2 rounded-full">
                        <LiaUserEditSolid className="w-full h-full ml-[2px]" />
                      </div>
                      <div>
                        <p className="font-semibold text-xl text-[#3E3232]">
                          {formArticle.penulis}
                        </p>
                        <p className="text-[#3E3232] opacity-90">
                          {formatDate(formArticle.tanggal)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 mb-5">
                      <h2 className="font-bold text-3xl text-center">
                        {formArticle.judul}
                      </h2>
                    </div>

                    <div className="flex gap-3">
                      {formArticle.tags.map((articleTag) => (
                        <div
                          key={articleTag.id}
                          className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-32 max-w-fit px-2 rounded-3xl"
                        >
                          #{articleTag.nama}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-10 h-[24rem] mt-9 mb-8">
                    <img
                      src={`http://localhost:3000/api/artikel/image/${formArticle.gambar}`}
                      alt="Artikel"
                      className="rounded-3xl w-full h-full object-cover"
                    />
                  </div>

                  <div className="format px-11 min-w-full">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: formArticle.deskripsi,
                      }}
                    ></p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer buttonLabel={"Kembali"} onClose={closeModal} />
            </>
          )}

          {(modalType === "add_article" || modalType === "update_article") && (
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
                <Label htmlFor={"article_title"} value={"Judul Artikel"} />
                <Input
                  type={"text"}
                  name={"judul"}
                  placeholder={"Masukkan judul artikel.."}
                  variant={"primary-outline"}
                  value={formArticle.judul}
                  handleChange={handleArticleInputChange}
                  isError={!!errors.judul}
                />
                <InputError message={errors.judul} />

                <Label htmlFor={"penulis"} value={"Nama Penulis"} />
                <Input
                  type={"text"}
                  name={"penulis"}
                  placeholder={"Masukkan nama penulis.."}
                  variant={"primary-outline"}
                  value={formArticle.penulis}
                  handleChange={handleArticleInputChange}
                  isError={!!errors.penulis}
                />
                <InputError message={errors.penulis} />

                <Label htmlFor={"deskripsi"} value={"Isi Artikel"} />
                <div
                  onFocus={() => setIsDescriptionFocused(true)}
                  onBlur={() => setIsDescriptionFocused(false)}
                  className={`react-quill-container ${
                    isDescriptionFocused ? "focus" : ""
                  } ${errors.deskripsi ? "border-red-500" : "border-gray-300"}`}
                >
                  <ReactQuill
                    theme="snow"
                    value={formArticle.deskripsi}
                    onChange={handleArticleDescriptionChange}
                  />
                </div>
                <InputError message={errors.deskripsi} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={"tags"} value={"Tag Artikel"} />
                    <MultiSelect
                      name={"tags"}
                      options={articleTagsOption}
                      defaultValue={articleTagSelected}
                      placeholder={"Pilih tag artikel.."}
                      isError={errors.tags}
                      handleChange={handleTagChange}
                    />
                    <InputError message={errors.tags} />
                  </div>
                  <div>
                    <Label htmlFor={"tanggal"} value={"Tanggal"} />
                    <Input
                      type={"date"}
                      name={"tanggal"}
                      variant={"primary-outline"}
                      value={formArticle.tanggal}
                      handleChange={handleArticleInputChange}
                      isError={!!errors.tanggal}
                    />
                    <InputError message={errors.tanggal} />
                  </div>
                </div>

                <Label htmlFor={"image"} value={"Gambar"} />
                <div className="mb-4">
                  <div
                    className={`flex flex-col items-center justify-center w-full py-4 mt-2 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                      errors.gambar ? "border-red-500" : "border-gray-300"
                    }`}
                  >
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
                          SVG, PNG, JPG atau JPEG
                        </p>
                      </div>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        onChange={handleArticleImageChange}
                        accept=".svg,.png,.jpg,.jpeg"
                      />
                    </label>
                  </div>
                  <InputError message={errors.gambar} />
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
              <Modal.Header title="Hapus Artikel" onClose={closeModal} />
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
        articles={filteredArticles}
        role="admin"
        openModal={openModal}
      />
    </>
  );
};

export default KontenArtikel;
