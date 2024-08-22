import ArticleItemBody from "./ArticleItemBody";
import ArticleItemImage from "./ArticleItemImage";

const ArticleItem = (props) => {
  const {
    id,
    slug,
    judul,
    deskripsi,
    penulis,
    gambar,
    tanggal,
    Tags,
    role,
    openModal,
  } = props;
  return (
    <div className="bg-white flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
      <ArticleItemImage gambar={gambar} />
      <ArticleItemBody
        id={id}
        slug={slug}
        judul={judul}
        deskripsi={deskripsi}
        penulis={penulis}
        gambar={gambar}
        tanggal={tanggal}
        Tags={Tags}
        role={role}
        openModal={openModal}
      />
    </div>
  );
};

export default ArticleItem;
