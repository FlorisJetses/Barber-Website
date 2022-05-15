import { useState, createContext, useContext } from "react";

const ReservationContext = createContext();

const ReservationProvider = ({children}) => {
    const [state, setState] = useState({
        employee: "",
        date: "",
        timeframe:  "",
        email: "",
        step: 0,
        treatments: [],
        name: "",
        comment:  "",
        phoneNumber:  "",
    });

    const incrementStep = (e) => {
        e.preventDefault();
        setState({ ...state, step: state.step + 1 });
    };

    return(
        <ReservationContext.Provider value={{ state, setState, incrementStep }}>
            {children}
        </ReservationContext.Provider>
    )
}

const useReservation = () => {
    const context = useContext(ReservationContext);
    if (context === undefined) {
        throw new Error("useReservation must be used within a ReservationProvider");
    }
    return context;
}

export {ReservationProvider, useReservation}