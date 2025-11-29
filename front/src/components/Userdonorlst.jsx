import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import './css/UserDonorList.css';

const UserDonorList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [requestDialog, setRequestDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    patientName: "",
    bloodGroup: "",
    units: "1",
    urgency: "Medium",
    hospital: "",
    contact: "",
    message: ""
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [searchTerm, bloodFilter, donors]);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3008/viewdnr");
      console.log("Donors data:", res.data);
      setDonors(res.data);
    } catch (err) {
      console.log("Error fetching donors:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterDonors = () => {
    let filtered = [...donors];

    if (searchTerm) {
      filtered = filtered.filter(donor =>
        donor.dname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.dblood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.demail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (bloodFilter) {
      filtered = filtered.filter(donor =>
        donor.dblood === bloodFilter
      );
    }

    setFilteredDonors(filtered);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Open modal for specific donor (from card button)
  const handleRequestClick = (donor) => {
    console.log("Selected donor:", donor);
    setSelectedDonor(donor);
    setRequestDetails({
      patientName: "",
      bloodGroup: donor.dblood || "",
      units: "1",
      urgency: "Medium",
      hospital: "",
      contact: "",
      message: `Hi ${donor.dname}, I need ${donor.dblood} blood. Can you please help?`
    });
    setRequestDialog(true);
  };

  // Open modal for general blood request (from header button)
  const handleGeneralRequestClick = () => {
    setSelectedDonor(null); // No specific donor selected
    setRequestDetails({
      patientName: "",
      bloodGroup: "",
      units: "1",
      urgency: "Medium",
      hospital: "",
      contact: "",
      message: "I need blood donation. Can anyone with matching blood group please help?"
    });
    setRequestDialog(true);
  };

  const handleRequestSubmit = async () => {
    if (!requestDetails.patientName || !requestDetails.contact || !requestDetails.hospital) {
      alert("Please fill in all required fields (Patient Name, Contact, and Hospital)");
      return;
    }

    if (!requestDetails.bloodGroup) {
      alert("Please select a blood group");
      return;
    }

    try {
      // Here you would typically send the request to your backend
      console.log("Request submitted:", requestDetails);
      
      if (selectedDonor) {
        console.log("For specific donor:", selectedDonor);
        // API call for specific donor request
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(`Blood request submitted to ${selectedDonor.dname}! They will contact you soon.`);
      } else {
        console.log("General blood request");
        // API call for general request (could be broadcast to all matching donors)
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(`Blood request submitted! All matching donors will be notified.`);
      }
      
      setRequestDialog(false);
      setRequestDetails({
        patientName: "",
        bloodGroup: "",
        units: "1",
        urgency: "Medium",
        hospital: "",
        contact: "",
        message: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to submit request. Please try again.");
    }
  };

  const handleRequestClose = () => {
    setRequestDialog(false);
    setSelectedDonor(null);
    setRequestDetails({
      patientName: "",
      bloodGroup: "",
      units: "1",
      urgency: "Medium",
      hospital: "",
      contact: "",
      message: ""
    });
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#ff6b6b',
      'A-': '#ff8e6b',
      'B+': '#4ecdc4',
      'B-': '#45b7aa',
      'AB+': '#ffa502',
      'AB-': '#e59400',
      'O+': '#7474bf',
      'O-': '#5d5daa'
    };
    return colors[bloodGroup] || '#636e72';
  };

  if (loading) {
    return (
      <div className="donor-list-loading">
        <CircularProgress size={60} style={{ color: '#ff4757' }} />
        <Typography variant="h6" className="loading-text">
          Loading donors...
        </Typography>
      </div>
    );
  }

  return (
    <div className="donor-list-container">
      {/* Animated Background */}
      <div className="donor-list-background">
        <div className="floating-blood floating-blood-1">🩸</div>
        <div className="floating-blood floating-blood-2">💉</div>
        <div className="floating-blood floating-blood-3">❤️</div>
      </div>

      <div className="donor-list-content">
        {/* Header Section */}
        <div className="donor-list-header">
          <Typography variant="h2" className="donor-list-title">
            Blood <span>Donors</span>
          </Typography>
          <Typography variant="h6" className="donor-list-subtitle">
            Find available blood donors and request blood
          </Typography>
        </div>

        {/* Stats and Actions */}
        <div className="donor-list-stats">
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h3" className="stat-number">
                {donors.length}
              </Typography>
              <Typography variant="body2" className="stat-label">
                Total Donors
              </Typography>
            </CardContent>
          </Card>
          
          {/* Updated Button - Opens Modal Directly */}
          <Button 
            variant="contained" 
            className="request-blood-btn"
            onClick={handleGeneralRequestClick}
          >
            <LocalHospitalIcon style={{ marginRight: '8px' }} />
            Request Blood
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="search-filter-card">
          <CardContent className="search-filter-content">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search donors by name, blood group, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  className="search-field"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Filter by Blood Group"
                  value={bloodFilter}
                  onChange={(e) => setBloodFilter(e.target.value)}
                  className="filter-field"
                >
                  <MenuItem value="">All Blood Groups</MenuItem>
                  {bloodGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="body2" className="results-count">
                  {filteredDonors.length} {filteredDonors.length === 1 ? 'donor' : 'donors'} found
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Donors Grid */}
        {filteredDonors.length === 0 ? (
          <Card className="no-donors-card">
            <CardContent>
              <Typography variant="h5" className="no-donors-text">
                No donors found
              </Typography>
              <Typography variant="body2" className="no-donors-subtext">
                Try adjusting your search criteria or use the "Request Blood" button above.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3} className="donors-grid">
            {filteredDonors.map((donor, index) => (
              <Grid item xs={12} sm={6} md={4} key={donor._id || index}>
                <Card 
                  className="donor-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="donor-card-content">
                    {/* Blood Group Badge */}
                    <div 
                      className="blood-group-badge"
                      style={{ backgroundColor: getBloodGroupColor(donor.dblood) }}
                    >
                      {donor.dblood || "Unknown"}
                    </div>

                    {/* Donor Info */}
                    <div className="donor-info">
                      <div className="donor-field">
                        <PersonIcon className="field-icon" />
                        <Typography variant="h6" className="donor-name">
                          {donor.dname || "Unknown Donor"}
                        </Typography>
                      </div>

                      <div className="donor-field">
                        <Typography variant="body2" className="donor-age">
                          Age: {donor.dage || "N/A"}
                        </Typography>
                      </div>

                      <div className="donor-field">
                        <EmailIcon className="field-icon" />
                        <Typography variant="body2" className="donor-email">
                          {donor.demail || "No email"}
                        </Typography>
                      </div>

                      <div className="donor-field">
                        <PhoneIcon className="field-icon" />
                        <Typography variant="body2" className="donor-phone">
                          {donor.dmob || "No phone"}
                        </Typography>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="contained"
                      className="request-btn"
                      onClick={() => handleRequestClick(donor)}
                      fullWidth
                    >
                      <LocalHospitalIcon style={{ marginRight: '8px', fontSize: '18px' }} />
                      Request Blood
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {/* Request Blood Modal */}
      <Dialog 
        open={requestDialog} 
        onClose={handleRequestClose}
        className="request-dialog"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="dialog-title">
          <LocalHospitalIcon style={{ marginRight: '10px' }} />
          {selectedDonor ? `Request Blood from ${selectedDonor.dname}` : 'Request Blood Donation'}
        </DialogTitle>
        
        <DialogContent className="dialog-content">
          {selectedDonor && (
            <Box className="donor-summary">
              <Typography variant="h6" className="summary-title">
                Donor Information:
              </Typography>
              <Grid container spacing={2} className="summary-details">
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Name:</strong> {selectedDonor.dname}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Blood Group:</strong> {selectedDonor.dblood}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Contact:</strong> {selectedDonor.dmob}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Email:</strong> {selectedDonor.demail}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          <Typography variant="h6" className="form-title" style={{ marginTop: '20px', marginBottom: '15px' }}>
            Request Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Patient Name *"
                value={requestDetails.patientName}
                onChange={(e) => setRequestDetails({...requestDetails, patientName: e.target.value})}
                className="dialog-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Required Blood Group *"
                value={requestDetails.bloodGroup}
                onChange={(e) => setRequestDetails({...requestDetails, bloodGroup: e.target.value})}
                className="dialog-field"
              >
                <MenuItem value="">Select Blood Group</MenuItem>
                {bloodGroups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Units Required *"
                value={requestDetails.units}
                onChange={(e) => setRequestDetails({...requestDetails, units: e.target.value})}
                className="dialog-field"
              >
                {[1, 2, 3, 4, 5].map(unit => (
                  <MenuItem key={unit} value={unit.toString()}>
                    {unit} unit{unit > 1 ? 's' : ''}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Urgency Level *"
                value={requestDetails.urgency}
                onChange={(e) => setRequestDetails({...requestDetails, urgency: e.target.value})}
                className="dialog-field"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Emergency">Emergency</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hospital/Location *"
                value={requestDetails.hospital}
                onChange={(e) => setRequestDetails({...requestDetails, hospital: e.target.value})}
                className="dialog-field"
                placeholder="Enter hospital name and address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Contact Number *"
                value={requestDetails.contact}
                onChange={(e) => setRequestDetails({...requestDetails, contact: e.target.value})}
                className="dialog-field"
                placeholder="Phone number for coordination"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Relationship to Patient"
                value={requestDetails.relationship}
                onChange={(e) => setRequestDetails({...requestDetails, relationship: e.target.value})}
                className="dialog-field"
                placeholder="e.g., Family, Friend, Self"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Message"
                value={requestDetails.message}
                onChange={(e) => setRequestDetails({...requestDetails, message: e.target.value})}
                className="dialog-field"
                multiline
                rows={3}
                placeholder="Any additional information for the donor..."
              />
            </Grid>
          </Grid>

          <Alert severity="info" style={{ marginTop: '20px' }}>
            {selectedDonor 
              ? `This request will be sent to ${selectedDonor.dname}. They will contact you directly if they can help.`
              : "This request will be broadcast to all matching blood donors. Available donors will contact you directly."
            }
          </Alert>
        </DialogContent>
        
        <DialogActions className="dialog-actions">
          <Button onClick={handleRequestClose} className="cancel-btn">
            Cancel
          </Button>
          <Button 
            onClick={handleRequestSubmit} 
            className="submit-request-btn"
            disabled={!requestDetails.patientName || !requestDetails.contact || !requestDetails.hospital || !requestDetails.bloodGroup}
          >
            {selectedDonor ? 'Send to Donor' : 'Broadcast Request'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDonorList;