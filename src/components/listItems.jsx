import * as React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export const mainListItems = (
    <div>
        <Link to="/dashboard">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link to="/dashboard/reserveringen">
            <ListItem button>
                <ListItemIcon>
                    <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary="Reserveringen" />
            </ListItem>
        </Link>
        <Link to="/dashboard/klanten">
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Klanten" />
            </ListItem>
        </Link>

        <Link to="/dashboard/medewerkers">
            <ListItem button>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Medewerkers" />
            </ListItem>
        </Link>
    </div>
);
