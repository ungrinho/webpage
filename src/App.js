// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import MainPage from './pages/MainPage';
// import PrivateRoute from './components/PrivateRoute';
// import GlobalStyle from './styles/GlobalStyle';
// import { AuthProvider } from './components/AuthContext';
// import axios from 'axios';
// import './App.css';
// import ObjectDetectionPage from './pages/ObjectDetectionPage'


// function App() {
//   return (
//     <>
//       <GlobalStyle />
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<LoginPage />} />
//           <Route exact  path="/signup" element={<SignupPage />} />
//           <Route exact  
//             path="/main"
//             element={<MainPage />}
//           />
//           <Route exact path="/objects" element={<ObjectDetectionPage />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }





// export default App;



// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import GlobalStyle from './styles/GlobalStyle';
import { AuthProvider } from './components/AuthContext';
import { SidebarProvider } from './context/SidebarContext'; // 경로 수정
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import './App.css';

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

  return (
    <AppContainer>
      {!isLoginPage && !isSignupPage && <Sidebar />}
      <AppContent>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage/>}/>
          <Route exact path="/main" element={<MainPage />} />
          <Route exact path="/objects" element={<ObjectDetectionPage />} />
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
    </>
  );
}


// function App() {
//   return (
//     <>
//       <GlobalStyle />
//       <AuthProvider>
//         <SidebarProvider>
//           <Router>
//             <AppContainer>
//               <Sidebar />
//               <AppContent>
//                 <Routes>
//                   <Route exact path="/" element={<LoginPage />} />
//                   <Route exact path="/signup" element={<SignupPage />} />
//                   <Route exact path="/main" element={<MainPage />} />
//                   <Route exact path="/objects" element={<ObjectDetectionPage />} />
//                 </Routes>
//               </AppContent>
//             </AppContainer>
//           </Router>
//         </SidebarProvider>
//       </AuthProvider>
//     </>
//   );
// }

export default App;
