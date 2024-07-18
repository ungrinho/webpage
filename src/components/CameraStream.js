import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CameraStream = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://192.168.0.13:8080/stream_viewer?topic=/usb_cam1/image_raw', {
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
        console.log('success')
      } catch (error) {
        console.error('Error fetching video stream:', error);
      }
    };

    const interval = setInterval(fetchImage, 100);  // 10 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>실시간 관제 화면</h2>
      {imageUrl && <img src={imageUrl} alt="Jetbot video stream" />}
    </div>
  );
};

export default CameraStream;