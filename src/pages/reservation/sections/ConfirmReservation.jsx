import { useEffect, useState, useContext } from "react";
import { addReservation, getEmployees, showMessage } from "../../../JanDeKapper";
import { Button } from "@mui/material";
import { UserContext } from "../Steps";
import { Navigate, useNavigate } from "react-router-dom";


function msToDate(ms) {
    return new Date(ms).toLocaleString([], {hour: '2-digit', minute:'2-digit'});
}

function parseJwt(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

const getEmployeeName = (employees, id) => {
    if (id in employees) {
        let employee = employees[id];

        return employee.first_name + " " + employee.last_name;
    } else {
        return "-";
    }
}

const getTreatmentsText = treatments => {
    if (!treatments) return null;

    let text = "";

    for (let treatment of treatments) text += treatment + ", ";

    return text.substring(0, text.length - 2);
};

function getReservationBody(timeframe, email, employee_id, treatments, name, phoneNumber) {
    const end = parseInt(timeframe) + 2 * 900000;
    const [fn, ln] = name.split(" ");

    return {
        email_address: email,
        start: parseInt(timeframe),
        end: end,
        employee_id: employee_id,
        treatments: treatments,
        first_name: fn,
        last_name: ln,
        phone_number: phoneNumber
    };
}

export const ConfirmReservation = () => {
    const [employees, setEmployees] = useState([]);
    const {state, setState} = useContext(UserContext)
    let navigate = useNavigate();

    useEffect(() => {
        getEmployees().then((employees) => {
            let emplyMap = {};

            for (let employee of employees) emplyMap[employee.employee_id] = employee;

            setEmployees(emplyMap);
        });
    }, [])



    return (
        <form onSubmit={(e) => {
            e.preventDefault();
    
            const body = getReservationBody(
                parseJwt(state.timeframe)?.ms,
                state.email,
                parseJwt(state.timeframe)?.employee_id,
                JSON.stringify(state.treatments),
                state.name,
                state.phoneNumber
            );
    
            addReservation(body).then((res) => {
                if (Object.keys(res).length > 0 && Object.keys(res) !== "failure") {
                    // Reservering succesvol gemaakt
                    sessionStorage.clear();
                    navigate("/", { replace: true });
                    
                } else {
                    // Reservering was niet succesvol
                    showMessage("We hebben je reservering niet aan kunnen maken. Probeer het later opnieuw.", true);
                }
            });
        }}>
            <div className="text-md mb-5">
                <h1>Nog even ter bevestiging..</h1>
                <table className="table-auto w-full p-3 m-5">
                    <tbody className="m-5 p-5 border-t border-b">
                        <tr>
                            <td>Behandelingen</td>
                            <td>{getTreatmentsText(state.treatments)}</td>
                        </tr>
                        <tr>
                            <td>Kapper</td>
                            <td>{getEmployeeName(employees, parseJwt(state.timeframe)?.employee_id)}</td>
                        </tr>
                        <tr>
                            <td>Datum en tijd</td>
                            <td>{msToDate(parseJwt(state.timeframe)?.ms)}</td>
                        </tr>
                         <tr>
                            <td>Naam</td>
                            <td>{state.name}</td>
                        </tr>
                        <tr>
                            <td>Telefoonnummer</td>
                            <td>{state.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Emailadres</td>
                            <td>{state.email}</td>
                        </tr>
                        <tr>
                            <td>Opmerkingen</td>
                            <td>{state.comment}</td>
                        </tr> 
                    </tbody>
                </table>
            </div>
            
                <Button
                    variant="contained"
                    type="submit"
                    
                >
                    Maak reservering
                </Button>
        </form>
    );
};
