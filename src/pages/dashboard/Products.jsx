import React from "react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import ManageUser from "../../userManagement";
import { addProduct, getProducts } from "../../JanDeKapper";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { AddItemCard } from "./ItemCards";

const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false, },
    { field: "title", headerName: "Productnaam", width: 200 },
    { field: "price", headerName: "Prijs(€)", type: "number", width: 150 },
    {
        field: "amount",
        headerName: "Hoeveelheid",
        type: "number",
        width: 200,
    },
    {
        field: "Acties",
        sortable: false,
        type: "number",
        renderCell: (cellValues) => {
            return (
                <Tooltip
                    title="Delete"
                    onClick={() =>
                        deleteProduct(
                            { id: cellValues.row.product_id },
                            user.token
                        ).then(forceUpdate())
                    }
                >
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            );
        },
        width: 150,
    },
];

function ProductsBody() {
    const { user } = ManageUser();
    const [v, setV] = useState(0);
    const [products, setProducts] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts(user?.token).then((products) => {
          setLoading(false)
            if (products) {
                setProducts(Array.from(products));
            }
        });

        return () => {
          setLoading(true)
        }
    }, [v]);

    

    const rows = products.map((product, index) => {
        return {
            id: index,
            title: product.title,
            price: product.price,
            amount: product.amt,
            product_id: product.product_id,
        };
    });

    return(
        <div className="m-5 bg-white flex flex-col">
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
            <Fab
                sx={{alignSelf: "flex-end"}}
                color="primary"
                aria-label="add"
                onClick={() =>
                    AddItemCard(
                        [
                            ["Naam product", "title", "text"],
                            ["Prijs", "price", "number"],
                            ["Hoeveelheid", "amt", "number"],
                        ],
                        addProduct,
                        user
                    )
                }
            >
                <AddIcon />
            </Fab>
        </div>
        
    );
}

export function Products() {
    return <Header title="Producten" body={ProductsBody()} />;
}
