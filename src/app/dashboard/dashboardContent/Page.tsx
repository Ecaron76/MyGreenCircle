import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  SxProps,
  Theme,
  Box,
} from "@mui/material";

interface ColorConfig {
  background: string;
  text: string;
}

const colorMap: Record<string, ColorConfig> = {
  user: {
    background:
      "linear-gradient(-110deg, #FEEAA1 15%, #226D68 15% 30%, #D6955B 30% 60%, #18534F 60% 100%)",
    text: "white",
  },
  event: {
    background:
      "linear-gradient(-110deg, #D6955B 15%, #226D68 15% 30%, #D6955B 30% 60%, #18534F 60% 100%)",
    text: "white",
  },
  group: {
    background:
      "linear-gradient(-110deg, #18534F 25%, #D6955B 25% 55%, #18534F 55% 100%)",
    text: "white",
  },
  post: {
    background:
      "linear-gradient(-110deg, #226D68 15%, #D6955B 15% 30%, #18534F 30% 60%, #D6955B 60% 100%)",
    text: "white",
  },
};

interface DataCardProps {
  type: keyof typeof colorMap;
  title: string;
  value: string;
}

const DashboardContent: React.FC<DataCardProps> = ({ type, title, value }) => {
  const { background, text } = colorMap[type] || colorMap.user;

  return (
    <Card sx={{ height: "25%", backgroundImage: background, pt: 1, mb: 3 }}>
      <CardContent sx={{ color: text, textAlign: "left", pl: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "24px" }}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "regular", fontSize: "12px" }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardContent;
