
import GuestLayouts from "../../layouts/GuestLayouts";
import { getArticleBySlug } from "../../services/article.service";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleBySlug(slug, (data) => {
      setArticle(data);
    });
  }, [slug]);

  if (!article) {
    return <div>Data artikel tidak ditemukan!</div>;
  }

  return (
    <GuestLayouts>
      <div className="w-[90%] mx-auto my-12 lg:my-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 bg-[#F5F5F5] text-slate-800 p-2 rounded-full">
              <LiaUserEditSolid className="w-full h-full ml-[2px]" />
            </div>
            <div>
              <p className="font-semibold text-xl text-[#3E3232]">
                {article.penulis}
              </p>
              <p className="text-[#3E3232] opacity-90">
                {formatDate(article.tanggal)}
              </p>
            </div>
          </div>

          <div className="text-center my-8">
            <h2 className="font-bold text-3xl mb-6">{article.judul}</h2>
          </div>

          <div className="flex justify-start lg:justify-center gap-3 overflow-auto">
            {article.Tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-28 lg:min-w-32 max-w-fit px-3 rounded-3xl"
              >
                #{tag.nama}
              </div>
            ))}
          </div>
        </div>

        <div className="h-[14rem] lg:px-16 lg:h-[30rem] mt-16 mb-8">
          <img
            src={`http://localhost:3000/api/artikel/image/${article.gambar}`}
            alt="Artikel"
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>

        <div className="format max-w-3xl mx-auto">
          <p dangerouslySetInnerHTML={{ __html: article.deskripsi }}></p>
        </div>
      </div>

      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default ArticleDetail;
