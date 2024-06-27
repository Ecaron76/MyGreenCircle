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
import { getAllEvents } from "./services/event.service";
import { User } from "./types/types";
import LoadingScreen from "./components/LoadingPage/Page";

interface CardData {
  type: "user" | "group" | "event" | "post";
  title: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const [groupCount, setGroupCount] = useState<string>("");
  const [userCount, setUserCount] = useState<string>("");
  const [userAdminCount, setUserAdminCount] = useState<string>("");
  const [postCount, setPostCount] = useState<string>("");
  const [eventCount, setEventCount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const users = await getAllUsers();
        setUserCount(users.length.toString());

        const adminUsers = users.filter((user: User) => user.admin === true);
        setUserAdminCount(adminUsers.length.toString());

        const groups = await getAllGroups();
        setGroupCount(groups.length.toString());

        const posts = await getAllPosts();
        setPostCount(posts.length.toString());

        const events = await getAllEvents();
        setEventCount(events.length.toString());
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatas();
  }, []);

  const cards: CardData[] = [
    { type: "user", title: "Utilisateurs", value: userCount },
    { type: "group", title: "Groupes", value: groupCount },
    { type: "event", title: "Événements", value: eventCount },
    { type: "post", title: "Posts", value: postCount },
    { type: "user", title: "Utilisateurs Admin", value: userAdminCount },
  ];

  const groupedCards = cards.reduce<Record<string, CardData[]>>((acc, card) => {
    (acc[card.type] = acc[card.type] || []).push(card);
    return acc;
  }, {});

  const [activeContent, setActiveContent] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeContent") || "Dashboard";
    } else {
      return "Dashboard";
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContent = localStorage.getItem("activeContent");
      if (savedContent) {
        setActiveContent(savedContent);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeContent", activeContent);
    }
  }, [activeContent]);

  const renderContent = () => {
    switch (activeContent) {
      case "Utilisateurs":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminUser />
          </Grid>
        );
      case "Groupes":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminGroupe />
          </Grid>
        );
      case "Événements":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminEvent type={activeContent} />
          </Grid>
        );
      case "Posts":
        return (
          <Grid sx={{ mt: 4, p: 1 }}>
            <AdminPost type={activeContent} />
          </Grid>
        );
      case "Dashboard":
      default:
        return (
          <Grid container spacing={3} sx={{ p: 2, mt: 8 }}>
            {Object.keys(groupedCards).map((type) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={type}>
                {groupedCards[type].map((card, index) => (
                  <DashboardContent
                    key={index}
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

  if (loading) {
    return <LoadingScreen />;
  }

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
