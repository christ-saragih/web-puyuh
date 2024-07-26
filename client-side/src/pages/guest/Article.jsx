import { useEffect, useState } from "react";
import ArticleList from "../../components/guest/ArticleList";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import { getArticles } from "../../services/article.service";
import Footer from "../../components/guest/Footer";

const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles((data) => {
      // menampilkan urutan artikel yang terbaru -> terlama
      const latestArticles = data.reverse();
      setArticles(latestArticles);
    });
  }, []);

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <ArticleList articles={articles} />
      </GuestLayout>

      <Footer />
    </>
  );
};

export default Article;
