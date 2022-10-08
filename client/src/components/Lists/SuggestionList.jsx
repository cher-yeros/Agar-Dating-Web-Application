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
import auth from "../../utils/auth";
import { useSelector } from "react-redux";

function SuggestionList(props) {
  const [users, setUsers] = useState([]);
  const [us, setus] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    if (auth.getUser() != null) {
      fetchUsers();
    }
  }, []);

  const currentUser = useSelector((state) => state.auth.loggedUser);
  function fetchUsers(e) {
    let url = "/match/get-suggestion";
    if (e) setQ(e.target.value);
    if (q) url = "/match/get-suggestion?q=" + q;

    api
      .post("/match/create-suggestion", {
        id: currentUser?.id,
      })
      .then(({ data }) => {
        console.log(data);
        if (data?.success == false) {
          alert(data?.error);
        } else {
          api
            .post(url, {
              id: currentUser?.id,
            })
            .then(({ data }) => {
              let filtered = data.filter(
                (item) => !(item.suggested.id == currentUser?.id)
              );
              setUsers(filtered);
              setus(filtered);
            });
        }
      });
  }
  const n = useNavigate();
  function viewUser(user) {
    n("/profile", { state: user?.suggested });
  }

  function sendRequest(user) {
    const sender_id = currentUser?.id;
    const receiver_id = user?.suggested.id;
    const type = "match";

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
          user?.suggested.firstname.includes(q) ||
          user?.suggested.lastname.includes(q) ||
          user?.suggested.username.includes(q)
      );

      setUsers(filtered);
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
              {users.map((user) => (
                <ListItem className="user-list" key={user?.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={user?.suggested.firstname + user?.suggested.lastname}
                      src={avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      user?.suggested.firstname + " " + user?.suggested.lastname
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
                          {/*<SendRequestButton user={ user?.suggested} />*/}
                          <Button
                            onClick={() => sendRequest(user)}
                            style={{ borderRadius: "1rem" }}
                            color="success"
                            size="small"
                            variant="contained"
                          >
                            Match Request
                          </Button>
                          {/*<Button style={{borderRadius: '1rem'}} color='error' size='small' variant='contained'>Block</Button>*/}
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

export default SuggestionList;
