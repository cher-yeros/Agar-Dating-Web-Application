import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import api from "../../utils/api_call";
import MyAlert from "../Alert";
import * as yup from "yup";

function FeedbackModal(props) {
  const currentUser = useSelector((state) => state.auth.loggedUser);
  const [feedback, setFeedback] = useState({
    UserId: currentUser?.id,
    title: "",
    body: "",
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
      text: "Your feedback is successfully added!",
    });

    setTimeout(() => {
      setAlertInfo({
        type: null,
        open: false,
        text: "",
      });
    }, 5000);
  }

  function handleInput(e) {
    const newC = { ...feedback };
    newC[e.target.name] = e.target.value;

    setFeedback(newC);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const schema = yup.object().shape({
      body: yup.string().required(),
      title: yup.string().required(),
    });

    const valid = await schema.isValid(feedback);
    if (!valid) {
      schema.validate(feedback).catch((error) => {
        alert(error.errors);
      });
      return;
    }

    api.post("/post/store-feedback", feedback).then(({ data }) => {
      props.onHide();
      openAlert();
    });
  }

  function handleCancel(e) {
    props.onHide();
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
            Feedback Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ rowGap: "2rem" }}>
            <Col xs={12} md={12} lg={12}>
              <TextField
                className="width-100"
                name="title"
                //select
                label="Title"
                value={feedback.title}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              />
            </Col>
            <Col xs={12} md={12} lg={12}>
              <TextField
                className="width-100"
                name="body"
                //select
                label="Body"
                multiline
                rows={3}
                value={feedback.body}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
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

export default FeedbackModal;
