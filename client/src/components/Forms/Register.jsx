import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/api_calls";
import { update } from "../../redux/locationSlice";
import api from "../../utils/api_call";
import C from "../../utils/consts";
import * as yup from "yup";

function RegisterModal(props) {
  useEffect(() => {
    location();
  }, []);

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
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    gender: "female",
    height: "",
    weight: "",
    bodyType: "",
    religion: "",
    email: "",
    birthday: "2022-10-24",
    hobbies: [],
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const [alertInfo, setAlertInfo] = useState({
    type: null,
    open: false,
    text: "",
  });
  function openAlert(e) {
    setAlertInfo({
      type: "success",
      open: true,
      text: "Your are successfully registered!",
    });

    setTimeout(() => {
      setAlertInfo({
        type: null,
        open: false,
        text: "",
      });
    }, 5000);
  }

  const [checked, setChecked] = useState(false);

  function handleChecked(e, hobby) {
    //console.log(hobby);
    console.log(checked);
    user.hobbies.push(hobby.value);
    //setCompletedTasks([...completedTasks, key])
    //completedTasks.push(key)
    //console.log(completedTasks.length)
    setChecked(true);
    console.log(user);
  }

  function handleRegister(e) {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;

    setUser(newUser);
  }

  const [error, setError] = useState({
    error: true,
    message: "",
  });

  const navigate = useNavigate();

  function handleHobbies(e, value) {
    let hbs = [];

    value.forEach((hby) => {
      hbs.push(hby.value);
    });
    user.hobbies = hbs;
  }

  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const l = useSelector((state) => state.location);
  async function registerUser(e) {
    e.preventDefault();

    const schema = yup.object().shape({
      confirmPassword: yup
        .string()
        .min(6)
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
      username: yup
        .string()
        .min(6)
        .max(20)
        .required(),
      bio: yup.string().required(),
      birthday: yup.date().required(),
      email: yup
        .string()
        .email()
        .required(),
      religion: yup.string().required(),
      bodyType: yup.string().required(),
      weight: yup
        .number()
        .min(1)
        .required(),
      height: yup
        .number()
        .min(1)
        .required(),
      gender: yup.string().required(),
      lastname: yup
        .string()
        .min(5)
        .max(20)
        .required(),
      firstname: yup
        .string()
        .min(5)
        .max(20)
        .required(),
    });
    user.weight = user.weight == "" ? "0" : user.weight;
    user.height = user.height == "" ? "0" : user.height;

    const valid = await schema.isValid(user);

    if (!valid) {
      schema.validate(user).catch(function(err) {
        alert(err.errors);
      });
    } else {
      user.latitude = l.latitude;
      user.longitude = l.longitude;

      user.height = parseFloat(user.height);
      api.post("/register", user).then(({ data }) => {
        const { latitude, longitude } = l;

        loginUser(
          {
            username: user.username,
            password: user.password,
            latitude,
            longitude,
          },
          dispatch,
          navigate
        );
        props.onHide();
        openAlert();
      });
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-60w"
    >
      <Modal.Header
        style={{ background: "#d32f2f", color: "white" }}
        closeButton
      >
        <Modal.Title name="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="FirstName"
                //helperText="select height range"
                name="firstname"
                value={user.firstname}
                onChange={(e) => handleRegister(e)}
              />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="Lastname"
                //helperText="select height range"
                name="lastname"
                value={user.lastname}
                onChange={(e) => handleRegister(e)}
              />
            </Col>

            <Col xs={12} md={6} lg={4}>
              <FormControl>
                <FormLabel name="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  //name='gender'
                  name="gender"
                  value={user.gender}
                  onChange={handleRegister}
                >
                  <FormControlLabel
                    checked={user.gender === "female"}
                    id="female"
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    checked={user.gender === "male"}
                    id="male"
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <TextField
                className="width-100 mb-3"
                label="Height (M)"
                //helperText="select height range"
                name="height"
                value={user.height}
                onChange={(e) => handleRegister(e)}
                type="number"
              />
            </Col>
            <Col xs={12} md={6} lg={3}>
              <TextField
                className="width-100 mb-3"
                label="Weight (KG)"
                //helperText="select height range"
                name="weight"
                value={user.weight}
                onChange={(e) => handleRegister(e)}
                type="number"
              />
            </Col>
            <Col xs={12} md={6} lg={3}>
              <TextField
                className="width-100"
                id="bodyType"
                name="bodyType"
                select
                label="Body Type"
                value={user.bodyType}
                onChange={handleRegister}
                //size='small'
                //helperText="select height range"
              >
                {C.bodyTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <TextField
                name="religion"
                className="width-100"
                select
                label="Religion"
                value={user.religion}
                onChange={(e) => handleRegister(e)}
                //size='small'
                //helperText="select height range"
              >
                {C.religions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>

            <Col xs={12} md={6} lg={6}>
              <TextField
                className="width-100 mb-3"
                label="Email"
                type="email"
                //helperText="select height range"
                name="email"
                value={user.email}
                onChange={(e) => handleRegister(e)}
              />
            </Col>

            <Col xs={12} md={6} lg={6}>
              <TextField
                id="date"
                className="width-100 mb-3"
                label="Date"
                type="date"
                name="birthday"
                value={user.birthday}
                onChange={(e) => handleRegister(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Col>

            <Col xs={12} md={6} lg={6}>
              <Autocomplete
                multiple
                name="hobby"
                size="small"
                onChange={(event, value) => handleHobbies(event, value)}
                options={C.hobbies}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hobbies"
                    placeholder="Hobbies"
                  />
                )}
              />
            </Col>

            <Col xs={12} md={6} lg={6}>
              <TextField
                className="mb-2"
                style={{ width: "100%" }}
                name="bio"
                label="Bio"
                multiline
                rows={3}
                //defaultValue=""
                value={user.bio}
                onChange={(e) => handleRegister(e)}
              />
            </Col>

            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="Username"
                //helperText="select height range"
                name="username"
                value={user.username}
                onChange={(e) => handleRegister(e)}
              />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="Password"
                type="password"
                //helperText="select height range"
                name="password"
                value={user.password}
                onChange={(e) => handleRegister(e)}
              />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="Confirm Password"
                type="password"
                //helperText="select height range"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) => handleRegister(e)}
              />
            </Col>
          </Row>

          <Box style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={registerUser}
              color="error"
              variant="contained"
              type="submit"
            >
              Register
            </Button>
          </Box>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
