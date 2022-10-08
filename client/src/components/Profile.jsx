import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Dashboard.css";
import "../style/list-card.css";
import api from "../utils/api_call";
import PostModal from "./Forms/Post";
import HomeAppBar from "./HomeAppBar";
import LeftSide from "./Leftside";

import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, updateAvatar } from "../redux/authSlice";
import EditProfileModal from "./Forms/EditProfile";

const Profile = (props) => {
  const userlocation = useLocation();
  const user = userlocation.state.user;

  const navigate = useNavigate();

  const [editModal, setEditModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [posts, setPosts] = useState([]);

  function fetchPosts() {
    api.get("/post/get-posts?id=" + user?.id).then(({ data }) => {
      setPosts(data);
    });
  }

  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();
  function changeProfile(e) {
    const formData = new FormData();
    formData.append("profileImg", e.target.files[0]);
    formData.append("id", loggedUser?.id);

    api.post("/change-profile", formData).then(({ data }) => {
      var output = document.getElementById("profileImg");
      output.src = `http://localhost:5000/${data}`;

      console.log(data);
      dispatch(updateAvatar(data));
      //dispatch(loginSuccess({ ...loggedUser, avatar: data }));
    });
  }

  function deletePost(post) {
    api
      .delete("/post/delete-post?id=" + post.id, { id: post.id })
      .then(({ data }) => {
        console.log(data);
        fetchPosts();
      });
  }

  function postDone() {
    setPostModal(false);
    fetchPosts();
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            style={{ padding: "0" }}
            className="left-side"
            xs={12}
            md={6}
            lg={3}
          >
            <LeftSide />
          </Col>

          <Col style={{ padding: "0" }} xs={12} md={6} lg={9}>
            <HomeAppBar title="Profile" />
            <Container style={{ marginTop: "2rem" }}>
              <div className="row">
                <div className="col-lg-3">
                  <Card
                    style={{
                      maxWidth: 345,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Profile Picture
                      </Typography>
                    </CardContent>
                    <CardMedia
                      sx={{
                        width: "50%",
                        height: "auto",
                        margin: "auto",
                      }}
                      component="img"
                      height="140"
                      image={
                        user?.avatar
                          ? `http://localhost:5000/${user?.avatar}`
                          : "images/default-avatar.jpg"
                      }
                      alt={user?.firstname}
                      id="profileImg"
                    />

                    {user.id == loggedUser?.id ? (
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() =>
                            document.getElementById("change-avatar").click()
                          }
                          variant="outlined"
                          size="small"
                        >
                          Change
                        </Button>

                        <Button variant="outlined" size="small">
                          Delete
                        </Button>
                        <input
                          onChange={changeProfile}
                          style={{ display: "none" }}
                          type="file"
                          name="profileImg"
                          id="change-avatar"
                        />
                      </CardActions>
                    ) : (
                      <CardActions />
                    )}
                  </Card>
                </div>
                <div className="col-lg-4">
                  <Card
                    style={{
                      maxWidth: 345,
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        Posts
                      </Typography>
                      {user.id == loggedUser?.id ? (
                        <Button
                          onClick={() => setEditModal(true)}
                          variant="outlined"
                          size="small"
                        >
                          Edit Profile
                        </Button>
                      ) : null}
                    </CardContent>
                    <CardContent>
                      <List
                        sx={{
                          maxHeight: "28rem",
                          overflowY: "auto",
                          width: "100%",
                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItem>
                          <ListItemText
                            primary="Fullaname"
                            secondary={`${user?.firstname} ${user?.lastname}`}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Email"
                            secondary={user?.email}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Username"
                            secondary={"@" + user?.username}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Birthday"
                            secondary={user?.birthday}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Gender"
                            secondary={user?.gender}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />

                        <ListItem>
                          <ListItemText
                            primary="Religion"
                            secondary={user?.religion}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Height"
                            secondary={user?.height}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Weight"
                            secondary={user?.weight}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Body Type"
                            secondary={user?.bodyType}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText primary="Bio" secondary={user?.bio} />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                        <ListItem>
                          <ListItemText
                            primary="Hobbies"
                            secondary={user?.hobbies}
                          />
                        </ListItem>
                        <Divider sx={{ width: "100%" }} />
                      </List>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></CardActions>
                  </Card>
                </div>
                <div className="col-lg-5">
                  <Card
                    style={{
                      maxWidth: 345,
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        Posts
                      </Typography>
                      {user.id == loggedUser?.id ? (
                        <Button
                          onClick={() => setPostModal(true)}
                          variant="outlined"
                          size="small"
                        >
                          Add New Post
                        </Button>
                      ) : null}
                    </CardContent>
                    <CardContent sx={{ maxHeight: "31rem", overflowY: "auto" }}>
                      {posts.map((p) => (
                        <Card
                          sx={{
                            marginBottom: "1rem",
                          }}
                          style={{
                            maxWidth: 345,
                            marginBottom: "1rem",
                          }}
                        >
                          <CardContent>
                            <Typography variant="p" component="div">
                              {p.text}
                            </Typography>
                          </CardContent>
                          <CardMedia
                            sx={{
                              width: "auto",
                              height: "10rem",
                              margin: "auto",
                            }}
                            component="img"
                            height="140"
                            image={`http://localhost:5000/${p.image}`}
                            alt="green iguana"
                          />

                          <CardActions
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {user.id == loggedUser?.id ? (
                              <Button
                                onClick={() => deletePost(p)}
                                variant="outlined"
                                size="small"
                              >
                                delete
                              </Button>
                            ) : null}
                          </CardActions>
                        </Card>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>

      <EditProfileModal
        show={editModal}
        onHide={() => setEditModal(false)}
        backdrop="static"
      />

      <PostModal backdrop="static" show={postModal} onHide={() => postDone()} />
    </>
  );
};
export default Profile;
