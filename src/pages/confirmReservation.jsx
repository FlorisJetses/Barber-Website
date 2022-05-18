import { useEffect } from "react";
import { useReservation } from "../store/ReservationContext";
import { useNavigate } from "react-router-dom";
import scissors from "../img/scissors.svg";
import { NavBar } from "../components/NavBar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ConfirmReservation = () => {
    const { state } = useReservation();
    let navigate = useNavigate();

    useEffect(() => {
        if (!state.done) {
            navigate("/")
        }
    }, [])

    return (
        <div
            style={{ backgroundImage: `url(${scissors})` }}
            className="bg-contain bg-repeat h-full"
        >
            <NavBar />
            <div className="flex flex-col h-full w-full items-center">
                <div className="bg-white space-y-4">
                    <p>
                        Beste {state.name},<br />
                        Uw reservering voor{" "}
                        {new Date(state?.date).toLocaleDateString()} om{" "}
                        {state.timeframe} is bevestigd, bij kapper {state.employee}
                        <br />
                    </p>
                    <div>
                        <p>Gekozen behandelingen:</p>
                        <ul>
                            {state.treatments.map((treatment) => {
                                return <li>{treatment}</li>;
                            })}
                        </ul>
                    </div>
                    <Link to="/">
                        <Button variant="contained" sx={{marginTop: 5}}>Terug naar home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
