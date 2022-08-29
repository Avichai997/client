import { useState, useEffect } from 'react';
import { useSwiperSlide, useSwiper } from 'swiper/react';

const Slide = ({ url, reset, autoLoad, slideIndex, onReset }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide.isActive;
  const swiper = useSwiper();

  useEffect(() => {
    if (isActive) {
      setIsLoaded(true);
    } else if (reset) {
      setIsLoaded(false);
      onReset();
    }
  }, [swiper.activeIndex, isActive, reset, onReset]);

  useEffect(() => {
    if (autoLoad) {
      setIsLoaded(true);
    }
  }, [autoLoad]);

  return (
    <>
      <iframe src={isLoaded ? url : ''} title={url}></iframe>;
    </>
  );
};

export default Slide;
