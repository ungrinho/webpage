// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSidebar } from '../context/SidebarContext'; // 경로 수정
import { getAuth, signOut } from 'firebase/auth';

const SidebarContainer = styled.div`
  width: 100%;
  background-color: #4CAF50;
  padding: 20px;

  @media (min-width: 768px) {
    width: 200px;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
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
      <h2>메뉴</h2>
      <ul>
        <li><Link to="/main" onClick={() => handleMenuClick('/')}>홈 화면</Link></li>
        <li><Link to="/manage" onClick={() => handleMenuClick('/main')}>관리 페이지</Link></li>
        <li><Link to="/objects" onClick={() => handleMenuClick('/objects')}>객체 확인 페이지</Link></li>
        <li><Link to="/cs" onClick={() => handleMenuClick('/cs')}>CS 페이지</Link></li>
      </ul>
      <LogoutButton onClick={onLogoutClick}>로그아웃</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
