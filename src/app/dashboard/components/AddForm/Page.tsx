import React from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/Download";
import { useDropzone } from "react-dropzone";

function AddFormComponent({ typeForm }: any) {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <Card
      sx={{
        maxWidth: 345,
        mx: "auto",
        mt: -5,
        backgroundColor: "inherit",
        boxShadow: "none",
        border: "none",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontSize={20} color="#18534F" gutterBottom>
          Ajout d'un nouveau {typeForm.slice(0, -1)}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Titre"
          variant="outlined"
          placeholder="Saisir un titre"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#226D68",
              },
              "&:hover fieldset": {
                borderColor: "#226D68",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#226D68",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666666",
              "&.Mui-focused": {
                color: "#666666",
              },
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contenu"
          variant="outlined"
          placeholder="Saisir un contenu"
          multiline
          rows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FEEAA1",
              },
              "&:hover fieldset": {
                borderColor: "#FEEAA1",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FEEAA1",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666666",
              "&.Mui-focused": {
                color: "#666666",
              },
            },
          }}
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Ajouter une image
        </Typography>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderWidth: 4,
            borderRadius: 2,
            borderColor: "#eeeeee",
            borderStyle: "double",
            color: "#bdbdbd",
            outline: "none",
            width: "50%",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon style={{ fontSize: 48, color: "#bdbdbd" }} />
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#226D68",
            py: 2,
            borderRadius: "4px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#226D68",
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            transition: "none",
            mt: 2,
          }}
        >
          Enregistrer
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddFormComponent;
