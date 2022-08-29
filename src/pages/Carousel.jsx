import { useState, useEffect } from 'react';
import { useDashboards } from 'hooks/useDashboards';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from 'components/Slide';
import Switch from 'components/Switch';
import {
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
  Thumbs,
  FreeMode,
} from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

function Carousel() {
  const { dashboards } = useDashboards();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [autoLoad, setAutoLoad] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  const changeLoadingStatus = (status) => {
    // on ==> off
    if (autoLoad) {
      setReset(true);
      setAutoLoad(false);
    } else {
      // off ==> on
      setAutoLoad(true);
    }
  };

  const checkReset = () => {
    setResetCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (resetCount === dashboards?.length) {
      setResetCount(0);
      setReset(false);
    }
  }, [resetCount]);

  return (
    <>
      {dashboards && (
        <>
          <Swiper
            dir='rtl'
            grabCursor
            // onSwiper={(swiper) => setSwiper(swiper)}
            // onSlideChange={() => setActiveIndex(swiper?.activeIndex)}
            // watchSlidesProgress={true} // enable 'isVisible' <SwiperSlide> prop
            navigation
            loop
            mousewheel
            keyboard
            thumbs={{ swiper: thumbsSwiper }}
            // pagination={{
            //   dynamicBullets: true,
            //   clickable: true,
            //   renderBullet: function (index, className) {
            //     return `<div class=${className}>${dashboards[index].name}</div>`;
            //   },
            // }}
            modules={[
              Navigation,
              Pagination,
              Keyboard,
              Mousewheel,
              Thumbs,
              FreeMode,
            ]}
            className='swiperTop'
          >
            {dashboards.map((dashboard, index) => (
              <SwiperSlide key={index}>
                <Slide
                  reset={reset}
                  autoLoad={autoLoad}
                  url={dashboard.url}
                  slideIndex={index + 1}
                  onReset={checkReset}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Switch toggleFn={changeLoadingStatus} />

          <Swiper
            onSwiper={setThumbsSwiper}
            loop
            dir='rtl'
            spaceBetween={20}
            slidesPerView={dashboards.length}
            freeMode
            mousewheel
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
            className='swiperBottom'
          >
            {dashboards.map((dashboard, index) => (
              <SwiperSlide key={index}>
                <div>{dashboard.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
}

export default Carousel;
