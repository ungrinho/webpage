// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteDetection } from '../redux/actions';
// import styled from 'styled-components';

// const List = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   margin-bottom: 10px;
// `;

// const DeleteButton = styled.button`
//   margin-left: 10px;
// `;

// const DetectionList = React.memo(function DetectionList({ detections }) {
//     const dispatch = useDispatch();
  
//     const handleDelete = (id) => {
//       dispatch(deleteDetection(id));
//     };
  
//     return (
//       <div>
//         <h2>객체 감지 내역</h2>
//         <List>
//           {detections.map((detection) => (
//             <ListItem key={detection.id}>
//               {detection.object} - {detection.time}
//               <DeleteButton onClick={() => handleDelete(detection.id)}>삭제</DeleteButton>
//             </ListItem>
//           ))}
//         </List>
//       </div>
//     );
//   });
  
// export default DetectionList;

// // function DetectionList() {
// //   const [detections, setDetections] = useState([]);

// //   useEffect(() => {
// //     // 실제 구현 시 API나 WebSocket을 통해 데이터를 받아와야 합니다.
// //     const fetchDetections = async () => {
// //       // 예시 데이터
// //       const fakeData = [
// //         { id: 1, object: '사과', time: '14:30' },
// //         { id: 2, object: '벌레', time: '15:45' },
// //       ];
// //       setDetections(fakeData);
// //     };

// //     fetchDetections();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>객체 감지 내역</h2>
// //       <ul>
// //         {detections.map((detection) => (
// //           <li key={detection.id}>
// //             {detection.object} - {detection.time}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default DetectionList;



// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// const ListContainer = styled.div`
//   margin-top: 1rem;
// `;

// const ListItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 0.5rem;
// `;

// // 성능 최적화를 위해 React.memo 사용
// const DetectionList = React.memo(function DetectionList() {
//   const [detections, setDetections] = useState([]);

//   useEffect(() => {
//     // 백엔드 API에서 데이터 가져오기
//     const fetchDetections = async () => {
//       try {
//         const response = await axios.get('/api/detections');
//         setDetections(response.data);
//       } catch (error) {
//         console.error('Error fetching detections:', error);
//       }
//     };

//     fetchDetections();
//     // 실시간 업데이트를 위한 폴링 설정
//     const interval = setInterval(fetchDetections, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/detections/${id}`);
//       setDetections(detections.filter(detection => detection.id !== id));
//     } catch (error) {
//       console.error('Error deleting detection:', error);
//     }
//   };

//   return (
//     <ListContainer>
//       <h2>객체 감지 내역</h2>
//       <ul>
//         {detections.map((detection) => (
//           <ListItem key={detection.id}>
//             <span>{detection.object} - {detection.time}</span>
//             <button onClick={() => handleDelete(detection.id)}>삭제</button>
//           </ListItem>
//         ))}
//       </ul>
//     </ListContainer>
//   );
// });

// export default DetectionList;



import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  // 스타일 추가
`;

const ListItem = styled.li`
  // 스타일 추가
`;

const DeleteButton = styled.button`
  // 스타일 추가
`;

// React.memo를 사용하여 성능 최적화
const DetectionList = React.memo(function DetectionList() {
  const [detections, setDetections] = useState([]);

  // useCallback을 사용하여 함수 재생성 방지
  const fetchDetections = useCallback(async () => {
    try {
      const response = await fetch('/api/detections');
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
      }
      const data = await response.json();
      setDetections(data);
    } catch (error) {
      console.error('Error fetching detections:', error);
      // 에러 처리 로직 (예: 사용자에게 알림)
    }
  }, []);

  useEffect(() => {
    fetchDetections();
    // 주기적으로 데이터 갱신
    const interval = setInterval(fetchDetections, 30000);
    return () => clearInterval(interval);
  }, [fetchDetections]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/detections/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }
      setDetections(detections.filter(detection => detection.id !== id));
    } catch (error) {
      console.error('Error deleting detection:', error);
      // 에러 처리 로직
    }
  };

  return (
    <ListContainer>
      <h2>객체 감지 내역</h2>
      <ul>
        {detections.map((detection) => (
          <ListItem key={detection.id}>
            {detection.object} - {detection.time}
            <DeleteButton onClick={() => handleDelete(detection.id)}>삭제</DeleteButton>
          </ListItem>
        ))}
      </ul>
    </ListContainer>
  );
});

export default DetectionList;