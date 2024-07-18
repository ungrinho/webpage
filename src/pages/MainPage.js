import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, onAuthStateChanged, browserSessionPersistence, signOut} from 'firebase/auth';
import YesterdayData from '../components/YesterdayData';


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// const Sidebar = styled.div`
//   width: 100%;
//   background-color: #4CAF50;
//   padding: 20px;

//   @media (min-width: 768px) {
//     width: 200px;
//   }
// `;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 210px;
`;

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   border: 1px solid #ddd;
//   padding: 20px;
//   margin-bottom: 20px;
//   border-radius: 4px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin-left: 210px;
//   @media (min-width: 1024px) {
//     width: calc(50% - 10px);
//     display: inline-block;
//     margin-right: 20px;

//     &:nth-child(2n) {
//       margin-right: 0;
//     }
//   }
// `;

const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 210px;

  @media (min-width: 1024px) {
    width: calc(50% - 10px);
    display: inline-block;
    margin-right: 20px;

    &:nth-child(2n) {
      margin-right: 0;
    }
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


const MainPage = React.memo(() => {
  const navigate = useNavigate();
  const [farmName, setFarmName] = useState('');
  const [robotStatus, setRobotStatus] = useState('');
  const [robotBattery, setRobotBattery] = useState(0);
  const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });
  const [sentSensorData, setSentSensorData] = useState({ temperature: null, humidity: null });
  const [haveToUpdate, setUpdateFlag] = useState(true);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const reconnectAttempts = useRef(0);


  // 로그아웃
  const onLogoutClick = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("현재 로그인 중인 유저의 uid :", user.uid)
        localStorage.setItem("uid", user.uid)
      } else {
        console.log("로그인 유저가 없습니다!")
        localStorage.setItem("uid", null)
      }
    });
  }, [])


  useEffect(() => {

    const ws = new WebSocket('ws://localhost:8765');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setError(null);
      reconnectAttempts.current = 0; 
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('Received data from websocket:', data);
      const tempMatch = data.match(/Temperature:\s*([\d.]+)/);
      const humidityMatch = data.match(/Humidity:\s*([\d.]+)/);

      if (tempMatch && humidityMatch) {
        const temperature = parseFloat(tempMatch[1]);
        const humidity = parseFloat(humidityMatch[1]);

        if (!isNaN(temperature) && !isNaN(humidity)) {
          setSentSensorData({ 
            temperature: temperature.toFixed(1), 
            humidity: humidity.toFixed(1) 
          });
          

        } else {
          console.error('Invalid number in data:', data);
        }
      } else {
        console.error('Invalid data format received:', data);
      }
    };

  }, []);

  // 현재의 온습도와 전송받은 온습도가 다른지를 확인
  useEffect(() =>{

    console.log("NEW :", sentSensorData)
    console.log("OLD :", sensorData)

    sentSensorData.temperature != sensorData.temperature ? setUpdateFlag(true) : setUpdateFlag(false) 
    sentSensorData.humidity != sensorData.humidity ? setUpdateFlag(true) : setUpdateFlag(false) 

  }, [sentSensorData])

  // 확인 후 DB
  useEffect(() =>{

    // console.log("usememo called")
    const { temperature, humidity } = sensorData
    // if (temperature != sensorData.temperature || humidity != sensorData.humidity){
    // axios.post('http://localhost:8080/api/saveData', {
    //   temperature: sensorData.temperature,
    //   humidity: sensorData.humidity
    // })

    //setSensorData

    if(haveToUpdate){
      setSensorData({
        ...sentSensorData
      })
    }
  }, [haveToUpdate])

  // 온습도 업데이트 될 때 마다 저장
  useEffect(() =>{

    // console.log("usememo called")
    console.log("업데이트 값 :", sensorData)
    axios.post('http://localhost:8080/api/saveData', {
      ...sensorData
    }).then((retVal) => {
      console.log("Well Done!", retVal)
    }).catch((retVal) => {
      console.log("Error!", retVal)
    })
    

    //setSensorData

    setUpdateFlag(false)
  }, [sensorData])


  return (
    <MainContainer>
      <Content>
        <Header>
          <input
            type="text"
            placeholder="농장 이름"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
          />
          <div>
            {/* 알림 바 (주석 처리) */}
            {/* <NotificationBar /> */}
          </div>
        </Header>
        <Card>
          <h3>현재 온습도</h3>
          <p>온도: {sensorData.temperature}°C</p>
          <p>습도: {sensorData.humidity}%</p>
          <h3>전날 평균 온습도</h3>
          <YesterdayData />
        </Card>
        <Card>
          <h3>Robot Condition</h3>
          <p>상태: {robotStatus}</p>
          <p>배터리: {robotBattery}</p>
          {/* <p>배터리: {batteryLevel !== null ? `${batteryLevel}%` : 'Loading...'}</p>  // ros 연결 시 다시 ㄱㄱ */}
        </Card>
        <Card>
          <h3>관리 페이지</h3>
          <Link to="/manage">이동하기</Link>
          {/* 사진 추가 (주석 처리) */}
          {/* <img src="/path/to/image.jpg" alt="관리 페이지" /> */}
        </Card>

        <Card>
          <h3>객체 확인 페이지</h3>
          <Link to="/obj">이동하기</Link>
          {/* 사진 추가 (주석 처리) */}
          {/* <img src="/path/to/image.jpg" alt="객체 확인 페이지" /> */}
        </Card>
        <Card>
          <h3>CS 페이지</h3>
          <Link to="/cs">이동하기</Link>
        </Card>
      </Content>
    </MainContainer>
  );
})

