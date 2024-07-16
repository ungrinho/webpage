// import React, { useEffect, useRef } from 'react';
// // import cv from 'opencv.js';
// import styled from 'styled-components';

// const Video = styled.video`
//   width: 100%;
//   height: auto;
// `;

// function VideoStream() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
  
//   useEffect(() => {
//     let stream;
//     let intervalId;

//   async function setupCamera() {
//     stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     videoRef.current.srcObject = stream;
//   }

//   function processVideo() {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
//     const dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);

//     intervalId = setInterval(() => {
//       context.drawImage(video, 0, 0, video.width, video.height);
//       src.data.set(context.getImageData(0, 0, video.width, video.height).data);
//       cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
//       cv.imshow(canvas, dst);
//     }, 33); // 약 30 FPS
//   }

//   cv.onRuntimeInitialized = async () => {
//     await setupCamera();
//     processVideo();
//   };

//   return () => {
//     clearInterval(intervalId);
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//     }
//   };
// }, []);

// return (
//   <div>
//     <Video ref={videoRef} autoPlay playsInline />
//     <canvas ref={canvasRef} />
//   </div>
// );
// }

// export default VideoStream;

// //   useEffect(() => {
// //     // 실제 구현 시 WebRTC나 다른 스트리밍 기술을 사용해야 합니다.
// //     // 여기서는 예시로 가상의 스트림을 생성합니다.
// //     const fakeStream = () => {
// //       const canvas = document.createElement('canvas');
// //       canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
// //       const stream = canvas.captureStream(30); // 30 FPS
// //       videoRef.current.srcObject = stream;
// //     };

// //     fakeStream();
// //   }, []);

// //   return <video ref={videoRef} autoPlay playsInline />;
// // }

// // export default VideoStream;


import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    // WebSocket 연결 설정
    const ws = new WebSocket('192.168.0.13:8080/stram_viewer?topic=/usb_cam/image_raw');

    ws.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    ws.onmessage = (event) => {
      // 받은 이미지 데이터를 비디오 요소에 적용
      const imageBlob = new Blob([event.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob);
      videoRef.current.src = imageUrl;
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <VideoContainer>
      <StyledVideo ref={videoRef} autoPlay playsInline />
    </VideoContainer>
  );
}

export default VideoStream;