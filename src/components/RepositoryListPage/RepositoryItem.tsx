import React, { FC } from 'react';
import { S } from './styles';

interface Props {
  name: string;
  language: string;
  description: string;
  stargazersCount: number;
}

const RepositoryItem: FC<Props> = ({
  name,
  language,
  description,
  stargazersCount,
}): JSX.Element => {
  return (
    <S.Card>
      <S.TopWrapper>
        <S.Title>{name}</S.Title>
        <S.StarCount>{stargazersCount}</S.StarCount>
      </S.TopWrapper>
      <S.Description>{description}</S.Description>
      <S.Note>{language}</S.Note>
    </S.Card>
  );
};

export default RepositoryItem;
