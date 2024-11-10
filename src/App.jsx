import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mint from './pages/Mint';
import { Web3Provider } from './context/Web3Context';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F46E5', // Modern indigo
    },
    secondary: {
      main: '#10B981', // Fresh green
    },
    background: {
      default: '#0F172A', // Deep blue-gray
      paper: '#1E293B',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      background: 'linear-gradient(to right, #4F46E5, #10B981)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #4F46E5, #10B981)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4338CA, #059669)',
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <Web3Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Web3Provider>
  );
};

export default App;