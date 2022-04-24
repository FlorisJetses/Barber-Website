import React from "react";
import logo from "../img/logo.svg";
import { Button } from "@mui/material";
import {Link} from "react-router-dom"

export function Footer() {
    return (
        <div className=" bg-blue-100 flex flex-col items-center" id="openingstijden">
            <img
                src={logo}
                alt="logo van Jan de Kapper"
                className="w-32 h-auto m-3"
            />
            <Link to="/reservering" className={window.location.pathname === "/reservering" ? "hidden" : null}>
                <Button variant="contained">Maak een afspraak</Button>
            </Link>
            <div className="flex flex-row-reverse justify-center w-screen  ">
                <div className="py-8 px-3">
                    <p className="text-lg font-bold">Openingstijden</p>
                    <ul>
                        <li>Maandag 9-17</li>
                        <li>Dinsdag 9-17</li>
                        <li>Woensdag 9-17</li>
                        <li>Donderdag 9-17</li>
                        <li>Vrijdag 9-17</li>
                    </ul>
                </div>
                <div className="py-8 px-3">
                    <p className="text-lg font-bold">Contact</p>
                    <ul>
                        <li>Jan de Kapper</li>
                        <li>Overkant 24</li>
                        <li>1234 AB Nietthuis</li>
                        <li>555-123456</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
