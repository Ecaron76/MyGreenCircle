"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGridComponent from "../components/dataGrid/Page";
import ModalDelete from "../components/modalDelete/Page";
import { User } from "../types/types";
import { deleteUser, getAllUsers } from "../services/user.service";

function AdminUser() {
  const [rows, setRows] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClickOpen = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Failed to handle delete", error);
    }
    handleClose();
  };

  const columns: GridColDef<User>[] = [
    {
      field: "username",
      headerName: "Nom d'utilisateur",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "address",
      headerName: "Adresse",
      width: 200,
      editable: true,
    },
    {
      field: "CP",
      headerName: "Code postal",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key={row.id}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleClickOpen(row.id)}
        />,
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          pt: 1,
        }}
      >
        <Typography fontSize={18} sx={{ width: "100%" }}>
          Liste des Utilisateurs
        </Typography>
      </Box>
      <DataGridComponent
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        identifier="utilisateur"
      />
      <ModalDelete
        open={open}
        onClose={handleClose}
        onConfirm={() => handleDelete(deleteId!)}
        title="Confirmez la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />
    </Box>
  );
}

export default AdminUser;
