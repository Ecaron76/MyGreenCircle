"use client";
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mr: 4,
      }}
    >
      <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>
        {session?.user.username.charAt(0).toLocaleUpperCase()}
      </Avatar>
      <Box>
        <Typography sx={{ color: "#000000" }}>
          {session?.user.username}
        </Typography>
        <Typography sx={{ color: "gray", fontSize: "0.75rem" }}>
          {session?.user.roles[0].role}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
