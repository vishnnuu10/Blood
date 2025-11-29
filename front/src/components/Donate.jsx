import { Button, TextField, Typography, Box, Card, CardContent,MenuItem , Alert, CircularProgress } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Donate.css'

const Donate = () => {
  const [inputs, setInputs] = useState({ 
    dname: "", 
    dblood: "", 
    demail: "", 
    dmob: "",
    dage: "",
    dgender: "",
    daddress: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const addHandler = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!inputs.dname || !inputs.demail || !inputs.dmob || !inputs.dblood || !inputs.dage || !inputs.dgender) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (inputs.dmob.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }

    try {
      if (location.state !== null) {
        const res = await axios.put("http://localhost:3008/adeditdnr/" + location.state.val._id, inputs);
        setSuccess("Donor information updated successfully!");
        setTimeout(() => navigate('/usrdnr'), 1500);
      } else {
        const res = await axios.post("http://localhost:3008/dnr", inputs);
        setSuccess("Thank you for registering as a blood donor!");
        setTimeout(() => navigate('/donor'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setInputs({
        ...inputs,
        dname: location.state.val.dname || "",
        dblood: location.state.val.dblood || "",
        demail: location.state.val.demail || "",
        dmob: location.state.val.dmob || "",
        dage: location.state.val.dage || "",
        dgender: location.state.val.dgender || "",
        daddress: location.state.val.daddress || ""
      });
    }
  }, [location]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="donate-container">
      {/* Animated Background */}
      <div className="donate-background">
        <div className="blood-cell blood-cell-1"></div>
        <div className="blood-cell blood-cell-2"></div>
        <div className="blood-cell blood-cell-3"></div>
      </div>

      <div className="donate-card">
        <div className="donate-header">
          <Typography variant="h3" className="donate-title">
            {location.state !== null ? 'Update Donor' : 'Become a'} <span>Donor</span>
          </Typography>
          <Typography variant="h6" className="donate-subtitle">
            {location.state !== null 
              ? 'Update your donor information' 
              : 'Join our lifesaving mission by registering as a blood donor'
            }
          </Typography>
        </div>

        {error && (
          <Alert severity="error" className="donate-alert">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="donate-alert">
            {success}
          </Alert>
        )}

        <Card className="form-card">
          <CardContent className="form-content">
            <div className="form-grid">
              <Box className="input-field">
                <TextField
                  fullWidth
                  label="Full Name *"
                  variant="outlined"
                  name="dname"
                  value={inputs.dname}
                  onChange={inputHandler}
                  className="donate-input"
                  disabled={loading}
                />
              </Box>

              <Box className="input-field">
                <TextField
                  fullWidth
                  label="Age *"
                  variant="outlined"
                  name="dage"
                  type="number"
                  value={inputs.dage}
                  onChange={inputHandler}
                  className="donate-input"
                  disabled={loading}
                  inputProps={{ min: 18, max: 65 }}
                />
              </Box>

              <Box className="input-field">
                <TextField
                  fullWidth
                  label="Email Address *"
                  variant="outlined"
                  name="demail"
                  type="email"
                  value={inputs.demail}
                  onChange={inputHandler}
                  className="donate-input"
                  disabled={loading}
                />
              </Box>

              <Box className="input-field">
                <TextField
                  fullWidth
                  label="Phone Number *"
                  variant="outlined"
                  name="dmob"
                  type="tel"
                  value={inputs.dmob}
                  onChange={inputHandler}
                  className="donate-input"
                  disabled={loading}
                  inputProps={{ maxLength: 10 }}
                />
              </Box>

              <Box className="input-field">
                <TextField
                  fullWidth
                  select
                  label="Blood Group *"
                  variant="outlined"
                  name="dblood"
                  value={inputs.dblood}
                  onChange={inputHandler}
                  className="donate-input"
                  disabled={loading}
                >
                  {bloodGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box className="input-field">
                <TextField
                  fullWidth
                  select
                  label="Gender *"
                  variant="outlined"
                  name="dgender"
                  value={inputs.dgender}
                  onChange={inputHandler}
                  className="donate-input"
                  disabled={loading}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Box>
            </div>

            <Box className="input-field full-width">
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="daddress"
                value={inputs.daddress}
                onChange={inputHandler}
                className="donate-input"
                disabled={loading}
                multiline
                rows={3}
              />
            </Box>

            <Box className="form-actions">
              <Button
                variant="contained"
                onClick={addHandler}
                className="submit-button"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : location.state !== null ? (
                  'Update Donor'
                ) : (
                  'Register as Donor'
                )}
              </Button>
            </Box>

            <Typography variant="body2" className="form-footer">
              * Required fields. By registering, you agree to be contacted for blood donation when needed.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Donate