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

  const saveEmployeeId = (name) => {
    setState({ ...state, employee: name });
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
                                key={employee.firstName}
                                onClick={() => {
                                    saveEmployeeId(employee.firstName);
                                }}
                            >
                                <ListItemButton
                                sx={{borderRadius: 3, marginY: 1.2}}
                                selected={state.employee === employee.firstName}
                                >
                                    <ListItemAvatar sx={{ marginRight: 2 }}>
                                        <Avatar
                                            sx={{ width: 56, height: 56 }}
                                            alt="medewerker"
                                            src={employee.img}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={employee.firstName}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                    <ListItem>
                        <Button
                            onClick={() => {
                                saveEmployeeId("Geen voorkeur");
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
