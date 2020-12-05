import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import RepositoryItem from './RepositoryItem';
import { useFetchItems } from '../../hooks/useFetchItems';

const RepositoryListPage = () => {
  const [query, setQuery] = useState('');
  const [lastRepositoryId, setLastRepositoryId] = useState<number | null>(null);
  const { isLoading, items, hasMoreItems, hasError } = useFetchItems(
    query,
    lastRepositoryId
  );

  const observer = useRef<IntersectionObserver>();
  const lastRepositoryRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreItems) {
          console.log('hi');
          setLastRepositoryId(node.dataset.id);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreItems]
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastRepositoryId(null);
    setQuery(event.target.value);
  };

  const renderRepositories = () => {
    console.log(items);

    if (items.length > 0) {
      return items.map((repository, index) => {
        if (index === items.length - 1) {
          return (
            <div
              // @ts-ignore
              key={repository.id}
              ref={lastRepositoryRef}
              // @ts-ignore
              data-id={repository.id}
            >
              <RepositoryItem
                // @ts-ignore
                name={repository.name}
                // @ts-ignore
                avatarUrl={repository.owner.avatar_url}
                // language: string;
                // description: string;
                // stargazers_count
              />
            </div>
          );
        }

        return (
          <RepositoryItem
            // @ts-ignore
            key={repository.id}
            // @ts-ignore
            name={repository.name}
            // @ts-ignore
            avatarUrl={repository.owner.avatar_url}
            // language: string;
            // description: string;
            // stargazers_count
          />
        );
      });
    }

    return null;
  };

  return (
    <>
      <input type="text" value={query} onChange={handleQueryChange} />
      {renderRepositories()}
    </>
  );
};

export default RepositoryListPage;
