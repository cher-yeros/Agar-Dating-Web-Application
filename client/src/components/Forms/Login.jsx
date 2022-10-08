import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/api_calls";
import { update } from "../../redux/locationSlice";
import ResetPasswordModal from "./ForgetPassword";
import * as yup from "yup";
function LoginModal(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    location();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const [error, setError] = useState({
  //  error: true,
  //  message: "",
  //});

  const { loggedUser, loggedIn, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const l = useSelector((state) => state.location);

  async function handleLogin(e) {
    e.preventDefault();
    const { latitude, longitude } = l;
    const user = {
      username,
      password,
      latitude,
      longitude,
    };
    const schema = yup.object().shape({
      password: yup
        .string()
        .min(6)
        .required(),
      username: yup
        .string()
        .min(6)
        .required(),
    });

    const valid = await schema.isValid(user);
    if (!valid) {
      schema.validate(user).catch((error) => {
        alert(error.errors);
      });
      return;
    }

    await loginUser(user, dispatch, navigate);
  }
  const [resetPassword, setresetPassword] = useState(false);

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-50w"
          >
            <Modal.Header
              style={{ background: "#d32f2f", color: "white" }}
              closeButton
            >
              <Modal.Title id="contained-modal-title-vcenter">
                Login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="p-2" style={{ width: "85%" }}>
                <Row>
                  <Col lg={12}>
                    <Form>
                      <TextField
                        className="width-100 mb-3"
                        label="Username"
                        helperText={error.error ? error.message : ""}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                      />
                      <TextField
                        className="width-100 mt-3 mb-3"
                        label="Password"
                        //helperText="select height range"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                      />

                      <Box
                        className="mt-2"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button onClick={() => setresetPassword(true)}>
                          Reset Password
                        </Button>
                      </Box>
                      <Box
                        className="mt-3"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          size="large"
                          onClick={handleLogin}
                          color="error"
                          variant="contained"
                          type="submit"
                        >
                          Login
                        </Button>
                      </Box>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <ResetPasswordModal
        show={resetPassword}
        onHide={() => setresetPassword(false)}
        backdrop="static"
      />
    </Container>
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

export default LoginModal;
