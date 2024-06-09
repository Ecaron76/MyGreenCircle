import React from "react";
import { Box, InputBase, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        marginLeft: 3,
      }}
    >
      <InputBase
        sx={{
          color: "#4C4C4C",
          backgroundColor: "#E6E6E6",
          border: "1px solid #FAFAFA",
          borderRadius: "4px",
          width: "70%",
          "& .MuiInputBase-input": {
            paddingLeft: "14px",
          },
          p: 0.5,
        }}
        placeholder="Rechercher"
        inputProps={{ "aria-label": "search" }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#4C4C4C", ml: 1 }} />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default SearchBar;
