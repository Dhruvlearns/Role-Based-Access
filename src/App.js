import React, { useContext } from "react";
import "./App.css";
import { ThemeContext } from "../src/context/ThemeContext"; // Import the context
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "../src/pages/HomePage";

function App() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Access context values

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              RBAC Dashboard
            </Typography>
            <Button color="inherit" onClick={toggleTheme}>
              {isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
            </Button>
            <Link to="/" style={{ textDecoration: "none", color: "white", marginLeft: "10px" }}>
              Home
            </Link>
            <Link to="/users" style={{ textDecoration: "none", color: "white", marginLeft: "10px" }}>
              Users
            </Link>
            <Link to="/roles" style={{ textDecoration: "none", color: "white", marginLeft: "10px" }}>
              Roles
            </Link>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
