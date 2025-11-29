
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='error'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          BLOOD ENQUIRY WEBSITE
          </Typography>
          <Link to={'/'}>
          <Button variant='contained' color="error">Home</Button>
          
          </Link>
         <Link to= {'/sign'}>
         <Button variant='contained' color="error">SignUp</Button>
       
         </Link>
        
         
          
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar