import { collection, getDocs} from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Header } from "../../components/Header";

const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false, },
    { field: "email", headerName: "Email", type: "string", width: 250 },
    { field: "name", headerName: "Naam", type: "string", width: 200 },
    {
        field: "phoneNumber",
        headerName: "Telefoonnummer",
        type: "string",
        width: 200,
    },
];

const CustomersBody = () => {
    const [customers, setCustomers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        let customersArray = []
        const getCustomers = await getDocs(collection(db, "customers"))
        getCustomers.forEach((doc) => {
            customersArray.push({...doc.data()})
        })
        setCustomers(customersArray)
        setLoading(false)
    }, [])

    const rows = customers.map((customer, index) => {
        return {
            id: index,
            email: customer.email,
            name: customer.name ,
            phoneNumber: customer.phoneNumber,
        };
    });

    return(
        <div className="m-5 ">
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
        </div>
    )
}

export function Customers() {
    return <Header title="Dashboard" body={<CustomersBody />} />;
}
