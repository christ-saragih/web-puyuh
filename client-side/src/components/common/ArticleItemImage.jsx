const ArticleItemImage = (props) => {
  const { gambar } = props;

  return (
    <div className="w-full xl:w-[30%] h-44 xl:h-auto rounded-xl overflow-hidden">
      <img
        // get gambar dari admin
        // src={`http://localhost:3000/api/artikel/image/${gambar}`}

        src={gambar}
        alt="Artikel"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ArticleItemImage;
