import React, { createContext, useState, useContext, useCallback } from "react";
import {
  getArticleTags,
  addArticleTag,
  updateArticleTag,
  deleteArticleTag,
} from "../../../services/article-tag.service";

const ArticleTagContext = createContext();

export const useArticleTag = () => useContext(ArticleTagContext);

export const ArticleTagProvider = ({ children }) => {
  const [articleTags, setArticleTags] = useState([]);

  const fetchArticleTags = useCallback(() => {
    getArticleTags((data) => {
      setArticleTags(data);
    });
  }, []);

  const addTag = useCallback((newTag, callback) => {
    addArticleTag(newTag, (data) => {
      setArticleTags((prevTags) => [data, ...prevTags]);
      if (callback) callback(data);
    });
  }, []);

  const updateTag = useCallback((id, updatedTag, callback) => {
    updateArticleTag(id, updatedTag, (data) => {
      setArticleTags((prevTags) =>
        prevTags.map((tag) => (tag.id === id ? data : tag))
      );
      if (callback) callback(data);
    });
  }, []);

  const deleteTag = useCallback((id, successCallback, errorCallback) => {
    deleteArticleTag(
      id,
      () => {
        setArticleTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
        if (successCallback) successCallback();
      },
      errorCallback
    );
  }, []);

  return (
    <ArticleTagContext.Provider
      value={{
        articleTags,
        fetchArticleTags,
        addTag,
        updateTag,
        deleteTag,
      }}
    >
      {children}
    </ArticleTagContext.Provider>
  );
};
