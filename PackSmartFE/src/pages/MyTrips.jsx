import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import TripCard from '../components/TripCard';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import TripForm from '../components/TripForm';
import { brandColors } from '../styles/theme';
import { useActiveTrip } from '../hooks/useActiveTrip';
import { getTripStatus } from '../utils/dateUtils';
import {
  deleteTrip,
  duplicateTrip,
  updateTrip,
  setActiveTripId,
  saveAllTrips,
} from '../utils/storage';
import { createInitialSampleTrips } from '../data/sampleTrips';

const MyTrips = () => {
  const navigate = useNavigate();
  const { allTrips, refreshData } = useActiveTrip();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Upcoming' | 'Ongoing' | 'Past'

  // Edit Modal State
  const [editingTrip, setEditingTrip] = useState(null);
  // Delete Dialog State
  const [deleteTripId, setDeleteTripId] = useState(null);
  // Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Filtered trips
  const filteredTrips = useMemo(() => {
    return allTrips.filter((trip) => {
      const tripStatus = getTripStatus(trip.startDate, trip.endDate);
      if (statusFilter !== 'All' && tripStatus !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchDest = trip.destination.toLowerCase().includes(q);
        const matchType = (trip.tripType || '').toLowerCase().includes(q);
        const matchNotes = (trip.notes || '').toLowerCase().includes(q);
        if (!matchDest && !matchType && !matchNotes) return false;
      }
      return true;
    });
  }, [allTrips, statusFilter, searchQuery]);

  const statusCounts = useMemo(() => {
    const counts = { All: allTrips.length, Upcoming: 0, Ongoing: 0, Past: 0 };
    allTrips.forEach((t) => {
      const st = getTripStatus(t.startDate, t.endDate);
      if (counts[st] !== undefined) counts[st] += 1;
    });
    return counts;
  }, [allTrips]);

  const handleDuplicate = (tripId) => {
    const cloned = duplicateTrip(tripId);
    refreshData();
    setSnackbar({
      open: true,
      message: `Duplicated "${cloned.destination}" with all packing items!`,
      severity: 'success',
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteTripId) {
      deleteTrip(deleteTripId);
      refreshData();
      setSnackbar({ open: true, message: 'Trip deleted.', severity: 'info' });
      setDeleteTripId(null);
    }
  };

  const handleUpdateTripSubmit = (updatedData) => {
    if (editingTrip) {
      updateTrip(editingTrip.id, updatedData);
      refreshData();
      setEditingTrip(null);
      setSnackbar({ open: true, message: 'Trip details updated successfully!', severity: 'success' });
    }
  };

  const handleRestoreSamples = () => {
    const samples = createInitialSampleTrips();
    saveAllTrips(samples);
    refreshData();
    setSnackbar({ open: true, message: 'Sample trips loaded successfully!', severity: 'success' });
  };

  const handleSelectTrip = (tripId) => {
    setActiveTripId(tripId);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        {/* Page Header as requested: Heading: “Your Adventures”, Subtitle: “Every journey, thoughtfully prepared.” */}
        <PageHeader
          title="Your Adventures"
          subtitle="Every journey, thoughtfully prepared. Access your packing checklists, suitcase weight assignments, and daily lookbooks."
          actions={
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
              sx={{ borderRadius: 2.5, fontWeight: 700, px: 2.5 }}
            >
              Create New Trip
            </Button>
          }
        />

        {/* Search and Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search trips by destination, type, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: brandColors.charcoalMuted }} />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Tabs
              value={statusFilter}
              onChange={(e, val) => setStatusFilter(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: 44,
                  fontSize: '0.88rem',
                  color: brandColors.charcoalMuted,
                  '&.Mui-selected': {
                    color: brandColors.forestGreen,
                    fontWeight: 800,
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: brandColors.forestGreen,
                  height: 3,
                },
              }}
            >
              <Tab value="All" label={`All (${statusCounts.All})`} />
              <Tab value="Upcoming" label={`Upcoming (${statusCounts.Upcoming})`} />
              <Tab value="Ongoing" label={`Ongoing (${statusCounts.Ongoing})`} />
              <Tab value="Past" label={`Past (${statusCounts.Past})`} />
            </Tabs>
          </Grid>
        </Grid>

        {/* Trip Grid */}
        {filteredTrips.length === 0 ? (
          <EmptyState
            icon={FlightTakeoffIcon}
            title={allTrips.length === 0 ? 'No Trips Yet' : 'No Trips Found'}
            description={
              allTrips.length === 0
                ? 'Ready to pack for your next journey? Plan a trip to generate an intelligent checklist.'
                : `No trips matched your search or status filter.`
            }
            actionLabel="Plan New Trip"
            onAction={() => navigate('/create')}
            secondaryActionLabel={allTrips.length === 0 ? 'Load Demo Sample Trips' : undefined}
            onSecondaryAction={allTrips.length === 0 ? handleRestoreSamples : undefined}
          />
        ) : (
          <Grid container spacing={3}>
            {filteredTrips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <TripCard
                  trip={trip}
                  onSelect={handleSelectTrip}
                  onEdit={(t) => setEditingTrip(t)}
                  onDuplicate={handleDuplicate}
                  onDelete={(id) => setDeleteTripId(id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </ResponsiveContainer>

      {/* Edit Trip Dialog */}
      <Dialog
        open={Boolean(editingTrip)}
        onClose={() => setEditingTrip(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
          Edit Trip — {editingTrip?.destination}
        </DialogTitle>
        <DialogContent>
          {editingTrip && (
            <Box sx={{ mt: 1 }}>
              <TripForm
                initialValues={editingTrip}
                onSubmit={handleUpdateTripSubmit}
                submitLabel="Save Trip Changes"
                isEditing={true}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTripId)}
        title="Delete Trip?"
        message="Are you sure you want to delete this trip? All associated packing checklists, outfits, and tasks will be permanently removed."
        confirmText="Delete Trip"
        confirmColor="error"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTripId(null)}
      />

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ borderRadius: 2, fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyTrips;