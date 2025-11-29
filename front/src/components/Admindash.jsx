import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Admindash = () => {
  return (
<div>


<br></br><br></br>


<Link to= {'/adviewreq'}>
         <Button variant='contained' color="error">Request List</Button>
       
         </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Link to= {'/adviewdnr'}>
         <Button variant='contained' color="error">Donate List</Button>
       
         </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
         





         </div>


  )
}

export default Admindash