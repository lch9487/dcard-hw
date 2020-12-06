import React, { FC } from 'react';
import { S } from './styles';

export interface Props {
  width: number;
  height: number;
}

const PlaceHolder: FC<Props> = ({ width, height }) => (
  <S.PlaceHolder width={width} height={height} />
);

export default PlaceHolder;
