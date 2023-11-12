import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as S from "./style";
import Banner from '../../components/common/banner/Banner';

function WalletCreate() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://h.princip.es/api/v1/chains/stacks/${id}`, {
      title,
      content
    })
    .then(response => {
      console.log(response);
      alert("지갑이 생성되었습니다.");
      // 성공적으로 지갑이 생성되면 다른 페이지로 이동하거나, 
      // 추가적인 작업을 수행하시면 됩니다.
    })
    .catch(error => {
      console.error("지갑 생성 중 오류가 발생했습니다.", error);
    });
  };

  return (
    <>
      <S.CommunityWrapper>
        <Banner
          titleKorean="지갑 생성"
          titleEnglish="Wallet Create"
          image={<S.CommunityIconImg />}
        />
      </S.CommunityWrapper>
      <div>
        <h1>지갑 생성</h1>
        <form onSubmit={handleSubmit}>
          <label>
            제목:
            <input type="text" value={title} onChange={handleTitleChange} required />
          </label>
          <label>
            내용:
            <textarea value={content} onChange={handleContentChange} required />
          </label>
          <button type="submit">제출</button>
        </form>
      </div>
    </>
  );
}

export default WalletCreate