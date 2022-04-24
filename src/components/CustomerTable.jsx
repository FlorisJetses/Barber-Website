import React, { useState } from "react";
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
    const [customers, setCustomers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);


    const rows = customers.map((customer, index) => {
        return {
            id: index,
            email: customer.email_address,
            fname: customer.first_name ?? "",
            lname: customer.last_name ?? "",
        };
    });

  
    return (
        <div className="bg-white">
            <DataGrid
                rows={rows}
                columns={columns}
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