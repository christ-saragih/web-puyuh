const ArticleItemImage = (props) => {
  const { gambar } = props;

  return (
    <div className="w-full xl:w-[30%] h-44 xl:min-h-full xl:h-52 rounded-xl overflow-hidden">
      <img
        src={`http://localhost:3000/api/artikel/image/${gambar}`}

        // GET gambar dari seeder
        // src={gambar}
        alt="Artikel"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ArticleItemImage;
