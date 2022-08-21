import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Dashboards.css';

function Dashboards() {
  return (
    <Swiper
      // spaceBetween={50}
      // slidesPerView={3}
      dir="rtl"
      grabCursor
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      navigation
      loop
      mousewheel
      pagination={{
        dynamicBullets: true,
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      }}
      keyboard={{
        enabled: true,
      }}
      modules={[Navigation, Pagination, Keyboard, Mousewheel]}
      className="dasboardsSwiper"
    >
      <SwiperSlide>
        <iframe src="https://go.co.il" title="example"></iframe>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
}

export default Dashboards;
