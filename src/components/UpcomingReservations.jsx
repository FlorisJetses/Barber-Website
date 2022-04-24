import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { getReservationsByDay } from "../JanDeKapper";
import ManageUser from "../userManagement";

const getFirstItem = (array) => {
    return array[0];
};

const getTimeFromMs = (ms) => {
    return new Date(ms).toLocaleTimeString();
};

export const UpcomingReservations = () => {
    const [reservations, setReservations] = useState([]);
    const { user } = ManageUser();
    const [todaysDate] = useState(() => Date.now());

    useEffect(() => {
        getReservationsByDay(user?.token, todaysDate).then((result) => {
            setReservations(result);
        });
    }, [user?.token]);

    return (
        <Fragment>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                Reserveringen vandaag
            </Typography>
            <Typography component="p" variant="h4">
                {reservations.length ? reservations.length : "Geen reservering"}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {reservations.length
                    ? "Eerste om " +
                      new Date(
                          parseInt(reservations[0].start)
                      ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : null}
            </Typography>
            <div>
                <Link to="/dashboard/reserveringen">
                    <p>Naar reserveringen</p>
                </Link>
            </div>
        </Fragment>
    );
};
