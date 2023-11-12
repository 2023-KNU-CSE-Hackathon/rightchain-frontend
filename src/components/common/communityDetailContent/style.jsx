import styled from "styled-components";
import colors from "../../../style/theme";

// detailTitle
export const DetailWrapper = styled.div`
  width: 100%
  height: 100%
`
export const DetailTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: #4285f4;
  margin-bottom: 1rem;
`;

export const MarkdownWrapper = styled.div`
  font-size: 1600px; /* 원하는 글자 크기로 수정 */
  /* 다른 스타일 속성도 추가 가능 */
`;

export const DetailTitleInfoWrapper = styled.div`
  display: flex;
  // row
  flex-direction: row;
  margin-bottom: 2rem;
`;

export const DetailTitleWrapper = styled.div`
  display: flex;
  // row

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DetailTitleGrayInfo = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #acacac;
  margin-right: 1rem;
`;
export const DetialChainTitle = styled.div`
  font-size: 1.7rem;
  color: rgba(4, 139, 50, 1);
`;
export const DetailContent = styled.div`
  margin-top: 3.5rem;
  font-size: 2rem;
  font-weight: 400;
  color: #282828;
  line-height: 2.5rem;
  margin-bottom: 2rem;
`;

export const DetailLikeButton = styled.button`
  display: flex;
  /* Orange */
  padding: 2.6rem;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */

  background: ${colors.primary1};
  /* orange */
  width: 25rem;
  height: 2rem;
  font-weight: 600;
  font-size: 2rem;
  color: ${colors.bg};
  border-radius: 4.4rem;
  margin-bottom: 4.1rem;

  &:hover {
    box-shadow: 0rem 0.1rem 1rem ${colors.primary1};
    cursor: pointer; 
  }
`;


export const DetailChainsWrapper = styled.div`
  display: flex;
  // row
  flex-direction: column;
  align-items: flex-start;

  padding : 10px 10px

  position: absolute;
  bottom: 0px;

`

export const DetailChain = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #acacac;
  margin-right: 1rem;
  margin-top : 1rem;
  
  &:hover {
    cursor: pointer; 
  };

`;

export const DetailDiviner = styled.hr`
  width: 100%;
  height: 0.1rem;
  background-color: #eeeff3;
  border: none;
`;


export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  margin-top: 35px;
  border-radius: 5px;
    div:first-child {
      z-index: 1;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background-color: #d9d9d9;
  }
    div:last-child {
      z-index: 2;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background-color: #00a968;

      transform-origin: left;
      transform: scaleX(0);
      transition: all 1s ease-in-out;

`