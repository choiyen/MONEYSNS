# MONEYSNS

자바스크립트를 사용한 팀프로젝트였습니다.

모듈은 삭제하고 첨부하였습니다.

 
백엔드 : 사용 기술은 ajax를 이용한 JDBC 양방향 통신
(직접 함, PHP나 tomcat으로 하려다 삽질 경력있음), node js를
조잡하지만 이용한 서버를 구현하고, 토큰을 이용해 상태유지 
시켰습니다.(확인 안하고 삽질해봤습니다), 
DB도 설계를 담당하였으나,팀장으로써 전달의 착오가 있어서 DB를 연결하여 하나의 로직을 만든 
본래형태는 쓰지 못함...그렇다보니, 회원탈퇴시 DB 자료의 동시삭제
기능을 구현하려 했으나, 연결이 되어있지않아 삭제 시 연쇄적으로 
에러를 만들어내는 문제를 동반하고 말았습니다.

프론트엔드: 
1. 로그인 화면들의 구성.
2. 전체적인 에러를 검수하고 통솔함.
3. Aws를 사용해 인터넷 상에 배포를 하였음.
4. 설계 과정에서 HTML 파일로 만들었던 에러 메시지를, 
모달창을 이용한 에러로 전환함

아쉬운 점
사실 팀 프로젝트를 진행할 당시, 난 목표가 없던 사람이었습니다.
실제로 백엔드든, 프론트엔드든 정해놓지 못했다. 제아무리 풀스텍
개발자가 목표라도 주력 언어 정도는 있는데 언어를 습득해 써먹는
건 자신있는데. 강점이라고 자신있게 말할 만한 언어를 선택하지를 
못한 게 아쉬웠다.
그렇다보니 마크업언어인 HTML, 자바스크립트를 제외하면 설계할땐,
모르던 언어를 1달만에 습득해 서버를 구축했습니다.(물론 그 사이 
동영상은 참고하지 않았고, 도서를 구매하여 습득해 썼었습니다.) 

# 보안해야 할 점

채팅 기능을 구현해야 한다
CLUD의 첫단계인 탈퇴 기능의 데이터 일괄 삭제 버튼 추가.
모든 창을 반응형 로직으로 변경한다.


