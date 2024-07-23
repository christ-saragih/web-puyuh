import { useEffect, useState } from "react";
import ArticleList from "../../components/guest/ArticleList";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import { getArticles } from "../../services/article.service";

const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles((data) => {
      setArticles(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <ArticleList articles={articles} />
      </GuestLayout>
    </>
  );
};

export default Article;
