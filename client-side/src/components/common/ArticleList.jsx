import Alert from "./Alert";
import ArticleItem from "./ArticleItem";

const ArticleList = (props) => {
  const { articles, role, openModal } = props;

  return (
    <>
      {Array.isArray(articles) && articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 xl:gap-x-14 xl:gap-y-10">
          {articles.map((article) => (
            <ArticleItem
              key={article.id}
              {...article}
              role={role}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert message={"Tidak ada artikel yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default ArticleList;
