import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style.jsx";
import AboutSection1_Banner from "./AboutSection1/AboutSection1_Banner.png";
import AboutSection1_Smartphone1 from "./AboutSection1/AboutSection1_Smartphone1.png";
import AboutSection1_Smartphone2 from "./AboutSection1/AboutSection1_Smartphone2.png";
import AboutSection1_Ellipse from "./AboutSection1/AboutSection1_Ellipse.png";
import AboutSection1_3d1 from "./AboutSection1/AboutSection1_3d1.png";
import AboutSection1_3d2 from "./AboutSection1/AboutSection1_3d2.png";
import AboutSection1_3d3 from "./AboutSection1/AboutSection1_3d3.png";
import AboutSection1_3d4 from "./AboutSection1/AboutSection1_3d4.png";

import AboutSection2_Person from "./AboutSection2/AboutSection2_Person.png";
import AboutSection2_Earth from "./AboutSection2/AboutSection2_Earth.png";
import AboutSection2_Hand from "./AboutSection2/AboutSection2_Hand.png";
import AboutSection2_Des1 from "./AboutSection2/AboutSection2_Des1.png";
import AboutSection2_Des2 from "./AboutSection2/AboutSection2_Des2.png";

import AboutSection3_TeamMoin from "./AboutSection3/AboutSection3_TeamMoin.png";
import AboutSection3_WhyMoin from "./AboutSection3/AboutSection3_WhyMoin.png";

import AboutSection4_ServiceDetail from "./AboutSection4/AboutSection4_ServiceDetail.png";

import AboutSection5_Title from "./AboutSection5/AboutSection5_Title.png";
import AboutSection5_GotoMain from "./AboutSection5/AboutSection5_GotoMain.png";

import AboutSection6_MoinStory from "./AboutSection6/AboutSection6_MoinStory.png";
import AboutSection6_AboutUs from "./AboutSection6/AboutSection6_AboutUs.png";
import AboutSection6_DGU from "./AboutSection6/AboutSection6_DGU.png";
import AboutSection6_Making from "./AboutSection6/AboutSection6_Making.png";
import AboutUs1 from "./AboutSection6/aboutUs1.jpeg";
import AboutUs2 from "./AboutSection6/aboutUs2.jpg";
import AboutUs3 from "./AboutSection6/aboutUs3.jpeg";
import "./animation.css";

import title from "./Untitled/title.png"
import logo from "./Untitled/logo.png"
import problem from "./Untitled2/problem.png"
import problem2 from "./Untitled2/problem2.png"
import problem3 from "./Untitled2/problem3.png"
import problem4 from "./Untitled2/problem4.png"

function About() {
  const navigate = useNavigate();

  const [position, setPosition] = useState(0);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 60, behavior: "smooth" });
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onScroll() {
    setPosition(window.scrollY);
  }

  const [currentSection, setCurrentSection] = useState("none");
  useEffect(() => {
    getCurrentSection();
  }, [currentSection, position]);

  const Ref_AboutSection1 = useRef();
  const Ref_AboutSection2 = useRef();
  const Ref_AboutSection3_1 = useRef();
  const Ref_AboutSection3_2 = useRef();
  const Ref_AboutSection4 = useRef();
  const Ref_AboutSection5 = useRef();
  const Ref_AboutSection6 = useRef();
  const Ref_AboutSection7 = useRef();

  const getCurrentSection = () => {
    if (position < Ref_AboutSection1.current.offsetTop + 100) {
      setCurrentSection("AboutSection1");
    } else if (
      position >= Ref_AboutSection1.current.offsetTop + 100 &&
      position < Ref_AboutSection2.current.offsetTop + 100
    ) {
      setCurrentSection("AboutSection2");
    } else if (
      position >= Ref_AboutSection2.current.offsetTop + 100 &&
      position < Ref_AboutSection3_1.current.offsetTop + 100
    ) {
      setCurrentSection("AboutSection3_1");
    } else if (
      position >= Ref_AboutSection3_1.current.offsetTop + 100 &&
      position < Ref_AboutSection3_2.current.offsetTop + 100
    ) {
      setCurrentSection("AboutSection3_2");
    } else if (
      position >= Ref_AboutSection4.current.offsetTop + 700 &&
      position < Ref_AboutSection5.current.offsetTop + 100
    ) {
      setCurrentSection("AboutSection5");
    } else if (position >= Ref_AboutSection5.current.offsetTop + 100) {
      setCurrentSection("AboutSection6");
    }
  };

  return (
    <S.AboutWrapper>
      {/* 스마트폰 있는 첫 화면 */}
      <S.AboutSection1 ref={Ref_AboutSection1}>
        <S.AboutSpace />
        <S.AboutSection_Body
          className={currentSection == "AboutSection1" ? "AboutSection1" : ""}
        >
          {/* 제목 */}
          <S.AboutSection1_Title src={title} />
          <S.AboutSection1_logo src={logo} />          
        </S.AboutSection_Body>
      </S.AboutSection1>

      <S.AboutSpace style={{ backgroundColor: "white" }} />

      {/* 모인의 개요 */}
      <S.AboutSection2 ref={Ref_AboutSection2}>
        <S.AboutSection2_Coloring />
        <S.AboutSection2_Coloring />

        <S.AboutSection_Body>
          <S.AboutSection_Img
            className={currentSection == "AboutSection2" ? "AboutSection2" : ""}
            src={problem}
            style={{ width: "90%", top: "50%", left: "50%", zIndex: 0 }}
          />
        </S.AboutSection_Body>
      </S.AboutSection2>

      <S.AboutSpace style={{ backgroundColor: "#382521" }} />

      {/* 모인의 필요성 */}
      <S.AboutSection3 ref={Ref_AboutSection3_1}>
        <S.AboutSection_Img
          className={
            currentSection == "AboutSection3_1" ? "AboutSection3_Fadein" : ""
          }
          src={problem2}
          style={{
            animationDelay: "0.5s",

            width: "100%",
            top: "50%",
            left: "50%"
          }}
        />
      </S.AboutSection3>

      <S.AboutSection3 ref={Ref_AboutSection3_2}>
      </S.AboutSection3>

      <S.AboutSection4 ref={Ref_AboutSection4}>
        <S.AboutSection_Img_r
          src={problem3}
          style={{
            width: "90%"
          }}
        />
      </S.AboutSection4>

      <S.AboutSection5 ref={Ref_AboutSection5}>
        

        {/* 메인페이지로 이동하기 */}
        <S.AboutSection_Img_r
          className={
            currentSection == "AboutSection5" ||
            currentSection == "AboutSection6"
              ? "AboutSection3_Fadein"
              : ""
          }
          src={problem4}
          style={{
            opacity: "0",
            animationDelay: "0.5s",
            width: "100%",
            minWidth: "150px"
          }}
          onClick={() => {
            navigate("/");
          }}
        />
      </S.AboutSection5>

      
    </S.AboutWrapper>
  );
}

export default About;
