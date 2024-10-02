import { useState, useEffect, useCallback } from "react";
import {
  getArticleTags,
  addArticleTag,
  updateArticleTag,
  deleteArticleTag,
} from "../../../services/article-tag.service";

const useArticleTags = () => {
  const [articleTags, setArticleTags] = useState([]);

  const fetchArticleTags = useCallback(() => {
    getArticleTags((data) => {
      setArticleTags(data);
    });
  }, []);

  useEffect(() => {
    fetchArticleTags();
  }, [fetchArticleTags]);

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

  const deleteTag = useCallback((id, callback, errorCallback) => {
    deleteArticleTag(
      id,
      () => {
        setArticleTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
        if (callback) callback();
      },
      errorCallback
    );
  }, []);

  return {
    articleTags,
    fetchArticleTags,
    addTag,
    updateTag,
    deleteTag,
  };
};

export default useArticleTags;
