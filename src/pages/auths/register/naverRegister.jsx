import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "Zn5JnI_lZiRttfFL7uTR";
const REDIRECT_URI = "https://h.princip.es";
const STATE = "RightChain";
export const NAVER_AUTH_URI = `https://nid.naver.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&response_type=code`;

export const registerWithNaver = async (code, navigate, setLoading) => {
  try {
    const tokenResponse = await axios.post(
      "https://h.princip.es/api/v1/auth/naver/register/",
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

const NaverRegister = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      registerWithNaver(code, navigate, setLoading);
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
        <a href={NAVER_AUTH_URI}>네이버로 회원가입하기</a>
      </div>
    </>
  );
};

export default NaverRegister;
