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
    name: "",
    school : ""
  });
  

  const [pwd, setPwd] = useState("");
  const [passwordIsVaild, setpasswordIsVaild] = useState(false);
  const [pwdMatchMessage, setPwdMatchMessage] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [roles, setRoles] = useState([]);
  const [teacherLicenseIsValid, setTeacherLicenseIsValid] = useState(false);
  const [committeeNumberIsValid, setCommitteeNumberIsValid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const roleList = [
    "선생님",
    "학부모/학생",
    "위원회"
  ];

  const navigate = useNavigate();
  useEffect(() => {
    // 데이터 통신해서 API넣기
    setRoles(roleList);
  }, []);

  const handleVerificationCodeChange = e => {
    setVerificationCode(e.target.value);
  };

  const handleEmailVerification = async (event) => {
    event.stopPropagation();
    alert('인증 메일이 발송되었습니다. 이메일을 확인해 주세요.');
    setIsEmailVerified(true);
    try {
      await axios.get('/auth/email-auth/issue', {
        params: { email: user.email }
      });
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('이메일 인증에 실패했습니다.');
    }
  };

  const handleEmailVerificationConfirm = async () => {
    try {
      const response = await axios.get('/auth/email-auth/valid/', {
        params: { email: user.email, code: verificationCode }
      });
  
      if (response.status === 200) {
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('이메일 인증에 실패했습니다. 인증 코드를 확인해주세요.');
      }
    } catch (error) {
      console.error('Email verification confirm failed:', error);
      alert('이메일 인증 확인에 실패했습니다. 인증 코드를 확인해주세요.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (setIsEmailVerified && isEmailVerified) {
      alert('이메일 인증이 완료되었습니다.');
    } 
    else {
      alert('이메일 인증 처리가 되지 않았습니다.')
    }
    // 모든 필수 정보가 입력되었는지 확인
    if (
      user.email &&
      user.password &&
      confirmPwd &&
      user.name &&
      user.role &&
      user.school
    ) {
      try {
        const response = await axios.post("/auth/register/", {
          name: user.name,
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

      <S.emailInputWrapper>
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
        
        <S.AuthButtonWrapper>
        <S.AuthButton>중복확인</S.AuthButton>
        <S.AuthButton onClick = {event => handleEmailVerification(event)}>인증하기</S.AuthButton>
        </S.AuthButtonWrapper>
      </S.emailInputWrapper>

      {/* 이메일 인증이 요청되면 인증 코드 입력 필드와 인증 확인 버튼을 보여줍니다 */}
{isEmailVerified && (
  <S.emailInputWrapper>
    <S.SignUpInputTitleText>인증코드</S.SignUpInputTitleText>
    <S.SignUpInput
      placeholder="인증 코드를 입력해주세요."
      type="text"
      name="verificationCode"
      onChange={handleVerificationCodeChange}
      value={verificationCode}
      isvaild="true"
    />
    <S.AuthButtonWrapper>
    <S.AuthButton onClick={handleEmailVerificationConfirm}>코드인증</S.AuthButton>
    </S.AuthButtonWrapper>
  </S.emailInputWrapper>
)}

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

export default Signup;
