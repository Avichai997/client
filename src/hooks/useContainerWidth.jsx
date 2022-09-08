import { useState } from 'react';
import useDebounce from 'hooks/useDebounce';

const useContainerWidth = (debounce = 100) => {
  const [size, setSize] = useState();

  const ref = (element) => {
    element && setSize(element.getBoundingClientRect().width);
  };
  const debounceResize = useDebounce(size, debounce);

  return { width: debounceResize, ref };
};

export default useContainerWidth;
