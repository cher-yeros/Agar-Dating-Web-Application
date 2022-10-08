import React, { useEffect, useState} from 'react'

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button,
Card, CardContent, Stack, Typography} from '@mui/material';
import avatar from "../images/avatar.png";
import '../style/userlist.css'
import { Scrollbars } from 'react-custom-scrollbars';
import api from '../utils/api_call'

function UserList(props) {
  
  const [users, setUsers] = useState([])
    
    useEffect(() => {
        fetchUsers();
    }, []);
  
  function  fetchUsers () {
    api.get('user/all').then(({ data }) => {
      setUsers(data)
    });
  }
  
  function viewUser(e, user) {}
  
  
  return (
      <>
    <Card className='mt-1' style={{background: '#767795', height: '89vh'}}>
        <CardContent style={{padding: '0'}}>
            <Scrollbars style={{width: '100%', height: '88vh'}}>
                <List className='user-list-ul' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {users.map((user) => 
                        <ListItem className='user-list' key={user.id}>
                            <ListItemAvatar>
                                <Avatar alt={user.firstname + user.lastname} src={avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={user.firstname +' '+ user.lastname} secondary={
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
    </>
  )
}


export default UserList

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