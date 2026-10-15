import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  LinearProgress,
  Paper,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../styles/theme';
import { HERO_IMAGE } from '../data/categoryImages';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreFeatures = () => {
    const el = document.getElementById('features-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/about');
    }
  };

  return (
    <Box
      sx={{
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
        {/* Left Column: Editorial Headline & Actions */}
        <Grid item xs={12} md={6.5}>
          <Box sx={{ mb: 2 }}>
            <Chip
              icon={<FlightTakeoffIcon sx={{ fontSize: '16px !important', color: `${brandColors.forestGreen} !important` }} />}
              label="Smart Travel Packing Assistant"
              sx={{
                backgroundColor: brandColors.sageGreen,
                color: brandColors.forestGreen,
                fontWeight: 700,
                fontSize: '0.85rem',
                py: 0.5,
                px: 0.5,
                borderRadius: 9999,
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', sm: '3.2rem', md: '3.8rem' },
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: brandColors.forestGreen,
              mb: 2.5,
            }}
          >
            Your next adventure starts with a{' '}
            <Box
              component="span"
              sx={{
                color: brandColors.mutedOrangeDark,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: '4px',
                  width: '100%',
                  height: '8px',
                  backgroundColor: brandColors.sageGreen,
                  zIndex: -1,
                  borderRadius: 2,
                  opacity: 0.7,
                },
              }}
            >
              perfectly packed bag.
            </Box>
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              lineHeight: 1.65,
              color: brandColors.charcoalLight,
              mb: 4,
              maxWidth: 580,
            }}
          >
            Pack less stress. Travel with confidence. PackSmart generates tailored packing checklists, organizes your luggage weights, and plans daily outfits so you never leave essentials behind.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/create')}
              sx={{
                px: 3.5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2.5,
                boxShadow: '0 8px 24px rgba(23, 63, 53, 0.22)',
              }}
            >
              Plan My Packing
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ExploreOutlinedIcon />}
              onClick={handleExploreFeatures}
              sx={{
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2.5,
                borderColor: brandColors.border,
                color: brandColors.forestGreen,
                backgroundColor: '#FFFFFF',
                '&:hover': {
                  borderColor: brandColors.forestGreen,
                  backgroundColor: brandColors.sageGreenLight,
                },
              }}
            >
              Explore Features
            </Button>
          </Stack>

          {/* Quick trust metrics */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              pt: 2,
              borderTop: `1px solid ${brandColors.borderLight}`,
              color: brandColors.charcoalMuted,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldOutlinedIcon sx={{ fontSize: 18, color: brandColors.forestGreen }} />
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.82rem' }}>
                100% Private (Runs locally in your browser)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScaleOutlinedIcon sx={{ fontSize: 18, color: brandColors.mutedOrange }} />
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.82rem' }}>
                Baggage Weight Safety
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Right Column: Hero Travel Image + Floating Progress Card */}
        <Grid item xs={12} md={5.5}>
          <Box sx={{ position: 'relative', px: { xs: 1, sm: 2 } }}>
            {/* Background decorative blob */}
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: -20,
                width: { xs: 260, md: 380 },
                height: { xs: 260, md: 380 },
                borderRadius: '50%',
                backgroundColor: brandColors.sageGreen,
                opacity: 0.5,
                filter: 'blur(50px)',
                zIndex: 0,
              }}
            />

            {/* Main Hero Image */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 5,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(23, 63, 53, 0.16)',
                border: '4px solid #FFFFFF',
                height: { xs: 340, sm: 420, md: 480 },
              }}
            >
              <Box
                component="img"
                src={HERO_IMAGE}
                alt="Travel packing with PackSmart"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Bottom tag on image */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  py: 0.75,
                  px: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: brandColors.forestGreen }}>
                  ✈️ Amalfi Coast Getaway
                </Typography>
              </Box>
            </Box>

            {/* Floating Packing-Progress Card (Required by prompt) */}
            <Paper
              elevation={4}
              sx={{
                position: 'absolute',
                bottom: { xs: -24, sm: -16 },
                left: { xs: 10, sm: -16 },
                zIndex: 2,
                borderRadius: 3.5,
                p: 2.25,
                minWidth: { xs: 260, sm: 290 },
                backgroundColor: '#FFFFFF',
                border: `1px solid ${brandColors.borderLight}`,
                boxShadow: '0 16px 40px rgba(23, 63, 53, 0.18)',
                animation: 'floatGentle 4s ease-in-out infinite',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.25 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2.5,
                    backgroundColor: brandColors.sageGreen,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: brandColors.forestGreen,
                  }}
                >
                  <LuggageIcon sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: brandColors.forestGreen, lineHeight: 1.2 }}>
                    Amalfi Packing List
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                    12 of 20 items packed — 60%
                  </Typography>
                </Box>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: brandColors.sageGreenLight,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: brandColors.mutedOrange,
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 14, color: '#2E7D32' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: brandColors.charcoalMuted, fontSize: '0.72rem' }}>
                    Cabin Bag Ready
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: brandColors.forestGreen, fontSize: '0.75rem' }}>
                  4.8 kg
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
