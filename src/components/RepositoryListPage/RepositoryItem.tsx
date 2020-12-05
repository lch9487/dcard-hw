import React, { FC } from 'react';

interface Props {
  xxx?: string;
  name: string;
  avatarUrl: string;
  //   language: string;
  //   description: string;
  //   stargazers_count: number;
}

const RepositoryItem: FC<Props> = ({ xxx, name, avatarUrl }): JSX.Element => {
  return (
    <div key={`xxx-${xxx}`}>
      <h1>{name}</h1>
      <img
        loading="lazy"
        src={avatarUrl}
        alt={`${name}-logo`}
        width={100}
        height={100}
      />
    </div>
  );
};

export default RepositoryItem;
