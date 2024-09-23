import { Dropdown } from "flowbite-react";
import ArticleList from "../../components/common/ArticleList";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getArticles } from "../../services/article.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getArticles((data) => {
      setArticles(data);
      setFilteredArticles(data);
    });
  }, []);

  const searchQuery = searchParams.get("search") || "";

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
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <GuestLayouts>
      <div className="w-[90%] mx-auto my-12 lg:my-16 grow">
        <h2 className="font-bold text-center text-3xl lg:text-4xl mb-6 tracking-wide lg:leading-normal">
          Ingin Tahu Lebih Banyak? <br /> Jelajahi Artikel Terbaik Kami!
        </h2>

        {/* DATA ARTIKEL */}

        <div className="mb-10 sm:mb-14 lg:mb-16">
          <div className="max-w-lg mx-auto">
            <div className="flex rounded-2xl shadow">
              <div className="flex-shrink-0">
                {/* <Dropdown label={"Semua"} dismissOnClick={false}>
                  <Dropdown.Item>Semua Status</Dropdown.Item>
                  <Dropdown.Item>Segera</Dropdown.Item>
                  <Dropdown.Item>Proses</Dropdown.Item>
                  <Dropdown.Item>Selesai</Dropdown.Item>
                </Dropdown> */}
              </div>

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
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <ArticleList articles={filteredArticles} role="guest" />
      </div>
      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default Article;
