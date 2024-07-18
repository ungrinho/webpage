// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField } from '@mui/material';

// // legacy peer dependencies 플래그를 사용하여 MUI 및 기타 의존성 설치
// // npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
// // npm install @mui/icons-material --legacy-peer-deps
// // npm install @mui/x-date-pickers --legacy-peer-deps

// const DatePickerContainer = styled.div`
//   margin-right: 1rem;
// `;

// const StyledTextField = styled(TextField)`
//   & .MuiInputBase-root {
//     // color: #333;
//     background-color: #fff;
//     padding: 10px;
//   }
//   & .MuiInput-underline:before {
//     border-bottom: 2px solid #3f51b5;
//   }
//   & .MuiInput-underline:hover:before {
//     border-bottom: 2px solid #303f9f;
//   }
//   & .MuiInput-underline:after {
//     border-bottom: 2px solid #1a237e;
//   }
//   & .Mui-focused {
//     color: #1a237e;
//   }
// `;

// function DatePicker() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <DatePickerContainer>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Styled Date Picker"
//           value={selectedDate}
//           onChange={(newValue) => setSelectedDate(newValue)}
//           renderInput={(params) => <StyledTextField {...params} />}
//         />
//       </LocalizationProvider>
//     </DatePickerContainer>
//   );
// }

// export default DatePicker;


import React, { useState } from 'react';
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const DatePickerContainer = styled.div`
  margin-right: 1rem;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fff;
    padding: 10px;
  }
  & .MuiInput-underline:before {
    border-bottom: 2px solid #3f51b5;
  }
  & .MuiInput-underline:hover:before {
    border-bottom: 2px solid #303f9f;
  }
  & .MuiInput-underline:after {
    border-bottom: 2px solid #1a237e;
  }
  & .Mui-focused {
    color: #1a237e;
  }
`;

function DatePickerComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePickerContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Styled Date Picker"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => <StyledTextField {...params} />}
        />
      </LocalizationProvider>
    </DatePickerContainer>
  );
}

export default DatePickerComponent;
