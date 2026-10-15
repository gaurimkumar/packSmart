import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LuggageIcon from '@mui/icons-material/Luggage';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import { brandColors } from '../styles/theme';

const CORE_BENEFITS = [
  {
    title: 'Intelligent Algorithmic Suggestions',
    description: 'No more generic checklists. PackSmart scales clothing counts precisely to your duration, destination climate, activities, and carry-on preference.',
    icon: <PsychologyOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    title: 'Luggage Allocation & Weight Safety',
    description: 'Keep your bags compliant with airline luggage regulations. Distribute items across Cabin Bag, Main Suitcase, and Backpack with live weight tracking.',
    icon: <ScaleOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    title: 'Visual Daily Outfit Coordination',
    description: 'Plan what you wear day-by-day. Say goodbye to packing an entire suitcase of miscellaneous clothes only to feel like you have nothing to wear.',
    icon: <CheckroomOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    title: 'Mindful, Sustainable Travel',
    description: 'Pack less stress, travel light, reduce airline carbon footprints, and enjoy effortless transit through airports and train stations.',
    icon: <EnergySavingsLeafOutlinedIcon sx={{ fontSize: 32 }} />,
  },
];

const TESTIMONIALS = [
  {
    quote: 'PackSmart completely transformed how I pack for European trips. For the first time ever, my cabin bag weighed under 8 kg and I wore every single outfit I brought!',
    author: 'Elena Vance',
    role: 'Adventure Photographer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    destination: 'Trip to Amalfi Coast & Dolomites',
  },
  {
    quote: 'The suitcase weight breakdown saved me from a $120 excess baggage fee at Tokyo Haneda. The interface is gorgeous, smooth, and completely private.',
    author: 'Marcus Chen',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    destination: 'Trip to Tokyo & Kyoto',
  },
  {
    quote: 'The Before You Leave checklist is a lifesaver. Checking off power banks and documents gave our family total peace of mind before heading to the airport.',
    author: 'Sarah & Liam Jenkins',
    role: 'Family Travelers',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    destination: 'Trip to Swiss Alps',
  },
];

