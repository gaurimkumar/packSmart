import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
  Container,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import TripCard from '../components/TripCard';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { brandColors } from '../styles/theme';
import { CATEGORY_IMAGES } from '../data/categoryImages';
import { useActiveTrip } from '../hooks/useActiveTrip';
import { duplicateTrip, deleteTrip, setActiveTripId } from '../utils/storage';

const TRAVEL_CATEGORIES = [
  {
    title: 'Beach Getaways',
    subtitle: 'Sun, surf & coastal tranquility',
    type: 'Beach',
    image: CATEGORY_IMAGES['Beach Getaways'],
  },
  {
    title: 'Mountain Adventures',
    subtitle: 'Alpine summits & hiking essentials',
    type: 'Mountains',
    image: CATEGORY_IMAGES['Mountain Adventures'],
  },
  {
    title: 'City Breaks',
    subtitle: 'Urban culture, museums & nightlife',
    type: 'City',
    image: CATEGORY_IMAGES['City Breaks'],
  },
  {
    title: 'Business Trips',
    subtitle: 'Wrinkle-free executive essentials',
    type: 'Business',
    image: CATEGORY_IMAGES['Business Trips'],
  },
  {
    title: 'Weekend Escapes',
    subtitle: 'Lightweight carry-on capsules',
    type: 'Weekend Getaway',
    image: CATEGORY_IMAGES['Weekend Escapes'],
  },
  {
    title: 'Adventure Travel',
    subtitle: 'Rugged trails & remote expeditions',
    type: 'Adventure',
    image: CATEGORY_IMAGES['Adventure Travel'],
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Enter your trip details',
    description: 'Tell us where you are going, your travel dates, expected activities, and whether you prefer light carry-on or full comfort.',
    icon: <EditCalendarOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    number: '02',
    title: 'Generate your packing checklist',
    description: 'Our smart rule engine automatically tailors clothing quantities, essential toiletries, chargers, and weather gear for your duration.',
    icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    number: '03',
    title: 'Pack confidently and travel stress-free',
    description: 'Organize your bags, plan day-by-day outfits, check off pre-departure tasks, and embark with total peace of mind.',
    icon: <FlightTakeoffIcon sx={{ fontSize: 32 }} />,
  },
];

