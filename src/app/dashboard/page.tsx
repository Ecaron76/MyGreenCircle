import React from "react";
import { Box, Grid } from "@mui/material";
import DrawerComponent from "@/app/dashboard/drawer/Page";
import SearchBar from "@/app/dashboard/searchBar/Page";
import UserProfile from "./userProfile/Page";
import DashboardContent from "./dashboardContent/Page";

interface CardData {
  type: "user" | "group" | "event" | "post";
  title: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const cards: CardData[] = [
    { type: "user", title: "Utilisateurs", value: "40,000" },
    { type: "group", title: "Groupes", value: "30,000" },
    { type: "event", title: "Événements", value: "25,000" },
    { type: "post", title: "Posts", value: "15,000" },
    { type: "user", title: "Nouveaux Utilisateurs", value: "40,000" },
    { type: "user", title: "Utilisateurs Actifs", value: "40,000" },
  ];

  const groupedCards = cards.reduce((acc: any, card) => {
    (acc[card.type] = acc[card.type] || []).push(card);
    return acc;
  }, {});

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <DrawerComponent />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#ECF8F6", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <SearchBar />
          <UserProfile />
        </Box>
        <Grid container spacing={3} sx={{ p: 2, mt: 8 }}>
          {Object.keys(groupedCards).map((type) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={type}>
              {groupedCards[type].map((card: any, index: any) => (
                <DashboardContent
                  type={card.type}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
