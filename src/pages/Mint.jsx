import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  TextField,
  IconButton,
  MenuItem,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowBack, 
  AccountBalanceWallet,
  SportsSoccer,
  EmojiEvents,
  Flag
} from '@mui/icons-material';

const Mint = () => {
  const navigate = useNavigate();
  const { account, connectWallet } = useWeb3();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(prev => ({ ...prev, imageFile: e.target.files[0]}));
  };


  const [formData, setFormData] = useState({
    name: '',
    team: '',
    nationality: '',
    position: '',
    goals: '',
    worldcupwon: '',
    matchesplayed: '',
    metadataURI: ''
  });

  const [errors, setErrors] = useState({});

  const positions = [
    'Forward',
    'Midfielder',
    'Defender',
    'Goalkeeper'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }
    if (!formData.goals || formData.goals < 0) {
      newErrors.goals = 'Valid number of goals is required';
    }
    if (!formData.matches || formData.matches < 0) {
      newErrors.matches = 'Valid number of matches is required';
    }
    if (!formData.worldCups || formData.worldCups < 0) {
      newErrors.worldCups = 'Valid number of World Cups is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      await connectWallet();
      return;
    }

    if (!validateForm()) {
      return;
    }

    
    try {
      // Create FormData object to send data
      const formData = new FormData();
      formData.append('image', formData.imageFile);
      formData.append('name', formData.name);
      formData.append('position', formData.position);
      formData.append('nationality', formData.nationality);
      formData.append('goals', formData.goals);
      formData.append('matches', formData.matches);
      formData.append('worldCups', formData.worldCups);

      // Send POST request to upload image and metadata
      const response = await axios.post('http://localhost:3001/upload', formData);
      const { metadataHash } = response.data;

      // Mint the NFT using the received metadata hash
      await mintNFT({
          to: account,
          name: formData.name,
          team: "Team Name", // Add team or other properties as needed
          nationality: formData.nationality,
          position: formData.position,
          goals: parseInt(formData.goals), // Convert string to number
          worldcupwon: parseInt(formData.worldCups), // Convert string to number
          matchesplayed: parseInt(formData.matches), // Convert string to number
          metadataURI: `ipfs://${metadataHash}`, // Use IPFS URI for metadata
      });

      alert('NFT Minted Successfully!');
  } catch (error) {
      console.error("Minting failed:", error);
      alert('Error minting NFT');
  }
    
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: '80px', md: '100px' },
        pb: 8,
        background: 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
      }}
    >
      <Container maxWidth="lg">
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')} 
          sx={{ 
            mb: 4,
            color: 'white',
            '&:hover': {
              transform: 'translateX(-5px)',
            },
            transition: 'transform 0.3s ease'
          }}
        >
          Back to Home
        </Button>

        <Grid container spacing={6}>
          {/* Preview Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
              }}
            >
              <Box 
                sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <SportsSoccer sx={{ fontSize: 60, color: 'rgba(255, 255, 255, 0.3)' }} />
                <Typography variant="h5" color="text.secondary">
                  NFT Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your NFT will appear here after minting
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                p: 4,
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700,
                mb: 4,
                background: 'linear-gradient(to right, #4F46E5, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Create Your Player NFT
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Player Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      error={!!errors.position}
                      helperText={errors.position}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    >
                      {positions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      error={!!errors.nationality}
                      helperText={errors.nationality}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Goals Scored"
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      error={!!errors.goals}
                      helperText={errors.goals}
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Matches Played"
                      name="matches"
                      value={formData.matches}
                      onChange={handleChange}
                      error={!!errors.matches}
                      helperText={errors.matches}
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="World Cups Won"
                      name="worldCups"
                      value={formData.worldCups}
                      onChange={handleChange}
                      error={!!errors.worldCups}
                      helperText={errors.worldCups}
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={!account && <AccountBalanceWallet />}
                      sx={{
                        mt: 2,
                        py: 2,
                        background: 'linear-gradient(45deg, #4F46E5, #10B981)',
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(45deg, #4338CA, #059669)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
                        },
                      }}
                    >
                      {account ? 'Mint NFT' : 'Connect Wallet to Mint'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Mint;