export default MainPage;





// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from 'react';
// import { styled } from '@mui/material/styles';
// import {
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   List,
//   Typography,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Card,
//   CardContent,
//   Grid,
//   Button,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SettingsIcon from '@mui/icons-material/Settings';
// import BugReportIcon from '@mui/icons-material/BugReport';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import ThermostatIcon from '@mui/icons-material/Thermostat';
// import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
// import { Link, useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../services/firebase';
// import axios from 'axios';
// import YesterdayData from '../components/YesterdayData';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBarStyled = styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// const MainPage = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [farmName, setFarmName] = useState('');
//   const [robotStatus, setRobotStatus] = useState('');
//   const [robotBattery, setRobotBattery] = useState(0);
//   const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });
//   const [sentSensorData, setSentSensorData] = useState({ temperature: null, humidity: null });
//   const [haveToUpdate, setUpdateFlag] = useState(true);
//   const [error, setError] = useState(null);
//   const wsRef = useRef(null);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const onLogoutClick = async () => {
//     try {
//       await signOut(auth);
//       navigate('/');
//     } catch (error) {
//       console.error("로그아웃 중 오류 발생:", error);
//     }
//   };

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8765');
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log('WebSocket Connected');
//       setError(null);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket Disconnected');
//     };

//     ws.onmessage = (event) => {
//       const data = event.data;
//       console.log('Received data from websocket:', data);
//       const tempMatch = data.match(/Temperature:\s*([\d.]+)/);
//       const humidityMatch = data.match(/Humidity:\s*([\d.]+)/);

//       if (tempMatch && humidityMatch) {
//         const temperature = parseFloat(tempMatch[1]);
//         const humidity = parseFloat(humidityMatch[1]);

//         if (!isNaN(temperature) && !isNaN(humidity)) {
//           setSentSensorData({ 
//             temperature: temperature.toFixed(1), 
//             humidity: humidity.toFixed(1) 
//           });
//         } else {
//           console.error('Invalid number in data:', data);
//         }
//       } else {
//         console.error('Invalid data format received:', data);
//       }
//     };

//     return () => {
//       if (wsRef.current) {
//         wsRef.current.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (haveToUpdate) {
//       setSensorData({
//         ...sentSensorData
//       });
//     }
//   }, [haveToUpdate, sentSensorData]);

//   useEffect(() => {
//     console.log("업데이트 값 :", sensorData);
//     axios.post('http://localhost:8080/api/saveData', {
//       ...sensorData
//     }).then((retVal) => {
//       console.log("Well Done!", retVal);
//     }).catch((retVal) => {
//       console.log("Error!", retVal);
//     });

//     setUpdateFlag(false);
//   }, [sensorData]);

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBarStyled position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             {farmName || 'Farm Dashboard'}
//           </Typography>
//         </Toolbar>
//       </AppBarStyled>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {[
//             { text: 'Dashboard', icon: <DashboardIcon />, link: '/Main' },
//             { text: 'Manage', icon: <SettingsIcon />, link: '/manage' },
//             { text: 'Object Detection', icon: <BugReportIcon />, link: '/obj' },
//             { text: 'Customer Service', icon: <BugReportIcon />, link: '/cs' },
//           ].map((item, index) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton component={Link} to={item.link}>
//                 <ListItemIcon>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton onClick={onLogoutClick}>
//               <ListItemIcon>
//                 <ExitToAppIcon />
//               </ListItemIcon>
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>
//                   Current Conditions
//                 </Typography>
//                 <Box display="flex" alignItems="center" mb={2}>
//                   <ThermostatIcon sx={{ mr: 1 }} />
//                   <Typography variant="body1">
//                     Temperature: {sensorData.temperature}°C
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center">
//                   <ThermostatIcon sx={{ mr: 1 }} />
//                   <Typography variant="body1">
//                     Humidity: {sensorData.humidity}%
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6} lg={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>
//                   Yesterday's Average
//                 </Typography>
//                 <YesterdayData />
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6} lg={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>
//                   Robot Status
//                 </Typography>
//                 <Box display="flex" alignItems="center" mb={2}>
//                   <BatteryChargingFullIcon sx={{ mr: 1 }} />
//                   <Typography variant="body1">
//                     Battery: {robotBattery}%
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1">
//                   Status: {robotStatus}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Main>
//     </Box>
//   );
// };

// export default MainPage;