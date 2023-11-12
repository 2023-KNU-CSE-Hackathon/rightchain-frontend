// 인가코드 받아오기
import axios from "../../../api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "127265cef17dc44834bc915935e7f20d";
const REDIRECT_URI = "https://h.princip.es/kakaoLogin";
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const fetchKakaoTokens = async (code) => {
  try {
    // 백엔드로부터 인가 코드를 전달하여 액세스 토큰과 리프레시 토큰 받아오기
    const tokenResponse = await axios.post("/auth/kakao/login", { code });

    setLoading(false); // 데이터 로딩 완료

    // 여기서 원하는 작업을 수행하거나 다른 페이지로 이동
    if (tokenResponse.status === 200) {
      const accessToken = tokenResponse.data.body.token.access_token;

      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } else if (tokenResponse.status === 401) {
      navigate("../register/kakaoRegister");
    }

  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};


export const KakaoLogin = async () => {
  console.log("1 ===================== 1");
  const [loading, setLoading] = useState(true);

  // 로그인 성공시 MyPage로 이동시키기위해 useNavigate 사용
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    
    console.log("=====================");
    console.log("=====================");
    console.log(code);
    console.log("=====================");
    console.log("=====================");

    if (code) {
      fetchKakaoTokens(code);
    } else {
      setLoading(false); // 인가코드 없음
    }
  }, []);

  if (loading) {
    // 로딩 중일 때의 화면 표시
    return <div>Loading...</div>;
  }

  return null; // 로딩 완료 후에는 null을 반환하거나 다른 UI를 렌더링할 수 있습니다.
};

export default KakaoLogin;
