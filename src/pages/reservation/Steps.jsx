import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { CombinedSection } from "./sections/ChooseBarberDate";
import { FillInformation } from "./sections/FillInformation";
import { ChooseTreatment } from "./sections/ChooseTreatment";
import {
    useReservation,
} from "../../store/ReservationContext";

const getTreatmentsText = (treatments) => {
    if (!treatments) return null;

    let text = "";

    for (let treatment of treatments) text += treatment + ", ";

    return text.substring(0, text.length - 2);
};

export function Steps() {
    const { state, setState } = useReservation();
    const [furthestStep, setFurthestStep] = useState(state.step);

    useEffect(() => {
        if (state.step > furthestStep) {
            setFurthestStep(state.step);
        }
    }, [state.step]);

    function getTimeFromMs(ms) {
        return new Date(ms).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    const dateTime = () => {
        if (state.date && state.timeframe) {
            return (
                getTimeFromMs(state.timeframe.ms) +
                " " +
                new Date(state.date).toLocaleDateString()
            );
        }
    };

    

    const steps = [
        {
            component: ChooseTreatment,
            title: "Behandeling",
            description: getTreatmentsText(state.treatments),
        },
        {
            component: CombinedSection,
            title: "Kapper & Datum",
            description: `${state.employee + ","} ${state.timeframe} ${state.date && new Date(state?.date).toLocaleDateString()}`,
        },
        { component: FillInformation, title: "Gegevens" },
    ];

    // Cycle through all the given components or 'steps' and then render them all.
    return (
        <>
            {steps.map((new_step) => {
                const StepComponent = new_step.component;
                const index = steps.indexOf(new_step);

                return (
                    <Accordion
                        key={index}
                        expanded={state.step === index}
                        disabled={
                            furthestStep === index || furthestStep > index
                                ? false
                                : state.step < index
                                ? true
                                : false
                        }
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            onClick={() => {
                                if (state.treatments.length !== 0) {
                                    if (
                                        state.step > index ||
                                        furthestStep === index ||
                                        furthestStep > index
                                    ) {
                                        setState({ ...state, step: index });
                                    }
                                }
                            }}
                        >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                {new_step.title}
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                {new_step.description}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <StepComponent />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    );
}
