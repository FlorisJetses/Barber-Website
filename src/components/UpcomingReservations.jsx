import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Fragment} from "react";

export const UpcomingReservations = () => {

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
                {Math.floor((Math.random() + 1) * 5)}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Eerste om 09:15
            </Typography>
            <div>
                <Link to="/dashboard/reserveringen">
                    <p>Naar reserveringen &rsaquo;</p>
                </Link>
            </div>
        </Fragment>
    );
};
