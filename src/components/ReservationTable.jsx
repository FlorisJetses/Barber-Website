import React, { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    getReservations,
    deleteReservation,
    getEmployees,
} from "../JanDeKapper";
import ManageUser, { isAuthenticated } from "../userManagement.js";
import { TablePagination } from "@mui/material";
import { stableSort, getComparator } from "./TableFunctions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { string } from "prop-types";

function Row({
    startDate,
    endDate,
    reservation,
    user,
    forceUpdate,
    employeeName,
}) {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow
                className=" border-b hover:bg-gray-100"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell className="font-semibold w-1/4 py-5">
                    {reservation.email_address}
                </TableCell>

                <TableCell>{employeeName}</TableCell>

                <TableCell>
                    {startDate.toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    -
                    {endDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </TableCell>

                <TableCell>
                    <Tooltip
                        title="Delete"
                        onClick={() =>
                            deleteReservation(
                                { id: reservation.reservation_id },
                                user.token
                            ).then(() => forceUpdate())
                        }
                    >
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Naam:
                            </Typography>
                            <div>
                                {reservation.customer.first_name && reservation.customer.last_name
                                    ? reservation.customer.first_name + reservation.customer.last_name
                                    : "onbekend"}
                            </div>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Telefoonnummer:
                            </Typography>
                            <div>
                                {reservation.customer.phone_number ? reservation.customer.phone_number : "onbekend"}
                            </div>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Behandelingen:
                            </Typography>
                            {console.log(typeof(reservation.treatments))}
                            <div>{reservation.treatments && typeof(string)? reservation.treatments.substring(2, reservation.treatments.length-2).split('","').map((treatment) => {
                                return <p className="inline"> {treatment}, </p>
                            }) : "onbekend"}</div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export const ReservationTable = () => {
    const [employees, setEmployees] = useState([]);
    const [reservations, setReservations] = useState([]);
    const { user } = ManageUser();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [v, setV] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");

    const forceUpdate = () => {
        setV(v + 1);
    };

    useEffect(() => {
        let Mounted = true;

        if (Mounted) {
            // Add reservations
            getReservations(user?.token).then((reservations) => {
                if (reservations) setReservations(Array.from(reservations));
            });

            // Add employees
            getEmployees().then((employees) => {
                let emplyMap = {};

                for (let employee of employees)
                    emplyMap[employee.employee_id] = employee;

                setEmployees(emplyMap);
            });
        }

        return () => {
            Mounted = false;
        };
    }, [user?.token, v]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return isAuthenticated(
        <div className="bg-white">
            <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small" aria-label=" table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <Typography variant="h6">
                                    Klant email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Medewerker</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">
                                    Datum en tijd
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Acties</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(reservations, getComparator(order, orderBy))
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((reservation) => {
                                let startDate = new Date(parseInt(reservation.start));
                                let endDate = new Date(parseInt(reservation.end));

                                let employee =
                                    reservation.employee_id in employees
                                        ? employees[reservation.employee_id]
                                        : null;
                                let employeeName = employee
                                    ? employee.first_name +
                                      " " +
                                      employee.last_name
                                    : "Unknown";

                                return (
                                    <Row
                                        key={reservation.reservation_id}
                                        startDate={startDate}
                                        endDate={endDate}
                                        reservation={reservation}
                                        user={user}
                                        forceUpdate={forceUpdate}
                                        employeeName={employeeName}
                                        className=" border-b hover:bg-gray-100"
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    ></Row>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};
