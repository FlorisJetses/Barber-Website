import React, { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getReservations, deleteReservation, getEmployees } from "../JanDeKapper";
import ManageUser, { isAuthenticated } from "../userManagement.js";
import { TablePagination } from "@mui/material";
import {stableSort, getComparator} from './TableFunctions'