import React, { useEffect, useState} from 'react'

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button,
  Card, CardContent, Stack, Typography
} from '@mui/material';
import { Row, Col } from 'react-bootstrap'
import avatar from "../images/avatar.png";
import '../style/userlist.css'
import { Scrollbars } from 'react-custom-scrollbars';
import api from '../utils/api_call'
import ChatComponent from './Chat/Chat1/Chat1'

function FriendsList(props) {
  
  const [friends, setFriends] = useState([])
  const [chatStarted, setChatStarted] = useState(false)
  const [user, setUser] = useState(null)
    
    useEffect(() => {
        fetchFriends();
    }, []);
  const id = {
    id : JSON.parse(localStorage.getItem('user')).id
  }
  //console.log(id);
  function fetchFriends () {
    api.post('/user/my-friends', id).then(({ data }) => {
      //console.log(data);
        setFriends(data)
    });
  }
  
  function viewUser(e, user) {}
  function openChat(user) {
    setUser(user);
    setChatStarted(true)
  }
  
  return (
    <>
      <Row>
                  <Col xs={12} md={6} lg={4}>
                    <Card className='mt-1' style={{background: '#767795', height: '89vh'}}>
        <CardContent style={{padding: '0'}}>
            <Scrollbars style={{width: '100%', height: '88vh'}}>
                <List className='user-list-ul' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {/*{if(id != user.sender.id || id != user.receiver.id) {
                
                    }}*/}
                  {/* TODO : outing own user */}
                    {friends.map((user) => 
                        <ListItem onClick={() => openChat(user)}  className='user-list' key={user.id} style={{cursor: 'pointer'}}>
                            <ListItemAvatar>
                                <Avatar alt={user.the_friend.firstname + user.the_friend.lastname} src={avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={user.the_friend.firstname +' '+ user.the_friend.lastname} secondary={
                                <Typography  component='span'>
                                    <Stack style={{marginTop: '5px'}} direction='row' spacing={1}>
                                        <Button style={{color: 'whitesmoke', border: '1px solid whitesmoke', borderRadius: '1rem'}} size='small' variant='outlined'>View</Button>
                                        <SendRequestButton user={ user} />
                                    {/*<Button style={{borderRadius: '1rem'}} color='error' size='small' variant='contained'>Reject</Button>*/}
                                </Stack>
                                </Typography>
                            } />
                        </ListItem>)}
                    </List>
            </Scrollbars>
   
    </CardContent>
    </Card>
                  </Col>
                  <Col xs={12} md={6} lg={8}>
          {chatStarted ? <ChatComponent user={user.the_friend} /> :
            <Card className='mt-1 d-flex justify-content-center align-items-center' style={{height: '100%', background: 'white', padding: '0' }}>
              <div style={{fontSize: '1.5rem'}}>click to start chatting</div>
                </Card>
}
                    
                  </Col>
                </Row>
    
    </>
  )
}


export default FriendsList

function SendRequestButton(props) {
    const [sent, setSent] = useState(false)
    function sendRequest(user) {
      const sender_id = JSON.parse(localStorage.getItem('user')).id
      const receiver_id = user.id;

      const req = { sender_id, receiver_id }
      
        api.post('/user/send-request', req).then(({ data }) => {
            console.log(data);
            setSent(data.success)
        //  sent = data.success;
      })
    }
    
  return (
    
      <Button
          onClick={() => sendRequest(props.user)}
          style={{ borderRadius: '1rem' }}
          color='success'
          size='small'
          variant='contained'>{sent? 'Request Sent':'Send Request'}
       </Button>
                                    
                                
  )
}