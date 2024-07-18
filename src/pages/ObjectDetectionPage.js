import React from 'react';
import Header from '../components/Header';
import VideoStream from '../components/VideoStream';
import DetectionList from '../components/DetectionList';
import DatePicker from '../components/DatePicker';
import ErrorBoundary from '../components/ErrorBoundary';
import styled from 'styled-components';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoSection = styled.div`
  flex: 1;
  padding: 1rem;
`;

const DetectionSection = styled.div`
  width: 300px;
  padding: 1rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Footer = styled.footer`
  display: flex;
  padding: 1rem;
`;

function ObjectDetectionPage() {
    return (
      <ErrorBoundary>
        <PageContainer>
          <Header />
          <Main>
            <VideoSection>
            <img src='http://192.168.0.13:8080/stream?topic=/usb_cam1/image_raw' alt='nope'></img>
              <VideoStream />
            </VideoSection>
            <DetectionSection>
              <DetectionList />
              <button className="control-page-button">관제 페이지로 이동</button>
            </DetectionSection>
          </Main>
          <Footer>
            <DatePicker />
            <div className="tree-detection-list">
              {/* 나무별 객체 감지 내역 리스트 */}
            </div>
          </Footer>
        </PageContainer>
      </ErrorBoundary>
    );
}
  
export default ObjectDetectionPage;
