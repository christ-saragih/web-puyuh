import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import '../../assets/style/index.css';

import slide_image_1 from '../../assets/images/quail.jpg';
import slide_image_2 from '../../assets/images/quail cage.jpg';
import slide_image_3 from '../../assets/images/quail egg.jpg';
import slide_image_4 from '../../assets/images/example-1.jpg';

// Swiper.use([EffectCoverflow, Pagination, Navigation]);

const ImageSlider = (props) => {
  const { className = "" } = props;
    return (
      <div className={ "container " +  className}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          autoplay={{
            delay: 5000,}
          }
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container"
        >
          <SwiperSlide>
            <img src={slide_image_1} alt="slide_image" className='slide-image'  />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_2} alt="slide_image" className='slide-image' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_3} alt="slide_image" className='slide-image' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_4} alt="slide_image" className='slide-image' />
          </SwiperSlide>
  
          <div className="slider-controler">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    );
  }

export default ImageSlider;