import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { WorkshiftsTable } from "../../components/WorkshiftsTable";
import { Button } from "@mui/material";
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

const WorkshiftsBody = () => {
    const [shifts, setShifts] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Add shifts
        getWorkshfts(user?.token).then((shifts) => {
            if (shifts) setShifts(Array.from(shifts));
        });

        // Add employees
        getEmployees().then((employees) => {
            let emplyMap = {};

            for (let employee of employees)
                emplyMap[employee.employee_id] = employee;

            setEmployees(emplyMap);
        });
    }, [user?.token]);

    return(
        <div className="m-5 flex flex-col">
            <WorkshiftsTable />
            <Fab
                sx={{ alignSelf: "flex-end", marginTop: 3}}
                color="primary"
                aria-label="add"
                onClick={() =>
                    AddItemCard(
                        [
                            [
                                "Medewerker",
                                "employee_id",
                                getEmployeeOptions(Object.values(employees)),
                            ],
                            ["Starttijd", "start", "datetime-local"],
                            ["Eindtijd", "end", "datetime-local"],
                        ],
                        addWorkshift,
                        user
                    )
                }
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export function Workshifts() {
    return <Header title="Werkuren" body={WorkshiftsBody()} />;
}
