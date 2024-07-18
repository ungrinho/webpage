// import React, { useState } from 'react';

// function ObjectList({ detections }) {
//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <div>
//       <h2>객체 확인 내역</h2>
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1 }}>
//           {detections.map((detection, index) => (
//             <div key={index} onClick={() => setSelectedImage(detection.image)}>
//               <p>{detection.time}: {detection.object} 검출</p>
//             </div>
//           ))}
//         </div>
//         <div style={{ flex: 1 }}>
//           {selectedImage && (
//             <img src={selectedImage} alt="Selected detection" style={{ width: '100%' }} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ObjectList;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ObjectList({ selectedDate }) {
  const [detections, setDetections] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTree, setSelectedTree] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetections = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/detections`, {
          params: {
            date: selectedDate.toISOString().split('T')[0],
            treeNumber: selectedTree !== 'all' ? selectedTree : null
          }
        });
        setDetections(response.data);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
        console.error('Error fetching detections:', err);
      }
      setLoading(false);
    };

    fetchDetections();
    // 실시간 업데이트를 위한 폴링 설정 (선택적)
    const intervalId = setInterval(fetchDetections, 30000); // 30초마다 새로고침

    return () => clearInterval(intervalId);
  }, [selectedDate, selectedTree]);

  const handleTreeChange = (e) => {
    setSelectedTree(e.target.value);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>객체 확인 내역</h2>
      <div>
        <select value={selectedTree} onChange={handleTreeChange}>
          <option value="all">모든 나무</option>
          <option value="1">1번 나무</option>
          <option value="2">2번 나무</option>
          <option value="3">3번 나무</option>
        </select>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {detections.map((detection) => (
            <div key={detection.id} onClick={() => setSelectedImage(detection.imageUrl)}>
              <p>{new Date(detection.timestamp).toLocaleString()}: {detection.object} 검출 (나무 {detection.treeNumber}번)</p>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {selectedImage && (
            <img src={selectedImage} alt="Selected detection" style={{ width: '100%' }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ObjectList;





