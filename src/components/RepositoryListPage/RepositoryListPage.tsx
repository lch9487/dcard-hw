import React, { ChangeEvent, useState } from 'react';
import RepositoryItem from './RepositoryItem';
import { useFetchItems } from '../../hooks/useFetchItems';

const RepositoryListPage = () => {
  const [query, setQuery] = useState('');
  const { isLoading, items, hasMoreItems, hasError } = useFetchItems(query);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const renderRepositories = () => {
    if (items.length > 0) {
      return items.map((repository) => (
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
      ));
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
