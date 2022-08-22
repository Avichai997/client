import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Dashboards.css';
import Slide from 'components/Slide';

function Dashboards() {
  const { status, data, error, isFetching } = useQuery(['dashboards']);

  return (
    <Swiper
      dir="rtl"
      grabCursor
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      // watchSlidesProgress={true} // enable 'isVisible' <SwiperSlide> prop
      navigation
      loop
      mousewheel
      keyboard
      pagination={{
        dynamicBullets: true,
        clickable: true,
        renderBullet: function (index, className) {
          return `<div class="${className}">שקופית ${+index + 1}</div>`;
        },
      }}
      modules={[Navigation, Pagination, Keyboard, Mousewheel]}
      className="dasboardsSwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>
        <Slide url="https://portal.shual.org.il/portal/apps/sites/#/portal" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
      <SwiperSlide>
        <Slide url="https://go.co.il" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Dashboards;
