import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Alert, CircularProgress } from '@mui/material';
import './css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post('http://localhost:3008/login', { email, password });
      console.log(result);
      if (result.data === "Success") {
        navigate('/donor');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="blood-drop blood-drop-1"></div>
        <div className="blood-drop blood-drop-2"></div>
        <div className="blood-drop blood-drop-3"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">💉</div>
            <Typography variant="h4" className="logo-text">
              Blood<span>Life</span>
            </Typography>
          </div>
          <Typography variant="h5" className="welcome-text">
            Welcome Back
          </Typography>
          <Typography variant="body2" className="subtitle">
            Sign in to continue to your account
          </Typography>
        </div>

        {error && (
          <Alert severity="error" className="error-alert">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <Box className="input-container">
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              disabled={loading}
            />
          </Box>

          <Box className="input-container">
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              disabled={loading}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <div className="login-footer">
          <Typography variant="body2" className="footer-text">
            Don't have an account?{' '}
            <Link to="/sign" className="signup-link">
              Create Account
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;