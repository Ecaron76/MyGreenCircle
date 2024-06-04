import React, { useState } from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGridComponent from "../components/dataGrid/Page";
import ModalDelete from "../components/modalDelete/Page";
import rowsData from "./events.json";
import AddFormComponent from "../components/AddForm/Page";
import AddButton from "../components/AddButton/Page";
import { Event } from "../types/types";

function AdminEvent({ type }: any) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const [rows, setRows] = useState<any>(rowsData);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleClickOpen = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter((row: any) => row.id !== id));
    handleClose();
  };

  const columns: GridColDef<Event>[] = [
    {
      field: "title",
      headerName: "Titre de l'événement",
      width: 200,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: false,
    },
    {
      field: "location",
      headerName: "Localisation",
      width: 150,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Date de début",
      width: 180,
      editable: false,
      type: "date",
      valueGetter: (params) => (params ? new Date(params) : null),
    },
    {
      field: "endDate",
      headerName: "Date de fin",
      width: 180,
      editable: false,
      type: "date",
      valueGetter: (params) => (params ? new Date(params) : null),
    },
    // {
    //   field: "status",
    //   headerName: "Statut",
    //   width: 120,
    //   editable: false,
    // },
    // {
    //   field: "participants",
    //   headerName: "Participants",
    //   width: 150,
    //   renderCell: () => <EventIcon />,
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleClickOpen(row.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {showForm ? (
        <AddFormComponent typeForm={type} />
      ) : (
        <>
          <AddButton onClick={toggleForm} title="Ajout d'un Post" />

          <DataGridComponent
            rows={rows}
            columns={columns}
            identifier="évenement"
          />
        </>
      )}
      <ModalDelete
        open={open}
        onClose={handleClose}
        onConfirm={() => handleDelete(deleteId!)}
        title="Confirmez la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet évenement ?"
      />
    </Box>
  );
}

export default AdminEvent;
