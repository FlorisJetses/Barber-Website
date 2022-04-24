import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false, },
    { field: "employee", headerName: "Medewerker", width: 200, type: "string"},
    { field: "date", headerName: "Datum", type: "date", width: 200 },
    { field: "time", headerName: "Tijd", type: "dateTime", width: 200 },
];

export function WorkshiftsTable() {
    const [shifts, setShifts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [sortModel, setSortModel] = useState([
        {
          field: 'username',
          sort: 'asc',
        },
      ]);

    const rows = shifts.map((shift, index) => {
        let employeeName =
            shift.employee_id in employees
                ? employees[shift.employee_id].first_name +
                  " " +
                  employees[shift.employee_id].last_name
                : "Onbekend";

        return {
            id: index,
            employee: employeeName,
            date: new Date(parseInt(shift.start)).toLocaleDateString(),
            time: new Date(parseInt(shift.start)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " - " + new Date(parseInt(shift.end)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            
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
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        </div>
    );
}
