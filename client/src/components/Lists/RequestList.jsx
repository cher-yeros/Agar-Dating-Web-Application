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
import avatar from "../../images/avatar.png";
import "../../style/userlist.css";
import { Scrollbars } from "react-custom-scrollbars";
import api from "../../utils/api_call";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequestList(props) {
  const [requests, setRequests] = useState([]);
  const [us, setus] = useState([]);
  const [q, setQ] = useState("");
  const currentUser = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    fetchRequests();
  }, [requests]);
  const id = {
    id: currentUser?.id,
  };
  function fetchRequests() {
    const d = {
      id: currentUser?.id,
      type: "match",
    };
    api.post("/request/my-request", d).then(({ data }) => {
      setRequests(data);
      setus(data);
    });
  }
  function handleAccept(request) {
    api.post("request/accept-request", { id: request.id }).then(({ data }) => {
      console.log(data);
    });
  }
  function handleReject(request) {
    api.post("user/reject-request", { id: request.id }).then(({ data }) => {
      console.log(data);
    });
  }

  const n = useNavigate();
  function viewUser(user) {
    n("/profile", { state: user });
  }
  useEffect(() => {
    filterUsers();
  }, [q]);

  function filterUsers() {
    console.log(requests);
    if (q == "") {
      fetchRequests();
    } else {
      let filtered = us.filter(
        (user) =>
          user.suggested.firstname.includes(q) ||
          user.suggested.lastname.includes(q) ||
          user.suggested.username.includes(q)
      );

      setRequests(filtered);
    }
  }

  return (
    <>
      <Card className="mt-1" style={{ background: "#767795", height: "89vh" }}>
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
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {requests.map((request) => (
                <ListItem className="user-list" key={request.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={request.sender.firstname + request.lastname}
                      src={avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography>
                        {request.sender.firstname +
                          " " +
                          request.sender.lastname}
                        <small
                          style={{
                            position: "absolute",
                            right: "0.75rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {request.type}
                        </small>
                      </Typography>
                    }
                    secondary={
                      <Typography component="span">
                        <Stack
                          style={{ marginTop: "5px" }}
                          direction="row"
                          spacing={1}
                        >
                          {/*<p>type: { request.type}</p>*/}
                          <Button
                            onClick={(e) => viewUser(request.sender)}
                            style={{
                              color: "whitesmoke",
                              border: "1px solid whitesmoke",
                              borderRadius: "1rem",
                            }}
                            size="small"
                            variant="outlined"
                          >
                            View
                          </Button>
                          <Button
                            onClick={(e) => handleAccept(request)}
                            style={{ borderRadius: "1rem" }}
                            color="success"
                            size="small"
                            variant="contained"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={(e) => handleReject(request)}
                            style={{ borderRadius: "1rem" }}
                            color="error"
                            size="small"
                            variant="contained"
                          >
                            Reject
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
    </>
  );
}

export default RequestList;

function SendRequestButton() {
  return (
    <Button
      style={{ borderRadius: "1rem" }}
      color="error"
      size="small"
      variant="contained"
    >
      Reject
    </Button>
  );
}
