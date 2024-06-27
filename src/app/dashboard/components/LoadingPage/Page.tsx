import React from "react";
import { Box } from "@mui/material";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src="/myGreenCircleLogo.png"
        alt="Loading"
        style={{ width: "200px", marginBottom: "20px" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "8px",
            height: "8px",
            margin: "0 4px",
            borderRadius: "50%",
            backgroundColor: "#4C4C4C",
            animation: "blinking 1.4s infinite both",
          }}
        />
        <Box
          sx={{
            width: "8px",
            height: "8px",
            margin: "0 4px",
            borderRadius: "50%",
            backgroundColor: "#4C4C4C",
            animation: "blinking 1.4s infinite both",
            animationDelay: "0.2s",
          }}
        />
        <Box
          sx={{
            width: "8px",
            height: "8px",
            margin: "0 4px",
            borderRadius: "50%",
            backgroundColor: "#4C4C4C",
            animation: "blinking 1.4s infinite both",
            animationDelay: "0.4s",
          }}
        />
      </Box>
      <style>
        {`
          @keyframes blinking {
            0% {
              opacity: 0.2;
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0.2;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingScreen;
