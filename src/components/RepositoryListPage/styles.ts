import styled, { css } from 'styled-components';

const textStyle = css`
  font-size: 24px;
  line-height: 30px;

  @media only screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const S = {
  Wrapper: styled.div`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
    /* background-color: black; */
  `,
  Input: styled.input`
    width: 200px;
    height: 50px;
    margin-top: 80px;
    font-size: 30px;
  `,
  Card: styled.div`
    width: 800px;
    height: 240px;
    padding: 15px;
    border: 1px solid gray;
    box-shadow: 3px 3px 5px 6px #ccc;

    @media only screen and (max-width: 768px) {
      width: 300px;
    }
  `,
  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 15px;
  `,
  Title: styled.span`
    font-size: 36px;
    line-height: 45px;
    color: blue;
    font-weight: 700;

    @media only screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 30px;
    }
  `,
  StarCount: styled.span`
    ${textStyle};
    font-weight: 700;
  `,
  Description: styled.div`
    ${textStyle};
    margin-right: 20px;
    margin-bottom: 15px;
  `,
  Note: styled.span`
    ${textStyle};
    color: gray;
  `,
};
