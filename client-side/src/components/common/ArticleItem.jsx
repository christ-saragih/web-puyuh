import ArticleItemBody from "./ArticleItemBody";
import ArticleItemImage from "./ArticleItemImage";

const ArticleItem = (props) => {
  const { slug, judul, deskripsi, penulis, gambar, tanggal, role, openModal } = props;
  return (
    <div className="bg-white flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
      <ArticleItemImage gambar={gambar} />
      <ArticleItemBody
        slug={slug}
        judul={judul}
        deskripsi={deskripsi}
        penulis={penulis}
        tanggal={tanggal}
        role={role}
        openModal={openModal}
      />
    </div>
  );
};

export default ArticleItem;
