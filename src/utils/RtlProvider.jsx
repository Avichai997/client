import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const RtlProvider = ({ children }) => {
  return (
    <CacheProvider value={cacheRtl}>
      {/* <div dir='rtl'>{children}</div> */}
      {children}
    </CacheProvider>
  );
};

export default RtlProvider;
