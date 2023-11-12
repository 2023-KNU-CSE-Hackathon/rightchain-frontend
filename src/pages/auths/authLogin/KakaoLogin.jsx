import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
 
function KakaoLogin() {
    const navigate = useNavigate();
    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get("code");
 
    console.log("KAKAO_CODE:", KAKAO_CODE);
 
    const fetchKakaoTokens = async (code) => {
        try {
            const tokenResponse = await axios.post("/oauth/kakao/login?code=" + code);
 
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
    }

    useEffect(() => {
        if (KAKAO_CODE) {
            fetchKakaoTokens(KAKAO_CODE);
        }
    }, []);
 
    return (
        <div>
           Loading...
        </div>
    );
}
 
export default KakaoLogin;