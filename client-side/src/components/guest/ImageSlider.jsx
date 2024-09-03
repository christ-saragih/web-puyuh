import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { getDocumentation } from "../../services/documentation.service"; // Import layanan yang sudah Anda buat

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "../../assets/style/index.css";

const ImageSlider = ({ className = "" }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getDocumentation((data) => {
      setDatas(data);
    });
  }, []);

  return (
    <div className={"container " + className}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 5000,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
      >
        {datas.map((data, index) => (
          <SwiperSlide key={index}>
            <img
              src={`http://localhost:3000/api/dokumentasi-frontpage/image/${data.image}`}
              alt={data.image}
              className="slide-image"
            />
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
