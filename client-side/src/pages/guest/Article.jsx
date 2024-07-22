import ArticleList from "../../components/guest/ArticleList";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import { getArticleData } from "../../utils/articleData";

const Article = () => {
  const articles = getArticleData();

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
