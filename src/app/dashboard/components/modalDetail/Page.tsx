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
import { calculateDetailTitle } from "../../function/detailTitle";

interface RowDetailsModalProps {
  open: boolean;
  onClose: () => void;
  selectedRow: any;
  identifier: string;
}

const modalStyle = (hasArray: boolean) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: hasArray ? "80%" : "40%",
  maxWidth: hasArray ? 800 : 400,
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

  useEffect(() => {
    setLocalData(selectedRow || {});
  }, [selectedRow]);

  const hasArray =
    localData && Object.values(localData).some((value) => Array.isArray(value));

  const handleDelete = (arrayKey: string, index: number) => {
    const updatedArray = [...localData[arrayKey]];
    updatedArray.splice(index, 1);
    setLocalData({ ...localData, [arrayKey]: updatedArray });
  };

  const renderValue = (value: any, arrayKey: string) => (
    <List dense>
      {value.map((item: any, index: number) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {Object.keys(item).map((key) => (
            <Typography variant="body2" key={key}>
              {key}: {String(item[key])}
            </Typography>
          ))}
          <IconButton
            onClick={() => handleDelete(arrayKey, index)}
            sx={{ position: "absolute", right: -130, top: 0 }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );

  if (!localData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={modalStyle(hasArray)}>
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
          <Grid item xs={12} md={hasArray ? 4 : 12}>
            {Object.keys(localData)
              .filter((key) => !Array.isArray(localData[key]))
              .map((key) => (
                <Grid
                  item
                  xs={12}
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
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
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {String(selectedRow[key])}
                  </Typography>
                </Grid>
              ))}
          </Grid>
          {hasArray && (
            <Grid item xs={12} md={6}>
              {Object.keys(localData)
                .filter((key) => Array.isArray(localData[key]))
                .map((key) => (
                  <div key={key}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "#226D68", mb: 1 }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    {renderValue(localData[key], key)}
                  </div>
                ))}
            </Grid>
          )}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default DetailsModal;
