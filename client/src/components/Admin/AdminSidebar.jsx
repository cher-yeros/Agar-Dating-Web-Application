import React from 'react'
import {
    Drawer, Toolbar,List, ListItemIcon, ListItemText, Divider, ListItem
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';

function AdminSidebar(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const routes = [
      {
          label: "Home",
          route: '/admin',
          icon: <InboxIcon/>
      },
      {
          label: "Manage User",
          route: '/manage-users',
          icon: <InboxIcon/>
      },
      {
          label: "Advertise",
          route: '/advertise',
          icon: <InboxIcon/>
      },
      {
          label: "Read Feedbacks",
          route: '/feedbacks',
          icon: <InboxIcon/>
      },
      {
          label: "Update Chatbots",
          route: '/update-chatbot',
          icon: <InboxIcon/>
      },
    ]
    const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route, index) => (
            <Link to={route.route} key={route.label}>
                <ListItem >
                    <ListItemIcon>
                    {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.label} />
                </ListItem>
            </Link>
          
        ))}
      </List>
      
    </div>
    );
      
    const { window } = props;
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
              onClose={handleDrawerToggle}
       
        >
          {drawer}
        </Drawer>
  )
}

export default AdminSidebar