import { PiShareFatFill, PiUserCircleFill } from "react-icons/pi";
import Artikel from "../../assets/images/artikel.png";
import { LiaUserEditSolid } from "react-icons/lia";

const ArticleItem = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 xl:gap-x-14 xl:gap-y-8">
      <div className="flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
        <div className="w-full xl:w-[30%] h-44 xl:h-auto rounded-xl overflow-hidden">
          <img src={Artikel} alt="Artikel" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col w-full xl:w-[70%]">
          <div className="px-3 flex-grow">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              Judul ipsum dolor sit.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae nihil dolor necessitatibus error
            </p>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 mt-3 ">
            <div className="w-9 h-9 text-slate-800  rounded-full">
              <LiaUserEditSolid className="w-full h-full" />
            </div>
            <div className="flex ms-2 flex-col grow">
              <span className="font-medium mb-[2px]">Bennefit</span>
              <span className="text-sm opacity-[85%]">16 Juli 2024</span>
            </div>

            <div className="w-10 h-10 bg-[#4B241A] text-white rounded-full p-2">
              <PiShareFatFill className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
        <div className="w-full xl:w-[30%] h-44 xl:h-auto rounded-xl overflow-hidden">
          <img src={Artikel} alt="Artikel" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col w-full xl:w-[70%]">
          <div className="px-3 flex-grow">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              Judul ipsum dolor sit amet.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae nihil dolor necessitatibus error
            </p>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 mt-3 ">
            <div className="w-9 h-9 text-slate-800  rounded-full">
              <LiaUserEditSolid className="w-full h-full" />
            </div>
            <div className="flex ms-2 flex-col grow">
              <span className="font-medium mb-[2px]">Natan</span>
              <span className="text-sm opacity-[85%]">16 Juli 2024</span>
            </div>

            <div className="w-10 h-10 bg-[#4B241A] text-white rounded-full p-2">
              <PiShareFatFill className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
        <div className="w-full xl:w-[30%] h-44 xl:h-auto rounded-xl overflow-hidden">
          <img src={Artikel} alt="Artikel" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col w-full xl:w-[70%]">
          <div className="px-3 flex-grow">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              Judul ipsum dolor sit amet.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae nihil dolor necessitatibus error
            </p>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 mt-3 ">
            <div className="w-9 h-9 text-slate-800  rounded-full">
              <LiaUserEditSolid className="w-full h-full" />
            </div>
            <div className="flex ms-2 flex-col grow">
              <span className="font-medium mb-[2px]">Jonathan</span>
              <span className="text-sm opacity-[85%]">16 Juli 2024</span>
            </div>

            <div className="w-10 h-10 bg-[#4B241A] text-white rounded-full p-2">
              <PiShareFatFill className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap">
        <div className="w-full xl:w-[30%] h-44 xl:h-auto rounded-xl overflow-hidden">
          <img src={Artikel} alt="Artikel" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col w-full xl:w-[70%]">
          <div className="px-3 flex-grow">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              Judul ipsum dolor consectetur.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              incidunt aut temporibus quam obcaecati!
            </p>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 mt-3 ">
            <div className="w-9 h-9 text-slate-800  rounded-full">
              <LiaUserEditSolid className="w-full h-full" />
            </div>
            <div className="flex ms-2 flex-col grow">
              <span className="font-medium mb-[2px]">Iqbal</span>
              <span className="text-sm opacity-[85%]">16 Juli 2024</span>
            </div>

            <div className="w-10 h-10 bg-[#4B241A] text-white rounded-full p-2">
              <PiShareFatFill className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
