import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box,
  CircularProgress,
  Snackbar,
  Alert 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountBalanceWallet, Bolt } from '@mui/icons-material';
import { useWeb3 } from '../context/Web3Context';

const Navbar = () => {
  const { 
    account, 
    loading, 
    error, 
    connectWallet, 
    disconnectWallet 
  } = useWeb3();

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    if (!account) {
      await connectWallet();
    } else {
      await disconnectWallet();
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: '80px' }}>
        {/* Logo Section */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Bolt sx={{ 
              color: '#4F46E5', 
              fontSize: '32px',
              filter: 'drop-shadow(0 0 8px rgba(79, 70, 229, 0.3))'
            }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: '24px',
                background: 'linear-gradient(45deg, #4F46E5, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              DynamiX
            </Typography>
          </Box>
        </Link>

        {/* Navigation Links & Wallet Button */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link 
            to="/mint" 
            style={{ 
              textDecoration: 'none'
            }}
          >
            <Button 
              color="inherit"
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              Mint
            </Button>
          </Link>

          <Button
            onClick={handleConnect}
            disabled={loading}
            variant={account ? "outlined" : "contained"}
            startIcon={loading ? <CircularProgress size={20} /> : <AccountBalanceWallet />}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontSize: '16px',
              fontWeight: 500,
              background: account ? 'transparent' : 'linear-gradient(45deg, #4F46E5, #10B981)',
              borderColor: account ? '#4F46E5' : 'transparent',
              '&:hover': {
                background: account ? 'rgba(79, 70, 229, 0.1)' : 'linear-gradient(45deg, #4338CA, #059669)',
                borderColor: account ? '#4338CA' : 'transparent',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Connecting...' : 
             account ? formatAddress(account) : 'Connect Wallet'}
          </Button>
        </Box>
      </Toolbar>

      {/* Error Snackbar */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity="error" 
          variant="filled"
          sx={{
            background: '#ef4444',
            color: 'white'
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Navbar;