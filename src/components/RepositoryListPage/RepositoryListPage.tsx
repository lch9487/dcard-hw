import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import RepositoryItem from './RepositoryItem';
import { useFetchItems } from '../../hooks/useFetchItems';
import { S } from './styles';
import { isMobile } from '../../constants/isMobile';
import Placeholder from '../../elements/Placeholder/Placeholder';

const RepositoryListPage = () => {
  const [query, setQuery] = useState('react');
  const [lastRepositoryId, setLastRepositoryId] = useState<number | null>(null);
  const { isLoading, items, hasMoreItems } = useFetchItems(
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
    if (items.length === 0 && isLoading) {
      return (
        <div
          style={{
            paddingTop: isMobile ? 150 : 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <Placeholder width={isMobile ? 140 : 400} height={25} />
            <Placeholder width={isMobile ? 300 : 800} height={25} />
            <Placeholder width={isMobile ? 140 : 400} height={25} />
            <Placeholder width={isMobile ? 240 : 600} height={25} />
          </div>
        </div>
      );
    }

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
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      ref={lastRepositoryRef}
                      data-id={items[index].id}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <RepositoryItem
                          key={`item-${items[index].id}`}
                          name={items[index].name}
                          language={items[index].language}
                          description={items[index].description}
                          stargazersCount={items[index].stargazers_count}
                        />
                        {isLoading && (
                          <div
                            style={{
                              paddingTop: 50,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <Placeholder
                                width={isMobile ? 140 : 400}
                                height={25}
                              />
                              <Placeholder
                                width={isMobile ? 300 : 800}
                                height={25}
                              />
                              <Placeholder
                                width={isMobile ? 140 : 400}
                                height={25}
                              />
                              <Placeholder
                                width={isMobile ? 240 : 600}
                                height={25}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={items[index].id}
                    style={{
                      ...style,
                      marginTop: 150,
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

  return (
    <>
      <S.Wrapper>
        <S.Input type="text" value={query} onChange={handleQueryChange} />
      </S.Wrapper>
      {renderRepositories()}
    </>
  );
};

export default RepositoryListPage;
