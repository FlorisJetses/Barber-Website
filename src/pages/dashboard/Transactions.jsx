import React from "react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import ManageUser from "../../userManagement";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getOrders } from "../../JanDeKapper";


const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false, },
    { field: "total", headerName: "Totaal(€)", width: 150, type: "number" },
    { field: "discount", headerName: "Korting(€)", type: "number", width: 150 },
    { field: "payed", headerName: "Betaald(€)", type: "number", width: 150 },
    
        
];

function TransactionsBody() {
    const { user } = ManageUser();
    const [v, setV] = useState(0);
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    const forceUpdate = () => {
        setV(v + 1);
    };

    useEffect(() => {
        getOrders(user?.token).then((orders) => {
          setLoading(false)
            if (orders) {
                setOrders(Array.from(orders));
            }
        });

        return () => {
          setLoading(true)
        }
    }, [v]);

    

    const rows = orders.map((order) => {
        return {
            id: order.order_id,
            total: order.grossTotal,
            discount: order.discount,
            payed: order.payAmount,
        };
    });

    return(
        <div className="m-5 bg-white">
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
    );
}

export function Transactions() {
    return <Header title="Transactie" body={TransactionsBody()} />;
}
