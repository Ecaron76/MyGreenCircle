import React from "react";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddButtonProps } from "../../types/types";

function AddButton({ disabled = false, title }: AddButtonProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        pb: 2,
        minHeight: 36,
      }}
    >
      {!disabled && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#D6955B",
            borderRadius: "4px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#D6955B",
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            transition: "none",
          }}
          onClick={() => console.log("Ajout d'un post")}
        >
          {title}
        </Button>
      )}
    </Box>
  );
}

export default AddButton;
