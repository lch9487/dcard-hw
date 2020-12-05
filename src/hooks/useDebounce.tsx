import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (obj: any = null, wait: number = 500) => {
  const [state, setState] = useState(obj);

  const setDebouncedState = (val: any) => {
    debounceFunc(val);
  };

  const debounceFunc = useCallback(
    debounce((prop: string) => {
      setState(prop);
    }, wait),
    []
  );

  return [state, setDebouncedState];
};
