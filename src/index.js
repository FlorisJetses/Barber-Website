import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import { Dashboard } from './pages/dashboard/Dashboard'
import { Employees } from './pages/dashboard/Employees';
import { Reservations } from './pages/dashboard/Reservations';
import { Workshifts } from './pages/dashboard/Workshifts';
import { HomePage } from './pages/HomePage';
import { Reservation } from './pages/Reservation';
import { ReservationProvider } from './store/ReservationContext';
import { ConfirmReservation } from './pages/confirmReservation';

function Page() {
    return (
        <ReservationProvider>
            <div className="h-full overflow-x-hidden">
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/reservering" element={<Reservation />} />
                        <Route path="/dashboard/reserveringen" element={<Reservations />} />
                        <Route path="/dashboard/medewerkers" element={<Employees />} />
                        <Route path="/dashboard/roosters" element={<Workshifts />} />
                        <Route path='/bevestig_reservering' element={<ConfirmReservation />}/>
                    </Routes>
                </Router>
            </div>
        </ReservationProvider>
    )
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);