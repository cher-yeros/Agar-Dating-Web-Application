import React, { useState } from 'react'
import { Button } from "@mui/material";
import { Navbar,Nav, NavDropdown, Container, Modal, Form, Row, Col } from 'react-bootstrap';
import { 
  TextField, MenuItem, FormControl, Radio, FormControlLabel,
  FormLabel, RadioGroup, FormGroup, Checkbox, Stack, Box } from "@mui/material";
import api from '../../utils/api_call'
import C from '../../utils/consts';
import MyAlert from '../Alert'

function AdminRegisterModal(props) {
  const [admin, setAdmin] = useState({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPasswod: ''
  })

  const [alertInfo, setAlertInfo] = useState({
    type: null,
    open: false,
    text: ''
  })
  function openAlert(e) {
    setAlertInfo({
      type: 'success',
      open: true,
      text: 'You are successfully registered!'
    })

    setTimeout(() => {
      setAlertInfo({
        type: null,
        open: false,
        text: ''
      })
    }, 5000 ); 
  }


  function handleInput(e) {
    const newC = { ...admin };
    newC[e.target.name] = e.target.value

    setAdmin(newC);

    console.log(newC);
  }

  function handleSubmit() {
    api.post('admin-register', admin).then(({data}) => {
      props.onHide();
      openAlert();
    })

  }


  function handleCancel(e) {
    props.onHide()
  }
  
    return (
      <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName='modal-40w'
        
      >
        <Modal.Header style={{background: '#21a945', color: 'white'}} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Admin Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{rowGap: '2rem'}}>
            <Col xs={12} md={6} lg={6}>
              <TextField
                className='width-100'
                name='firstname'
                label="Firstname"
                value={admin.firstname}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              />
               
            </Col>
            
          
            <Col xs={12} md={6} lg={6}>
              <TextField
                className='width-100'
                name='lastname'
                label="Lastname"
                value={admin.lastname}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              />
               
            </Col>
            
          
            <Col xs={12} md={6} lg={6}>
              <TextField
                className='width-100'
                name='email'
                label="Email"
                value={admin.email}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              />
               
            </Col>
            
          
            <Col xs={12} md={6} lg={6}>
              <TextField
                className='width-100'
                name='phone'
                label="Phone"
                value={admin.phone}
                onChange={handleInput}
                //size='small'
                //helperText="select height range"
              />
               
            </Col>
            
          
            <Col xs={12} md={6} lg={6}>
              <TextField
                className='width-100'
                name='password'
                label="Password"
                value={admin.password}
                onChange={handleInput}
                type='password'
                //size='small'
                //helperText="select height range"
              />
               
            </Col>
            
          
            <Col xs={12} md={6} lg={6}>
              <TextField
                className='width-100'
                name='confrimPassword'
                label="Confrim Password"
                value={admin.confrimPassword}
                onChange={handleInput}
                type='password'
                //size='small'
                //helperText="select height range"
              />
               
            </Col>
            
          
             
                <div className="d-grid gap-2 mt-1">
                <Stack spacing={2} direction="row">
                  <Box style={{flexGrow: 1}}></Box>
                  <Button onClick={handleCancel} color='error' variant="contained" type="reset">
                      Cancel
                    </Button>
                    <Button color='success' onClick={handleSubmit} variant="contained" type="submit">
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
  
export default AdminRegisterModal