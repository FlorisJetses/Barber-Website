import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useReservation } from "../../../store/ReservationContext";
import {employees} from "../../../employees"

export const ChooseBarber = () => {
  const { state, setState } = useReservation();

  const saveEmployeeId = (employee_id) => {
    setState({ ...state, employee_id: employee_id });
};

    return (
        <div>
            <h1>Selecteer uw kapper</h1>
            <div className="flex flex-row flex-wrap m-5">
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    {employees.map((employee) => {
                        return (
                            <ListItem
                                key={employee.employee_id}
                                onClick={() => {
                                    saveEmployeeId(employee.employee_id);
                                }}
                            >
                                <ListItemButton>
                                    <ListItemAvatar sx={{ marginRight: 2 }}>
                                        <Avatar
                                            sx={{ width: 56, height: 56 }}
                                            alt="medewerker"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={employee.first_name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                    <ListItem>
                        <Button
                            onClick={() => {
                                saveEmployeeId(-1);
                            }}
                            className="cursor-pointer"
                            variant="outlined"
                        >
                            Geen voorkeur
                        </Button>
                    </ListItem>
                </List>
            </div>
        </div>
    );
};
