import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import { useReservation } from "../store/ReservationContext";
import {db} from "../firebase"
import { getDocs, collection } from "firebase/firestore";
import {employees} from ".././employees"

function Row({ reservation }) {
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
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="font-semibold w-1/4 py-5">
          {reservation.email}
        </TableCell>

        <TableCell>{employees[Math.floor(Math.random() * 3)].firstName}</TableCell>

        <TableCell>
          {reservation.time + " " + reservation.date}
        </TableCell>

        <TableCell>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Naam:
              </Typography>
              <div>
                {reservation.name}
              </div>
              <Typography variant="h6" gutterBottom component="div">
                Telefoonnummer:
              </Typography>
              <div>{reservation.phoneNumber}</div>
              <Typography variant="h6" gutterBottom component="div">
                Behandelingen:
              </Typography>
              {/* <div>{reservation.treatments}</div> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StateRow = () => {
  const { state } = useReservation();
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
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="font-semibold w-1/4 py-5">
          {state.email}
        </TableCell>

        <TableCell>{state.employee}</TableCell>

        <TableCell>
          {state.timeframe + " - " + state.date}
        </TableCell>

        <TableCell>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Naam klant:
              </Typography>
              <div>{state.name}</div>
              <Typography variant="h6" gutterBottom component="div">
                Telefoonnummer:
              </Typography>
              <div>{state.phoneNumber}</div>
              <Typography variant="h6" gutterBottom component="div">
                Behandelingen:
              </Typography>
              <div>{state.treatments}</div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const ReservationTable =  () => {
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const { state } = useReservation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  useEffect(async( ) => {
      let reservationArray = []
    const getReservationsDocs = await getDocs(collection(db, "reservations"))
  getReservationsDocs.forEach((doc) => {
      reservationArray.push({...doc.data(), id: doc.id})
  })
  setReservations(reservationArray)
  }, [])

  return (
    <div className="bg-white">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label=" table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h6">Klant email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Medewerker</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Datum en tijd</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Acties</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {state.done && <StateRow />}
            {stableSort(reservations, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reservation) => {

                return (
                  
                    <Row
                      key={reservation.id}
                      reservation={reservation}
                      className=" border-b hover:bg-gray-100"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    />
                  
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={state.done ? reservations.length + 1 : reservations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
