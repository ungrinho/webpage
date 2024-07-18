import axios from 'axios';

const API_BASE_URL = 'http://your-api-base-url.com'; // 실제 API URL로 변경해야 합니다

export const fetchObjectDetections = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/detections`, {
      params: { date: date.toISOString().split('T')[0] }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching object detections:', error);
    return [];
  }
};

export const fetchCameraStreamUrl = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/camera-stream`);
    return response.data.url;
  } catch (error) {
    console.error('Error fetching camera stream URL:', error);
    return '';
  }
};

export const controlJetbotMini = async (command) => {
  try {
    await axios.post(`${API_BASE_URL}/jetbot-control`, { command });
  } catch (error) {
    console.error('Error controlling Jetbot Mini:', error);
  }
};