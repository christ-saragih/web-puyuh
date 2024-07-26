import ArticleItemBody from "./ArticleItemBody";
import ArticleItemImage from "./ArticleItemImage";

const ArticleItem = (props) => {
  const { slug, judul, deskripsi, penulis, gambar, tanggal } = props;
  return (
    <div className="flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
      <ArticleItemImage gambar={gambar} />
      <ArticleItemBody
        slug={slug}
        judul={judul}
        deskripsi={deskripsi}
        penulis={penulis}
        tanggal={tanggal}
      />
    </div>
  );
};

export default ArticleItem;
