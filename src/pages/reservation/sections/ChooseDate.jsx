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

function getMsFromDate(date) {
  return new Date(date).getTime();
}

function getTimeFromMs(ms) {
  return new Date(ms).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}


function SelectTimeElements(timeframes) {
  const {state, setState} = useReservation()
  
  const saveTimeframe = (timeframe) => {
    setState({...state, timeframe: timeframe});
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
            value={JSON.stringify(timef)}
            key={index}
            variant="outlined"
            onClick={(e) => {
              saveTimeframe(timef)
              
            }}
          >
            {getTimeFromMs(timef.ms)}
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
  );
}

function getTimeframeBody(date, employee_id) {
  let body = { ms: getMsFromDate(date) };

  if (employee_id) {
    if (parseInt(employee_id) !== -1) {
      body["employee_id"] = parseInt(employee_id);
    }
  }

  return body;
}

export const ChooseDate = () => {
  const [timeframes, setTimeframes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
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
          value={availableDates[0]}
          shouldDisableDate={() => {
            const random  = Math.floor(Math.random() * 2)
            return Boolean(random)
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
          {SelectTimeElements(timeframes)}
        </div>
      </div>
    </div>
  );
};