const FEATURES = [
  {
    title: 'Smart Packing Lists',
    description: 'Intelligent checklists automatically scaled to your trip duration, destination climate, and personal packing preference.',
    icon: <ChecklistRtlOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Suitcase Organization',
    description: 'Distribute items seamlessly across Cabin Bag, Main Suitcase, and Backpack with live weight calculation gauges.',
    icon: <LuggageOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Outfit Planning',
    description: 'Build day-by-day visual outfit boards linked to your itinerary so you never waste time deciding what to wear each morning.',
    icon: <CheckroomOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Group Packing',
    description: 'Easily scale item suggestions and quantities whether traveling solo, as a couple, or with a multi-person family group.',
    icon: <GroupsOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Reusable Trip Templates',
    description: 'Duplicate and tweak successful past packing lists with a single click for frequent weekenders or annual holidays.',
    icon: <BookmarkBorderOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Travel Preparation Checklist',
    description: 'Built-in departure timeline for booking checks, passports, offline maps, and home security before you walk out the door.',
    icon: <CheckCircleOutlinedIcon sx={{ fontSize: 28 }} />,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { allTrips, refreshData } = useActiveTrip();

  const handleCategoryClick = (tripType) => {
    navigate(`/create?type=${encodeURIComponent(tripType)}`);
  };

  const handleDuplicate = (tripId) => {
    duplicateTrip(tripId);
    refreshData();
  };

  const handleDelete = (tripId) => {
    deleteTrip(tripId);
    refreshData();
  };

  const handleSelectTrip = (tripId) => {
    setActiveTripId(tripId);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Travel Categories */}
        <Box sx={{ my: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{
                color: brandColors.mutedOrangeDark,
                fontWeight: 800,
                letterSpacing: '0.1em',
                fontSize: '0.85rem',
              }}
            >
              Tailored For Every Journey
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
                fontWeight: 800,
                color: brandColors.forestGreen,
                mt: 0.5,
              }}
            >
              Explore Travel Categories
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: brandColors.charcoalMuted, maxWidth: 600, mx: 'auto', mt: 1 }}
            >
              Select a trip type to pre-fill intelligent packing suggestions crafted for your style of exploration.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {TRAVEL_CATEGORIES.map((cat) => (
              <Grid item xs={12} sm={6} md={4} key={cat.title}>
                <CategoryCard
                  title={cat.title}
                  subtitle={cat.subtitle}
                  image={cat.image}
                  onClick={() => handleCategoryClick(cat.type)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 3. How It Works Section */}
        <Box
          sx={{
            my: { xs: 6, md: 10 },
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 6 },
            borderRadius: 5,
            backgroundColor: brandColors.warmIvoryLight,
            border: `1px solid ${brandColors.borderLight}`,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{
                color: brandColors.forestGreenLight,
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              Simple & Thoughtful
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.9rem', md: '2.5rem' },
                fontWeight: 800,
                color: brandColors.forestGreen,
              }}
            >
              How PackSmart Works
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <Grid item xs={12} md={4} key={step.number}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3.5,
                    border: `1px solid ${brandColors.borderLight}`,
                    backgroundColor: '#FFFFFF',
                    position: 'relative',
                    transition: 'transform 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        backgroundColor: brandColors.sageGreenLight,
                        color: brandColors.forestGreen,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: brandColors.sageGreenDark,
                        opacity: 0.8,
                      }}
                    >
                      {step.number}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: brandColors.charcoal,
                      mb: 1.25,
                      fontSize: '1.2rem',
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: brandColors.charcoalMuted, lineHeight: 1.65 }}
                  >
                    {step.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 4. Features Section */}
        <Box id="features-section" sx={{ my: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{
                color: brandColors.mutedOrangeDark,
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              Packed With Everything You Need
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.6rem' },
                fontWeight: 800,
                color: brandColors.forestGreen,
                mt: 0.5,
              }}
            >
              Crafted For Seamless Travel Preparation
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: brandColors.charcoalMuted, maxWidth: 620, mx: 'auto', mt: 1 }}
            >
              Every feature is meticulously designed to eliminate packing stress and bring joy back to preparing for journeys.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {FEATURES.map((feat) => (
              <Grid item xs={12} sm={6} md={4} key={feat.title}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3.5,
                    border: `1px solid ${brandColors.borderLight}`,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: brandColors.forestGreenLight,
                      boxShadow: '0 8px 24px rgba(23, 63, 53, 0.08)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2.5,
                      backgroundColor: brandColors.sageGreenLight,
                      color: brandColors.forestGreen,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {feat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen, mb: 1 }}>
                    {feat.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: brandColors.charcoalMuted, lineHeight: 1.65 }}>
                    {feat.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 5. Saved Trips Preview */}
        {allTrips && allTrips.length > 0 && (
          <Box sx={{ my: { xs: 6, md: 10 } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 4,
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: brandColors.forestGreen, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                  Your Saved Adventures
                </Typography>
                <Typography variant="subtitle1" sx={{ color: brandColors.charcoalMuted }}>
                  Continue organizing your upcoming journeys right where you left off.
                </Typography>
              </Box>

              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/my-trips')}
                sx={{
                  borderColor: brandColors.forestGreen,
                  color: brandColors.forestGreen,
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                View All Trips ({allTrips.length})
              </Button>
            </Box>

            <Grid container spacing={3}>
              {allTrips.slice(0, 3).map((trip) => (
                <Grid item xs={12} sm={6} md={4} key={trip.id}>
                  <TripCard
                    trip={trip}
                    onSelect={handleSelectTrip}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    onEdit={() => navigate(`/my-trips`)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Bottom Banner CTA */}
        <Box
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            background: `linear-gradient(135deg, ${brandColors.forestGreen} 0%, ${brandColors.forestGreenDark} 100%)`,
            color: '#FFFFFF',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.8rem', md: '2.6rem' },
              letterSpacing: '-0.02em',
              mb: 1.5,
            }}
          >
            Ready to pack with confidence?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.82)',
              maxWidth: 540,
              mx: 'auto',
              mb: 3.5,
              fontSize: '1.05rem',
            }}
          >
            Create your personalized packing checklist in under 60 seconds. No registration or credit card required.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: brandColors.mutedOrange,
              color: '#FFFFFF',
              px: 4,
              py: 1.5,
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: 2.5,
              '&:hover': {
                backgroundColor: brandColors.mutedOrangeDark,
              },
            }}
          >
            Start Packing Now
          </Button>
        </Box>
      </ResponsiveContainer>
    </Box>
  );
};

export default Home;