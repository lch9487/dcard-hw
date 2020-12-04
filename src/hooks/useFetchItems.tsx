import { useEffect, useState } from 'react';
import safeAwait from 'safe-await';
import { getRepositories } from '../api';

export const useFetchItems = (query: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      if (!query) {
        return;
      }

      setIsLoading(true);

      const [error, response] = await safeAwait(getRepositories(query));

      if (error) {
        setHasError(true);
      }

      setItems(response.data.items);
      setHasMoreItems(response.data.items.length > 0);
      setIsLoading(false);
      setHasError(false);
    })();
  }, [query]);

  return { isLoading, items, hasMoreItems, hasError };
};
