import React, { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import TripForm from '../components/TripForm';
import { saveNewTrip } from '../utils/storage';
import { getTodayDateString } from '../utils/dateUtils';
import { getDestinationImage } from '../data/categoryImages';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type') || 'City';

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const initialValues = {
    destination: '',
    startDate: getTodayDateString(5),
    endDate: getTodayDateString(12),
    travellers: 1,
    tripType: preselectedType,
    activities: ['Sightseeing'],
    packingPreference: 'Regular Packing',
    notes: '',
  };

  const handleCreateTrip = (tripData) => {
    // Generate image if not set
    if (!tripData.image) {
      tripData.image = getDestinationImage(tripData.destination, tripData.tripType);
    }

    const saved = saveNewTrip(tripData);

    setSnackbar({
      open: true,
      message: `Packing checklist successfully generated for ${saved.destination}!`,
    });

    // Navigate to the Packing List page for this new trip
    setTimeout(() => {
      navigate(`/packing?tripId=${saved.id}`);
    }, 600);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        <PageHeader
          title="Plan a New Adventure"
          subtitle="Tell us about your upcoming journey. We'll generate an intelligent, personalized packing checklist tailored to your style."
          backUrl="/"
          backLabel="Back to Home"
        />

        <TripForm
          initialValues={initialValues}
          onSubmit={handleCreateTrip}
          submitLabel="Generate My Packing List"
        />
      </ResponsiveContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ borderRadius: 2, fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateTrip;