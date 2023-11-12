import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import NavBarTranslate from "./NavBarTranslate";

import { AiOutlineMenu } from "react-icons/ai";
import { BsChevronCompactRight } from "react-icons/bs";

import * as S from "./style";
import { userState } from "../../../context/authState";
import RightChinLogo from "../../../assets/images/logo.png";

import { LanguageAtom } from "../../../recoil/LanguageAtom";

export default function NavBar() {

  const [language, setLanguage] = useRecoilState(LanguageAtom);

  const getLanguageNum = () => {
    if (language == "KOR") {
      return 0;
    } else {
      return 1;
    }
  };

  //사이드바 열고 닫는 함수
  
  const sideBar = useRef();
  const sideBarBackground = useRef();

  const sideBarOpen = () => {
    sideBar.current.style.display = "flex";
    sideBarBackground.current.style.display = "block";
  };

  const sideBarClose = () => {
    sideBar.current.style.display = "none";
    sideBarBackground.current.style.display = "none";
  };

  const menuContents = [
    {
      link: `/community`,
      title: ["사건상세", "Detail"]
    },
    {
      link: `/notice`,
      title: ["공지사항", "Notice"]
    },
    {
      link: `/suggestion`,
      title: ["신고접수", "Suggestion"]
    },
    {
      link: `/about`,
      title: ["서비스 소개", "About"]
    }
  ];

  //위치가 바뀔때마다
  const location = useLocation();
  useEffect(() => {
    if (isMobile) {
      sideBarClose();
    }
    window.scrollTo(0, 0);
  }, [location]);

  const setMenu = () => {
    return menuContents.map((menu, idx) => (
      <S.NavLink
        to={menu.link}
        key={idx}
        $isActive={location.pathname.startsWith(menu.link)}
      >
        {menu.title[getLanguageNum()]}
      </S.NavLink>
    ));
  };

  const [isMobile, setisMobile] = useState(false);

  //윈도우가 550px 이하면  모바일버전을 연다
  const resizingHandler = () => {
    if (window.innerWidth < 550) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  };


  useEffect(() => {
    if (window.innerWidth <= 550) {
      setisMobile(true);
    }
    window.addEventListener("resize", resizingHandler);

    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  // 로그인 정보 불러오기
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    console.log("storedToken:", storedToken);
    if (storedToken) {
      axios.get("/auth/info", {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).then(response => {
        setUserInfo(response.data);
      }).catch(error => {
        console.error("failed to fetch user info:", error.message);
        localStorage.removeItem("access_token");
        setUserInfo(null);
      });
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserInfo(null);
  }

  return (
    <S.NavWrapper>
      <S.NavLogo>
        <S.NavLogoIcon src={RightChinLogo} alt="Right Chain" />
      </S.NavLogo>

      {isMobile ? (
        <>
          <S.NavMobileMenu>
            <AiOutlineMenu size={"3rem"} onClick={sideBarOpen} />
          </S.NavMobileMenu>

          {/* 사이드바 */}
          <S.NavSideBarWrapper ref={sideBar}>
            <S.NavSideBarMenu>
              <S.NavSideBarHeader>
                {userInfo ? (
                  <S.NavLink to={`/mypage`} $isActive={true}>
                    {userInfo.name}
                    {getLanguageNum() == 0 ? " 님" : ""}
                  </S.NavLink>
                ) : (
                  <S.NavLink to={`/login`} $isActive={true}>
                    {getLanguageNum() == 0 ? "로그인하세요!" : "Login!"}
                  </S.NavLink>
                )}
                <BsChevronCompactRight />
              </S.NavSideBarHeader>
              <S.NavSideBarHeader>
                {userInfo ? (
                  <S.NavLink to={`/mypage`} $isActive={true}>
                    {userInfo.name}
                    {getLanguageNum() == 0 ? " 님" : ""}
                  </S.NavLink>
                ) : (
                  <S.NavLink to={`/login`} $isActive={true}>
                    {getLanguageNum() == 0 ? "로그인하세요!" : "Login!"}
                  </S.NavLink>
                )}
                <BsChevronCompactRight />
              </S.NavSideBarHeader>

              <S.NavSideBarBody>{setMenu()}</S.NavSideBarBody>
            </S.NavSideBarMenu>

            <NavBarTranslate />
          </S.NavSideBarWrapper>
          <S.NavSideBarBackground
            ref={sideBarBackground}
            onClick={sideBarClose}
          />
        </>
      ) : (
        <S.NavMonitorMenu>
          {setMenu()}
          {userInfo ? (
            <S.NavLink
              to={`/mypage`}
              $isActive={location.pathname == `/mypage`}
            >
              {getLanguageNum() == 0 ? "마이페이지" : "Mypage"}
            </S.NavLink>
          ) : (
            <S.NavLink to={`/login`} $isActive={location.pathname == `/login`}>
              {getLanguageNum() == 0 ? "로그인" : "Login"}
            </S.NavLink>
          )}
          <NavBarTranslate />
        </S.NavMonitorMenu>
      )}
    </S.NavWrapper>
  );
}
