import React, { FC } from 'react';

interface Props {
  key: number;
  name: string;
  avatarUrl: string;
  //   language: string;
  //   description: string;
  //   stargazers_count: number;
}

const RepositoryItem: FC<Props> = ({ name, avatarUrl }): JSX.Element => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={avatarUrl} alt={`${name}-logo`} width={100} height={100} />
    </div>
  );
};

export default RepositoryItem;
