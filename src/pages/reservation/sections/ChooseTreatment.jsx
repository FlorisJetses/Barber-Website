import { useState } from "react";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import {useReservation} from "../../../store/ReservationContext"
import { treatments } from "../../../treatments";

function TreatmentElements () {
    const { state, setState } = useReservation();

    const removeTreatment = (treatment) => {
            let filterTreatments = state.treatments.filter((option) => {
                return option !== treatment
            })
            setState({ ...state, treatments: filterTreatments });
        
    };

    const addTreatment = (treatment) => {
        if (!state.treatments.includes(treatment)) {
            setState({...state, treatments: [...state.treatments, treatment]})
        }
    };

    return(
        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5">
            <div>
                <p>Knipbehandelingen:</p>
                {treatments.cuttingTreatments.map((treatment) => {
                    return (
                        <div key={treatment.title} className="cursor-pointer">
                            <Checkbox
                                id={"treatment_" + treatment.title}
                                value={treatment.title}
                                onClick={(e) => {
                                    if (
                                        state.treatments &&
                                        e.target.checked &&
                                        !state.treatments.includes(e.target.value)
                                    ) {
                                        addTreatment(e.target.value);
                                    } else if (!e.target.checked) {
                                        removeTreatment(e.target.value);
                                    }
                                }}
                                checked={state.treatments.includes(treatment.title)}
                            />
                
                            <label
                                htmlFor={"treatment_" + treatment.title}
                                className="cursor-pointer"
                            >
                                {treatment.title}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div>
                <p>Styling:</p>
                {treatments.stylingTreatments.map((treatment) => {
                    return (
                        <div key={treatment.title} className="cursor-pointer">
                            <Checkbox
                                id={"treatment_" + treatment.title}
                                value={treatment.title}
                                onClick={(e) => {
                                    if (
                                        state.treatments &&
                                        e.target.checked &&
                                        !state.treatments.includes(e.target.value)
                                    ) {
                                        addTreatment(e.target.value);
                                    } else if (!e.target.checked) {
                                        removeTreatment(e.target.value);
                                    }
                                }}
                                checked={state.treatments.includes(treatment.title)}
                            />
                
                            <label
                                htmlFor={"treatment_" + treatment.title}
                                className="cursor-pointer"
                            >
                                {treatment.title}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export const ChooseTreatment = () => {
    const [required, setRequired] = useState(false);
    const { state, incrementStep } = useReservation()

    const handleSubmit = (event) => {
        event.preventDefault();

        if (state.treatments.length !== 0) {
            incrementStep(event);
            setRequired(false)
        } else {
            setRequired(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" flex flex-col items-center">
            <div className="mb-8">
                <p>Kies uw behandeling:</p>
                <br />
                {required && (
                    <p className=" text-red-700">
                        Kies minimaal één behandeling
                    </p>
                )}
                <TreatmentElements />
            </div>
            <div>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ display: "inline-block" }}
                >
                    Volgende
                </Button>
            </div>
        </form>
    );
};
