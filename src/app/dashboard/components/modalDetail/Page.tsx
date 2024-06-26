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
import { getCommentsByPostId } from "../../services/post.service";
import { Event, User } from "../../types/types";

interface RowDetailsModalProps {
  open: boolean;
  onClose: () => void;
  selectedRow: any;
  identifier: string;
}

interface KeyLabel {
  label: string;
  isHidden?: boolean;
}

interface KeyLabels {
  [key: string]: KeyLabel;
}

const keyLabels: KeyLabels = {
  userId: { label: "User ID", isHidden: false },
  postId: { label: "identifiant du Post", isHidden: false },
  commentId: { label: "identifiant du commentaire", isHidden: true },
  comments: { label: "Liste des Commentaires", isHidden: false },
  createdAt: { label: "Date de Création", isHidden: false },
  PostTitle: { label: "Titre du Poste", isHidden: false },
  description: { label: "Description", isHidden: false },
  startDate: { label: "Date de Début", isHidden: false },
  endDate: { label: "Date de Fin", isHidden: false },
  location: { label: "Localisation", isHidden: false },
  content: { label: "Contenu", isHidden: false },
  title: { label: "Titre", isHidden: false },
  picture: { label: "Image", isHidden: false },
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
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLocalData(selectedRow || {});
    setGroupPosts([]);

    if (identifier === "Groupe" && selectedRow && selectedRow.groupId) {
      fetchGroupPosts(selectedRow.groupId)
        .then((posts) => setGroupPosts(posts))
        .catch((error) => console.error("Error fetching group posts:", error));
    }
    if (identifier === "évenement" && selectedRow && selectedRow.eventId) {
      getEventParticipants()
        .then(async (events) => {
          const event = events.find(
            (event: Event) => event.eventId === selectedRow.eventId
          );
          if (event) {
            const participantsDetails: any = await Promise.all(
              event.participants.map(async (participant: User) => {
                const userDetails = await getOneUser(participant.userId);
                return userDetails;
              })
            );
            setEventParticipate(participantsDetails);
          }
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
    if (identifier === "Post" && selectedRow && selectedRow.postId) {
      getCommentsByPostId(selectedRow.postId)
        .then((fetchedComments) => setComments(fetchedComments))
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [selectedRow, identifier]);

  const handleDelete = (arrayKey: string, index: number) => {
    const updatedArray = [...localData[arrayKey]];
    updatedArray.splice(index, 1);
    setLocalData({ ...localData, [arrayKey]: updatedArray });
  };

  const renderValue = (value: any[], arrayKey: string) => (
    <List dense>
      {value.map((item, index) => (
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
            {Object.keys(item)
              .filter((key) => !keyLabels[key]?.isHidden)
              .map((key) => (
                <Typography variant="body2" key={key}>
                  <span style={{ fontWeight: "bold" }}>
                    {keyLabels[key]?.label || key}:
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
  const isPost = identifier === "Post";

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={modalStyle(isGroup || isEvent || isPost)}>
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
          <Grid item xs={12} md={isGroup || isEvent || isPost ? 4 : 12}>
            {Object.keys(localData)
              .filter((key) => !Array.isArray(localData[key]))
              .map((key) => (
                <Grid
                  item
                  xs={12}
                  key={key}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderBottom: 1,
                    borderColor: "divider",
                    py: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#226D68" }}
                  >
                    {keyLabels[key]?.label ||
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
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 1,
                        mt: 0.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
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

          {isPost && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#226D68", mb: 1 }}
                >
                  Commentaires associés au post:
                </Typography>
                {comments.length > 0
                  ? renderValue(comments, "comments")
                  : "Aucun commentaire pour ce post"}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default DetailsModal;
