// import React from 'react';
// import styled from 'styled-components';
// import NotificationSystem from './NotificationSystem';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const HeaderContainer = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
// `;

// const BackButton = styled.button`
//   background-color: black;
//   color: white;
//   padding: 10px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: 20px;
// `;

// const Title = styled.h1`
//   // 스타일 추가
// `;



// function Header() {
//   return (
//     <HeaderContainer>
//       <BackButton>뒤로</BackButton>
//       <Title>객체 감지 페이지</Title>
//       <NotificationSystem />
//     </HeaderContainer>
//   );
// }

// export default Header;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';





function Header() {
  const navigate = useNavigate();

  const handleNotification = () => {
    toast.info("새로운 알림이 있습니다!");
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <button onClick={() => navigate('/main')}>뒤로 가기</button>
      <h1>객체 검출 페이지</h1>
      <button onClick={handleNotification}>
        🔔
      </button>
    </header>
  );
}

export default Header;