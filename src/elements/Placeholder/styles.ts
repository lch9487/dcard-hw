import styled from 'styled-components';

interface Props {
  width: number;
  height: number;
}

export const S = {
  PlaceHolder: styled.div<Props>`
    background: linear-gradient(-45deg, #e3dede, #d1cdcd, #c2c0c0, #bab8b8);
    background-size: 400% 400%;
    animation: gradient 1.5s ease infinite;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 8px;
    margin-bottom: 10px;
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `,
};
