import ArticleItem from "./ArticleItem";
import { LuBadgeInfo } from "react-icons/lu";

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
        <div className="flex justify-center ">
          <div
            className="flex items-center w-full max-w-xl px-4 py-3 mb-4  text-[#5766CE] rounded-2xl bg-[#EEEFFA] border border-[#ccd1f0] shadow"
            role="alert"
          >
            <div className="bg-[#5766CE] rounded-xl w-9 h-9 p-[6px] me-2 ">
              <LuBadgeInfo className="w-full h-full text-white" />
            </div>

            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Pemberitahuan!</span> Tidak ada
              artikel yang tersedia.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleList;
