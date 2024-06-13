"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DrawerComponent from "@/app/dashboard/drawer/Page";
import SearchBar from "@/app/dashboard/components/searchBar/Page";
import UserProfile from "./components/userProfile/Page";
import DashboardContent from "./dashboardContent/Page";
import AdminUser from "./adminUser/Page";
import AdminPost from "./adminPost/Page";
import AdminGroupe from "./adminGroupe/Page";
import AdminEvent from "./adminEvent/Page";
import { getAllGroups } from "./services/groupe.service";
import { getAllUsers } from "./services/user.service";
import { getAllPosts } from "./services/post.service";

interface CardData {
  type: "user" | "group" | "event" | "post";
  title: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const [groupCount, setGroupCount] = useState("");
  const [userCount, setUserCount] = useState("");
  const [userAdminCount, setUserAdminCount] = useState("");
  const [postCount, setPostCount] = useState("");

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const users = await getAllUsers();
        setUserCount(users.length.toString());

        const adminUsers = users.filter((user) => user.admin === true);
        setUserAdminCount(adminUsers.length.toString());

        const groups = await getAllGroups();
        setGroupCount(groups.length.toString());

        const posts = await getAllPosts();
        setPostCount(posts.length.toString());
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchDatas();
  }, []);
  const cards: CardData[] = [
    { type: "user", title: "Utilisateurs", value: userCount },
    { type: "group", title: "Groupes", value: groupCount },
    { type: "event", title: "Événements", value: "25,000" },
    { type: "post", title: "Posts", value: postCount },
    { type: "user", title: "Utilisateurs Admin", value: userAdminCount },
  ];

  const groupedCards = cards.reduce((acc: any, card) => {
    (acc[card.type] = acc[card.type] || []).push(card);
    return acc;
  }, {});

  const [activeContent, setActiveContent] = useState<string>(() => {
    return localStorage.getItem("activeContent") || "";
  });

  useEffect(() => {
    localStorage.setItem("activeContent", activeContent);
  }, [activeContent]);

  const renderContent = () => {
    switch (activeContent) {
      case "Utilisateurs":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminUser></AdminUser>
          </Grid>
        );
      case "Groupes":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminGroupe></AdminGroupe>
          </Grid>
        );
      case "Événements":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminEvent type={activeContent}></AdminEvent>
          </Grid>
        );
      case "Posts":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminPost type={activeContent}></AdminPost>
          </Grid>
        );
      case "Dashboard":

      default:
        return (
          <Grid container spacing={3} sx={{ p: 2, mt: 8 }}>
            {Object.keys(groupedCards).map((type) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={type}>
                {groupedCards[type].map((card: any, index: any) => (
                  <DashboardContent
                    key={card.key}
                    type={card.type}
                    title={card.title}
                    value={card.value}
                  />
                ))}
              </Grid>
            ))}
          </Grid>
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: "#ECF8F6",
        margin: 0,
        padding: 0,
      }}
    >
      <DrawerComponent onContentChange={setActiveContent} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          {activeContent === "Dashboard" ? (
            <SearchBar />
          ) : (
            <Typography
              sx={{
                fontWeight: "fontWeightMedium",
                fontSize: 31,
                color: "#4C4C4C",
              }}
            >
              {"Gestion des " + activeContent}
            </Typography>
          )}
          <UserProfile />
        </Box>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
