import React, { useEffect, useState } from "react";
import {
    getEmployees,
    deleteEmployee,
    addEmployee,
} from "../../JanDeKapper.js";
import { Header } from "../../components/Header";
import ManageUser, { isAuthenticated } from "../../userManagement";
import { AddItemCard } from "./ItemCards.jsx";
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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const getSkillsText = (skills) => {
    let text = "";

    if (typeof skills == Array) {
        for (let skill of skills) text += skill + ", ";

        return text.substring(0, text.length - 2);
    } else {
        return "-";
    }
};

const getEmployeeElements = (employees) => {
    const { user } = ManageUser();

    return employees.map((employee) => {
        return (
            <tr key={employee.employee_id}>
                <td>
                    <Avatar></Avatar>
                </td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{getSkillsText(employee.skills)}</td>
                <td>
                    <Tooltip
                        title="Delete"
                        onClick={() => {
                            deleteEmployee(
                                { id: employee.employee_id },
                                user.token
                            );
                        }}
                    >
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </td>
            </tr>
        );
    });
};

const EmployeesBody = () => {
    const { user } = ManageUser();
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");

    useEffect(() => {
        getEmployees().then((employees) => {
            if (employees) setEmployees(Array.from(employees));
        });
    }, [user?.token]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return isAuthenticated(
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
                                    .map((employee) => {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    <Avatar />
                                                </TableCell>
                                                <TableCell>
                                                    {employee.first_name}
                                                </TableCell>
                                                <TableCell>
                                                    {employee.last_name}
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
                <Fab
                sx={{alignSelf: "flex-end", marginTop: 3}}
                color="primary"
                aria-label="add"
                onClick={() => AddItemCard(
                    [
                        ["Voornaam", "first_name", "text"],
                        ["Achternaam", "last_name", "text"]
                    ],
                    addEmployee,
                    user
                )}
            >
                <AddIcon />
            </Fab>
            </div>
        </div>
    );
};

export function Employees() {
    return <Header title="Medewerkers" body={EmployeesBody()} />;
}
