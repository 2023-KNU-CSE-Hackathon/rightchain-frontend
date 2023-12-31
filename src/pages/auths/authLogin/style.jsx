import { styled, keyframes } from "styled-components";
import colors from "../../../style/theme";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AuthWrapper = styled.div`
  animation: ${fadeInAnimation} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding-top: 10rem;
  margin-bottom: 10rem;
  color: ${colors.black};
`;

export const AuthText = styled.div`
  text-align: center;
  font-size: 3.6rem;
  font-weight: 700;
  margin-bottom: 6rem;
`;
export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AuthInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;
export const AuthInput = styled.input`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: 56rem;
  height: 8rem;
  font-weight: 700;
  padding-left: 3.1rem;
  font-size: 1.8rem;
  color: #ff5d47;
  border-radius: 2.4rem;
  background: #f8f8fa;
  border-radius: 2.4rem;
  &:focus {
    border: 0.2rem solid #ff5d47;
  }
`;

export const AuthButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
export const AuthButton = styled.button`
  display: flex;
  /* Orange */
  padding: 3rem;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */

  background: rgba(4, 139, 50, 1);
  /* orange */
  width: 40rem;
  height: 6rem;
  font-weight: 600;
  font-size: 2.4rem;
  color: ${colors.bg};
  border-radius: 4.4rem;
  margin-bottom: 1rem;
  &:hover {
    box-shadow: 0rem 0.1rem 1rem ${colors.primary1};
    cursor: pointer; 
  }
`;
export const AuthSignUpButton = styled.button`
  display: flex;
  /* Orange */
  padding: 3rem;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 56rem;
  height: 7.5rem;
  font-weight: 700;
  font-size: 2.4rem;
  color: #606067;
`;
export const AuthSignUpButtonDiv = styled.div`
  display: flex;
  /* Orange */
  padding: 3rem;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 56rem;
  height: 7.5rem;
  font-weight: 700;
  font-size: 1.4rem;
  color: #606067;
`;

export const SocialButtonContainer = styled.div`
  display: flex;
  width 50rem;
  padding: 3rem;

`;

export const UnderButtonTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: #606067;
  font-size: 1.8rem;
`;

export const UnderButtonText = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: #606067;
  margin-right: 1rem;
  cursor: pointer;
`;
