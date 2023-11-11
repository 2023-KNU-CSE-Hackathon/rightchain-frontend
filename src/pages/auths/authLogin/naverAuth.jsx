// 인가코드 받아오기
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const CLIENT_ID = "Zn5JnI_lZiRttfFL7uTR";
  const REDIRECT_URI = "http://localhost:5173";
  const STATE = "RightChain";
  const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  const [loading, setLoading] = useState(true);

  // 로그인 성공시 MyPage로 이동시키기위해 useNavigate 사용
  const navigate = useNavigate();

  useEffect(() => {
    // 인가코드 받아오기
    const code = new URL(window.location.href).searchParams.get("code");

    const fetchNaverTokens = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      const state = new URL(window.location.href).searchParams.get("state");

      if (code && state) {
        try {
            const toeknResponse = await axios.post(
                "http://localhost:50001/api/v1/oauth/naver/login/callback/",
                {code, state}
            );

            const accessToken = tokenResponse.data.access_token;
            const refreshToken = tokenResponse.data.refresh_token;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            return true;
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
      } 

      return false;
    };

    if (code) {
      fetchTokens();
    } else {
      setLoading(false); // 인가코드 없음
    }
  }, []);

  if (loading) {
    // 로딩 중일 때의 화면 표시
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="KaKaoBtn">
        <a href={NAVER_AUTH_URI}>네이버로 시작하기</a>
      </div>
    </>
  );
};

export default NaverLogin;