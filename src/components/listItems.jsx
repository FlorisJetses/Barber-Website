import * as React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Inventory2Icon from '@mui/icons-material/Inventory2';

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

        <Link to="/dashboard/roosters">
          <ListItem button>
              <ListItemIcon>
                  <QueryBuilderIcon />
              </ListItemIcon>
              <ListItemText primary="Werkuren" />
          </ListItem>
        </Link>



    </div>
);
