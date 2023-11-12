import React, { useEffect, useState } from "react";
import { FileDrop } from "react-file-drop";
import MDEditor from "@uiw/react-md-editor";

import axios from "../../../api/axios";
import * as S from "./style";
import "./mdEditorStyle.css";

import * as AIS from "../../ai/style";
import { userState } from "../../../context/authState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import CommuntiyDetailPageType from "../../../components/community/communtiyDetailPageType/CommuntiyDetailPageType";

function SuggestionCreate() {
  const navigate = useNavigate();
  // ai\
  const [currentAiOption, setCurrentAiOption] = useState("");

  const [url, setUrl] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const [title, setTitle] = useState(""); // 제목
  const [value, setValue] = useState("**신고접수를 위한 사건 내용을 작성해주세요**");

  const [boardColor, setBoardColor] = useState(false);

  // ai목록 불러오기
  useEffect(() => {
    
  }, []);

  const handleClickWirte = async () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    try {
      const data = {
        title: title,
        content: value,
      };

      const response = await axios.post("/reports", data);

      if (response.status === 200) {
        alert("신고 리포트 작성이 완료되었습니다.");
        navigate("/");
      }
    } catch (e) {
      alert("신고 리포트 작성을 실패하였습니다.");
    }
  };

  return (
    <>
      <AIS.AiServiceDetailCommentWrap>
        <CommuntiyDetailPageType type={`suggestion`} aiName={null} />

        <S.SelcetorWrapper>
          <div>
            <S.SelcetorDescriptionText style={{ color: "#ACACAC" }}>
              ❗️신고접수는 수정 및 삭제가 불가합니다. 신중한 작성 부탁드립니다.
            </S.SelcetorDescriptionText>
          </div>
        </S.SelcetorWrapper>
        <S.CommunityCreateTitle
          placeholder="제목을 입력해주세요."
          maxLength="100"
          onChange={e => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <FileDrop
          onDragOver={() => setBoardColor(true)}
          onDragLeave={() => setBoardColor(false)}
        >
          <MDEditor
            height={"400px"}
            value={value}
            onChange={setValue}
            preview="edit"
            data-color-mode="light"
          />
        </FileDrop>
        {/* // 작성완료버튼 */}
        <S.ButtonWrapper>
          <S.CommunityCreateButton onClick={handleClickWirte}>
            작성완료
          </S.CommunityCreateButton>
        </S.ButtonWrapper>
      </AIS.AiServiceDetailCommentWrap>
    </>
  );
}

export default SuggestionCreate;
