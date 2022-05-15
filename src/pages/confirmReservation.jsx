import { useEffect } from "react"
import { useReservation } from "../store/ReservationContext"
import { useNavigate } from "react-router-dom"
import scissors from "../img/scissors.svg";

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
            
        </div>
    )
}