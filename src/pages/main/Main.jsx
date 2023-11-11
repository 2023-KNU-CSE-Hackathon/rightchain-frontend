import React, { useState, useEffect } from "react";
import * as S from "./style";

import AiServiceList from "../../components/common/aiServiceList/AiServiceList";
import MainBannerList from "../../components/main/mainBanner/MainBannerList";
import Selector from "../../components/common/selector/Selector";

import { AiOutlineSearch } from "react-icons/ai";
import SearchForm from "../../components/common/searchForm/SearchForm";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/loading/Loading";

import Popup from "../../components/card/Popup"; // 팝업 컴포넌트를 import합니다.
import { Card } from "../../components/card/Card.jsx";

function Main() {
  const [data, setData] = useState([
    {
      id: "2023001",
      title: "침해신고 2023001 처리중",
      category: "대구",
      subcategory: "복현동",
      region: "경북대학교",
      quantity: 1,
      time: 12,
      progress: 0.75,
      wallet: ["0x1234567890123456789012345678901234567890"],
      likes: 0,
  },
  {
    id: 2023002,
    title: "침해신고 2023002 처리중",
    category: "대구",
    subcategory: "복현동",
    region: "경북대학교",
    quantity: 1,
    time: 12,
    progress: 0.75,
    wallet: ["0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890"],
    likes: 0,
},
{
  id: 2023003,
  title: "교권침해 사안 보고 진행중",
  category: "대구",
  subcategory: "복현동",
  region: "경북대학교",
  quantity: 1,
  time: 12,
  progress: 0.75,
  wallet: ["0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890"],
  likes: 0,
},
{
  id: "2023001",
  title: "침해신고 2023001 처리중",
  category: "대구",
  subcategory: "복현동",
  region: "경북대학교",
  quantity: 1,
  time: 12,
  progress: 0.75,
  wallet: ["0x1234567890123456789012345678901234567890"],
  likes: 0,
},
{
id: 2023002,
title: "침해신고 2023002 처리중",
category: "대구",
subcategory: "복현동",
region: "경북대학교",
quantity: 1,
time: 12,
progress: 0.75,
wallet: ["0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890"],
likes: 0,
},
{
id: 2023003,
title: "교권침해 사안 보고 진행중",
category: "대구",
subcategory: "복현동",
region: "경북대학교",
quantity: 1,
time: 12,
progress: 0.75,
wallet: ["0x1234567890123456789012345678901234567890", "0x1234567890123456789012345678901234567890"],
likes: 0,
}

  ]);
  const [count, setCount] = useState(0);
  const [init, setInit] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const getCurrentPage = currentPage => setCurrentPage(currentPage);

  const [popupData, setPopupData] = useState(null); // 팝업 컨텐츠를 저장할 상태를 추가합니다.
  const [isOpen, setIsOpen] = useState(false); // 팝업의 열림/닫힘 상태를 추가합니다.

  // 페이지가 로드될 때 실행되는 함수
  const checkFirstVisit = () => {
    // localStorage에서 isFirst 값을 가져옴
    const isFirstVisit = localStorage.getItem("isFirst");

    if (!isFirstVisit) {
      // isFirst 값이 없으면(처음 들어오는 유저라면) 처리
      localStorage.setItem("isFirst", "true"); // isFirst 값을 저장
      navigate("/about"); // '/about' 페이지로 이동
    }
  };

  // 페이지 로드될 때 checkFirstVisit 함수 실행
  window.onload = checkFirstVisit;

  const SelectorOption = [
    { value: "recent", title: "최신순" },
    { value: "popular", title: "조회순" },
    { value: "like", title: "좋아요순" },
    { value: "rating", title: "평점순" }
  ];
  const [currentOption, setCurrentOption] = useState("recent");
  const getCurrentOption = option => {
    setCurrentOption(option);
  };

  const fetchData = async () => {
    try {
      let Api_Url = `/moin?page=${currentPage}&ordering=${currentOption}`;

      const response = await axios.get(Api_Url);
      setCount(response.data.count);
      setData(response.data.results.slice(0, response.data.results.length));
      setInit(true);
    } catch (e) {}
  };

  const handleOpen = (data) => {
    setPopupData(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLike = () => {
    setPopupData({
      ...popupData,
      likes: popupData.likes + 1,
    })
  }

  // 유저체크
  useEffect(() => {
    checkFirstVisit();
  }, []);

  //옵션, 카테고리 변경
  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [currentOption]);

  //페이지변경
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <MainBannerList />

      <S.MainWrapper>
        <SearchForm />
        <S.MainTitleWrapper>
          <S.MainTitle>
            <AiOutlineSearch size={"25px"} style={{ marginRight: "5px" }} />{" "}
            우리학교는?
          </S.MainTitle>
          <Selector
            options={SelectorOption}
            getCurrentOption={getCurrentOption}
          />
        </S.MainTitleWrapper>
        <Card.Container> {/* 카드 컴포넌트 추가 */}
          {data.map((value, index) => {
            return (
              <Card.Item
                key={index}
                title={value.title}
                category={value.category}
                subcategory={value.subcategory}
                region={value.region}
                quantity={value.quantity}
                time={value.time}
                progress={value.progress}
                onClick={() => handleOpen(value)}
              />
            );
          })}
        </Card.Container>
        <S.MainTitleWrapper>
          <S.MainTitle>
            <AiOutlineSearch size={"25px"} style={{ marginRight: "5px" }} />{" "}
            진행중인 사건
          </S.MainTitle>
          <Selector
            options={SelectorOption}
            getCurrentOption={getCurrentOption}
          />
        </S.MainTitleWrapper>
        <Card.Container> {/* 카드 컴포넌트 추가 */}
          {data.map((value, index) => {
            return (
              <Card.Item
                key={index}
                title={value.title}
                category={value.category}
                subcategory={value.subcategory}
                region={value.region}
                quantity={value.quantity}
                time={value.time}
                progress={value.progress}
                onClick={() => handleOpen(value)}
              />
            );
          })}
        </Card.Container>
        {init ? (
          <>
            <AiServiceList
              data={data}
              count={count}
              currentPage={currentPage}
              getCurrentPage={getCurrentPage}
            />
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </S.MainWrapper>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          content={
            <div>
              <h2>사건번호: {popupData.id}</h2>
              <ul>
                {popupData && popupData.wallet && popupData.wallet.map((address, index) => (
                  <li key={index}>
                    단계 {index+1}: {address}
                  </li>
                ))}
              </ul>
              <button onClick={handleLike}>좋아요</button>
              <p>공감 수: {popupData.likes}</p>
            </div>
          }
          handleClose={handleClose}
          />
      )}
    </>
  );
}


export default Main;