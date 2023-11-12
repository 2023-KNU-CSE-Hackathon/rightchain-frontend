import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import NavBar from "../../../components/layouts/nabBar/NavBar";

function OAuthSignup() {
  const [user, setUser] = useState({
    email: "",
    role: "",
    name: "",
    school : ""
  });
  
  const [roles, setRoles] = useState([]);

  const roleList = [
    "선생님",
    "학부모/학생",
    "위원회"
  ];
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 데이터 통신해서 API넣기
    setRoles(roleList);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    // 모든 필수 정보가 입력되었는지 확인
    if (
      user.name &&
      user.role &&
      user.school
    ) {
      try {
        user.email = location.state.email;
        const response = await axios.post("/oauth/kakao/register/", {
          email: user.email,
          name: user.name,
          role: user.role,
          school_name: user.school,
        });
        if (response.status === 200) {
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        }
      } catch (error) {
        alert("회원가입에 실패했습니다.");
      }
    } else {
      alert("모든 필수 정보를 입력해주세요.");
    }
  };

  return (
    <S.SignUpInputContainer onSubmit={handleSubmit}>

      <S.emailInputWrapper>
        {/* --------------- 이메일  --------------- */}
        <S.SignUpInputTitleText>*이메일</S.SignUpInputTitleText>
        <S.SignUpInput
          required
          placeholder={ location.state.email }
          type="email"
          name="email"
          isvaild="true"
          disabled
        />
      </S.emailInputWrapper>

      {/* --------------- 이름 --------------- */}

      <S.SignUpInputWrapper>
        <S.SignUpInputTitleText>* 이름</S.SignUpInputTitleText>
        <S.SignUpInput
          required
          placeholder="이름을 입력해주세요."
          type="text"
          name="name"
          onChange={e => setUser({ ...user, name: e.target.value })}
          value={user.name}
          isvaild="true"
        />
      </S.SignUpInputWrapper>

      {/* --------------- 학교 --------------- */}

      <S.SignUpInputWrapper>
        <S.SignUpInputTitleText>* 학교</S.SignUpInputTitleText>
        <S.SignUpInput
          required
          placeholder="소속 학교명을 입력해주세요."
          type="text"
          school="school"
          onChange={e => setUser({ ...user, school: e.target.value })}
          value={user.school}
          isvaild="true"
        />
      </S.SignUpInputWrapper>

      {/* --------------- 역할 --------------- */}

      <S.SignUpInputWrapper>
        <S.SignUpInputTitleText>* 역할</S.SignUpInputTitleText>

        <S.Select
          required
          name="role"
          onChange={e => setUser({ ...user, role: e.target.value })}
          value={user.role}
        >
          <S.Option value="" disabled>
            역할을 선택해주세요.
          </S.Option>
          {roles.map((role, index) => (
            <S.Option key={index} value={role}>
              {role}
            </S.Option>
          ))}
        </S.Select>
      </S.SignUpInputWrapper>
      <S.AuthSignUpButton type="submit">가입하기</S.AuthSignUpButton>
    </S.SignUpInputContainer>
  );
}

export default OAuthSignup;
