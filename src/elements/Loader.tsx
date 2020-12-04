import React, { useCallback, useEffect, useRef } from 'react';

const Loader = () => {
  const loader = useRef(null);

  const loadMore = useCallback((entries) => {
    const target = entries[0];

    // if (target.isIntersecting) {
    //   !isFetching && fetchData();
    // }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(loadMore, options);

    if (loader && loader.current) {
      observer.observe(loader.current!);
    }

    return () => observer.unobserve(loader.current!);
  }, [loader, loadMore]);
};

export default Loader;
