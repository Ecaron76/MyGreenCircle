import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import AlertComponent from "../Alert/Page";

function AddFormEvent({ typeForm, onFormClose }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    setShowAlert(true);
    setTimeout(() => {
      onFormClose();
    }, 1000);
  };

  const customStyles = {
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
    marginBottom: 2,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          maxWidth: 345,
          mx: "auto",
          mt: -12,
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
          {showAlert && (
            <AlertComponent title={`${typeForm} créé avec succès`} />
          )}
          <Typography variant="h6" fontSize={20} color="#18534F" gutterBottom>
            Ajout d`&lsquo;`un nouveau {typeForm.slice(0, -1)}
          </Typography>

          <Controller
            name="title"
            control={control}
            rules={{ required: "Le titre est requis" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Titre de l'événement"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                margin="normal"
                sx={{ ...customStyles }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "La description est requise" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                margin="normal"
                sx={{ ...customStyles }}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            rules={{ required: "La localisation est requise" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Localisation"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                margin="normal"
                sx={{ ...customStyles }}
              />
            )}
          />
          {/* <Controller
            name="startDate"
            control={control}
            rules={{ required: "La date de début est requise" }}
            render={({ field }) => (
              <DateTimePicker
                label="Date de début"
                {...field}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    sx={{ ...customStyles }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            rules={{ required: "La date de fin est requise" }}
            render={({ field }) => (
              <DateTimePicker
                label="Date de fin"
                {...field}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    sx={{ ...customStyles }}
                  />
                )}
              />
            )}
          /> */}
          <Button
            type="submit"
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
    </form>
  );
}

export default AddFormEvent;
