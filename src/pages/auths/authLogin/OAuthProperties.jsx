const CLIENT_KAKAO_ID = "127265cef17dc44834bc915935e7f20d";
const REDIRECT_KAKAO_URI = "https://h.princip.es/kakaoLogin";
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_KAKAO_ID}&redirect_uri=${REDIRECT_KAKAO_URI}&response_type=code`;

const CLIENT_NAVER_ID = "Zn5JnI_lZiRttfFL7uTR";
const REDIRECT_NAVER_URI = "https://h.princip.es";
const NAVER_STATE = "RightChain";
export const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_NAVER_ID}&redirect_uri=${REDIRECT_NAVER_URI}&state=${NAVER_STATE}`;