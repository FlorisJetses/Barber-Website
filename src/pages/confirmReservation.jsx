import { useEffect } from "react"
import { useReservation } from "../store/ReservationContext"
import { useNavigate } from "react-router-dom"
import scissors from "../img/scissors.svg";
import { NavBar } from "../components/NavBar";


export const ConfirmReservation = () => {
    const {state} = useReservation()
    let navigate = useNavigate()

    useEffect(() => {
        if (!state.done) {
            navigate("/")
        }
    }, [])

    return (
        <div
            style={{ backgroundImage: `url(${scissors})` }}
            className="bg-contain bg-repeat"
        >
            <NavBar/>
        </div>
    )
}