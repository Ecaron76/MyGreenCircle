"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGridComponent from "../components/dataGrid/Page";
import ModalDelete from "../components/modalDelete/Page";
import AddButton from "../components/AddButton/Page";
import { Event } from "../types/types";
import AddFormEvent from "../components/AddFormEvent/Page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllEvents } from "../services/event.service";

interface adminEventProps {
  type: string;
}

function AdminEvent({ type }: adminEventProps) {
  const [rows, setRows] = useState<Event[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("showForm") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("showForm", showForm.toString());
    }
  }, [showForm]);

  const handleClickOpen = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleBack = () => {
    setShowForm(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("showForm", "false");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    handleClose();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (typeof window !== "undefined") {
      localStorage.setItem("showForm", (!showForm).toString());
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("showForm", "false");
    }
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
          onClick={() => handleClickOpen(row.eventId)}
        />,
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllEvents()
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch groups:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {showForm ? (
        <>
          <ArrowBackIcon
            onClick={handleBack}
            sx={{ cursor: "pointer", mb: 2 }}
          />
          <AddFormEvent typeForm={type} onFormClose={handleFormClose} />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={18} sx={{ width: "100%" }}>
              Liste des Événements
            </Typography>
            <AddButton onClick={toggleForm} title="Ajout d'un événement" />
          </Box>
          <DataGridComponent
            rows={rows}
            columns={columns}
            identifier="évenement"
            getRowId={(row) => row.eventId}
            loading={loading}
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
