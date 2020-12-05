import { useEffect, useState } from 'react';
import safeAwait from 'safe-await';
import { getRepositories } from '../api';
import { useDebounce } from './useDebounce';

let page = 1;

export const useFetchItems = (
  query: string,
  lastRepositoryId: number | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [debouncedState, setDebouncedState] = useDebounce(query);

  useEffect(() => {
    setDebouncedState(query);
  }, [query]);

  // Debounce query
  useEffect(() => {
    (async function fetchData() {
      if (!debouncedState) {
        setIsLoading(false);
        setHasMoreItems(false);
        setHasError(false);
        setItems([]);

        return;
      }

      setIsLoading(true);

      page = 1;
      const [error, response] = await safeAwait(
        getRepositories(debouncedState, page)
      );

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
    })();
  }, [debouncedState]);

  // Load more
  useEffect(() => {
    (async function fetchData() {
      setIsLoading(true);

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
      }
    })();
  }, [lastRepositoryId]);

  return { isLoading, items, hasMoreItems, hasError };
};
