import ArticleList from "../../components/common/ArticleList";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getArticles } from "../../services/article.service";
import { useEffect, useState } from "react";

const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles((data) => {
      setArticles(data);
    });
  }, []);

  return (
    <GuestLayouts>
      <div className="w-[90%] mx-auto my-12 lg:my-16">
        <ArticleList articles={articles} role="guest" />
      </div>
      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default Article;
