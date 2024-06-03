import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { CalendarIcon } from "@mui/x-date-pickers";

/**
 * Komponent głównej strony aplikacji.
 *
 * @component
 * @returns {JSX.Element} Zwraca komponent głównej strony.
 */

const Home = () => {
  const navigate = useNavigate();

  /**
   * Funkcja nawigująca do określonej ścieżki.
   *
   * @param {string} path - Ścieżka do której następuje nawigacja.
   * @returns {function} Funkcja nawigacyjna.
   */

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleNavigate("")}
          >
            Mój Mechanik
          </Typography>
          <IconButton color="inherit" onClick={handleNavigate("account")}>
            <AccountCircle />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleNavigate("my-reservations")}
          >
            <CalendarIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Home;
