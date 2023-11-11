import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "127265cef17dc44834bc915935e7f20d";
const REDIRECT_URI = "https://h.princip.es";
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const registerWithKakao = async (code, navigate, setLoading) => {
  try {
    const tokenResponse = await axios.post(
      "https://h.princip.es/api/v1/auth/kakao/register/",
      { code }
    );

    const accessToken = tokenResponse.response.body.token.access_token;
    //const refreshToken = tokenResponse.data.refresh_token;

    localStorage.setItem("accessToken", accessToken);
    //localStorage.setItem("refreshToken", refreshToken);

    if (tokenResponse.data.status === "200") {
        navigate("./mailRegister");
    }

    setLoading(false);

    navigate("/");
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
  }
};

const KakaoRegister = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      registerWithKakao(code, navigate, setLoading);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="KaKaoBtn">
        <a href={KAKAO_AUTH_URI}>카카오로 회원가입하기</a>
      </div>
    </>
  );
};

export default KakaoRegister;
