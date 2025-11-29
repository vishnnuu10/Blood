import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
const Adsign = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3008/adreg', {name, email, password})
        .then(result => {console.log(result)
        navigate('/adlogin')
         })
        .catch(err=> console.log(err))
       
    }



  return (


<div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-white p-5 rounded w-25">
        <h2>Admin Signup page</h2>
        <form onSubmit={handleSubmit}>
        <TextField 
        id="outlined-basic"
         label="Name"
        variant="outlined"
          name="email"
        onChange={(e) => setName(e.target.value)}/><br/><br/>
            
        <TextField id="outlined-basic" label="Email" variant="outlined"
          name="email"
onChange={(e) => setEmail(e.target.value)}/><br/><br/>

<TextField id="outlined-basic" label="Password" variant="outlined" name='password'
onChange={(e) => setPassword(e.target.value)}/>         <br/><br/>
<Button type ="submit" variant="contained" color="success">
    SUBMIT
</Button>
</form>


</div>

</div>


  )
}

export default Adsign