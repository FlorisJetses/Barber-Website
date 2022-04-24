import React, { useEffect, useState } from "react";
import ManageUser, { isAuthenticated } from "../../userManagement.js";
import { Header } from "../../components/Header";
import { ReservationTable } from "../../components/ReservationTable.jsx";
import { AddItemCard } from "./ItemCards.jsx";
import BasicTabs from "../../components/Tabs.jsx";
import BasicDatePicker from "../../components/DatePicker.jsx";
import { DayReservation } from "../../components/DayReservation.jsx";
import { addReservation, getEmployees } from "../../JanDeKapper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const getEmployeeOptions = (employees) => {
    let list = [];

    for (let employee of employees)
        list.push([
            employee.first_name + " " + employee.last_name,
            employee.employee_id,
        ]);

    return list;
};

const ReservationsBody = () => {
    const { user } = ManageUser();
    const [dateValue, setDateValue] = useState(null);
    const [todayDate] = useState(() => Date.now());
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees().then((employees) => {
            if (employees) setEmployees(Array.from(employees));
        });
    }, [user?.token]);

    return isAuthenticated(
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
                onClick={() =>
                    AddItemCard(
                        [
                            ["Email", "email_address", "email"],
                            [
                                "Medewerker",
                                "employee_id",
                                getEmployeeOptions(employees),
                            ],
                            ["Starttijd", "start", "datetime-local"],
                            ["Eindtijd", "end", "datetime-local"],
                        ],
                        addReservation,
                        user
                    )
                }
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export function Reservations() {
    return <Header title="Reserveringen" body={ReservationsBody()} />;
}
