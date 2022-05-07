import React, { useState } from "react";
import { Header } from "../../components/Header";
import { ReservationTable } from "../../components/ReservationTable.jsx";
import BasicTabs from "../../components/Tabs.jsx";
import BasicDatePicker from "../../components/DatePicker.jsx";
import { DayReservation } from "../../components/DayReservation.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {employees} from "../../employees"

const ReservationsBody = () => {
    const [dateValue, setDateValue] = useState(null);
    const [todayDate] = useState(() => Date.now());

    return(
        <div className=" m-5 flex flex-col">
            <BasicTabs
                title1="Vandaag"
                body1={<DayReservation dateValue={todayDate} />}
                title3={
                    <BasicDatePicker
                        dateValue={dateValue}
                        setValue={setDateValue}
                    />
                }
                body3={
                    <DayReservation
                        dateValue={dateValue}
                        setValue={setDateValue}
                    />
                }
                title2="Alle Reserveringen"
                body2={<ReservationTable />}
            />
            <Fab
                sx={{alignSelf: "flex-end"}}
                color="primary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export function Reservations() {
    return <Header title="Reserveringen" body={ReservationsBody()} />;
}
