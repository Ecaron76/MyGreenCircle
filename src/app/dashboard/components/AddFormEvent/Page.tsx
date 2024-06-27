"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import AlertComponent from "../Alert/Page";

interface AddFormProps {
  typeForm: string;
  onFormClose: () => void;
}

interface FormInputs {
  title: string;
  description: string;
  location: string;
}

function AddFormEvent({ typeForm, onFormClose }: AddFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [showAlert, setShowAlert] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const eventData = {
        title: data.title,
        description: data.description,
        location: data.location,
      };

      //TODO
      // await createEvent(eventData);
      setShowAlert(true);
      setTimeout(() => {
        onFormClose();
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement: ", error);
    }
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
