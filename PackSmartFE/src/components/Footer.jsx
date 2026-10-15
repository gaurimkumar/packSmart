import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  TextField,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { brandColors } from '../styles/theme';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: brandColors.forestGreenDark,
        color: '#FFFFFF',
        pt: { xs: 6, md: 8 },
        pb: 4,
        mt: 'auto',
        borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand info */}
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                cursor: 'pointer',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  backgroundColor: brandColors.sageGreen,
                  color: brandColors.forestGreen,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LuggageIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                PackSmart
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.72)',
                mb: 1.5,
                lineHeight: 1.6,
                maxWidth: 320,
              }}
            >
              Pack less stress. Travel with confidence. Your intelligent companion for effortless journey planning and baggage organization.
            </Typography>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: brandColors.mutedOrangeLight,
                fontWeight: 600,
                mb: 3,
              }}
            >
              Built for mindful travelers worldwide.
            </Typography>

            {/* Social Icons */}
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Instagram"
                sx={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#FFFFFF', backgroundColor: brandColors.mutedOrange },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                sx={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#FFFFFF', backgroundColor: brandColors.mutedOrange },
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                sx={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#FFFFFF', backgroundColor: brandColors.mutedOrange },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="GitHub"
                sx={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#FFFFFF', backgroundColor: brandColors.mutedOrange },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick links: Trip Tools */}
          <Grid item xs={6} sm={4} md={2.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Travel Tools
            </Typography>
            <Stack spacing={1.2}>
              <Typography
                component={Link}
                to="/create"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Create New Trip
              </Typography>
              <Typography
                component={Link}
                to="/packing"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Smart Packing List
              </Typography>
              <Typography
                component={Link}
                to="/suitcase"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Suitcase Planner
              </Typography>
              <Typography
                component={Link}
                to="/outfit"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Daily Outfit Planner
              </Typography>
              <Typography
                component={Link}
                to="/before"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Before You Leave
              </Typography>
            </Stack>
          </Grid>

          {/* Quick links: Explore & Company */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Explore
            </Typography>
            <Stack spacing={1.2}>
              <Typography
                component={Link}
                to="/"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Home
              </Typography>
              <Typography
                component={Link}
                to="/my-trips"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                My Saved Trips
              </Typography>
              <Typography
                component={Link}
                to="/about"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                About Us
              </Typography>
              <Typography
                component={Link}
                to="/about#features"
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': { color: brandColors.sageGreen },
                  transition: 'color 0.2s ease',
                }}
              >
                Why PackSmart
              </Typography>
            </Stack>
          </Grid>

          {/* Travel Newsletter / Tips */}
          <Grid item xs={12} sm={8} md={3.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 1.5, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              Packing Tips in Your Inbox
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.72)', mb: 2 }}>
              Receive seasonal packing guides and capsule wardrobe checklists directly to your inbox.
            </Typography>

            {subscribed ? (
              <Alert
                icon={<CheckCircleOutlinedIcon fontSize="inherit" />}
                severity="success"
                sx={{
                  backgroundColor: 'rgba(221, 232, 216, 0.2)',
                  color: brandColors.sageGreen,
                  borderRadius: 2,
                  '& .MuiAlert-icon': { color: brandColors.sageGreen },
                }}
              >
                You're all set! Welcome aboard.
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      borderRadius: 2,
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                      '&.Mui-focused fieldset': { borderColor: brandColors.sageGreen },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: brandColors.mutedOrange,
                    color: '#FFFFFF',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': { backgroundColor: brandColors.mutedOrangeDark },
                  }}
                >
                  <SendIcon fontSize="small" />
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.82rem',
          }}
        >
          <Typography variant="caption" sx={{ color: 'inherit' }}>
            © {new Date().getFullYear()} PackSmart — Smart Travel Packing Assistant. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ color: 'inherit', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
              Privacy Policy
            </Typography>
            <Typography variant="caption" sx={{ color: 'inherit', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
              Terms of Service
            </Typography>
            <Typography variant="caption" sx={{ color: 'inherit', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
              Browser Storage Mode
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;