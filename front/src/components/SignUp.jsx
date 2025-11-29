import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Typography, Box, Alert, CircularProgress } from '@mui/material'
import './css/SignUp.css'

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const result = await axios.post('http://localhost:3008/reg', { name, email, password })
      console.log(result)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="blood-drop blood-drop-1"></div>
        <div className="blood-drop blood-drop-2"></div>
        <div className="blood-drop blood-drop-3"></div>
        <div className="blood-drop blood-drop-4"></div>
      </div>
      
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-container">
            <div className="logo-icon">💉</div>
            <Typography variant="h4" className="logo-text">
              Blood<span>Life</span>
            </Typography>
          </div>
          <Typography variant="h5" className="welcome-text">
            Create Account
          </Typography>
          <Typography variant="body2" className="subtitle">
            Join us in saving lives
          </Typography>
        </div>

        {error && (
          <Alert severity="error" className="error-alert">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <Box className="input-container">
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="signup-input"
              disabled={loading}
            />
          </Box>

          <Box className="input-container">
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
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
              className="signup-input"
              disabled={loading}
              helperText="Must be at least 6 characters"
            />
          </Box>

          <Box className="input-container">
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="signup-input"
              disabled={loading}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signup-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Account'}
          </Button>
        </form>

        <div className="signup-footer">
          <Typography variant="body2" className="footer-text">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign In
            </Link>
          </Typography>
          
        </div>
      </div>
    </div>
  )
}

export default SignUp