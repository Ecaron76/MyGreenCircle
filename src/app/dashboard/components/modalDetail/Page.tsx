import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { calculateDetailTitle } from "../../function/detailTitle";
import { fetchGroupPosts } from "../../services/groupe.service";
import { getEventParticipants } from "../../services/event.service";
import { getOneUser } from "../../services/user.service";

interface RowDetailsModalProps {
  open: boolean;
  onClose: () => void;
  selectedRow: any;
  identifier: string;
}

interface KeyLabels {
  [key: string]: string;
}

const keyLabels: KeyLabels = {
  userId: "User ID",
  postId: "Post ID",
  comments: "Liste des Commentaires",
  createdAt: "Date de Création",
  PostTitle: "Titre du Poste",
  description: "Description",
  startDate: "Date de Début",
  endDate: "Date de Fin",
  location: "Localisation",
  content: "Contenu",
  title: "Titre",
  picture: "Image",
};

const modalStyle = (hasGroup: boolean) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: hasGroup ? "100%" : "40%",
  maxWidth: hasGroup ? 800 : 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "80vh",
});

const DetailsModal: React.FC<RowDetailsModalProps> = ({
  open,
  onClose,
  selectedRow,
  identifier,
}) => {
  const [localData, setLocalData] = useState(selectedRow || {});
  const [groupPosts, setGroupPosts] = useState([]);
  const [eventParticipate, setEventParticipate] = useState([]);

  useEffect(() => {
    setLocalData(selectedRow || {});
    setGroupPosts([]);

    if (identifier === "Groupe" && selectedRow && selectedRow.groupId) {
      fetchGroupPosts(selectedRow.groupId)
        .then((posts: any) => setGroupPosts(posts))
        .catch((error: any) =>
          console.error("Error fetching group posts:", error)
        );
    }
    if (identifier === "évenement" && selectedRow && selectedRow.eventId) {
      getEventParticipants()
        .then(async (events) => {
          const event = events.find(
            (event: any) => event.eventId === selectedRow.eventId
          );
          if (event) {
            const participantsDetails: any = await Promise.all(
              event.participants.map(async (participant: any) => {
                const userDetails = await getOneUser(participant.userId);
                return userDetails;
              })
            );
            setEventParticipate(participantsDetails);
          }
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [selectedRow, identifier]);

  const handleDelete = (arrayKey: string, index: number) => {
    const updatedArray = [...localData[arrayKey]];
    updatedArray.splice(index, 1);
    setLocalData({ ...localData, [arrayKey]: updatedArray });
  };

  const renderValue = (value: any, arrayKey: string) => (
    <List dense>
      {value.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider sx={{ my: 2 }} />}{" "}
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              position: "relative",
              paddingLeft: 2,
              paddingRight: 8,
            }}
          >
            {Object.keys(item).map((key) => (
              <Typography variant="body2" key={key}>
                <span style={{ fontWeight: "bold" }}>
                  {keyLabels[key] || key}:
                </span>{" "}
                {key === "picture" ? (
                  <img
                    src={String(item[key])}
                    alt="Post"
                    style={{ width: "100%", maxWidth: "200px" }}
                  />
                ) : (
                  String(item[key])
                )}
              </Typography>
            ))}
            <IconButton
              onClick={() => handleDelete(arrayKey, index)}
              sx={{
                position: "absolute",
                right: -100,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  if (!localData) return null;

  const isGroup = identifier === "Groupe";
  const isEvent = identifier === "évenement";

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={modalStyle(isGroup || isEvent)}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "#226D68" }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            color: "#226D68",
            textAlign: "center",
            fontWeight: "bold",
            pb: 2,
          }}
        >
          Détails {calculateDetailTitle(identifier)}
          {identifier}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} sx={{ padding: 0 }}>
          <Grid item xs={12} md={isGroup || isEvent ? 4 : 12}>
            {Object.keys(localData)
              .filter((key) => !Array.isArray(localData[key]))
              .map((key) => (
                <Grid
                  item
                  xs={12}
                  key={key}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    borderBottom: 1,
                    borderColor: "divider",
                    py: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#226D68" }}
                  >
                    {keyLabels[key] ||
                      key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                    :
                  </Typography>
                  {key === "picture" ? (
                    <img
                      src={String(localData[key])}
                      alt="Post"
                      style={{ width: "100%", maxWidth: "200px" }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {String(localData[key])}
                    </Typography>
                  )}
                </Grid>
              ))}
          </Grid>

          {isGroup && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#226D68", mb: 1 }}
                >
                  Post(s) associé(s) au groupe:
                </Typography>
                {groupPosts.length > 0
                  ? renderValue(groupPosts, "groupPosts")
                  : "Aucun post associé à ce groupe"}
              </Grid>
            </>
          )}

          {isEvent && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#226D68", mb: 1 }}
                >
                  Liste des participants de l'événement:
                </Typography>
                {eventParticipate?.length > 0
                  ? renderValue(eventParticipate, "eventParticpates")
                  : "Aucun participant pour cet événement"}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default DetailsModal;
