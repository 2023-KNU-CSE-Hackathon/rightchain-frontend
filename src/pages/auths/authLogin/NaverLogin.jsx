import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
 
function NaverLogin() {
    const navigate = useNavigate();
    const PARAMS = new URL(document.location).searchParams;
    const NAVER_CODE = PARAMS.get("code");
 
    console.log("NAVER_CODE:", NAVER_CODE);
 
    const fetchKakaoTokens = async (code) => {
        try {
            const tokenResponse = await axios.post("/oauth/naver/login?code=" + code);
 
            if (tokenResponse.status === 200) {
                const accessToken = tokenResponse.data.body.token.access_token;
                
                localStorage.setItem("access_token", accessToken);
                navigate("/");
            } else if (tokenResponse.status === 401) {
                navigate("../register/naverRegister");
            }
 
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    }

    useEffect(() => {
        if (NAVER_CODE) {
            fetchKakaoTokens(MAVER_CODE);
        }
    }, []);
 
    return (
        <div>
           Loading...
        </div>
    );
}
 
export default NaverLogin;