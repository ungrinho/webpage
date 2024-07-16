// import React, { useState, useEffect } from 'react';

// function NotificationSystem() {
//   const [notifications, setNotifications] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     // 실제 구현 시 WebSocket이나 서버 폴링을 사용해야 합니다.
//     const fakeNotification = () => {
//       setNotifications((prev) => [...prev, { id: Date.now(), message: '새 알림이 도착했습니다.' }]);
//     };

//     const interval = setInterval(fakeNotification, 10000); // 10초마다 알림 생성
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <button onClick={() => setShowPopup(!showPopup)}>
//         알림 ({notifications.length})
//       </button>
//       {showPopup && (
//         <div className="notification-popup">
//           {notifications.map((notif) => (
//             <p key={notif.id}>{notif.message}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotificationSystem;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const NotificationButton = styled.button`
  position: relative;
`;

const NotificationPopup = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  padding: 1rem;
  z-index: 1000;
`;

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const socket = io('http://your-backend-url');

    socket.on('newNotification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <NotificationButton onClick={() => setShowPopup(!showPopup)}>
        알림 ({notifications.length})
      </NotificationButton>
      {showPopup && (
        <NotificationPopup>
          {notifications.map((notif) => (
            <p key={notif.id}>{notif.message}</p>
          ))}
        </NotificationPopup>
      )}
    </div>
  );
}

export default NotificationSystem;