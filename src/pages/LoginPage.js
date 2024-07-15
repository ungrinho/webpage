// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from 'firebase/auth';
// import { auth } from '../services/firebase';
// import styled from 'styled-components';
// import ErrorMessage from '../components/ErrorMessage';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useFirebase } from "react-redux-firebase";


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, onAuthStateChanged, browserSessionPersistence, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFirebase } from "react-redux-firebase";
import { Redirect } from "react-router-dom"



const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
`;

// // 새로고침 누르면 다시 로그인 해야하는 코드
// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const firebase = useFirebase();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/main');
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {


//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       navigate('/main');
//     } catch (error) {
//       setError(error.message);
//     }
//   };


const LoginPage = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("유저 있는 부분:", user)
        navigate("/main")
      } else {
        console.log("유저 없는 부분 : 노 유저!")
        navigate("/")
      }
    });
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      console.log(email, password)
      signInWithEmailAndPassword(auth, email, password).then((user) => {
        console.log(user)
        navigate("/main")
      }).catch(() => {
        navigate("/")
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // 세션 지속성 설정
      await setPersistence(auth, browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      // Google 로그인 수행
      await signInWithPopup(auth, provider);
      navigate('/main');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <LoginContainer>
      <h2>농장 관리 웹페이지</h2>

      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </form>
      <Button onClick={handleGoogleLogin}>구글로 로그인</Button>
      <Link to="/signup">
        <Button>회원가입</Button>
      </Link>
    </LoginContainer>
  );
})

export default LoginPage;