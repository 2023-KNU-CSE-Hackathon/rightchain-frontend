<div><img src="https://capsule-render.vercel.app/api?type=waving&color=0:99cc99,100:009630&height=200&section=header&text=Moin&fontSize=90" /></div>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fgjbae1212%2Fhit-counter&count_bg=%2347AFE9&title_bg=%23229812&icon=&icon_color=%23E7E7E7&title=RightChain&edge_flat=false)](https://hits.seeyoufarm.com)

교육권을 보장하는 우리, **RightChain**으로 연결되다.

# PRINCIPES 팀 소개

**< 팀 명 >** <br>
> Principes (프린키페스)

**< 팀 구성원 >**
| 이름                                         | 전공           | 역할                | Email                |
| -------------------------------------------- | --------------  | -------------------- | -------------------- |
| **이상민** | 컴퓨터학부 심화컴퓨터전공 (23학번) | Backend, Infra | lsmin3388_@naver.com |
| **이현우** | 컴퓨터학부 심화컴퓨터전공 (22학번)      | Frontend | gusdndl03@gmail.com |
| **박재영** | 컴퓨터학부 글로벌소프트웨어전공 (22학번)     | Backend | tae195611@gmail.com |
| **홍봉기** | 컴퓨터학부 심화컴퓨터전공 (23학번)     | Frontend | ghdqhdrl612@knu.ac.kr |


# 1. 제출 타입 및 소개

S타입. 권리 보호를 위한 SW 개발
- 선정주제: 
블록체인을 이용한 교육권 권리침해 신고 처리 과정 투명화 서비스 개발


#  2. 프로젝트 한 줄 설명
교권에 대한 문제가 계속 대두되고 있는 지금 교권을 보장하고 남용되지 않도록 하는 서비스 개발

----
#  3. 프로젝트에 사용된 기술
### 3-1. BackEnd 
SpringBoot 프레임 워크를 제공 하였습니다. JWT를 추가적으로 구현해 인증 및 인가처리를 진행하였고 이 기능을 이용하여 로그인과 같은 여러 인증 처리가 필요한 부분을 구현하였습니다

### 3-2. 인프라
인프라 부분에서는 Certbot, Nginx, Docker로 크게 3부분의 기술을 사용하였습니다.
- Certbot: Certbot에서는 https SSL 인증서를 자동화를 구현하였습니다
- Nginx: SSL관련 인증서를 적용하고, proxy pass를 이용하여 서비스 이용시 발생할 수 있는 보안적 문제를 해결하였습니다.
- Docker: Dockerization을 통하여 서비스가 환경에 영향을 받지 않도록 하고 효과적으로 서비스를 관리 할수 있습니다. 또한 DB는 Volum으로 영속성과 공유성을 보장할수 있습니다.

### 3-3 블록체인
블록체인은 이더리움 클래식(ETC)을 사용하여 서비스에 대해 여러 기능들을 구현할수 있었습니다.
1. 불변성: 서비스에 기록된 여러 절차들에 대해서 추가적인 수정과 삭제가 불가능 하도록 불변성을 제공하였습니다. 서비스에 대한 신뢰도도 높히고 볼변성을 통해 네트워크에 대한 신뢰성도 추가적으로 증가하는 이득을 얻을수 있었습니다.
2. 보안성: 이더리움 클래식은 작업 증명(PoW) 알고리즘을 사용하여 보안을 유지합니다. 이는 네트워크를 안정적으로 유지하고, 이를 통해 사용자들의 트랜잭션을 안전하게 보호합니다.
3. 스마트 컨트랙트: 블록체인 기술을 이용해 계약을 자동화 하고, 중개인 없이 트랜잭션을 이행할 수 있습니다.
4. 분산형 애플리케이션(Dapps): 이더리움 클래식 블록체인 위에서 다양한 분산형 어플리케이션을 개발하고 실행할수 있습니다. 이는 중앙집중형 서비스의 한계를 극복하고, ㅅ용자들이 더욱 투명하고 안전한 서비스를 이용할 수 있도록 해줍니다. 


#  기타
Right Chain API: [Right Chain Service API](https://app.getpostman.com/join-team?invite_code=1bcbe45f5cd1a43460929f18e6e3744b&target_code=079b1e4b79dc7d6067eeb302f2d8fa7b)
> [Right Chain](https://h.princip.es)
> 위 주소를 통해 서비스를 직접 이용해 보실수 있습니다. 만약 접속이 되지 않는다면 시크릿 모드를 이용해주시면 감사하겠습니다.
