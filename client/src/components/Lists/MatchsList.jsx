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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MachsList(props) {
  const [users, setUsers] = useState([]);
  const [us, setus] = useState([]);
  const [q, setQ] = useState("");

  const currentUser = useSelector((state) => state.auth.loggedUser);
  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    const d = {
      id: currentUser?.id,
      type: "match",
    };
    api.post("/match/get-matches", d).then(({ data }) => {
      if (data?.success == false) {
        alert(data?.error);
      } else {
        setUsers(data);
        setus(data);
      }
    });
  }

  const n = useNavigate();

  function viewUser(user) {
    console.log(user);
    n("/profile", { state: user.partner });
  }

  function sendRequest(user) {
    const sender_id = currentUser?.id;
    const receiver_id = user.id;
    const type = "relationship";

    const req = { sender_id, receiver_id, type };

    api.post("/request/send-request", req).then(({ data }) => {
      fetchUsers();
    });
  }
  useEffect(() => {
    filterUsers();
  }, [q]);

  function filterUsers() {
    if (q == "") {
      fetchUsers();
    } else {
      let filtered = us.filter(
        (user) =>
          user.suggested.firstname.includes(q) ||
          user.suggested.lastname.includes(q) ||
          user.suggested.username.includes(q)
      );

      setUsers(filtered);
    }
  }

  return (
    <>
      <Row className="mx-1">
        <Col xs={12} md={6} lg={12}>
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
                  {users.map((user) => (
                    <ListItem className="user-list" key={user.id}>
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
                          <Typography component="span">
                            <Stack
                              style={{ marginTop: "5px" }}
                              direction="row"
                              spacing={1}
                            >
                              <Button
                                style={{
                                  color: "whitesmoke",
                                  border: "1px solid whitesmoke",
                                  borderRadius: "1rem",
                                }}
                                size="small"
                                variant="outlined"
                                onClick={() => viewUser(user)}
                              >
                                View
                              </Button>
                              <Button
                                onClick={() => sendRequest(user.partner)}
                                style={{ borderRadius: "1rem" }}
                                color="success"
                                size="small"
                                variant="contained"
                              >
                                {" "}
                                Request
                              </Button>
                              <Button
                                style={{ borderRadius: "1rem" }}
                                color="error"
                                size="small"
                                variant="contained"
                              >
                                Block
                              </Button>
                            </Stack>
                          </Typography>
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
          {/*<ChatComponent></ChatComponent>*/}
        </Col>
      </Row>
    </>
  );
}

export default MachsList;