const STATS = [
  { value: '100%', label: 'Browser-based & Private' },
  { value: '6+', label: 'Curated Travel Categories' },
  { value: '0 sec', label: 'Cloud Latency or Sign-up' },
  { value: '3 Bag', label: 'Weight Allocation Engine' },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        {/* Page Header */}
        <PageHeader
          title="About PackSmart"
          subtitle="Pack less stress. Travel with confidence."
          backUrl="/"
          backLabel="Back to Home"
        />

        {/* Hero Mission Section */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{ color: brandColors.mutedOrangeDark, fontWeight: 800, letterSpacing: '0.1em' }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontWeight: 800,
                color: brandColors.forestGreen,
                lineHeight: 1.2,
                mb: 2.5,
              }}
            >
              Empowering mindful travelers to explore the world with lighter bags and clearer minds.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: brandColors.charcoalLight, lineHeight: 1.7, mb: 2, fontSize: '1.05rem' }}
            >
              Travel is about wonder, discovery, and unforgettable encounters. Yet, for too many journeys, the days leading up to departure are dominated by chaos, forgotten adapters, overstuffed suitcases, and nagging packing anxiety.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: brandColors.charcoalLight, lineHeight: 1.7, mb: 3, fontSize: '1.05rem' }}
            >
              PackSmart was born out of a desire to replace that pre-trip anxiety with effortless calm. By combining smart algorithmic packing logic, luggage weight distribution, and daily outfit planning, we ensure you have exactly what you need — and nothing you don’t.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/create')}
              sx={{ borderRadius: 2.5, px: 3.5, py: 1.3, fontWeight: 700 }}
            >
              Plan Your Next Trip
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 5,
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(23, 63, 53, 0.14)',
                border: '4px solid #FFFFFF',
                height: { xs: 320, md: 440 },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                alt="Mindful travel with PackSmart"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Why We Created PackSmart */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            mb: { xs: 6, md: 10 },
            borderRadius: 4,
            backgroundColor: brandColors.warmIvoryLight,
            border: `1px solid ${brandColors.borderLight}`,
          }}
        >
          <Box sx={{ maxWidth: 820, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: brandColors.forestGreenLight, fontWeight: 800, letterSpacing: '0.1em' }}
            >
              The Story
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: brandColors.forestGreen,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                mb: 2,
              }}
            >
              Why We Created PackSmart
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: brandColors.charcoalMuted, lineHeight: 1.8, fontSize: '1.05rem', mb: 3 }}
            >
              Every traveler has experienced that sinking feeling at airport check-in when the luggage scale blinks a number above the weight limit. Or reaching the hotel in a foreign city only to realize the international plug adapter was left on the bedside table at home.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: brandColors.charcoalMuted, lineHeight: 1.8, fontSize: '1.05rem' }}
            >
              PackSmart solves these frustrations through practical, human-centered design. We built a zero-clutter, lightning-fast web tool that lives entirely in your browser. No account logins, no cloud tracking, and no hidden subscriptions — just pure travel preparation harmony.
            </Typography>
          </Box>
        </Paper>

        {/* Core Benefits */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{ color: brandColors.mutedOrangeDark, fontWeight: 800, letterSpacing: '0.1em' }}
            >
              Thoughtful Features
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: brandColors.forestGreen,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
              }}
            >
              Main Benefits & Pillars
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {CORE_BENEFITS.map((b) => (
              <Grid item xs={12} sm={6} key={b.title}>
                <Card
                  sx={{
                    p: 3.5,
                    height: '100%',
                    borderRadius: 3.5,
                    border: `1px solid ${brandColors.borderLight}`,
                    backgroundColor: '#FFFFFF',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: brandColors.forestGreenLight,
                      boxShadow: '0 8px 24px rgba(23, 63, 53, 0.08)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 2.5,
                      backgroundColor: brandColors.sageGreenLight,
                      color: brandColors.forestGreen,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {b.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen, mb: 1 }}>
                    {b.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: brandColors.charcoalMuted, lineHeight: 1.65 }}>
                    {b.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Row */}
        <Grid container spacing={2} sx={{ mb: { xs: 6, md: 10 } }}>
          {STATS.map((st) => (
            <Grid item xs={6} md={3} key={st.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${brandColors.borderLight}`,
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 900, color: brandColors.forestGreen, lineHeight: 1 }}>
                  {st.value}
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.charcoalMuted, mt: 1, fontWeight: 600 }}>
                  {st.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: brandColors.forestGreenLight, fontWeight: 800, letterSpacing: '0.1em' }}>
              Traveler Stories
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: brandColors.forestGreen, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
              Loved by Explorers Worldwide
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {TESTIMONIALS.map((t) => (
              <Grid item xs={12} md={4} key={t.author}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${brandColors.borderLight}`,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <FormatQuoteRoundedIcon sx={{ fontSize: 36, color: brandColors.mutedOrange, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: brandColors.charcoal, lineHeight: 1.7, mb: 3, flex: 1, fontStyle: 'italic' }}>
                    "{t.quote}"
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 2, borderTop: `1px solid ${brandColors.borderLight}` }}>
                    <Avatar src={t.avatar} alt={t.author} sx={{ width: 44, height: 44 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
                        {t.author}
                      </Typography>
                      <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, display: 'block' }}>
                        {t.role} • {t.destination}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bottom Banner Call to Action */}
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            background: `linear-gradient(135deg, ${brandColors.forestGreen} 0%, ${brandColors.forestGreenDark} 100%)`,
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            Start planning your next getaway
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 540, mx: 'auto', mb: 3 }}>
            Join thousands of travelers who pack lighter, organize smarter, and travel without stress.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create')}
            sx={{
              backgroundColor: brandColors.mutedOrange,
              color: '#FFFFFF',
              fontWeight: 800,
              px: 4,
              py: 1.5,
              borderRadius: 2.5,
              fontSize: '1rem',
              '&:hover': { backgroundColor: brandColors.mutedOrangeDark },
            }}
          >
            Create Your Trip Now
          </Button>
        </Box>
      </ResponsiveContainer>
    </Box>
  );
};

export default AboutUs;
