import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
function Signup() {
  //유저 이메일, 직군, 비밀번호, 닉네임, 한줄소개 입력받음
  // 이를 위한 유저 useState 객체 생성
  const [user, setUser] = useState({
    email: "",
    role: "",
    password: "",
    // name: "",
    school : ""
  });
  

  const [pwd, setPwd] = useState("");
  const [passwordIsVaild, setpasswordIsVaild] = useState(false);
  const [pwdMatchMessage, setPwdMatchMessage] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [roles, setRoles] = useState([]);
  const [teacherLicenseIsValid, setTeacherLicenseIsValid] = useState(false);
  const [committeeNumberIsValid, setCommitteeNumberIsValid] = useState(false);

  const roleList = [
    "TEACHER",
    "학부모/학생",
    "COMMITTEE"
  ];

  // api요청용 roleList를 변환하는 함수

  const convertRoleToRole = e => {
    switch(e) {
        case "선생님":
            return "TEACHER";
        case "학부모/학생":
            return "USER";
        case "위원회":
            return "COMMITTEE";
        default:
            return "";
    }
}


  const navigate = useNavigate();
  useEffect(() => {
    // 데이터 통신해서 API넣기
    setRoles(roleList);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    // 모든 필수 정보가 입력되었는지 확인
    if (
      user.email &&
      user.password &&
      confirmPwd &&
      // user.name &&
      user.role &&
      user.school
    ) {
      try {
        const response = await axios.post("/auth/register", {
          // name: user.name,
          email: user.email,
          password: user.password,
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

  // 비밀번호 입력
  const handlePwd = e => {
    e.preventDefault();
    const password = e.target.value;
    setPwd(password);
    setUser({ ...user, password: password });

    // Password strength validation
    const hasMinLength = password.length >= 8;
    const hasValidCombination =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{2,}$/.test(password);
    if (hasMinLength && hasValidCombination) {
      setpasswordIsVaild(true);
    } else {
      setpasswordIsVaild(false);
    }
  };

  // 비밀번호 확인 입력
  const handleConfirmPwd = e => {
    e.preventDefault();
    const confirmedPassword = e.target.value;
    setConfirmPwd(confirmedPassword);

    // Password confirmation validation
    if (confirmedPassword !== pwd) {
      setPwdMatchMessage("동일하지 않은 비밀번호입니다 :(");
    } else {
      setPwdMatchMessage("확인 완료되었습니다 :)");
    }
  };

  const handleTeacherLicense = e => {
    e.preventDefault();
    const teacherLicense = e.target.value;

    setTeacherLicenseIsValid(teacherLicense === '123456');
  }

  const handleCommitteeNumber = e => {
    e.preventDefault();
    const committeeNumber = e.target.value;

    setCommitteeNumberIsValid(committeeNumber === '654321');
  }

  return (
    <S.SignUpInputContainer onSubmit={handleSubmit}>

      <S.SignUpInputWrapper>
        {/* --------------- 이메일  --------------- */}
        <S.SignUpInputTitleText>*이메일</S.SignUpInputTitleText>
        <S.SignUpInput
          required
          placeholder="이메일을 입력해주세요."
          type="email"
          name="email"
          onChange={e => setUser({ ...user, email: e.target.value })}
          value={user.email}
          isvaild="true"
        />
      </S.SignUpInputWrapper>

      {/* --------------- 비밀번호 입력 --------------- */}

      <S.SignUpInputWrapper>
        <S.SignUpInputTitleText>*비밀번호</S.SignUpInputTitleText>
        <S.SignUpInput
          required
          placeholder="비밀번호"
          type="password"
          name="pwd"
          onChange={handlePwd}
          value={pwd}
          isvaild="true"
        />
        {pwd ? (
          <S.MessageText isvaild={passwordIsVaild ? "true" : "false"}>
            ︎✓ 8자 이상 입력
            <br />✓ 숫자, 영문, 특수문자 포함하여, 2개 이상 조합{" "}
          </S.MessageText>
        ) : (
          ""
        )}
      </S.SignUpInputWrapper>

      {/* --------------- 비밀번호 확인 --------------- */}

      <S.SignUpInputWrapper>
        <S.SignUpInputTitleText>* 비밀번호 확인</S.SignUpInputTitleText>
        <S.SignUpInput
          required
          placeholder="비밀번호 확인"
          type="password"
          name="confirmPwd"
          onChange={handleConfirmPwd}
          value={confirmPwd}
          isvaild={pwd === confirmPwd ? "true" : "false"}
        />
        {confirmPwd ? (
          pwd === confirmPwd ? (
            <S.MessageText isvaild="true">확인 완료</S.MessageText>
          ) : (
            <S.MessageText isvaild="false">
              동일하지 않은 비밀번호입니다 :(
            </S.MessageText>
          )
        ) : (
          ""
        )}
      </S.SignUpInputWrapper>

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

      {/* --------------- 학교 --------------- */}v

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
      
      {/* 선택한 역할에 따른 추가 정보 요청 */}

      {user.role === "TEACHER" && 
        <S.SignUpInputWrapper>
          <S.SignUpInputTitleText>* 교사 자격면허 번호 조회</S.SignUpInputTitleText>
            <S.SignUpInput
                required
                placeholder="교사 면허증 번호를 입력해주세요."
                type="text"
                name="teacherLicense"
                onChange={handleTeacherLicense}
                isvaild={teacherLicenseIsValid ? "true" : "false"}
                />
          {!teacherLicenseIsValid &&
            <S.MessageText isvaild="false">
              면허 번호가 일치하지 않습니다.
            </S.MessageText>
          }
        </S.SignUpInputWrapper>}
      {user.role === "COMMITTEE" && 
        <S.SignUpInputWrapper>
          <S.SignUpInputTitleText>* 위원회 인증 번호 조회</S.SignUpInputTitleText>
            <S.SignUpInput
                required
                placeholder="위원회 인증 번호를 입력해주세요."
                type="text"
                name="committeeNumber"
                onChange={handleCommitteeNumber}
                isvaild={committeeNumberIsValid ? "true" : "false"}
            />
        {!committeeNumberIsValid &&
          <S.MessageText isvaild="false">
            인증 번호가 일치하지 않습니다.
          </S.MessageText>
        }   
        </S.SignUpInputWrapper>}
      <S.AuthSignUpButton type="submit">가입하기</S.AuthSignUpButton>
    </S.SignUpInputContainer>
  );
}

export default Signup;
