import { useLayoutEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';

const useWindowSize = (debounce = 100) => {
  const [size, setSize] = useState([0, 0]);
  const debounceSize = useDebounce(size, debounce);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return debounceSize;
};

export default useWindowSize;
