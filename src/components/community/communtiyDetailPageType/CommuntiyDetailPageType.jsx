import React, { useEffect, useState } from "react";
import * as S from "./style";
import RightArrowBlue from "../../../assets/images/icon/rightArrowBlue.png";

function CommuntiyDetailPageType({ type, aiName }) {
  return (
    <S.DetailPageType>
      {aiName && (
        <>
          <S.DetailPageAiText>{aiName}</S.DetailPageAiText>
        </>
      )}
      <S.RightArrowBlueIcon src={RightArrowBlue} />
      <S.DetailPageTypeText>
        {type === "commons"
          ? "자유게시판"
          : type === "tips"
          ? "이용꿀팁"
          : type === "qnas"
          ? "Q&A"
          : type === "suggestion"
          ? "신고접수"
          : type === "notice"
          ? "신고내역"
          : "수정"}
      </S.DetailPageTypeText>
    </S.DetailPageType>
  );
}

export default CommuntiyDetailPageType;
