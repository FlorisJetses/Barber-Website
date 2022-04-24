import React from "react";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export const NavBar = () => {
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo van Jan de Kapper"
                            className="w-32 h-auto m-3"
                        />
                    </Link>
                </ListItem>
                <ListItem>
                    <Button href="/#over_ons">Over ons</Button>
                </ListItem>
                <ListItem>
                    <Button href="/#prijzen">Prijzen</Button>
                </ListItem>
                <ListItem>
                    <Button href="/#openingstijden">Openingstijden</Button>
                </ListItem>
                <ListItem>
                    <Link to="/reservering">
                        <Button variant="contained">Boek nu</Button>
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    const anchor = "left";

    return (
        <div className="flex items-center justify-center w-screen top-0 ">
            <div className=" md:hidden mr-4">
                <IconButton onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon fontSize="large" />
                </IconButton>
            </div>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>

            <div>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-32 h-auto m-3 inline "
                    />
                </Link>
                <div className="inline space-x-2">
                    <div className="hidden md:inline space-x-2">
                        <Button href="/#over_ons">Over ons</Button>

                        <Button href="/#prijzen">Prijzen</Button>

                        <Button href="/#openingstijden">Openingstijden</Button>
                    </div>

                    <Link to="/reservering">
                        <Button variant="contained">Boek nu</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
