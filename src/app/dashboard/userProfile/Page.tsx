import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const UserProfile = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: 8 }}>
      <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>H</Avatar>
      <Box>
        <Typography sx={{ color: "#000000" }}>Hanane Mouder</Typography>
        <Typography sx={{ color: "gray", fontSize: "0.75rem" }}>
          Admin
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
