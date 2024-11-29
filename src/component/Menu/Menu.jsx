import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Margin } from '@mui/icons-material'
import { Link } from 'react-router-dom';





export default function menu() {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const handleClick1 = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClickdasbord = () => {
      setOpen2(!open2);
    };


    
    
  return (


    <List
        id='menu'
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" >
         
         
      <Avatar
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick1}
        sx={{
            margin: 2,
            
          }}
      >
        A
      </Avatar>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    
            <Divider />
        </ListSubheader>
      }
    >

      
      <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="خانه" />
        </ListItemButton>
   
       
      
 

     <ListItemButton  component={Link} to="/User">
        <ListItemIcon>
          <PeopleAltRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="لیست کاربر" />
      </ListItemButton>



      <ListItemButton  component={Link} to="/Article">
        <ListItemIcon>
          <ArticleRoundedIcon  />
        </ListItemIcon>
        <ListItemText primary="مقاله" />
      </ListItemButton>


     


      <ListItemButton onClick={handleClick}  TransitionComponent={Fade}>
        <ListItemIcon>
        <PeopleAltRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="کابران " />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>


      <Collapse in={open} timeout="auto" unmountOnExit >
        <List component="div" disablePadding >
          <ListItemButton sx={{ pl: 5 }}  component={Link} to="/User" >
            <ListItemIcon>
              <PeopleAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="ویرایش کابر" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 5 }}  component={Link} to="/Login" >
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Login && Sign" />
          </ListItemButton>

        </List>
      </Collapse>

{/* ................................dasbord...................................... */}


      {/* <ListItemButton onClick={handleClickdasbord}  TransitionComponent={Fade}>
        <ListItemIcon>
          <DashboardCustomizeIcon />
        </ListItemIcon>
        <ListItemText primary="dasbord" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open2} timeout="auto" unmountOnExit >
        <List component="div" disablePadding >
          <ListItemButton sx={{ pl: 5 }}  component={Link} to="/dasbord1" >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="dasbord1" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding >
          <ListItemButton sx={{ pl: 5 }}  component={Link} to="/dasbord1" >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="dasbord1" />
          </ListItemButton>
        </List>
      </Collapse> */}



    </List>
  )
}
