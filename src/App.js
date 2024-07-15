import React, { useEffect, useState, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import PrivateRoute from './components/PrivateRoute';
import GlobalStyle from './styles/GlobalStyle';
import { AuthProvider } from './components/AuthContext';
import axios from 'axios';
import './App.css';



function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact  path="/signup" element={<SignupPage />} />
          <Route exact  
            path="/main"
            element={<MainPage />}
          />
        </Routes>
      </Router>
    </>
  );
}





export default App;







