import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const Adupreq = () => {

    var [inputs, setInputs] = useState({ rname: "", rblood: "", remail: "", rmob: "" , rage:'' });
    var location = useLocation();
    var Navigate = useNavigate()
    console.log("loc", location.state);
  
  
  const addHandler = () => {
    console.log("clicked");
    if (location.state !== null) {
      axios.put("http://localhost:3008/editreq/"+location.state.val._id,inputs)
        .then((res) => {
            // alert(res.data.message)
           Navigate('/adviewreq')
            
        })
        .catch((err) => console.log(err));
    }else{
        axios.post("http://localhost:3008/req", inputs)
        .then((res) => {
          console.log(res);
          // alert(res.data.message);
          Navigate('/adviewreq')
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setInputs({
        ...inputs,
        rname: location.state.val.rname,
        rblood: location.state.val.rblood,
        remail: location.state.val.remail,
        rmob: location.state.val.rmob,
      });
    }
  }, []);


  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };


  return (
    

<div  style={{paddingTop:"50px",marginLeft:"10px"}}>
    <h2 >Update Request Form</h2>
    <TextField onChange={inputHandler} value={inputs.rname} placeholder='enter your name' id="outlined-basic" name='rname' label="Full Name" variant="outlined" /><br/><br/>
    <TextField onChange={inputHandler} value={inputs.rage} placeholder='Age' id="outlined-basic" name='rage' label="Age" variant="outlined" /><br/><br/>
    <TextField onChange={inputHandler} value={inputs.remail} placeholder='enter your email' id="outlined-basic" name='remail' label="Email" variant="outlined" /><br/><br/>
    

<TextField onChange={inputHandler} value={inputs.remailmob} name='rmob' placeholder='enter your Phone number' id="outlined-basic" label="Phone number" variant="outlined" /> <br></br>


<br></br>

<TextField onChange={inputHandler} value={inputs.rblood} name='rblood' placeholder='Blood Group' id="outlined-basic" label="Blood Group" variant="outlined" /> <br></br>

<br></br><br></br>
<Button variant="contained" onClick={addHandler} color="success">Request</Button><br/><br></br>









</div>



  )
}

export default Adupreq