import { Language } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../utils/auth";
import { logoutUser } from "../../redux/authSlice";
import { update } from "../../redux/locationSlice";
function Layout() {
  return (
    <header style={{ height: "4rem" }}>
      <Navbar />
      <Sidebar />
    </header>
  );
}

export default Layout;

function Navbar() {
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  function handleLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  const n = useNavigate();
  const dispatch = useDispatch();
  function logout() {
    auth.logout();
    dispatch(logoutUser());
    dispatch(update({}));
    n("/");
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand waves-effect" to="/admin">
          <strong className="blue-text">Dashboard</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link waves-effect" to="/admin">
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            {/*<li className="nav-item">
              <a
                className="nav-link waves-effect"
                href="https://mdbootstrap.com/docs/jquery/"
                target="_blank"
              >
                About MDB
              </a>
            </li>*/}
          </ul>

          <ul className="navbar-nav nav-flex-icons">
            <li className="nav-item">
              <a
                onClick={logout}
                className="nav-link border border-light rounded waves-effect "
              >
                <i className="fas fa-sign-out-alt mr-3"></i>
                Logout
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link border border-light rounded waves-effect "
                target="_blank"
                id="basic-button"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="contained"
                color="error"
                style={{ width: "7rem" }}
              >
                <i className="fas fa-globe mr-2"></i>
                {t("language")}
              </a>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleLanguage("en")}>
                  English
                </MenuItem>
                <MenuItem onClick={() => handleLanguage("am")}>
                  Amharic
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Sidebar() {
  return (
    <div style={{ left: "0" }} className="sidebar-fixed position-fixed">
      <a className="logo-wrapper waves-effect" style={{ padding: "1.5rem" }}>
        <img
          style={{ height: "10rem" }}
          src="images/agar-en-red.png"
          className="img-fluid my-3"
          alt=""
        />
      </a>

      <div className="list-group list-group-flush">
        <Link to="/admin" className="list-group-item active waves-effect">
          <i className="fas fa-chart-pie mr-3"></i>Dashboard
        </Link>
        <Link
          to="/manage-users"
          className="list-group-item list-group-item-action waves-effect"
        >
          <i className="fas fa-user-cog mr-3"></i>Manage Users
        </Link>
        <Link
          to="/advertise"
          className="list-group-item list-group-item-action waves-effect"
        >
          <i className="fas fa-ad mr-3"></i>Advertise
        </Link>
        <Link
          to="/read-feedbacks"
          className="list-group-item list-group-item-action waves-effect"
        >
          <i className="fas fa-comment-alt-dots mr-3"></i>Read Feedbacks
        </Link>
        {/*<Link
          to="/read-feedbacks"
          className="list-group-item list-group-item-action waves-effect"
        >
          <i className="fas fa-robot mr-3"></i>Update Chatbot
        </Link>*/}
      </div>
    </div>
  );
}
