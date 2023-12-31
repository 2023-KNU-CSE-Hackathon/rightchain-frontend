import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import * as S from "./style";
import GoogleIcon from "../../../assets/images/icon/google.png";
import KakaoIcon from "../../../assets/images/icon/kakao.png";
import NaverIcon from "../../../assets/images/icon/naver.png";
import AuthLoginTitle from "../../../components/auths/authLogin/AuthLoginTitle";
import AuthLoginForm from "../../../components/auths/authLogin/AuthLoginForm";
import AuthSocialButton from "../../../components/auths/authSocialButton/AuthSocialButton";
import { useRecoilState } from "recoil";
import { userState } from "../../../context/authState";
import { KAKAO_AUTH_URI, NAVER_AUTH_URI } from "./OAuthProperties";

export default function AuthLogin() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [loginData, setLoginData] = useState({
    email: "",
    pwd: ""
  });

  const OnClickSocialLogin = async (platform) => {
    if (platform === "kakao") {
      window.location.href = KAKAO_AUTH_URI;
    } else if (platform === "naver") {
      window.location.href = NAVER_AUTH_URI;
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, pwd } = loginData;

    if (email === "" || pwd === "") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    axios
    .post("/auth/login", {
      email: email,
      password: pwd,
    })
    .then(function (response) {
        if (response.status === 200) {
          const accessToken = response.data.response.body.token.access_token;
          localStorage.setItem("access_token", accessToken);
  
          navigate("/");
          alert("로그인이 완료되었습니다.");
        } else {
          alert("비밀번호를 다시 입력해주세요!");
        }
    }).catch(function (error) { 
      alert("비밀번호를 다시 입력해주세요!");
      navigate("/login");
    })
  };

  return (
    <>
      <S.AuthWrapper>
        <S.AuthForm onSubmit={handleSubmit}>
          <AuthLoginTitle />
          <AuthLoginForm
            handleInputChange={handleInputChange}
            loginData={loginData}
          />

          <S.AuthButtonWrapper>
            <S.AuthButton type="submit">RIGHT CHAIN !</S.AuthButton>
            <S.UnderButtonTextWrapper>
              &nbsp;&nbsp;
              <S.UnderButtonText
                onClick={() => {
                  navigate("/auth/create");
                }}
              >
                회원가입
              </S.UnderButtonText>{" "}
              | &nbsp;&nbsp;
              <S.UnderButtonText
                onClick={() => {
                  navigate("/auth/reset");
                }}
              >
                비밀번호 초기화
              </S.UnderButtonText>
            </S.UnderButtonTextWrapper>

           

            <S.SocialButtonContainer>
              <AuthSocialButton
                onClick={() => {
                  OnClickSocialLogin("kakao");
                }}
                imgSrc={KakaoIcon}
                altText="카카오 로고"
                // buttonText="Kakao 로그인"
              />
              <AuthSocialButton
                onClick={() =>{
                  OnClickSocialLogin("naver");
                }}
                imgSrc={NaverIcon}
                altText="네이버 로고"
                
              />
              </S.SocialButtonContainer>
          </S.AuthButtonWrapper>
        </S.AuthForm>
      </S.AuthWrapper>
    </>
  );
}
