import React from "react";
import logo from "../images/logo.png";
import "../style/side.css";
import "../style/fontawesome6/pro/css/all.css";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Badge,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../images/avatar.png";
import { Feed, PersonSearch } from "@mui/icons-material";
//import FeedIcon from '@mui/icons-material/Feed';
//import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatIcon from "@mui/icons-material/Chat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import RecommendIcon from "@mui/icons-material/Recommend";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssistantIcon from "@mui/icons-material/Assistant";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Auth from "../utils/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LeftSide = () => {
  let user = useSelector((state) => state.auth.loggedUser);
  const fname = user?.firstname;
  const lname = user?.lastname;
  const username = user?.username;

  const routes = [
    {
      name: "Find Nearby",
      routes: "/nearby",
      icon: <PersonPinCircleIcon />,
    },
    {
      name: "Messenger",
      routes: "/chat",
      icon: <ChatIcon />,
    },

    {
      name: "Your Match",
      routes: "/match",
      icon: <PeopleAltIcon />,
    },
    {
      name: "Suggestion",
      routes: "/suggestion",
      icon: <RecommendIcon />,
    },
    {
      name: "Requests",
      routes: "/request",
      icon: <PersonAddIcon />,
    },
    {
      name: "Talk with Chatbot",
      routes: "/chatbot",
      icon: <SmartToyIcon />,
    },
  ];

  return (
    <div id="sidebar-left">
      <aside>
        <div className="logo-box">
          <img src={logo} alt="Logo"></img>
          <span className="bati">Agar Network</span>
        </div>

        <div className="user-info">
          <Card
            style={{
              boxShadow: "none",
              background: "#fd7d74",
              borderRadius: "1rem",
            }}
            sx={{ minWidth: 275 }}
          >
            <CardContent style={{ padding: "0px" }}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/profile"
                state={{ user: user }}
              >
                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#fd7d74" }}>
                  <ListItem style={{ padding: "0.4rem 1rem" }} disablePadding>
                    <ListItemAvatar>
                      <Avatar
                        alt={fname + " " + lname}
                        src={
                          user?.avatar
                            ? `http://localhost:5000/${user?.avatar}`
                            : "images/default-avatar.jpg"
                        }
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={fname + " " + lname}
                      secondary={"@" + username}
                    />
                  </ListItem>
                </List>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div style={{ color: "white" }} className="category mt-1">
          <List>
            {routes.map((route) => (
              <Link
                style={{ color: "whitesmoke", textDecoration: "none" }}
                to={route.routes}
                key={route.name}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon style={{ color: "whitesmoke" }}>
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.name} />
                    {/*<Avatar edge='end' >N</Avatar>*/}
                    {/*<Badge badgeContent={4} color="secondary" edge='end'> {route.end }</Badge>*/}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>

          {/*<ul>
                    <li>
                        <a href="/discover" className="sidebar-link active">
                            <i className="fas fa-album-collection"></i>Feeds</a>
                    </li>
                    <li>
                        <a href="/discover" className="sidebar-link active">
                            <i className="fas fa-album-collection"></i>Discover</a>
                    </li>
                    <li>
                        <a className="sidebar-link" href="/chat">
                            <i className="fas fa-compact-disc "></i>Chats</a>
                    </li>
                    <li>
                        <a className="sidebar-link" href="/nearby">
                            <i className="fas fa-compact-disc "></i>Find Nearby</a>
                    </li>
                    <li>
                        <a className="sidebar-link" href="/match">
                            <i className="far fa-music-alt"></i>matches</a>
                    </li>
                    <li>
                        <a className="sidebar-link" href="/suggestions">
                            <i className="far fa-newspaper"></i>Suggestions</a>
                    </li>
                    <li>
                        <a className="sidebar-link" href="/request">
                            <i className="far fa-newspaper"></i>Request</a>
                    </li>
                    <li>
                        <a className="sidebar-link" href="/counselor">
                            <i className="far fa-newspaper"></i>Counselor & Guidance</a>
                      </li>
                      
                    <li>
                        <a className="sidebar-link" href="/chatbot">
                            <i className="far fa-newspaper"></i>Chatbot</a>
                    </li>
                </ul>*/}
        </div>
      </aside>
    </div>
  );
};

export default LeftSide;
