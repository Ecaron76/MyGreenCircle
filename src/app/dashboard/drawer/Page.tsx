"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 200;

const DrawerComponent: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ): void => {
    setSelected(index);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#F2F2F2",
          color: "#3f3f3f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          padding: "16px 2px 2px 2px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="/myGreenCircle.png"
          alt="My GreenCircle"
          style={{ width: "80%", height: "auto", marginTop: "20px" }}
        />
        <List sx={{ width: "100%", marginTop: "48px" }}>
          {["Dashboard", "Utilisateurs", "Posts", "Groupes", "Événements"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                onClick={(event) => handleListItemClick(event, index)}
                disableRipple
                sx={{
                  padding: "10px 0px",
                  justifyContent: "center",
                  "& .MuiListItemButton-root": {
                    "&:hover": {
                      backgroundColor: "inherit",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    color: selected === index ? "#FFFFFF" : "#808080",
                    backgroundColor:
                      selected === index ? "#226D68" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selected === index ? "#226D68" : "transparent",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {index === 0 ? (
                      <DashboardIcon />
                    ) : index === 1 ? (
                      <GroupIcon />
                    ) : index === 2 ? (
                      <PostAddIcon />
                    ) : index === 3 ? (
                      <GroupIcon />
                    ) : (
                      <EventIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      color: "inherit",
                    }}
                  />
                </Box>
              </ListItem>
            )
          )}
        </List>
      </Box>
      <ListItem
        sx={{
          padding: "10px 24px",
          position: "relative",
          bottom: 20,
          width: "100%",
          color: "#A65959",
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: "#A65959" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{ fontSize: "0.875rem" }}
        />
      </ListItem>
    </Drawer>
  );
};

export default DrawerComponent;
