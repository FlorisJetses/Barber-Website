import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';




export default function BasicDatePicker({dateValue, setValue}) {
  const [occupiedDates, setDates] = useState([])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        
      <DatePicker

        label="Andere Dag"
        value={dateValue}
        onChange={(newValue) => {
          setValue(Date.parse(newValue));
        }}
        renderInput={(params) => <TextField {...params} />}
        shouldDisableDate={(date) => {
          if (occupiedDates.includes(Date.parse(date))) {
          
              return false;
          } else {
              return true;
          }
      }}
      
        
      />
    </LocalizationProvider>
  );
}