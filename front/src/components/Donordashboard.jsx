import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Box, Card, CardContent } from '@mui/material'
import './css/DonorDashboard.css'

const DonorDashboard = () => {
  const dashboardCards = [

    {
      title: "Donate Blood",
      description: "Save lives by donating blood",
      path: "/dnr",
      icon: "💉",
      color: "#ff4757",
      buttonText: "Donate Now"
    },
    {
      title: "Donor List",
      description: "View available blood donors",
      path: "/usrdnr",
      icon: "👥",
      color: "#ff3838",
      buttonText: "View Donors"
    }
  ]

  return (
    <div className="donor-dashboard">
      {/* Animated Background */}
      <div className="dashboard-background">
        <div className="floating-icon">💉</div>
        <div className="floating-icon">🩸</div>
        <div className="floating-icon">❤️</div>
        <div className="floating-icon">🩹</div>
      </div>

      {/* Header Section */}
      <div className="dashboard-header">
        <Typography variant="h3" className="dashboard-title">
          Donor <span>Dashboard</span>
        </Typography>
        <Typography variant="h6" className="dashboard-subtitle">
          Choose an action to continue
        </Typography>
      </div>

      {/* Cards Grid */}
      <div className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <Card 
            key={index} 
            className="dashboard-card"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardContent className="card-content">
              <div className="card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              
              <Typography variant="h5" className="card-title">
                {card.title}
              </Typography>
              
              <Typography variant="body2" className="card-description">
                {card.description}
              </Typography>

              <Link to={card.path} className="card-link">
                <Button
                  variant="contained"
                  className="card-button"
                  style={{ 
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                    color: 'white'
                  }}
                  fullWidth
                >
                  {card.buttonText}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="dashboard-stats">
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h4" className="stat-number">
              150+
            </Typography>
            <Typography variant="body2" className="stat-label">
              Lives Saved
            </Typography>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h4" className="stat-number">
              50+
            </Typography>
            <Typography variant="body2" className="stat-label">
              Active Donors
            </Typography>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h4" className="stat-number">
              24/7
            </Typography>
            <Typography variant="body2" className="stat-label">
              Support
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DonorDashboard