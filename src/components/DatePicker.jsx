import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { getOccupiedDates } from '../JanDeKapper';
import { useEffect } from 'react';
import { useState } from 'react';
import ManageUser from '../userManagement';



export default function BasicDatePicker({dateValue, setValue}) {
  const { user } = ManageUser();
  const [occupiedDates, setDates] = useState([])

 useEffect(() => {
  getOccupiedDates(user?.token).then((result) => setDates(Array.from(result)))
 }, [user?.token])


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