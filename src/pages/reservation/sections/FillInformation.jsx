import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import {useReservation} from "../../../store/ReservationContext"
import { useNavigate } from "react-router-dom";



export const FillInformation = () => {
    const { state, setState } = useReservation()
    let navigate = useNavigate();

    const regex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailValid = validateEmail();

        if (state.name && emailValid) {
            navigate("/confirm_reservation")
        }
    };

    const validateEmail = () => {
        return regex.test(state.email);
    };

    return (
        <form
            className="text-xl mb-5 space-y-4 flex flex-col items-center mt-3"
            onSubmit={handleSubmit}
        >
            <TextField
                id="email"
                error={!validateEmail()}
                variant="filled"
                type="email"
                label="Email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                required
            />
            <br />

            <TextField
                type="text"
                label="Naam"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                required
                id="filled-basic"
                variant="filled"
            />
            <br />

            <TextField
                type="tel"
                label="Telefoon"
                pattern="\d*"
                value={state.phoneNumber}
                onChange={(e) =>
                    setState({ ...state, phoneNumber: e.target.value })
                }
                id="filled-basic"
                variant="filled"
            />
            <br />

            <TextField
                type="text"
                label="Opmerkingen"
                maxLength={80}
                id="filled-basic"
                variant="filled"
                multiline
                value={state.comments}
                onChange={(e) =>
                    setState({ ...state, comments: e.target.value })
                }
            />
            <br />
            <Button type="submit" variant="contained">
                Volgende
            </Button>
        </form>
    );
};
