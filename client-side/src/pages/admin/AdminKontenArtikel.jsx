import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminContentContainerLayout from "../../layouts/AdminContentContainerLayout";
import AdminContentLayout from "../../layouts/AdminContentLayout";
import Input from "../../components/common/Input";
import InputSearch from "../../components/common/InputSearch";
import Dropdown from "../../components/common/Dropdown";
import { PiPlusBold, PiPlusCircle, PiPlusCircleBold } from "react-icons/pi";
import { getArticles } from "../../services/article.service";
import ArticleList from "../../components/common/ArticleList";

const AdminKontenArtikel = () => {
  const [isHovered, setIsHovered] = useState(false);

  const options = ["10", "20", "30", "40", "Semua"];
  const [selectedValue, setSelectedValue] = useState("10");

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    // Lakukan sesuatu dengan nilai yang dipilih, seperti filtering data
    console.log(`Jumlah data yang dipilih: ${option}`);
  };

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles((data) => {
      // menampilkan urutan artikel yang terbaru -> terlama
      const latestArticles = data.reverse();
      setArticles(latestArticles);
    });
  }, []);

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
            <div className="flex gap-5 mb-6">
              <Dropdown
                options={options}
                label="Tampilkan"
                onOptionSelect={handleOptionSelect}
              />

              <form className="grow">
                <label
                  htmlFor="search-investment"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>

                <InputSearch />
              </form>

              <button className="flex items-center py-2 px-6 bg-blue-800 text-white font-medium rounded-2xl">
                <PiPlusCircle className="w-6 h-6 me-1" />
                <p>Tambah</p>
              </button>
            </div>

            <ArticleList articles={articles} role="admin" />
          </div>
        </div>
      </AdminContentLayout>
    </AdminContentContainerLayout>
  );
};

export default AdminKontenArtikel;
