import React from 'react';
import styled from 'styled-components';
import NotificationSystem from './NotificationSystem';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const BackButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const Title = styled.h1`
  // 스타일 추가
`;



function Header() {
  return (
    <HeaderContainer>
      <BackButton>뒤로</BackButton>
      <Title>객체 감지 페이지</Title>
      <NotificationSystem />
    </HeaderContainer>
  );
}

export default Header;



