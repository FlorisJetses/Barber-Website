import React from "react";
import { useState, useEffect } from "react";
import { getReservationsByDay } from "../JanDeKapper";
import ManageUser from "../userManagement";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getEmployees } from "../JanDeKapper";
import { stableSort, getComparator } from "./TableFunctions";
import { TablePagination } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

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
                                Behandelingen:
                            </Typography>
                            
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

export const DayReservation = ({ dateValue }) => {
    const { user } = ManageUser();
    const [employees, setEmployees] = useState();
    const [dayReservations, setDayReservations] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [check, setCheck] = useState(false);
    const [v, setV] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const forceUpdate = () => {
        setV(v + 1);
    };

    useEffect(() => {
        
            getReservationsByDay(user?.token, dateValue).then(
                (dayReservations) => {
                    if (dayReservations) {
                        setDayReservations(Array.from(dayReservations));
                        if (dayReservations.length > 0) {
                            setCheck(true);
                        } else {
                            setCheck(false);
                        }
                    }
                }
            );

            getEmployees().then((employees) => {
                let emplyMap = {};

                for (let employee of employees)
                    emplyMap[employee.employee_id] = employee;

                setEmployees(emplyMap);
            });
        
        
    }, [isLoaded, user?.token, dateValue, v]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div>
            {check ? (
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>

                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">
                                            Klant email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">
                                            Medewerker
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">
                                            Datum en tijd
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stableSort(dayReservations, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((dayReservation) => {
                                    let startDate = new Date(parseInt(dayReservation.start));
                                    let endDate = new Date(parseInt(dayReservation.end));
                    
                                    let employee =
                                         employees ? dayReservation.employee_id in employees
                                            ? employees[dayReservation.employee_id]
                                            : null : null;
                                    let employeeName = employee
                                        ? employee.first_name +
                                          " " +
                                          employee.last_name
                                        : "Unknown";
                    
                                    return (
                                        <Row
                                            key={dayReservation.reservation_id}
                                            startDate={startDate}
                                            endDate={endDate}
                                            reservation={dayReservation}
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
                    count={dayReservations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            ) : 
                <div>Geen reservering beschikbaar</div>
            }
        </div>
    );
};
