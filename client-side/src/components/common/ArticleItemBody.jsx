import {
  PiEyeBold,
  PiNotePencilBold,
  PiSailboatLight,
  PiShareFatFill,
  PiTrashBold,
} from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import ActionButton from "./ActionButton";

const extractFirstParagraph = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const firstParagraph = doc.querySelector("p");

  return firstParagraph ? firstParagraph.textContent : "";
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ArticleItemBody = (props) => {
  const {
    id,
    slug,
    judul,
    deskripsi,
    penulis,
    tanggal,
    gambar,
    Tags,
    role,
    openModal,
  } = props;

  const firstParagraphText = extractFirstParagraph(deskripsi);
  const truncatedDeskripsi = truncateText(firstParagraphText, 180);

  return (
    <div className="flex flex-col w-full xl:w-[70%]">
      <div className="px-3 flex-grow">
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 truncate">
          <Link to={`/artikel/${slug}`}>{judul}</Link>
        </h3>
        <p>{truncatedDeskripsi}</p>
      </div>

      <div className="bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 mt-3 ">
        <div className="w-9 h-9 text-slate-800  rounded-full">
          <LiaUserEditSolid className="w-full h-full" />
        </div>
        <div className="flex ms-2 flex-col grow">
          <span className="font-medium mb-[2px]">{penulis}</span>
          <span className="text-sm opacity-[85%]">{formatDate(tanggal)}</span>
        </div>

        <div className="flex gap-2">
          {role === "admin" ? (
            <>
              <ActionButton
                icon={PiEyeBold}
                className={"text-blue-600"}
                tooltip={"Detail"}
                onClick={() => openModal("detail_article", { slug })}
              />
              <ActionButton
                icon={PiNotePencilBold}
                className={"text-yellow-600"}
                tooltip={"Ubah"}
                onClick={() =>
                  openModal("update_article", {
                    id,
                    judul,
                    deskripsi,
                    penulis,
                    tanggal,
                    gambar,
                    Tags,
                  })
                }
              />
              <ActionButton
                icon={PiTrashBold}
                className={"text-red-600"}
                tooltip={"Hapus"}
                onClick={() => openModal("delete_article", { id })}
              />
            </>
          ) : (
            <Link to={`/artikel/${slug}`}>
              <ActionButton
                icon={PiShareFatFill}
                variant={"bg-[#4B241A]"}
                className={"text-white"}
                tooltip={"Detail"}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleItemBody;
