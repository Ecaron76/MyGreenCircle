import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ModalDelete: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          backgroundColor: "#ECF8F6",
          color: "#226D68",
          textAlign: "center",
          py: 2,
        }}
      >
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2 }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "#4C4C4C" }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{ p: 2, justifyContent: "flex-end", backgroundColor: "#ECF8F6" }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#226D68",
            color: "#226D68",
            "&:hover": {
              borderColor: "#226D68",
              backgroundColor: "transparent",
              color: "#226D68",
            },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          autoFocus
          sx={{
            backgroundColor: "#d32f2f",
            color: "white",
            "&:hover": {
              backgroundColor: "#9a0007",
            },
          }}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
