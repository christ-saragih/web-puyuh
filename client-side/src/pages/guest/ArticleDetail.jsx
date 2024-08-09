import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import Footer from "../../components/guest/Footer";
import { LiaUserEditSolid } from "react-icons/lia";
import { getArticleById } from "../../services/article.service";
import { formatDate } from "../../utils/formatDate";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleById(slug, (data) => {
      setArticle(data);
    });
  }, [slug]);

  if (!article) {
    return <div>Data artikel tidak ditemukan!</div>;
  }
  console.log(article);
  const formattedDate = formatDate(article.tanggal);

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 bg-[#F5F5F5] text-slate-800 p-2 rounded-full">
              <LiaUserEditSolid className="w-full h-full ml-[2px]" />
            </div>
            <div>
              <p className="font-semibold text-xl text-[#3E3232]">
                {article.penulis}
              </p>
              <p className="text-[#3E3232] opacity-90">{formattedDate}</p>
            </div>
          </div>

          <div className="text-center my-8">
            <h2 className="font-bold text-3xl mb-6">{article.judul}</h2>
          </div>

          <div className="flex justify-center gap-3">
            {article.Tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-32 max-w-fit px-2 rounded-3xl"
              >
                #{tag.nama}
              </div>
            ))}
          </div>
        </div>

        <div className="px-16 h-[30rem] mt-16 mb-8">
          <img
            // src={`http://localhost:3000/api/artikel/image/${article.gambar}`}
            src={article.gambar}
            alt="Artikel"
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl mb-4 font-semibold">{article.tag}</h3>
          <p>{article.deskripsi}</p>
        </div>
      </GuestLayout>

      <Footer />
    </>
  );
};

export default ArticleDetail;
