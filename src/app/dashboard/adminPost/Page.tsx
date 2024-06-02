import React, { useState } from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DataGridComponent from "../components/dataGrid/Page";
import ModalDelete from "../components/modalDelete/Page";
import rowsData from "./posts.json";
import { Post } from "../types/types";
import AddFormComponent from "../components/AddForm/Page";
import AddButton from "../components/AddButton/Page";
import CommentIcon from "@mui/icons-material/Comment";

function AdminPost({ type }: any) {
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

  const columns: GridColDef<Post>[] = [
    {
      field: "postTitle",
      headerName: "Titre",
      width: 200,
      editable: true,
    },
    {
      field: "postContent",
      headerName: "Contenu",
      width: 300,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      width: 180,
      editable: false,
    },
    {
      field: "userId",
      headerName: "Utilisateur ID",
      width: 150,
      editable: false,
    },
    {
      field: "comments",
      headerName: "Commentaires",
      width: 100,
      renderCell: () => <CommentIcon sx={{ mt: 2, ml: 3 }} />,
    },
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

          <DataGridComponent rows={rows} columns={columns} identifier="Post" />
        </>
      )}
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

export default AdminPost;
