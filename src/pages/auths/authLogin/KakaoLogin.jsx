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
            // console.log("tokenResponse: ", tokenResponse);
            if (tokenResponse.status === 200) {
                const accessToken = tokenResponse.data.response.body.token.access_token;
                
                localStorage.setItem("access_token", accessToken);
                navigate("/");
            }

        } catch (error) {
            // console.log("error22: ", error);
            if (error.response.status === 401) {
                // console.log("email: ", error.response.data.response);

                navigate("/auth/oauth/create", { state: { email: error.response.data.response } });
            } else {
                console.error("Error:", error);
            }
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