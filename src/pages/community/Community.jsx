import React, { useEffect, useState } from "react";
import * as S from "./style";
import * as AIS from "../ai/style";
import Banner from "../../components/common/banner/Banner";

import CommunityQna from "../../components/community/communityQna/CommunityQna";
import CommunityCommon from "../../components/community/communityCommon/CommunityCommon";
import CommunityTips from "../../components/community/communityTips/CommunityTips";

import { Card } from "../../components/card/detail_card";

function Community() {
  // 탭 기능 구현
  const [currentTab, setCurrentTab] = useState(0);
  const [data, setData] = useState([
    {
      id: "2023001",
      imgSrc: "https://i.namu.wiki/i/fhsBMFdIgnB_D4KHQpaG0n2yk5X26rVpfsYeoIaJxwb3gLbQDJ9C7rgVQEZWKfhUwE0bR_2yT0Y1FCOwkDePJg.webp",
      title: "침해신고 2023001 처리중",
      category: "대구",
      subcategory: "복현동",
      region: "경북대학교",
      quantity: 1,
      time: 12,
      progress: 0.75,
  },
  {
    id: 2023002,
    imgSrc: "https://i.namu.wiki/i/fhsBMFdIgnB_D4KHQpaG0n2yk5X26rVpfsYeoIaJxwb3gLbQDJ9C7rgVQEZWKfhUwE0bR_2yT0Y1FCOwkDePJg.webp",
    title: "침해신고 2023002 처리중",
    category: "대구",
    subcategory: "복현동",
    region: "경북대학교",
    quantity: 1,
    time: 12,
    progress: 0.75,
},
{
  id: 2023003,
  imgSrc: "https://i.namu.wiki/i/fhsBMFdIgnB_D4KHQpaG0n2yk5X26rVpfsYeoIaJxwb3gLbQDJ9C7rgVQEZWKfhUwE0bR_2yT0Y1FCOwkDePJg.webp",
  title: "교권침해 사안 보고 진행중",
  category: "대구",
  subcategory: "복현동",
  region: "경북대학교",
  quantity: 1,
  time: 12,
  progress: 0.75,
},
  ]);

  const tabContents = [
    <CommunityCommon />,
    <CommunityTips />,
    <CommunityQna />
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  return (
    <S.CommunityWrapper>
      <Banner
        titleKorean="사건 상세"
        titleEnglish="DETAIL"
        image={<S.CommunityIconImg />}
      />

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
                onClick={() => handleCardClick(value.id)}
              />
            );
          })}
        </Card.Container>
      
      
    </S.CommunityWrapper>
  );
}

export default Community;
