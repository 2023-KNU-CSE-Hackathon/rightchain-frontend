import LoginLogo from "../../../assets/images/moin_logo.png";
import * as S from "./style";

export default function AuthLoginTitle() {
  return (
    <S.LoginTitleWrapper>
      <S.LoginLogo src={LoginLogo} alt="MO:IN" />
      <S.LoginSybTitleText>교권의 보장을 원하는 우리,</S.LoginSybTitleText>
      <S.LoginTitleText>
        <S.LoginTitleStrong>RIGHT CHAIN</S.LoginTitleStrong> 으로 연결되다
      </S.LoginTitleText>
    </S.LoginTitleWrapper>
  );
}
