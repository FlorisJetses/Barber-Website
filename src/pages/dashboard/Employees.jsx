import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { stableSort, getComparator } from "../../components/TableFunctions.jsx";
import { TablePagination } from "@mui/material";
import { Typography } from "@mui/material";
import { employees } from "../../employees";


const EmployeesBody = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return(
        <div>
            <div className=" m-5 flex flex-col">
                <div className="bg-white">
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography variant="h6">
                                            Voornaam
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">
                                            Achternaam
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stableSort(
                                    employees,
                                    getComparator(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((employee, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Avatar src={employee.img}/>
                                                </TableCell>
                                                <TableCell>
                                                    {employee.firstName}
                                                </TableCell>
                                                <TableCell>
                                                    {employee.lastName}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={employees.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
};

export function Employees() {
    return <Header title="Medewerkers" body={EmployeesBody()} />;
}
