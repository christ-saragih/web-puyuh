import React from "react";
import ArticleItem from "./ArticleItem";

const ArticleList = (props) => {
  const { articles } = props;
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 xl:gap-x-14 xl:gap-y-8">
      {articles.map((article) => (
        <ArticleItem key={article.id} {...article} />
      ))}
    </div>
  );
};

export default ArticleList;
