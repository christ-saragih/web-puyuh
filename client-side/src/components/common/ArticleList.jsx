import ArticleItem from "./ArticleItem";

const ArticleList = (props) => {
  const { articles, role, openModal } = props;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 xl:gap-x-14 xl:gap-y-10">
      {articles.map((article) => (
        <ArticleItem key={article.id} {...article} role={role} openModal={openModal} />
      ))}
    </div>
  );
};

export default ArticleList;
