import React from 'react';
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../styles/theme';
import { formatShortDateRange } from '../utils/dateUtils';

const TripSwitcher = ({ allTrips = [], activeTripId, onTripChange }) => {
  const navigate = useNavigate();

  if (!allTrips || allTrips.length === 0) {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate('/create')}
      >
        Create Trip
      </Button>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: { xs: 200, sm: 260 } }}>
        <InputLabel id="trip-switcher-label" sx={{ color: brandColors.charcoalMuted }}>
          Active Trip
        </InputLabel>
        <Select
          labelId="trip-switcher-label"
          id="trip-switcher-select"
          value={activeTripId || (allTrips[0] ? allTrips[0].id : '')}
          label="Active Trip"
          onChange={(e) => onTripChange && onTripChange(e.target.value)}
          sx={{
            borderRadius: 2,
            backgroundColor: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.9rem',
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            },
          }}
        >
          {allTrips.map((trip) => (
            <MenuItem key={trip.id} value={trip.id}>
              <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: brandColors.charcoal }}>
                  {trip.destination}
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                  {formatShortDateRange(trip.startDate, trip.endDate)} • {trip.tripType}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        size="small"
        startIcon={<AddIcon />}
        onClick={() => navigate('/create')}
        sx={{
          borderRadius: 2,
          py: 0.8,
          borderColor: brandColors.border,
          color: brandColors.forestGreen,
          '&:hover': {
            borderColor: brandColors.forestGreen,
            backgroundColor: brandColors.sageGreenLight,
          },
        }}
      >
        New Trip
      </Button>
    </Box>
  );
};

export default TripSwitcher;
