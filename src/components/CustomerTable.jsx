import React, { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ManageUser, { isAuthenticated } from "../userManagement.js";
import { TablePagination } from "@mui/material";
import {stableSort, getComparator} from './TableFunctions'
import { getCustomers } from "../JanDeKapper";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false, },
    { field: "email", headerName: "Email", type: "string", width: 250 },
    { field: "fname", headerName: "Voornaam", type: "string", width: 200 },
    {
        field: "lname",
        headerName: "Achternaam",
        type: "string",
        width: 200,
    },
];

export function CustomerTable () {
    const { user } = ManageUser();
    const [customers, setCustomers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomers(user?.token).then((customers) => {
            if (customers) setCustomers(Array.from(customers));
            setLoading(false)
        });

        return () => {
            setLoading(true)
          }
        
    }, [user?.token]);

    const rows = customers.map((customer, index) => {
        return {
            id: index,
            email: customer.email_address,
            fname: customer.first_name ?? "",
            lname: customer.last_name ?? "",
        };
    });

  
    return isAuthenticated(
        <div className="bg-white">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10]}
                disableSelectionOnClick
                autoHeight
                loading={loading}
                pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
        </div>
    )
}