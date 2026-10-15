import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Stack,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { brandColors } from '../styles/theme';
import { calculateDurationDays, formatShortDateRange, getTodayDateString } from '../utils/dateUtils';
import { DESTINATION_PRESETS, getDestinationImage } from '../data/categoryImages';

const TRIP_TYPES = [
  { label: 'Beach', icon: <BeachAccessOutlinedIcon /> },
  { label: 'Mountains', icon: <TerrainOutlinedIcon /> },
  { label: 'City', icon: <LocationCityOutlinedIcon /> },
  { label: 'Business', icon: <BusinessCenterOutlinedIcon /> },
  { label: 'Adventure', icon: <ExploreOutlinedIcon /> },
  { label: 'Weekend Getaway', icon: <WeekendOutlinedIcon /> },
];

const ACTIVITIES = [
  'Sightseeing',
  'Hiking',
  'Swimming',
  'Shopping',
  'Camping',
  'Business Meetings',
  'Fine Dining',
  'Photography',
];

const TripForm = ({
  initialValues = null,
  onSubmit,
  submitLabel = 'Generate My Packing List',
  isEditing = false,
}) => {
  const [destination, setDestination] = useState(initialValues?.destination || '');
  const [startDate, setStartDate] = useState(initialValues?.startDate || getTodayDateString(7));
  const [endDate, setEndDate] = useState(initialValues?.endDate || getTodayDateString(14));
  const [travellers, setTravellers] = useState(initialValues?.travellers || 1);
  const [tripType, setTripType] = useState(initialValues?.tripType || 'City');
  const [activities, setActivities] = useState(initialValues?.activities || ['Sightseeing']);
  const [packingPreference, setPackingPreference] = useState(initialValues?.packingPreference || 'Regular Packing');
  const [notes, setNotes] = useState(initialValues?.notes || '');
  const [error, setError] = useState('');

  // Sync if initial values change
  useEffect(() => {
    if (initialValues) {
      if (initialValues.destination) setDestination(initialValues.destination);
      if (initialValues.startDate) setStartDate(initialValues.startDate);
      if (initialValues.endDate) setEndDate(initialValues.endDate);
      if (initialValues.travellers) setTravellers(initialValues.travellers);
      if (initialValues.tripType) setTripType(initialValues.tripType);
      if (initialValues.activities) setActivities(initialValues.activities);
      if (initialValues.packingPreference) setPackingPreference(initialValues.packingPreference);
      if (initialValues.notes !== undefined) setNotes(initialValues.notes);
    }
  }, [initialValues]);

  const duration = calculateDurationDays(startDate, endDate);

  const toggleActivity = (activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  const handlePresetSelect = (preset) => {
    setDestination(preset.name);
    setTripType(preset.type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!destination.trim()) {
      setError('Please enter a destination.');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both departure and return dates.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('Return date cannot be earlier than departure date.');
      return;
    }

    const payload = {
      destination: destination.trim(),
      startDate,
      endDate,
      duration,
      travellers: Math.max(1, parseInt(travellers, 10) || 1),
      tripType,
      activities,
      packingPreference,
      notes: notes.trim(),
      image: initialValues?.image || getDestinationImage(destination, tripType),
    };

    onSubmit(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Main Form Fields */}
        <Grid item xs={12} md={7.5}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* 1. Destination */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.forestGreen, mb: 1 }}>
              1. Where are you heading?
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. Amalfi Coast, Italy or Tokyo, Japan"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              helperText="Popular ideas: click any to pre-fill"
              sx={{ mb: 1.5 }}
            />

            {/* Quick destination suggestion chips */}
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {DESTINATION_PRESETS.slice(0, 6).map((preset) => (
                <Chip
                  key={preset.name}
                  label={preset.name}
                  size="small"
                  onClick={() => handlePresetSelect(preset)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: destination === preset.name ? brandColors.forestGreen : brandColors.warmIvoryDark,
                    color: destination === preset.name ? '#FFFFFF' : brandColors.charcoal,
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    '&:hover': {
                      backgroundColor: destination === preset.name ? brandColors.forestGreenLight : brandColors.sageGreen,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* 2. Dates & Travellers */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.forestGreen, mb: 1.5 }}>
              2. When are you traveling?
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Departure Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Return Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>

            {/* Number of travellers */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mt: 2,
                borderRadius: 2.5,
                backgroundColor: '#FFFFFF',
                border: `1px solid ${brandColors.borderLight}`,
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: brandColors.charcoal }}>
                  Number of Travellers
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                  Scale packing checklists for family or solo travel
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  disabled={travellers <= 1}
                  onClick={() => setTravellers(Math.max(1, travellers - 1))}
                  sx={{
                    border: `1px solid ${brandColors.borderLight}`,
                    backgroundColor: brandColors.warmIvoryLight,
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 800 }}>
                  {travellers}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setTravellers(travellers + 1)}
                  sx={{
                    border: `1px solid ${brandColors.borderLight}`,
                    backgroundColor: brandColors.warmIvoryLight,
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* 3. Trip Type */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.forestGreen, mb: 1.5 }}>
              3. Trip Type
            </Typography>

            <Grid container spacing={1.5}>
              {TRIP_TYPES.map((type) => {
                const isSelected = tripType === type.label;
                return (
                  <Grid item xs={6} sm={4} key={type.label}>
                    <Card
                      onClick={() => setTripType(type.label)}
                      sx={{
                        p: 1.75,
                        borderRadius: 2.5,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        border: `2px solid ${isSelected ? brandColors.forestGreen : brandColors.borderLight}`,
                        backgroundColor: isSelected ? brandColors.sageGreenLight : '#FFFFFF',
                        '&:hover': {
                          borderColor: brandColors.forestGreenLight,
                        },
                      }}
                    >
                      <Box sx={{ color: isSelected ? brandColors.forestGreen : brandColors.charcoalMuted, mb: 0.5 }}>
                        {type.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: isSelected ? 700 : 600,
                          color: isSelected ? brandColors.forestGreen : brandColors.charcoal,
                          fontSize: '0.85rem',
                        }}
                      >
                        {type.label}
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* 4. Planned Activities */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.forestGreen, mb: 0.5 }}>
              4. Planned Activities
            </Typography>
            <Typography variant="body2" sx={{ color: brandColors.charcoalMuted, mb: 1.5 }}>
              Select all that apply to tailor specific gear, outfits, and accessories.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {ACTIVITIES.map((act) => {
                const selected = activities.includes(act);
                return (
                  <Chip
                    key={act}
                    label={act}
                    onClick={() => toggleActivity(act)}
                    icon={selected ? <CheckCircleRoundedIcon sx={{ fontSize: '16px !important' }} /> : undefined}
                    sx={{
                      cursor: 'pointer',
                      py: 1,
                      px: 0.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      backgroundColor: selected ? brandColors.forestGreen : '#FFFFFF',
                      color: selected ? '#FFFFFF' : brandColors.charcoal,
                      border: `1px solid ${selected ? brandColors.forestGreen : brandColors.borderLight}`,
                      '&:hover': {
                        backgroundColor: selected ? brandColors.forestGreenLight : brandColors.sageGreenLight,
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </Box>

          {/* 5. Packing Preference */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.forestGreen, mb: 1 }}>
              5. Packing Preference
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card
                  onClick={() => setPackingPreference('Light Packing')}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    cursor: 'pointer',
                    border: `2px solid ${packingPreference === 'Light Packing' ? brandColors.forestGreen : brandColors.borderLight}`,
                    backgroundColor: packingPreference === 'Light Packing' ? brandColors.sageGreenLight : '#FFFFFF',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
                    🎒 Light Packing (Carry-On Only)
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, display: 'block', mt: 0.5 }}>
                    Streamlined capsule quantities, multi-use garments, saves baggage fees and travel light.
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card
                  onClick={() => setPackingPreference('Regular Packing')}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    cursor: 'pointer',
                    border: `2px solid ${packingPreference === 'Regular Packing' ? brandColors.forestGreen : brandColors.borderLight}`,
                    backgroundColor: packingPreference === 'Regular Packing' ? brandColors.sageGreenLight : '#FFFFFF',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
                    🧳 Regular Packing (Full Comfort)
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, display: 'block', mt: 0.5 }}>
                    Full clothing rotation, spare backup outfits, extra footwear and styling accessories.
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* 6. Optional Notes */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.forestGreen, mb: 1 }}>
              6. Optional Notes & Reminders
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="e.g. Hotel details, weather cautions, must-visit reservations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>
        </Grid>

        {/* Live Trip Summary Sidebar */}
        <Grid item xs={12} md={4.5}>
          <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
            <Card
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(23, 63, 53, 0.10)',
                border: `1px solid ${brandColors.borderLight}`,
                backgroundColor: '#FFFFFF',
              }}
            >
              <Box sx={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={getDestinationImage(destination, tripType)}
                  alt="Destination Preview"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(14, 39, 33, 0.8) 0%, transparent 60%)',
                  }}
                />
                <Box sx={{ position: 'absolute', bottom: 12, left: 16, right: 16 }}>
                  <Typography variant="caption" sx={{ color: brandColors.sageGreen, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Live Trip Summary
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 800, lineHeight: 1.2 }}>
                    {destination || 'Your Dream Destination'}
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: brandColors.charcoalMuted }}>
                      <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: brandColors.mutedOrange }} />
                      <Typography variant="body2">Travel Dates</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {formatShortDateRange(startDate, endDate)}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: brandColors.borderLight }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: brandColors.charcoalMuted }}>
                      <LuggageOutlinedIcon sx={{ fontSize: 18, color: brandColors.forestGreen }} />
                      <Typography variant="body2">Trip Duration</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {duration} {duration === 1 ? 'Day' : 'Days'}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: brandColors.borderLight }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: brandColors.charcoalMuted }}>
                      <PeopleOutlineOutlinedIcon sx={{ fontSize: 18, color: brandColors.forestGreen }} />
                      <Typography variant="body2">Travellers</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {travellers} {travellers === 1 ? 'Person' : 'People'}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: brandColors.borderLight }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: brandColors.charcoalMuted }}>Trip Type</Typography>
                    <Chip size="small" label={tripType} sx={{ backgroundColor: brandColors.sageGreenLight, color: brandColors.forestGreen, fontWeight: 700 }} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: brandColors.charcoalMuted }}>Packing Mode</Typography>
                    <Chip size="small" label={packingPreference} sx={{ backgroundColor: brandColors.mutedOrangeLight, color: brandColors.mutedOrangeDark, fontWeight: 700 }} />
                  </Box>

                  {activities.length > 0 && (
                    <Box sx={{ pt: 1 }}>
                      <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, fontWeight: 600, display: 'block', mb: 0.75 }}>
                        Selected Activities ({activities.length}):
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {activities.map((a) => (
                          <Chip key={a} label={a} size="small" sx={{ fontSize: '0.72rem', height: 24 }} />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 2.5,
                    boxShadow: '0 8px 24px rgba(23, 63, 53, 0.22)',
                  }}
                >
                  {submitLabel}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TripForm;
