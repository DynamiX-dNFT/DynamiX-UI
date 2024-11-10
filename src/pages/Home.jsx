
import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bolt, Shield, Autorenew, Flag, SportsScore, EmojiEvents } from '@mui/icons-material';

import messiImg from '../assets/messi.jpg';
import ronaldoImg from '../assets/ronaldo.jpg';
import mbappeImg from '../assets/mbappe.webp';

const FeatureCard = ({ icon, title, description }) => (
  <Paper 
    elevation={0}
    sx={{
      p: 4,
      height: '100%',
      background: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      transition: 'transform 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {icon}
      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Paper>
);

const PlayerCard = ({ player }) => (
  <Paper
    elevation={0}
    sx={{
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        pt: '100%', // 1:1 Aspect Ratio
      }}
    >
      <img
        src={player.image}
        alt={player.name}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
        {player.name}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Flag sx={{ color: '#ffd700' }} />
            <Typography color="grey.300">{player.nationality}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <SportsScore sx={{ color: '#ffd700' }} />
            <Typography color="grey.300">{player.position}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          p: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          mb: 1
        }}>
          <Typography color="grey.300">Goals</Typography>
          <Typography color="#ffd700" fontWeight="bold">{player.goals}</Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          p: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          mb: 1
        }}>
          <Typography color="grey.300">Matches</Typography>
          <Typography color="#ffd700" fontWeight="bold">{player.matches}</Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px'
        }}>
          <Typography color="grey.300">World Cups</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography color="#ffd700" fontWeight="bold">{player.worldCups}</Typography>
            <EmojiEvents sx={{ color: '#ffd700' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  </Paper>
);

const Home = () => {
  const navigate = useNavigate();

  const players = [
    {
      name: "Lionel Messi",
      position: "Forward",
      nationality: "Argentina",
      goals: 789,
      matches: 1000,
      worldCups: 1,
      image: messiImg
    },
    {
      name: "Cristiano Ronaldo",
      position: "Forward",
      nationality: "Portugal",
      goals: 819,
      matches: 1100,
      worldCups: 0,
      image: ronaldoImg
    },
    {
      name: "Kylian Mbappé",
      position: "Forward",
      nationality: "France",
      goals: 212,
      matches: 260,
      worldCups: 1,
      image: mbappeImg
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: '100px',
        background: 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 12,
          }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 3,
              maxWidth: '800px',
            }}
          >
            Discover the Future of Digital Collectibles
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '600px' }}
          >
            Mint, collect, and trade unique dynamic NFTs that evolve and transform over time
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/mint')}
            sx={{ 
              py: 2, 
              px: 6,
              fontSize: '1.1rem',
            }}
          >
            Start Minting
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 12 }}>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Bolt sx={{ fontSize: 40, color: '#4F46E5' }} />}
                  title="Dynamic Evolution"
                  description="Watch your NFTs evolve and transform based on real-world events and interactions"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Shield sx={{ fontSize: 40, color: '#10B981' }} />}
                  title="Secure Ownership"
                  description="Your NFTs are secured by blockchain technology ensuring true digital ownership"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Autorenew sx={{ fontSize: 40, color: '#8B5CF6' }} />}
                  title="Continuous Updates"
                  description="Regular updates and new features keep your collection fresh and exciting"
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Players Section */}
        <Box sx={{ mb: 12 }}>
          <Typography 
            variant="h2" 
            textAlign="center" 
            sx={{ 
              mb: 6,
              background: 'linear-gradient(to right, #4F46E5, #10B981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Start Exploring
          </Typography>
          <Grid container spacing={4}>
            {players.map((player, index) => (
              <Grid item xs={12} md={4} key={index}>
                <PlayerCard player={player} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;