import React, {
  ChangeEvent,
  CSSProperties,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import RepositoryItem from './RepositoryItem';
import { useFetchItems } from '../../hooks/useFetchItems';

const RepositoryListPage = memo(() => {
  const [query, setQuery] = useState('');
  const [lastRepositoryId, setLastRepositoryId] = useState<number | null>(null);
  const { isLoading, items, hasMoreItems, hasError } = useFetchItems(
    query,
    lastRepositoryId
  );

  // Infinite scroll
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
    if (items.length > 0) {
      return (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              className="List"
              height={height}
              width={width}
              itemCount={items.length}
              itemSize={163}
            >
              {({ index, style }) => {
                if (index === items.length - 1) {
                  return (
                    <div
                      // @ts-ignore
                      key={items[index].id}
                      style={style}
                      ref={lastRepositoryRef}
                      // @ts-ignore
                      data-id={items[index].id}
                    >
                      <RepositoryItem
                        // @ts-ignore
                        key={`item-${items[index].id}`}
                        // @ts-ignore
                        name={items[index].name}
                        // @ts-ignore
                        avatarUrl={items[index].owner.avatar_url}
                        // language: string;
                        // description: string;
                        // stargazers_count
                      />
                    </div>
                  );
                }
                return (
                  // @ts-ignore
                  <div key={items[index].id} style={style}>
                    <RepositoryItem
                      // @ts-ignore
                      key={`item-${items[index].id}`}
                      // @ts-ignore
                      name={items[index].name}
                      // @ts-ignore
                      avatarUrl={items[index].owner.avatar_url}
                      // language: string;
                      // description: string;
                      // stargazers_count
                    />
                  </div>
                );
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      );
    }

    return null;
  };

  console.count();

  return (
    <>
      <input type="text" value={query} onChange={handleQueryChange} />
      {renderRepositories()}
    </>
  );
});

export default RepositoryListPage;
