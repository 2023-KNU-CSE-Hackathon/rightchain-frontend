import React from "react";
import * as S from "./style"; // 해당 컴포넌트에 사용되는 스타일 파일 경로를 임포트해주세요.

import EditDelete from "../editDelete/EditDelete";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import Popup from "../../card/Popup";

import { ProgressBar } from "./ProgressBar";

const CommunityDetailContent = ({ detail, isWriter, id, user, type }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const accessToken = user.accessToken; // 추출한 accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}` // Bearer Token 설정
        };
        if (type == "suggestion") {
          // suggestions/{suggestion_id}
          const response = await axios.delete(`suggestions/${id}`, {
            headers
          });

          if (response.status === 204) {
            navigate("/suggestion");
          }
        } else {
          const response = await axios.delete(`communities/posts/${id}`, {
            headers
          });

          if (response.status === 204) {
            if (type == "suggestion") {
              navigate("/suggestion");
            }
            navigate("/community");
          }
        }
      } catch (e) {}
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [currentChain, setCurrentChain] = useState(null);

  const handleChainClick = (chain) => {
    setCurrentChain(chain);
    setShowPopup(true);
  };

  // edit으로 보내기
  const handleEdit = () => {
    navigate(`/community/edit/${id}`, { state: { detail } });
  };

  const markdown = `${detail.content}<!--rehype:style=font-size: 1.8rem;-->`;

  return (

    <S.DetailWrapper>

      <S.DetailTitleWrapper>

        <S.DetailTitle>{detail.response.title}</S.DetailTitle>
        <EditDelete
          isWriter={isWriter}
          id={id}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isBlue={true}
        />

      </S.DetailTitleWrapper>

      <S.DetailTitleInfoWrapper>

        <S.DetailTitleGrayInfo>작성자 : {detail.response.name[0] + "*" + detail.response.name[2]}</S.DetailTitleGrayInfo>
        <S.DetailTitleGrayInfo>사건번호 :{detail.response.case_num}</S.DetailTitleGrayInfo>
      
      </S.DetailTitleInfoWrapper>

      <S.DetailDiviner></S.DetailDiviner>

      <ReactMarkdown className={"markDown"} children={detail.response.content} />

      <S.DetailDiviner></S.DetailDiviner>

      <S.DetailChainsWrapper>

        <S.DetialChainTitle>
          블록체인 주소
        </S.DetialChainTitle>

        {detail.response.chains.map((chain, index) => (

          <S.DetailChain key={index} onClick={() => handleChainClick(chain)}>

            {index+1}. {chain.wallet_name}

          </S.DetailChain>

        ))}

      </S.DetailChainsWrapper>

        {showPopup && 
          <Popup 
            isOpen={showPopup} 
            content={
              currentChain.wallet_name

            } 
            handleClose={() => setShowPopup(false)} 
          />
        }

        

      {/* <S.DetailContent>
        <div data-color-mode="light">
          <MarkdownPreview source={markdown} />
        </div>
        <S.MarkdownWrapper></S.MarkdownWrapper>
      </S.DetailContent> */}
    </S.DetailWrapper>
  );
};

export default CommunityDetailContent;
