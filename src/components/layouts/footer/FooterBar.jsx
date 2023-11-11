import React from "react";

import * as S from "./style";
import { CiLocationOn, CiMail, CiInstagram } from "react-icons/ci";

import rightChainLogo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";

function FooterBar() {
  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <S.FooterTitle>Principes</S.FooterTitle>
        <S.FooterBody>
          <S.FooterInfo>
            <CiLocationOn />
            <S.FooterText>대구광역시 북구 대학로 80 경북대학교 스타트업빌리지 8호 (봉사관 1층)</S.FooterText>
          </S.FooterInfo>

          <S.FooterInfo>
            <CiMail />
            <S.FooterText>principes@pricip.es</S.FooterText>
          </S.FooterInfo>

          <S.FooterInfo>
            <CiInstagram />
            <S.FooterText>
              <Link to={`https://h.princip.es/`} target="_blank">
                @Principes
              </Link>
            </S.FooterText>
          </S.FooterInfo>
        </S.FooterBody>
        <S.NavLogo>
          <S.NavLogoIcon src={rightChainLogo} alt="RightChain" />
          <S.NavLogoTitle to={`/`}></S.NavLogoTitle>
        </S.NavLogo>
      </S.FooterContent>
      <S.FooterCopyRight>
        {"@"}Copyright 2023. Principes all rights reserved.
      </S.FooterCopyRight>
    </S.FooterWrapper>
  );
}
export default FooterBar;
