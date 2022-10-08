import React, { useEffect, useState } from "react";
import { Navbar, Nav, Modal, Form, Row, Col, Container } from "react-bootstrap";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  TextField,
  Box,
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  MenuItem,
  FormGroup,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import api from "../../utils/api_call";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import userLocation from "../../utils/location";
import C from "../../utils/consts";
import { useSelector } from "react-redux";
import * as yup from "yup";

function EditProfileModal(props) {
  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    gender: "female",
    height: "",
    weight: "",
    bodyType: "",
    religion: "",
    email: "",
    birthday: "",
    hobbies: [],
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    latitude: 0.0,
    longitude: 0.0,
  });

  let u = useSelector((state) => state.auth.loggedUser);
  console.log(u);
  useEffect(() => {
    u?.avatar ? delete u.avatar : (u.avatar = null);
    delete u?.latitude;
    delete u?.longitude;
    delete u?.login_status;
    delete u?.token;
    delete u?.createdAt;
    delete u?.updatedAt;
    delete u?.token;
    setUser(u);
  }, []);

  const [alertInfo, setAlertInfo] = useState({
    type: null,
    open: false,
    text: "",
  });
  function openAlert(e) {
    setAlertInfo({
      type: "success",
      open: true,
      text: "Your are successfully Edited!",
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

  function handleUpdate(e) {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;

    console.log(e.target.name, e.target.value);
    setUser(newUser);

    console.log(newUser);
  }

  function handleHobbies(e, value) {
    let hbs = [];

    value.forEach((hby) => {
      hbs.push(hby.value);
    });
    user.hobbies = hbs;
  }

  async function UpdateUser(e) {
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
    console.log(valid);

    if (!valid) {
      schema.validate(user).catch(function(err) {
        alert(err.errors);
      });
    } else {
      user.height = parseFloat(user.height);

      api.put("/edit-profile", user).then(({ data }) => {
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
      sx={{ zIndex: "100000000000" }}
    >
      <Modal.Header
        style={{ background: "#d32f2f", color: "white" }}
        closeButton
      >
        <Modal.Title name="contained-modal-title-vcenter">Update</Modal.Title>
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
                onChange={(e) => handleUpdate(e)}
              />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="Lastname"
                //helperText="select height range"
                name="lastname"
                value={user.lastname}
                onChange={(e) => handleUpdate(e)}
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
                  onChange={handleUpdate}
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
                onChange={(e) => handleUpdate(e)}
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
                onChange={(e) => handleUpdate(e)}
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
                onChange={handleUpdate}
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
                onChange={(e) => handleUpdate(e)}
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
                onChange={(e) => handleUpdate(e)}
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
                onChange={(e) => handleUpdate(e)}
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
                //onChange={handleChecked}
                //checked={checked}
                //value={user.hobbies}
                onChange={(event, value) => handleHobbies(event, value)}
                //value={user.hobbies}
                options={C.hobbies}
                getOptionLabel={(option) => option.label}
                //defaultValue={[C.hobbies[1]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hobbies"
                    placeholder="Hobbies"
                  />
                )}
              />
              {/*<FormControl>
                <FormLabel name="demo-row-radio-buttons-group-label">Hobbies</FormLabel>
                <FormGroup>
                  {C.hobbies.map((hobby, i) => 
                    <FormControlLabel
                      key={hobby.value}
                      checked={checked[i]}
                      control={
                          <Checkbox
                              color="primary"
                              //checked={checked[i]}
                              onClick={(e) => handleChecked(e, hobby)}
                          />
                      }
                      label={hobby.label}
                  />
                  )}

                  
                  </FormGroup>
              </FormControl>*/}
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
                onChange={(e) => handleUpdate(e)}
              />
            </Col>

            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100 mb-3"
                label="Username"
                //helperText="select height range"
                name="username"
                value={user.username}
                onChange={(e) => handleUpdate(e)}
              />
            </Col>
          </Row>

          <Box style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={UpdateUser}
              color="error"
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfileModal;
