import React from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGridComponent from "../components/dataGrid/Page";
import AddButton from "../components/AddButton/Page";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "firstName",
    headerName: "Nom",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Prenom",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    getActions: (row) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => handleDelete(row.row.id)}
      />,
    ],
  },
];

function handleDelete(id: number) {
  console.log("Deleting row with id:", id);
}

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", email: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", email: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", email: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", email: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", email: null },
  { id: 6, lastName: "Melisandre", firstName: null, email: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", email: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", email: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", email: 65 },
];

function AdminUser() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <AddButton disabled={true}></AddButton>

      <DataGridComponent rows={rows} columns={columns}></DataGridComponent>
    </Box>
  );
}

export default AdminUser;
