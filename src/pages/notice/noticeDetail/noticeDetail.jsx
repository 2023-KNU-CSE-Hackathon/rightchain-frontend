import axios from "../../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import CommuntiyDetailPageType from "../../../components/community/communtiyDetailPageType/CommuntiyDetailPageType";
import CommunityDetailContent from "../../../components/common/communityDetailContent/CommunityDetailContent";import EyeOutlineIcon from "../../../assets/images/icon/eye_outline.png"


function NoticeDetailPage() {
  // type에는 common,tips, qnas 들어갈 수 있음
  const { id } = useParams();
  const [detail, setDetail] = useState();

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    
    try {
      const response = await axios.get(`/reports/${id}`);
      
      if (response.status === 200) {
        setDetail(response.data);
      }
      
    } catch (error) {
    }


  };

  useEffect(() => {
    console.log(detail);
  });

  // 디테일 렌더링
  const renderDetail = () => {
    return !detail ? (
      <>
        <S.DetailDiviner />
      </>
    ) : (
      <>
        <CommunityDetailContent detail={detail} isWriter={false} id={id} />
        <S.DetailDiviner />
      
      </>
    );
  };

  return (
    <S.DetailPageWrapper>
      <CommuntiyDetailPageType type={"notice"} aiName={null} />
      <S.DetailDiviner />
      {renderDetail()}
    </S.DetailPageWrapper>
  );
}

export default NoticeDetailPage;
