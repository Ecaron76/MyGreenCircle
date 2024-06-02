import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { GridCheckCircleIcon } from "@mui/x-data-grid";

interface alertProps {
  title: string;
}

export default function AlertComponents({ title }: alertProps) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [2000]);

  if (!open) return null;
  return (
    <Stack
      sx={{
        width: "20%",
        position: "absolute",
        top: 5,
        zIndex: 1000,
        justifyContent: "flex-start",
      }}
      spacing={2}
    >
      <Alert
        severity="success"
        iconMapping={{
          success: <GridCheckCircleIcon style={{ color: "#FFFFFF" }} />,
        }}
        sx={{
          width: "auto",
          maxWidth: "400px",
          bgcolor: "#226D68",
          color: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {title.slice(0, -1)}
      </Alert>
    </Stack>
  );
}
