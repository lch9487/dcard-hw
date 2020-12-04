import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import RepositoryItem from './RepositoryItem';

const RepositoryListPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=40&page=1`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
          },
        }
      );

      setRepositories(response.data.items);
    };

    if (!!query) {
      fetchData();
    }
  }, [query]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const renderRepositories = () => {
    if (repositories.length > 0) {
      return repositories.map((repository) => (
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
