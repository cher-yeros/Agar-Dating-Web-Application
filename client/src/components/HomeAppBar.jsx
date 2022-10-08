import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  InputBase,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import avatar from "../images/avatar.png";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import MatchCriteriaModal from "./Forms/MatchCriteria";
import FeedbackModal from "./Forms/Feedback";
import PostModal from "./Forms/Post";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

function HomeAppBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout(e) {
    dispatch(logoutUser());
    return navigate("/");
  }

  const [matchModal, setmatchModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

  return (
    <div>
      <AppBar
        style={{
          position: "sticky",
          zIndex: "10000",
          top: "0",
          background: "#efefef",
          color: "#8c8c8c",
          boxShadow: "none",
        }}
        position="static"
      >
        <Toolbar color="primary">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {props.title}
          </Typography>
          {/*<Search style={{ border: "1px solid #d7d7d7", borderRadius: "1rem" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>*/}
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Help |</Button>
          <Button onClick={() => setFeedbackModal(true)} color="inherit">
            Feedback |
          </Button>
          <Button onClick={() => setmatchModal(true)} variant="warning">
            Match Criteria
          </Button>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>{" "}
          <Box style={{ marginLeft: "1rem" }} sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </AppBar>

      <MatchCriteriaModal
        backdrop="static"
        show={matchModal}
        onHide={() => setmatchModal(false)}
      />
      <FeedbackModal
        backdrop="static"
        show={feedbackModal}
        onHide={() => setFeedbackModal(false)}
      />
    </div>
  );
}

export default HomeAppBar;
