import { useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button } from "@mui/material";
import CalendarPicker from "@mui/lab/CalendarPicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useReservation} from "../../../store/ReservationContext"
import isWeekend from "date-fns/isWeekend";

const timeframes = ["09:00", "09:20"]

function SelectTimeElements() {
  const {state, setState} = useReservation()
  
  const saveTimeframe = ({value}) => {
    setState({...state, timeframe: value});
  };

  return (
    <FormControl fullWidth sx={{mt: 3}}>
    <InputLabel id="demo-simple-select-label">Tijd</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"

      label="Tijd"
    >
      {timeframes.map((timef, index) => {
        return (
          <MenuItem
            value={timef}
            key={index}
            variant="outlined"
            onClick={
              saveTimeframe
              
            }
          >
            
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
  );
}


export const ChooseDate = () => {
  const {state, setState} = useReservation()

  const saveDate = (date) => {
    setState({...state, date: date});
};

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          orientation="portrait"
          openTo="day"
          shouldDisableDate={(date) => {
            isWeekend(date)
          }}
          onChange={(date) => saveDate(date)}
          renderInput={(params) => <TextField {...params} />}
          minDate={Date.now()}
        />
      </LocalizationProvider>

      {/* Time selector */}
      <div className="text-xl mb-5">
        <label htmlFor="reservation-time">Selecteer een tijd:</label>

        <div className="flex flex-wrap">
          <SelectTimeElements />
        </div>
      </div>
    </div>
  );
};
