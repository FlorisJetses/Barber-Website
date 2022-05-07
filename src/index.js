import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import { Dashboard } from './pages/dashboard/Dashboard'
import { Employees } from './pages/dashboard/Employees';
import { Reservations } from './pages/dashboard/Reservations';
import { Workshifts } from './pages/dashboard/Workshifts';
import { Customers } from './pages/dashboard/Customers';
import { HomePage } from './pages/HomePage';
import { Reservation } from './pages/reservation/Reservation';
import { Settings} from './pages/dashboard/Settings'
import { Editor } from './pages/dashboard/Editor'
import { Products } from './pages/dashboard/Products';
import { Transactions } from './pages/dashboard/Transactions';

function Page() {
    return (
        <div className="h-full overflow-x-hidden">
            <div id="card-holder" className="fixed top-5 left-5 z-holder"></div>
            <div id="message-holder" className="fixed bottom-0 z-holder"></div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reservering" element={<Reservation />} />
                    <Route path="/dashboard/reserveringen" element={<Reservations />} />
                    <Route path="/dashboard/medewerkers" element={<Employees />} />
                    <Route path="/dashboard/roosters" element={<Workshifts />} />
                    <Route path="/dashboard/klanten" element={<Customers />} />
                    <Route path="/dashboard/instellingen" element={<Settings /> } />
                    <Route path="/dashboard/editor" element={<Editor />} />
                    <Route path="/dashboard/producten" element={<Products />} />
                    <Route path="/dashboard/transacties" element={<Transactions />} />
                </Routes>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);