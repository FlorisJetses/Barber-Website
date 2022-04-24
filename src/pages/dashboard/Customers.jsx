import React from "react";

import { Header } from "../../components/Header";
import  { isAuthenticated } from "../../userManagement";
import { CustomerTable } from "../../components/CustomerTable.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

 const CustomersBody = () => {
    return isAuthenticated(
        <div className="m-5 flex flex-col">
                <CustomerTable />
                <Fab
                sx={{alignSelf: "flex-end", marginTop: 3}}
                color="primary"
                aria-label="add"
                
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export function Customers () {
    return (
        <Header title="Klanten" body={CustomersBody()} />
    )
}