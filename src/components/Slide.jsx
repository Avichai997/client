import { useState, useEffect } from 'react';
import { useSwiperSlide } from 'swiper/react';

const Slide = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    if (swiperSlide.isActive) setIsLoaded(true);
  }, [swiperSlide.isActive]);

  return (
    <>
      <iframe src={isLoaded ? url : ''} title={url}></iframe>;
    </>
  );
};

export default Slide;
