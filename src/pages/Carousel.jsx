import { useState, useEffect, useRef } from 'react';
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
import './Carousel.scss';
import { AdminPanelSettings, TaskAlt } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const swiperRef = useRef();
  const navigate = useNavigate();

  const { dashboards } = useDashboards({
    params: '?sort=order',
  });

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlides, setActiveSlides] = useState({});

  const isEmptyObject = (obj) => {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  };

  const changeLoadingStatus = (isOn) => {
    console.log(swiperRef);
    setActiveSlides((state) => {
      for (let slideId in state) {
        state[slideId] = isOn;
      }
      if (!isOn) {
        const activeSlideIndex = swiperRef.current.swiper.realIndex;
        const activeSlideId = dashboards[activeSlideIndex].id;
        state[activeSlideId] = true;
      }
      return { ...state };
    });
  };

  useEffect(() => {
    if (dashboards && isEmptyObject(activeSlides)) {
      const res = {};
      dashboards.forEach((dashboard) => (res[dashboard.id] = false));
      setActiveSlides(res);
    }
  }, [dashboards, activeSlides]);

  return (
    <>
      {dashboards && (
        <>
          <Swiper
            dir='rtl'
            ref={swiperRef}
            grabCursor
            navigation
            loop
            mousewheel
            keyboard
            thumbs={{ swiper: thumbsSwiper }}
            // onSwiper={(swiper) => setSwiper(swiper)}
            // onSlideChange={() => setActiveIndex(swiper?.activeIndex)}
            // watchSlidesProgress={true} // enable 'isVisible' <SwiperSlide> prop
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
                  id={dashboard.id}
                  url={dashboard.url}
                  activeSlides={activeSlides}
                  setActiveSlides={setActiveSlides}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Tooltip title='Admin Dashboard'>
            <IconButton
              className='carouselAdminBtn'
              onClick={() => navigate('/Admin')}
            >
              <AdminPanelSettings />
            </IconButton>
          </Tooltip>

          <Switch toggleFn={changeLoadingStatus} />

          <Swiper
            onSwiper={setThumbsSwiper}
            loop
            dir='rtl'
            spaceBetween={20}
            slidesPerView={dashboards.length > 10 ? 10 : dashboards.length}
            freeMode
            mousewheel
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
            className='swiperBottom'
          >
            {dashboards.map((dashboard, index) => (
              <SwiperSlide key={index}>
                {activeSlides[dashboard.id] && <TaskAlt />}
                <div>{dashboard.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default Carousel;
