import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import DatePickerComponent from '../components/DatePicker';


const PageContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 200px; // Sidebar 너비만큼 여백 추가
  padding: 20px;
  width: calc(100% - 200px); // Sidebar 너비를 제외한 나머지 영역 사용
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const StyledButton = styled.button`
  margin-right: 10px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;



function ObjectDetectionPage() {
  const [detections, setDetections] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadDetections = async () => {
      const data = await fetchObjectDetections(selectedDate);
      setDetections(data);
    };
    loadDetections();
  }, [selectedDate]);

  return (
    <PageContainer>
      <MainContent>
        <Header />
        <ContentWrapper>
          <Column>
            {/* //// 플라스크 주소로 추후 교체!!!!!!!!!! */}
              <img src='http://192.168.0.13:8080/stream?topic=/usb_cam1/image_raw' alt='hhhh'></img>
          </Column>
          <Column>
            <DatePickerComponent 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
            />
          </Column>
        </ContentWrapper>
        <ButtonContainer>
          <Link to="/manage">
            <StyledButton>관제 페이지로 이동</StyledButton>
          </Link>
          <StyledButton>젯봇미니 작동</StyledButton>
        </ButtonContainer>
      </MainContent>
    </PageContainer>
  );
}

// 이 함수는 실제 API 호출로 대체되어야 합니다.
async function fetchObjectDetections(date) {
  // 임시 데이터 반환
  return [
    { id: 1, name: 'Object 1', time: '10:00' },
    { id: 2, name: 'Object 2', time: '11:30' },
  ];
}

export default ObjectDetectionPage;