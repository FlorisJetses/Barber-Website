import { useState } from "react";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import {useReservation} from "../../../store/ReservationContext"
import { treatments } from "../../../treatments";

function getTreatmentElements() {
    const { state, setState } = useReservation();

    const removeTreatment = (treatment) => {
        let treats = state.treatments;

        if (treats) {
            let newTreats = treats.filter((option) => {
                return option !== treatment
            })
            setState({ ...state, treatments: newTreats });
            
        }
    };

    const addTreatment = (treatment) => {
        let treats = state.treatments;

        if (treats.length !== 0) {
            if (!treats.includes(treatment)) {
                treats.push(treatment);
                setState({ ...state, treatments: treats,  });
                
            }
        } else {
            treats = [treatment];
            setState({ ...state, treatments: treats });       
        }
    };

    return treatments.map((treatment) => {
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
    });
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
            <div>
                <p>Kies uw behandeling:</p>
                <br />
                {required && (
                    <p className=" text-red-700">
                        Kies minimaal één behandeling
                    </p>
                )}
                <div className="my-3">{getTreatmentElements()}</div>
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
