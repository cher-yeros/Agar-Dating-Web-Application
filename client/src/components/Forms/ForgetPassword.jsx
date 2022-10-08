import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import validator from "validator";
import api from "../../utils/api_call";

function ResetPasswordModal(props) {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [code, setCode] = useState("");
  const [Key, setKey] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    key: "",
  });
  function valid() {
    let valid = true;
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      setErrors({ ...errors, email: "Enter Valid Email" });
      valid = false;
    }

    return valid;
  }
  const sendEmail = (e) => {
    e.preventDefault();
    setErrors({ ...errors, email: "" });

    if (!valid()) return;
    setisLoading(true);
    console.log(email);
    api.post("/reset-password", { email }).then(({ data }) => {
      if (!data?.success) {
        setErrors({ ...errors, email: data.message });
        setisLoading(false);
      } else {
        setConfirmed(true);
        setisLoading(false);
        setKey(data.key.toString());
        alert("Key is successfully sent - please enter the code below");
      }
    });
  };

  const [openChangePasswordModal, setopenChangePasswordModal] = useState(false);
  function confirm(e) {
    e.preventDefault();

    if (validator.isEmpty(code)) {
      setErrors({ ...errors, key: "Invalid Key" });
      return;
    }

    console.log(typeof Key, typeof code);
    if (Key != code) {
      setErrors({ ...errors, key: "Incorrect code" });
    } else {
      setopenChangePasswordModal(true);
    }
  }
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="add-product-modal-40"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reset Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <InputGroup className="mb-3">
                    <br />
                    <FormControl
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    <Button
                      onClick={sendEmail}
                      variant="outline-primary"
                      id="button-addon2"
                    >
                      {!isLoading ? (
                        "Get code"
                      ) : (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    {errors.email ? errors.email : null}
                  </Form.Text>
                  <br />
                </Col>

                <Col lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Code</Form.Label>
                    <Form.Control
                      onChange={(e) => setCode(e.target.value)}
                      value={code}
                      type="text"
                      placeholder="Enter a code that you recieved"
                      readOnly={!confirmed}
                    />
                    <Form.Text className="text-muted">
                      {errors.key ? errors.key : null}
                    </Form.Text>
                  </Form.Group>
                </Col>

                <div className="d-grid gap-2 mt-4">
                  <Button onClick={confirm} variant="primary" type="submit">
                    Confirm
                  </Button>
                </div>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      <ChangePasswordModal
        show={openChangePasswordModal}
        onHide={() => {
          setopenChangePasswordModal(false);
          props.onHide();
          setEmail("");
          setCode("");
          setKey("");
        }}
        backdrop="static"
        email={email}
      />
    </>
  );
}

export default ResetPasswordModal;

function ChangePasswordModal(props) {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    renewPassword: "",
  });

  function handleChangePwd(e) {
    let newPwd = { ...password };
    newPwd[e.target.name] = e.target.value;

    setPassword(newPwd);
  }

  function changePassword(e) {
    e.preventDefault();

    if (password.newPassword != password.renewPassword) {
      alert("password doesn't match!");
    } else {
      let payload = {
        email: props.email,
        password,
      };

      api.post("/change-password", payload).then(({ data }) => {
        if (!data?.success) {
          alert(data?.message);
        } else {
          alert("Successfully updated");
          setPassword({
            currentPassword: "",
            newPassword: "",
            renewPassword: "",
          });
          props.onHide();
        }
      });
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal-40"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form>
            <div className="row mb-3">
              <label
                htmlFor="newPassword"
                className="col-md-4 col-lg-3 col-form-label"
              >
                New Password
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  onChange={handleChangePwd}
                  value={password.newPassword}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="renewPassword"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Re-enter New Password
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  type="password"
                  className="form-control"
                  id="renewPassword"
                  name="renewPassword"
                  onChange={handleChangePwd}
                  value={password.renewPassword}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={changePassword}
                type="submit"
                className="btn btn-primary"
              >
                Change
              </button>
            </div>
          </form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
