import React from "react";
import { ChooseBarber } from "./ChooseBarber";
import { ChooseDate } from "./ChooseDate";
import { Button } from "@mui/material";
import {useReservation} from "../../../store/ReservationContext"

import { useContext, useState } from "react";

export const CombinedSection = () => {
    const {incrementStep, state }= useReservation()
    const [required, setRequired] = useState(false)

    return (
        <div className="flex flex-col items-center mb-7">
            <div className="flex flex-col md:flex-row xl:space-x-40 md:space-x-10">
                <ChooseBarber      
                />
                <ChooseDate
                />
                
            </div>
            <div className="text-red-500 my-3">{required && "Selecteer een kapper & een tijd"}</div>
            <Button variant="contained" onClick={(e) => {
                if(state.date && state.timeframe && state.employee)
                {incrementStep(e)
                    setRequired(false)
                } else {
                    setRequired(true)
                }
                }}>
            Volgende
            </Button>
        </div>
    );
};
