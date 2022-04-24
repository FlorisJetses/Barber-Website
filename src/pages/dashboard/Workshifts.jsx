import React, { useEffect, useState } from "react";
import ManageUser, { isAuthenticated } from "../../userManagement";
import { addWorkshift, getEmployees, getWorkshfts } from "../../JanDeKapper.js";
import { Header } from "../../components/Header";
import { WorkshiftsTable } from "../../components/WorkshiftsTable";
import { Button } from "@mui/material";
import { AddItemCard } from "./ItemCards";
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
    const { user } = ManageUser();
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

    return isAuthenticated(
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
