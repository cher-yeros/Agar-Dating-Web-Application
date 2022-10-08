import React, { useEffect, useState } from "react";

import { Language } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import AdminLoginModal from "./Forms/AdminLogin";
import AdminRegisterModal from "./Forms/AdminRegister";
import LoginModal from "./Forms/Login";
import RegisterModal from "./Forms/Register";

import { Button, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { update } from "../redux/locationSlice";
import "../style/homepage.css";

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    location();
  }, []);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (Auth.checkAdmin()) {
      navigate("/admin");
    } else if (Auth.checkAuth()) {
      navigate("/nearby");
    }
  }, []);

  const { t, i18n } = useTranslation();

  const [regModal, setregModal] = useState(false);
  const [logModal, setlogModal] = useState(false);
  const [adminLoginModal, setAdminLoginModal] = useState(false);
  const [adminRegModal, setAdminRegModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <div className="homepage ">
        <header>
          <div className="logo ">
            <img src={t(`agar_img`)} alt="Logo " />
          </div>

          <div className="brand "></div>

          <nav>
            <ul>
              <li>
                <Button
                  id="basic-button"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  startIcon={<Language />}
                  variant="contained"
                  color="error"
                >
                  {t("language")}
                </Button>
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
          </nav>
        </header>
        <main>
          <div className="container ">
            <h1 className="h-pr mb-3 ">Save your date with Agar</h1>
            <p className="desc mb-2 ">
              Lolorem1 Lorem ipsum dolor sit amet. rem ipsum dolor sit amet,
              consectetur adipisicing elit. Aspernatur, expedita?
            </p>

            <Button
              onClick={() => setlogModal(true)}
              size="large"
              color="success"
              variant="contained"
              style={{ marginRight: "1rem" }}
            >
              Login
            </Button>
            <Button
              onClick={() => setregModal(true)}
              size="large"
              color="success"
              variant="contained"
            >
              Register
            </Button>
          </div>
        </main>
      </div>

      <RegisterModal
        show={regModal}
        onHide={() => setregModal(false)}
        backdrop="static"
      />

      <LoginModal
        backdrop="static"
        show={logModal}
        onHide={() => setlogModal(false)}
      />

      <AdminLoginModal
        backdrop="static"
        show={adminLoginModal}
        onHide={() => setAdminLoginModal(false)}
      />

      <AdminRegisterModal
        backdrop="static"
        show={adminRegModal}
        onHide={() => setAdminRegModal(false)}
      />
    </>
  );

  function location() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition((pos) => {
              dispatch(
                update({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                })
              );
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                dispatch(
                  update({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                  })
                );
              },
              (err) => {
                alert(`ERROR(${err.code}): ${err.message}`);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          } else if (result.state === "denied") {
            alert("Location Access Denied!");
          }
          result.onchange = function() {
            console.log(result.state);
          };
        });
    } else {
      alert("Geo Location not available!");
    }
  }
}

export default Homepage;
