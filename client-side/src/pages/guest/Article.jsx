import ArticleItem from "../../components/guest/ArticleItem";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";

const Article = () => {
  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <ArticleItem />
      </GuestLayout>
    </>
  );
};

export default Article;
