import React, { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import avatar from "../../images/avatar.png";
import "../../style/userlist.css";
import { Scrollbars } from "react-custom-scrollbars";
import api from "../../utils/api_call";
import ChatComponent from "../Chat/Chat1/Chat1";
import { useSelector } from "react-redux";

function ConversationList(props) {
  const [friends, setFriends] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [user, setUser] = useState(null);
  const [us, setus] = useState([]);
  const [q, setQ] = useState("");

  const currentUser = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    fetchFriends();
  }, []);
  const id = {
    id: currentUser?.id,
  };
  //console.log(id);
  function fetchFriends() {
    api.post("/match/get-matches", id).then(({ data }) => {
      setFriends(data);
      setus(data);
    });
  }

  function viewUser(e, user) {}
  function openChat(user) {
    setUser(user);
    setChatStarted(true);
  }
  useEffect(() => {
    filterUsers();
  }, [q]);

  function filterUsers() {
    if (q == "") {
      fetchFriends();
    } else {
      let filtered = us.filter(
        (user) =>
          user.suggested.firstname.includes(q) ||
          user.suggested.lastname.includes(q) ||
          user.suggested.username.includes(q)
      );

      setFriends(filtered);
    }
  }

  return (
    <>
      <Row className="mx-1">
        <Col xs={12} md={6} lg={4}>
          <Card
            className="mt-1"
            style={{ background: "#767795", height: "89vh" }}
          >
            <CardContent style={{ padding: "0" }}>
              <TextField
                id="filled-basic"
                label="Search here"
                variant="filled"
                type="text"
                color="white"
                style={{
                  background: "#48485c",
                  width: "100%",
                }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                focused
                sx={{ input: { color: "#c7c7c7" } }}
              />
              <Scrollbars style={{ width: "100%", height: "88vh" }}>
                <List
                  className="user-list-ul"
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {/*{if(id != user.sender.id || id != user.receiver.id) {
                
                    }}*/}
                  {/* TODO : outing own user */}
                  {friends.map((user) => (
                    <ListItem
                      onClick={() => openChat(user)}
                      className="user-list"
                      key={user.id}
                      style={{ cursor: "pointer" }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={user.partner.firstname + user.partner.lastname}
                          src={avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          user.partner.firstname + " " + user.partner.lastname
                        }
                        secondary={
                          <span style={{ color: "#c3c3c3" }}>
                            Hi, Hello friends...
                          </span>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Scrollbars>
            </CardContent>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={8}>
          {chatStarted ? (
            <ChatComponent user={user.partner} />
          ) : (
            <Card
              className="mt-1 d-flex justify-content-center align-items-center"
              style={{ height: "100%", background: "white", padding: "0" }}
            >
              <div style={{ fontSize: "1.5rem" }}>click to start chatting</div>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ConversationList;
