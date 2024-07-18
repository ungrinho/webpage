export const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  export const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  export const sortDetectionsByDate = (detections) => {
    return detections.sort((a, b) => new Date(b.time) - new Date(a.time));
  };
  
  export const filterDetectionsByDate = (detections, date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return detections.filter(detection => {
      const detectionDate = new Date(detection.time);
      detectionDate.setHours(0, 0, 0, 0);
      return detectionDate.getTime() === targetDate.getTime();
    });
  };