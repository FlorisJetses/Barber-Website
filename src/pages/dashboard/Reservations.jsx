import { Header } from "../../components/Header";
import { ReservationTable } from "../../components/ReservationTable.jsx";


const ReservationsBody = () => {

    return(
        <div className=" m-5 flex flex-col">
           <ReservationTable />
        </div>
    );
};

export function Reservations() {
    return <Header title="Reserveringen" body={ReservationsBody()} />;
}
