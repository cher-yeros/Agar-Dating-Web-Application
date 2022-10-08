import React, { useState } from 'react';
import Image from 'mui-image'
import logo from '../images/logo.png'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    Grid,
    CardActions,
    CardContent,
    Card} from '@mui/material';
import Register from "../components/Register";

const Background = () => {
  const [logModal, setlogModal] = useState(false)
  const [regModal, setregModal] = useState(false)
  const [openLang, setopenLang] = useState(false);

  

  return (
   <div>
       <Register open={regModal} ></Register>
       {/*<Register open={logModal} setOpen={setlogModal}></Register>*/}

    <AppBar position="static">
      <Container maxWidth="xl">
          
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Image style={{width:'50px'}} src={logo}></Image>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agar Network
          </Typography>

          <Box>
              doesn;t have an account?
            {/*<Button onClick={handleLogin} color="inherit">Login</Button>*/}

            <Button
            color='inherit'
                id="basic-button"
                //aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                //aria-expanded={open ? 'true' : undefined}
                onClick={setopenLang(true)}
            >
                English
            </Button>
            <Menu
                id="basic-menu"
                //anchorEl={anchorEl}
                open={openLang}
                //onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>አማርኛ</MenuItem>
            </Menu>
          </Box>        
        </Toolbar>
      </Container>
    </AppBar>

   
    <Grid container spacing={2}>
        <Grid item xs={8}>
            <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ mr: 2, fontFamily : 'Wafle Mango', display: { xs: 'none', md: 'flex' } }}>
                SAVE 
                YOUR DATE 
                WITH AGAR 
            </Typography>
        </Grid>
        <Grid item xs={4}>
           <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    benevlent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => setregModal(true)} variant='secondary' size="small">Register</Button>
            </CardActions>
         </Card>
        </Grid>
    </Grid>
   </div>
  );
};
export default Background;
