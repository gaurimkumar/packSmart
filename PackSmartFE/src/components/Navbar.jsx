import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Container,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LuggageIcon from '@mui/icons-material/Luggage';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { brandColors } from '../styles/theme';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <HomeOutlinedIcon /> },
  { label: 'Create Trip', path: '/create', icon: <AddCircleOutlinedIcon /> },
  { label: 'Packing List', path: '/packing', icon: <CheckBoxOutlinedIcon /> },
  { label: 'Suitcase Planner', path: '/suitcase', icon: <WorkOutlineOutlinedIcon /> },
  { label: 'Outfit Planner', path: '/outfit', icon: <CheckroomOutlinedIcon /> },
  { label: 'Before You Leave', path: '/before', icon: <FactCheckOutlinedIcon /> },
  { label: 'My Trips', path: '/my-trips', icon: <FlightOutlinedIcon /> },
  { label: 'About Us', path: '/about', icon: <InfoOutlinedIcon /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(248, 247, 242, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${brandColors.borderLight}`,
        color: brandColors.charcoal,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 74 }, px: { xs: 1, md: 2 } }}>
          {/* Logo Brand */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              cursor: 'pointer',
              textDecoration: 'none',
              mr: { xs: 1, md: 3 },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                backgroundColor: brandColors.forestGreen,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(23, 63, 53, 0.25)',
              }}
            >
              <LuggageIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 800,
                  color: brandColors.forestGreen,
                  letterSpacing: '-0.03em',
                  fontSize: { xs: '1.2rem', md: '1.35rem' },
                  lineHeight: 1,
                }}
              >
                PackSmart
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: brandColors.charcoalMuted,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Smart Travel Assistant
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              mx: 'auto',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    px: 1.5,
                    py: 0.8,
                    fontSize: '0.875rem',
                    fontWeight: active ? 700 : 600,
                    color: active ? brandColors.forestGreen : brandColors.charcoalLight,
                    backgroundColor: active ? brandColors.sageGreenLight : 'transparent',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: brandColors.sageGreenLight,
                      color: brandColors.forestGreen,
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Right Action button (Desktop) */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5, ml: 'auto' }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<AddCircleOutlinedIcon />}
              onClick={() => navigate('/create')}
              sx={{
                borderRadius: 2,
                px: 2.25,
                py: 0.9,
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 4px 14px rgba(23, 63, 53, 0.20)',
              }}
            >
              Plan Trip
            </Button>
          </Box>

          {/* Mobile Hamburger Button */}
          <IconButton
            color="inherit"
            aria-label="open navigation drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { lg: 'none' }, ml: 'auto', color: brandColors.forestGreen }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: { xs: 280, sm: 320 },
            backgroundColor: brandColors.warmIvory,
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                backgroundColor: brandColors.forestGreen,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LuggageIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
              PackSmart
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: brandColors.charcoal }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2, borderColor: brandColors.borderLight }} />

        <List sx={{ p: 0 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.75 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: active ? brandColors.sageGreenLight : 'transparent',
                    color: active ? brandColors.forestGreen : brandColors.charcoal,
                    '&:hover': {
                      backgroundColor: brandColors.sageGreenLight,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: active ? brandColors.forestGreen : brandColors.charcoalMuted, minWidth: 38 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 600,
                      fontSize: '0.92rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${brandColors.borderLight}` }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={() => {
              setMobileOpen(false);
              navigate('/create');
            }}
            sx={{ py: 1.25, fontWeight: 700, borderRadius: 2.5 }}
          >
            Create New Trip
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
