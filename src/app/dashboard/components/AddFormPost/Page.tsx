import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import AlertComponent from "../Alert/Page";
import { createPost } from "../../services/post.service";
import { Post } from "../../types/types";

interface AddFormProps {
  typeForm: string;
  onFormClose: () => void;
}

interface FormInputs {
  title: string;
  content: string;
}

function AddFormPost({ typeForm, onFormClose }: AddFormProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [showAlert, setShowAlert] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string>("");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      let imageUrl: string | null = null;
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageData = new FormData();
        imageData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: imageData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        imageUrl = result.url;
      }

      const postData: Post = {
        title: data.title,
        content: data.content,
        picture: imageUrl,
      };

      await createPost(postData);
      setShowAlert(true);
      setTimeout(() => {
        onFormClose();
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la création du post: ", error);
      setImageUploadError("Failed to upload image. Please try again.");
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
    marginBottom: 3,
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
            Ajout d'un nouveau {typeForm.slice(0, -1)}
          </Typography>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Le titre est requis" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Titre"
                variant="outlined"
                placeholder="Saisir un titre"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
                sx={{ ...customStyles }}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{ required: "Le contenu est requis" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Contenu"
                variant="outlined"
                placeholder="Saisir un contenu"
                multiline
                rows={4}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
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
                  marginBottom: 3,
                }}
              />
            )}
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
              backgroundColor: "#fafafa",
              color: "#bdbdbd",
              outline: "none",
              width: "50%",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon style={{ fontSize: 48, color: "#bdbdbd" }} />
            {acceptedFiles.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {acceptedFiles[0].name}
              </Typography>
            )}
          </div>
          {imageUploadError && (
            <p className="error-message">{imageUploadError}</p>
          )}
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

export default AddFormPost;
