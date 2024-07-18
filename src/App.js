import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import CSPage from './pages/CSPage';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import GlobalStyle from './styles/GlobalStyle';
import { AuthProvider } from './components/AuthContext';
import { SidebarProvider } from './context/SidebarContext'; 
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppContainer = styled.div`
  display: flex;
`;

const AppContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';
  const isCsPage = location.pathname === '/cs';

  const [imageSrc, setImageSrc] = useState(null);
  const handleImageUpload = (image) => {
    setImageSrc(image);
  };

  return (
    <AppContainer>
      {!isLoginPage && !isSignupPage && <Sidebar />}
      <AppContent>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage/>}/>
          <Route exact path="/main" element={<MainPage />} />
          <Route exact path="/obj" element={<ObjectDetectionPage />} />
          <Route exact path="/cs" element={<CSPage />} />
        </Routes>
      </AppContent>
    </AppContainer>
  );
};

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <AppLayout />
          </Router>
        </SidebarProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}


export default App;
