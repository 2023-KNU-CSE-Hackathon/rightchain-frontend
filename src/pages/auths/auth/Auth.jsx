import React from "react";
import * as S from "./style";
import Banner from "../../../components/common/banner/Banner";
import { Outlet, useLocation} from "react-router-dom";

function Auth() {
  const location = useLocation();

  let titleCaseKorean;
  let titleCaseEnglish;
  switch (location.pathname) {
    case '/auth/create':
      titleCaseKorean = '회원가입';
      titleCaseEnglish = 'JOIN MEMBERSHIP'
      break;
    case '/auth/oauth/create':
      titleCaseKorean = '소셜 회원가입';
      titleCaseEnglish = 'JOIN MEMBERSHIP'
      break;
    case '/auth/reset':
      titleCaseKorean = '비밀번호 초기화';
      titleCaseEnglish = 'RESET PASSWORD'
      break;
    default:
      titleCaseKorean = '회원가입';
  }
  return (
    <S.AuthWrapper>
      <Banner
        titleKorean={titleCaseKorean}
        titleEnglish={titleCaseEnglish}
        image={<S.AuthIconImg />}
      />
      <S.AuthInfoWrapper>
        <Outlet />
      </S.AuthInfoWrapper>
    </S.AuthWrapper>
  );
}

export default Auth;
