import React, { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import RepositoryItem from './RepositoryItem';
import { useFetchItems } from '../../hooks/useFetchItems';
import { S } from './styles';
import { isMobile } from '../../constants/isMobile';

const RepositoryListPage = memo(() => {
  const [query, setQuery] = useState('react');
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
              itemSize={isMobile ? 350 : 300}
            >
              {({ index, style }) => {
                if (index === items.length - 1) {
                  return (
                    <div
                      key={items[index].id}
                      style={{
                        ...style,
                        marginTop: 150,
                        marginBottom: 100,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      ref={lastRepositoryRef}
                      data-id={items[index].id}
                    >
                      <RepositoryItem
                        key={`item-${items[index].id}`}
                        name={items[index].name}
                        language={items[index].language}
                        description={items[index].description}
                        stargazersCount={items[index].stargazers_count}
                      />
                    </div>
                  );
                }
                return (
                  <div
                    // @ts-ignore
                    key={items[index].id}
                    style={{
                      ...style,
                      marginTop: 150,
                      marginBottom: 100,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <RepositoryItem
                      key={`item-${items[index].id}`}
                      name={items[index].name}
                      language={items[index].language}
                      description={items[index].description}
                      stargazersCount={items[index].stargazers_count}
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
      <S.Wrapper>
        <S.Input type="text" value={query} onChange={handleQueryChange} />
      </S.Wrapper>
      {renderRepositories()}
    </>
  );
});

export default RepositoryListPage;
