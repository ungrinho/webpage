// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, onAuthStateChanged, browserSessionPersistence, signOut } from 'firebase/auth';
// import { auth } from '../services/firebase';
// import styled from 'styled-components';
// import ErrorMessage from '../components/ErrorMessage';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useFirebase } from "react-redux-firebase";
// import { Redirect } from "react-router-dom"
// import axios from 'axios';



// const LoginContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const Input = styled.input`
//   margin: 10px 0;
//   padding: 10px;
//   width: 300px;
// `;

// const Button = styled.button`
//   margin: 10px 0;
//   padding: 10px;
//   width: 300px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   cursor: pointer;
// `;



// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const LoginPage = React.memo(() => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         console.log("현재 로그인 중인 유저의 uid :", user.uid);
//         localStorage.setItem("uid", user.uid);
        
//         // Spring Boot 백엔드에 UID 저장 요청
//         try {
//           const response = await axios.post('http://localhost:8080/api/saveUID', {
//             uid: user.uid,
//             email: user.email
//           });
//           console.log(response.data);
//         } catch (error) {
//           console.error('Error saving UID:', error);
//         }
//       } else {
//         console.log("로그인 유저가 없습니다!");
//         localStorage.setItem("uid", null);
//       }
//     });
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setPersistence(auth, browserSessionPersistence)
//       .then(() => {
//         console.log(email, password);
//         signInWithEmailAndPassword(auth, email, password).then((user) => {
//           console.log(user);
//           navigate("/main");
//         }).catch(() => {
//           navigate("/");
//         });
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         setError(errorMessage);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await setPersistence(auth, browserSessionPersistence);
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       navigate('/main');
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }




//   return (
//     <LoginContainer>
//       <h2>농장 관리 웹페이지</h2>

//       {error && <ErrorMessage message={error} />}
//       <form onSubmit={handleLogin}>
//         <Input
//           type="email"
//           placeholder="이메일"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Input
//           type="password"
//           placeholder="비밀번호"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit">로그인</Button>
//       </form>
//       <Button onClick={handleGoogleLogin}>구글로 로그인</Button>
//       <Link to="/signup">
//         <Button>회원가입</Button>
//       </Link>
//     </LoginContainer>
//   );
// })

// export default LoginPage;














import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, onAuthStateChanged, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../services/firebase';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFirebase } from "react-redux-firebase";
import { Redirect } from "react-router-dom"
import axios from 'axios';

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

const LoginPage = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("현재 로그인 중인 유저의 uid :", user.uid);
        localStorage.setItem("uid", user.uid);
        
        // Spring Boot 백엔드에 UID 저장 요청
        try {
          const response = await axios.post('http://localhost:8080/api/saveUID', {
            uid: user.uid,
            email: user.email
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error saving UID:', error);
        }
      } else {
        console.log("로그인 유저가 없습니다!");
        localStorage.setItem("uid", null);
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password).then((user) => {
          console.log(user);
          navigate("/main");
        }).catch((error) => {
          console.error('Error signing in:', error);
          setError('아이디나 비밀번호가 잘못되었습니다. 다시 시도해주세요.');
        }).finally(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error('Error setting persistence:', error);
        setError('로그인 중 오류가 발생했습니다.');
        setLoading(false);
      });
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/main');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Google 로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
});

export default LoginPage;
