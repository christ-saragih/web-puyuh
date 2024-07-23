import { PiShareFatFill } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

const ArticleItemBody = (props) => {
  const { id, judul, deskripsi, penulis, tanggal } = props;
  const formattedDate = formatDate(tanggal);

  return (
    <div className="flex flex-col w-full xl:w-[70%]">
      <div className="px-3 flex-grow">
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
          <Link to={`/artikel/${id}`}>{judul}</Link>
        </h3>
        <p>{deskripsi}</p>
      </div>

      <div className="bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 mt-3 ">
        <div className="w-9 h-9 text-slate-800  rounded-full">
          <LiaUserEditSolid className="w-full h-full" />
        </div>
        <div className="flex ms-2 flex-col grow">
          <span className="font-medium mb-[2px]">{penulis}</span>
          <span className="text-sm opacity-[85%]">{formattedDate}</span>
        </div>

        <Link
          to={`/artikel/${id}`}
          className="w-10 h-10 bg-[#4B241A] text-white rounded-full p-2"
        >
          <PiShareFatFill className="w-full h-full" />
        </Link>
      </div>
    </div>
  );
};

export default ArticleItemBody;
