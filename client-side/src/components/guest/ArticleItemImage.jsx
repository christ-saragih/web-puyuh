import Artikel from "../../assets/images/artikel.png";

const ArticleItemImage = (props) => {
  const { gambar } = props;

  return (
    <div className="w-full xl:w-[30%] h-44 xl:h-auto rounded-xl overflow-hidden">
      <img
        src="../../assets/images/artikel.png"
        alt="Artikel"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ArticleItemImage;
