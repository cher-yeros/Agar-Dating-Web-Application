import React, { useState } from 'react'
import { Navbar, Nav, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button, TextField, Box, FormControl, Radio, FormControlLabel,
  FormLabel, RadioGroup, Autocomplete
} from "@mui/material";
import api from '../../utils/api_call'
import { useNavigate } from "react-router-dom";
import logo from '../../images/logo.png';
import userLocation from '../../utils/location';

function AdminLoginModal(props) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({
    error: true,
    message: ''
  })

  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();

    const { latitude, longitude } = userLocation
    const user = {
      email,
      password,
      latitude,
      longitude
    }

    //console.log(user);

    api.post('/admin-login', user).then(({ data }) => {
      if (data.error) {
        setError({
          error: true,
          message: data.error
        })
      }

      console.log(data);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isAdmin', true)

        return (navigate('/admin'));
      }
    });
  }

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
            <Modal.Header style={{ background: '#21a945', color: 'white' }} closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Admin Login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className='p-2' style={{ width: '85%' }}>
                <Row>
                  <Col lg={12}>
                    <Form >
                      <TextField
                        className='width-100 mb-3'
                        label="email"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        type="text"
                      />
                      <TextField
                        className='width-100 mt-3 mb-3'
                        label="Password"
                        helperText={error.error ? error.message : ''}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                      />

                      <Box className='mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button>Reset Password</Button>
                      </Box>
                      <Box className='mt-3' style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button size='large' onClick={handleLogin} color='error' variant="contained" type="submit">
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
    </Container>
  );
}

export default AdminLoginModal