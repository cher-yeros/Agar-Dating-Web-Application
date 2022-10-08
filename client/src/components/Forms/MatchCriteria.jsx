import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import api from "../../utils/api_call";
import C from "../../utils/consts";
import MyAlert from "../Alert";
import * as yup from "yup";
function MatchCriteriaModal(props) {
  const currentUser = useSelector((state) => state.auth.loggedUser);

  const [criteria, setCriteria] = useState({
    heightRange: "",
    weightRange: "",
    ageRange: "",
    religion: "",
    bodyType: "",
    hobbies: [],
    UserId: currentUser?.id,
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
      text: "Your criteria is successfully added!",
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

  function handleInput(e) {
    const newC = { ...criteria };
    newC[e.target.name] = e.target.value;

    setCriteria(newC);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const schema = yup.object().shape({
      bodyType: yup.string().required(),
      religion: yup.string().required(),
      ageRange: yup.string().required(),
      weightRange: yup.string().required(),
      heightRange: yup.string().required(),
    });

    const valid = await schema.isValid(criteria);
    if (!valid) {
      schema.validate(criteria).catch((error) => {
        alert(error.errors);
      });
      return;
    }
    api.post("match/add-criteria", criteria).then(({ data }) => {
      props.onHide();
      openAlert();
    });
  }

  function handleChecked(e, hobby) {
    criteria.hobbies.push(hobby.value);
    setChecked(true);
  }

  function handleHobbies(e, value) {
    let hbs = [];

    value.forEach((hby) => {
      hbs.push(hby.value);
    });
    criteria.hobbies = hbs;
  }

  function handleCancel(e) {
    openAlert();
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-40w"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Match Criteria Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ rowGap: "2rem" }}>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100"
                name="heightRange"
                select
                label="Height Range"
                value={criteria.heightRange}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              >
                {C.heightRange.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} (M)
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100"
                name="ageRange"
                select
                label="Age Range"
                value={criteria.ageRange}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              >
                {C.ageRange.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <TextField
                className="width-100"
                name="weightRange"
                select
                label="Weight Range"
                value={criteria.weightRange}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              >
                {C.weightRange.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} (KG)
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <TextField
                className="width-100"
                name="bodyType"
                select
                label="Body Type"
                value={criteria.bodyType}
                onChange={handleInput}
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
            <Col xs={12} md={6} lg={6}>
              <TextField
                className="width-100"
                name="religion"
                select
                label="Religion"
                value={criteria.religion}
                onChange={handleInput}
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

            <Col xs={12} md={6} lg={12}>
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

            <div className="d-grid gap-2 mt-1">
              <Stack spacing={2} direction="row">
                <Box style={{ flexGrow: 1 }}></Box>
                <Button
                  onClick={handleCancel}
                  color="error"
                  variant="contained"
                  type="reset"
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  onClick={handleSubmit}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </div>
          </Row>
        </Modal.Body>
        {/*<Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>*/}
      </Modal>
      <MyAlert
        open={alertInfo.open}
        type={alertInfo.type}
        text={alertInfo.text}
      />
    </>
  );
}

export default MatchCriteriaModal;
