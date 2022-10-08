import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/logo.png";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  function handleLogout(e) {
    Auth.logout();
    return navigate("/");
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100%)` },
        ml: { sm: `240px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Agar Network Admin Page
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="error">
          Update Chatbot
        </Button>{" "}
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>{" "}
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
