// import React, { useState } from 'react';
// import styled from 'styled-components';

// const DatePickerContainer = styled.div`
//   margin-right: 1rem;
// `;

// function DatePicker() {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (event) => {
//     setSelectedDate(new Date(event.target.value));
//   };

//   return (
//     <DatePickerContainer>
//       <input
//         type="date"
//         value={selectedDate.toISOString().split('T')[0]}
//         onChange={handleDateChange}
//       />
//     </DatePickerContainer>
//   );
// }

// export default DatePicker;



import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  margin-right: 1rem;
`;

const StyledInput = styled.input`
  // 스타일 추가
`;

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // useCallback을 사용하여 함수 재생성 방지
  const handleDateChange = useCallback((event) => {
    setSelectedDate(new Date(event.target.value));
  }, []);

  return (
    <DatePickerContainer>
      <StyledInput
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
    </DatePickerContainer>
  );
}

export default DatePicker;