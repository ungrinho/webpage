import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSidebar } from '../context/SidebarContext'; // 경로 수정
import { getAuth, signOut } from 'firebase/auth';

// const SidebarContainer = styled.div`
//   width: 200px;
//   background-color: #4CAF50;
//   padding: 10px;
//   left: 0;
//   top: 0;
//   bottom: 0; /* Sidebar가 화면 전체 높이를 차지하게 함 */
//   z-index: 1000; /* 다른 요소 위에 레이어를 설정 */
//   position: fixed;

//   @media (min-width: 768px) {
//     width: 200px; /* 화면 너비가 768px 이상일 때 사이드바 너비 조정 */
//   }
// `;

// const LogoutButton = styled.button`
//   display: block; /* Block 요소로 변경하여 위 아래 패딩을 주기 위함 */
//   background-color: #f44336;
//   color: white;
//   padding: 10px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: auto; /* 자동으로 남은 공간을 아래로 둠 */
// `;

const SidebarContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  position: fixed;
  width: 199px;
  height: 100vh; /* 화면 전체 높이를 차지하게 함 */
  background: #CFF7D3;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 4px 4px -1px rgba(12, 12, 13, 0.1), 0px 4px 4px -1px rgba(12, 12, 13, 0.05);
  border-radius: 8px;
  z-index: 1000;

  @media (min-width: 768px) {
    width: 200px; /* 화면 너비가 768px 이상일 때 사이드바 너비 조정 */
  }
`;

const LogoutButton = styled.button`
  display: block;
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto; /* 자동으로 남은 공간을 아래로 둠 */
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 24px;
  gap: 24px;
  margin-left: 240px; /* 사이드바를 고려한 마진 */

  @media (min-width: 1024px) {
    margin-left: 220px;
  }
`;




const Sidebar = () => {
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu } = useSidebar();
  const auth = getAuth();

  const onLogoutClick = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate(menu);
  };

  return (
    <SidebarContainer>
      <h2>MENU</h2>
      <ul>
        <li><Link to="/main" onClick={() => handleMenuClick('/')}>홈 화면</Link></li>
        <li><Link to="/manage" onClick={() => handleMenuClick('/main')}>관제 페이지</Link></li>
        <li><Link to="/obj" onClick={() => handleMenuClick('/obj')}>객체 확인 페이지</Link></li>
        <li><Link to="/cs" onClick={() => handleMenuClick('/cs')}>CS 페이지</Link></li>
      </ul>
      <LogoutButton onClick={onLogoutClick}>로그아웃</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
