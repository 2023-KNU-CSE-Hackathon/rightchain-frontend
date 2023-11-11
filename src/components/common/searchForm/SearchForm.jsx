import React, { useState } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";

function SearchForm() {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const changeSearchWord = event => setSearchWord(event.target.value);

  const onSubmit = event => {
    event.preventDefault();
    navigate(`/search?q=${searchWord}`);
  };
  return (
    <S.SearchInputWrapper onSubmit={onSubmit}>
      <AiOutlineSearch size={"2.5rem"} />
      <S.SearchInput
        type="text"
        name="searchWord"
        value={searchWord}
        onChange={changeSearchWord}
        placeholder="찾고싶은 교권 침해 사건을 검색해보세요."
      />
    </S.SearchInputWrapper>
  );
}

export default SearchForm;
