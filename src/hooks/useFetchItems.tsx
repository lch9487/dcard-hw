import { useEffect, useState } from 'react';
import safeAwait from 'safe-await';
import { getRepositories } from '../api';

let page = 1;

export const useFetchItems = (
  query: string,
  lastRepositoryId: number | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      if (!query) {
        setIsLoading(false);
        setHasMoreItems(false);
        setHasError(false);
        setItems([]);

        return;
      }

      setIsLoading(true);

      console.log('lastRepositoryId', lastRepositoryId);

      if (lastRepositoryId) {
        const [error, response] = await safeAwait(
          getRepositories(query, ++page)
        );

        if (error) {
          setIsLoading(false);
          setHasMoreItems(false);
          setHasError(true);

          return;
        }

        setItems((prevItems) => [...prevItems, ...response.data.items]);
        setHasMoreItems(response.data.items.length > 0);
        setIsLoading(false);
        setHasError(false);
      } else {
        page = 1;
        const [error, response] = await safeAwait(getRepositories(query, page));

        if (error) {
          setIsLoading(false);
          setHasMoreItems(false);
          setHasError(true);

          return;
        }

        setItems(response.data.items);
        setHasMoreItems(response.data.items.length > 0);
        setIsLoading(false);
        setHasError(false);
      }
    })();
  }, [query, lastRepositoryId]);

  return { isLoading, items, hasMoreItems, hasError };
};
