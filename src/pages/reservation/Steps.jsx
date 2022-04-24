import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect, createContext } from "react";
import { CombinedSection } from "./sections/ChooseBarberDate";
import { FillInformation } from "./sections/FillInformation";
import { ConfirmReservation } from "./sections/ConfirmReservation";
import { ChooseTreatment } from "./sections/ChooseTreatment";
import { getEmployees } from "../../JanDeKapper";

function parseJson(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

function getValue(key, def) {
    let value = parseJson(sessionStorage.getItem(key));

    if (!value) {
        return def;
    } else {
        return value;
    }
}

const getTreatmentsText = (treatments) => {
    if (!treatments) return null;

    let text = "";

    for (let treatment of treatments) text += treatment + ", ";

    return text.substring(0, text.length - 2);
};

export const UserContext = createContext(null);

export function Steps() {
    const [expanded, setExpanded] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [state, setState] = useState({
        employee_id: getValue("employee_id", 0),
        date: getValue("date", null),
        timeframe: getValue("timeframe", null),
        email: getValue("email", ""),
        step: getValue("step", 0),
        treatments: getValue("treatments", []),
        name: getValue("name", ""),
        comment: getValue("comment", ""),
        phoneNumber: getValue("phoneNumber", ""),
    });
    const [furthestStep, setFurthestStep] = useState(
        getValue("fstep", state.step)
    );

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        if (state.step > furthestStep) {
            setFurthestStep(state.step);
            sessionStorage.setItem("fstep", JSON.stringify(state.step));
        }
    }, [state.step]);

    useEffect(() => {
        getEmployees().then((employees) => {
            let emplyMap = {};

            for (let employee of employees) {
                emplyMap[employee.employee_id] = employee;
            }

            setEmployees(emplyMap);
        });
    }, []);

    function getTimeFromMs(ms) {
        return new Date(ms).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    const dateTime = () => {
        if (state.date && state.timeframe) {

            return (
                getTimeFromMs((state.timeframe).ms) +
                " " +
                new Date(state.date).toLocaleDateString()
            );
        }
    };

    let employee =
        state.employee_id in employees ? employees[state.employee_id] : null;
    let employeeName = employee ? employee.first_name + "," : "Geen voorkeur,";

    function combined() {
        if (state.employee_id && state.timeframe) {
            return employeeName + " " + dateTime();
        }
    }

    const incrementStep = (e) => {
        e.preventDefault();

        sessionStorage.setItem("step", state.step + 1);
        setState({ ...state, step: state.step + 1 });
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
            description: combined(),
        },
        { component: FillInformation, title: "Gegevens" },
        { component: ConfirmReservation, title: "Bevestiging" },
    ];

    // Cycle through all the given components or 'steps' and then render them all.
    return (
        <UserContext.Provider value={{ state, setState, incrementStep }}>
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
                                        sessionStorage.setItem("step", index);
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
        </UserContext.Provider>
    );
}
