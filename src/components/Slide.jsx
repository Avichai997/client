import { useEffect } from 'react';
import { useSwiperSlide } from 'swiper/react';

const Slide = ({
  id,
  url,
  activeSlides,
  setActiveSlides,
}) => {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide.isActive;
  const slideIsLoaded = activeSlides[id]; // the current loading status of the slide. true || false


  useEffect(() => {
    // save slide as active only if the slide is currently visited and not active
    if (isActive && slideIsLoaded === false) {
      setActiveSlides((state) => ((state[id] = true), {...state}));
    } else if (isActive && slideIsLoaded) {
      console.log('slide Loaded');
    }
  }, [isActive, slideIsLoaded, setActiveSlides, id]);

  // useEffect(() => {
    // const iframe = document.getElementById('test');
    // const url = iframe.src;
    // iframe.src = 'about:blank';
    // setTimeout((iframe, url) => {
    //     iframe.src = url;
    // }, 10);
  // }, []);

  return (
    <>
      <iframe src={activeSlides[id] ? url : ''} title={id}></iframe>
    </>
  );
};

export default Slide;
