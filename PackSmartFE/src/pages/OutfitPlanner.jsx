import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  LinearProgress,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import TripSwitcher from '../components/TripSwitcher';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { brandColors } from '../styles/theme';
import { useActiveTrip } from '../hooks/useActiveTrip';
import { calculateOutfitStats } from '../utils/calculations';
import { formatDateString, formatShortDateRange, generateTripDays } from '../utils/dateUtils';
import { OUTFIT_PRESETS } from '../data/categoryImages';
import {
  addTripOutfit,
  updateTripOutfit,
  deleteTripOutfit,
} from '../utils/storage';

const OutfitPlanner = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const paramTripId = searchParams.get('tripId');

  const { allTrips, activeTrip, activeTripId, changeActiveTrip, refreshData } = useActiveTrip(paramTripId);

  // Outfit Modal state
  const [outfitModalOpen, setOutfitModalOpen] = useState(false);
  const [editingOutfit, setEditingOutfit] = useState(null);
  const [outfitForm, setOutfitForm] = useState({
    dayNumber: 1,
    date: '',
    occasion: 'Sightseeing & Exploring',
    description: '',
    clothingItemsInput: '',
    image: '',
    ready: false,
  });

  // Delete modal state
  const [deleteOutfitId, setDeleteOutfitId] = useState(null);
  // Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const outfits = activeTrip?.outfits || [];
  const stats = calculateOutfitStats(outfits);

  const handleTripChange = (newTripId) => {
    changeActiveTrip(newTripId);
    setSearchParams({ tripId: newTripId });
  };

  const handleToggleReady = (outfitId, currentReady) => {
    updateTripOutfit(activeTrip.id, outfitId, { ready: !currentReady });
    refreshData();
  };

  const handleOpenAddModal = (suggestedDay = null) => {
    setEditingOutfit(null);
    const dayNum = suggestedDay ? suggestedDay.dayIndex : outfits.length + 1;
    const dateVal = suggestedDay ? suggestedDay.dateString : (activeTrip?.startDate || '');

    setOutfitForm({
      dayNumber: dayNum,
      date: dateVal,
      occasion: 'Sightseeing & Exploring',
      description: '',
      clothingItemsInput: 'Linen shirt, Chino shorts, Comfortable walking shoes',
      image: OUTFIT_PRESETS[0].image,
      ready: false,
    });
    setOutfitModalOpen(true);
  };

  const handleOpenEditModal = (outfit) => {
    setEditingOutfit(outfit);
    setOutfitForm({
      dayNumber: outfit.dayNumber,
      date: outfit.date || '',
      occasion: outfit.occasion,
      description: outfit.description,
      clothingItemsInput: (outfit.clothingItems || []).join(', '),
      image: outfit.image || '',
      ready: Boolean(outfit.ready),
    });
    setOutfitModalOpen(true);
  };

  const handleSaveOutfit = (e) => {
    e.preventDefault();
    if (!outfitForm.occasion.trim()) return;

    const clothingItems = outfitForm.clothingItemsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingOutfit) {
      updateTripOutfit(activeTrip.id, editingOutfit.id, {
        dayNumber: parseInt(outfitForm.dayNumber, 10) || 1,
        date: outfitForm.date,
        occasion: outfitForm.occasion.trim(),
        description: outfitForm.description.trim(),
        clothingItems,
        image: outfitForm.image,
        ready: outfitForm.ready,
      });
      setSnackbar({ open: true, message: 'Outfit plan updated!' });
    } else {
      addTripOutfit(activeTrip.id, {
        dayNumber: parseInt(outfitForm.dayNumber, 10) || outfits.length + 1,
        date: outfitForm.date,
        occasion: outfitForm.occasion.trim(),
        description: outfitForm.description.trim(),
        clothingItems,
        image: outfitForm.image || OUTFIT_PRESETS[0].image,
        ready: outfitForm.ready,
      });
      setSnackbar({ open: true, message: 'New outfit added to itinerary!' });
    }

    setOutfitModalOpen(false);
    refreshData();
  };

  const handleDeleteOutfitConfirm = () => {
    if (deleteOutfitId && activeTrip) {
      deleteTripOutfit(activeTrip.id, deleteOutfitId);
      refreshData();
      setSnackbar({ open: true, message: 'Outfit removed.' });
      setDeleteOutfitId(null);
    }
  };

  // Safe Image file handler (compresses to safe small thumbnail data url)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
        setOutfitForm((prev) => ({ ...prev, image: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (!activeTrip) {
    return (
      <ResponsiveContainer>
        <EmptyState
          title="No Active Trip Selected"
          description="Create or select a trip to start planning your day-by-day travel wardrobe."
          actionLabel="Create Trip"
          onAction={() => navigate('/create')}
        />
      </ResponsiveContainer>
    );
  }

  // Pre-calculate days between dates for quick day slots
  const tripDays = generateTripDays(activeTrip.startDate, activeTrip.endDate);

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        <PageHeader
          title={`Daily Outfit Planner — ${activeTrip.destination}`}
          subtitle={`${formatShortDateRange(activeTrip.startDate, activeTrip.endDate)} • Visual day-by-day capsule wardrobe and outfit coordination.`}
          backUrl="/packing"
          backLabel="Back to Packing List"
          actions={
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TripSwitcher
                allTrips={allTrips}
                activeTripId={activeTrip.id}
                onTripChange={handleTripChange}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenAddModal()}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Add Outfit
              </Button>
            </Stack>
          }
        />

        {/* Outfit Readiness Overview */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3.5,
            backgroundColor: '#FFFFFF',
            border: `1px solid ${brandColors.borderLight}`,
            boxShadow: '0 4px 20px rgba(23, 63, 53, 0.05)',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    backgroundColor: brandColors.sageGreenLight,
                    color: brandColors.forestGreen,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckroomIcon sx={{ fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: brandColors.forestGreen, lineHeight: 1.1 }}>
                    {stats.ready} of {stats.total}
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, fontWeight: 600 }}>
                    Outfits Ready to Pack ({stats.percentage}%)
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={stats.percentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: brandColors.sageGreenLight,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stats.percentage === 100 ? '#2E7D32' : brandColors.forestGreen,
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Add By Itinerary Day Chips */}
        {tripDays.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: brandColors.charcoal, mb: 1 }}>
              Trip Itinerary Days:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {tripDays.map((day) => {
                const hasOutfit = outfits.some((o) => o.dayNumber === day.dayIndex);
                return (
                  <Chip
                    key={day.dayIndex}
                    label={`Day ${day.dayIndex} (${day.formatted})`}
                    onClick={() => handleOpenAddModal(day)}
                    color={hasOutfit ? 'default' : 'primary'}
                    variant={hasOutfit ? 'filled' : 'outlined'}
                    icon={hasOutfit ? <CheckCircleRoundedIcon sx={{ fontSize: '16px !important' }} /> : <AddIcon sx={{ fontSize: '16px !important' }} />}
                    sx={{
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Outfit Cards Grid */}
        {outfits.length === 0 ? (
          <EmptyState
            title="No Outfits Planned Yet"
            description="Build your day-by-day travel wardrobe so you know exactly what to wear without overpacking."
            actionLabel="Plan First Outfit"
            onAction={() => handleOpenAddModal()}
          />
        ) : (
          <Grid container spacing={3}>
            {outfits.map((outfit) => (
              <Grid item xs={12} sm={6} md={4} key={outfit.id}>
                <Card
                  sx={{
                    borderRadius: 3.5,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1.5px solid ${outfit.ready ? brandColors.forestGreen : brandColors.borderLight}`,
                    backgroundColor: '#FFFFFF',
                    transition: 'all 0.25s ease',
                    boxShadow: outfit.ready ? '0 8px 24px rgba(23, 63, 53, 0.12)' : '0 4px 14px rgba(23, 63, 53, 0.05)',
                  }}
                >
                  {/* Outfit Reference Image */}
                  <Box sx={{ position: 'relative', height: 210, overflow: 'hidden', backgroundColor: brandColors.warmIvoryDark }}>
                    {outfit.image ? (
                      <CardMedia
                        component="img"
                        image={outfit.image}
                        alt={outfit.occasion}
                        sx={{ height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: brandColors.charcoalMuted,
                        }}
                      >
                        <CheckroomIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                      </Box>
                    )}

                    {/* Day badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'rgba(23, 63, 53, 0.88)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        px: 1.25,
                        py: 0.4,
                        borderRadius: 1.5,
                        fontWeight: 800,
                        fontSize: '0.8rem',
                      }}
                    >
                      Day {outfit.dayNumber}
                    </Box>

                    {/* Ready Badge */}
                    <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                      <Chip
                        size="small"
                        label={outfit.ready ? 'Ready to Pack' : 'Drafting'}
                        icon={outfit.ready ? <CheckCircleRoundedIcon sx={{ fontSize: '14px !important' }} /> : undefined}
                        sx={{
                          backgroundColor: outfit.ready ? brandColors.sageGreen : 'rgba(255, 255, 255, 0.92)',
                          color: outfit.ready ? brandColors.forestGreen : brandColors.charcoal,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen, fontSize: '1.15rem' }}>
                        {outfit.occasion}
                      </Typography>

                      <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Edit Outfit">
                          <IconButton size="small" onClick={() => handleOpenEditModal(outfit)} sx={{ color: brandColors.charcoalMuted }}>
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Outfit">
                          <IconButton size="small" onClick={() => setDeleteOutfitId(outfit.id)} sx={{ color: brandColors.charcoalMuted, '&:hover': { color: '#D32F2F' } }}>
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {outfit.date && (
                      <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: brandColors.charcoalMuted, mb: 1.5 }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 15, color: brandColors.mutedOrange }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {formatDateString(outfit.date)}
                        </Typography>
                      </Stack>
                    )}

                    {outfit.description && (
                      <Typography variant="body2" sx={{ color: brandColors.charcoalMuted, mb: 2, fontStyle: 'italic', fontSize: '0.88rem' }}>
                        "{outfit.description}"
                      </Typography>
                    )}

                    {/* Clothing Item Chips */}
                    {outfit.clothingItems && outfit.clothingItems.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, fontWeight: 700, display: 'block', mb: 0.75 }}>
                          Garments:
                        </Typography>
                        <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                          {outfit.clothingItems.map((cItem, idx) => (
                            <Chip
                              key={idx}
                              label={cItem}
                              size="small"
                              sx={{
                                backgroundColor: brandColors.warmIvoryLight,
                                border: `1px solid ${brandColors.borderLight}`,
                                color: brandColors.charcoal,
                                fontWeight: 600,
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* Ready toggle button */}
                    <Box sx={{ mt: 'auto', pt: 1.5, borderTop: `1px solid ${brandColors.borderLight}` }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Boolean(outfit.ready)}
                            onChange={() => handleToggleReady(outfit.id, outfit.ready)}
                            checkedIcon={<CheckCircleRoundedIcon sx={{ color: brandColors.forestGreen }} />}
                            icon={<RadioButtonUncheckedRoundedIcon sx={{ color: brandColors.charcoalMuted }} />}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 600, color: outfit.ready ? brandColors.forestGreen : brandColors.charcoal }}>
                            Marked Ready to Pack
                          </Typography>
                        }
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </ResponsiveContainer>

      {/* Add / Edit Outfit Dialog */}
      <Dialog
        open={outfitModalOpen}
        onClose={() => setOutfitModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <Box component="form" onSubmit={handleSaveOutfit}>
          <DialogTitle sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
            {editingOutfit ? 'Edit Outfit Plan' : 'Plan Daily Outfit'}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Day Number"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={outfitForm.dayNumber}
                    onChange={(e) => setOutfitForm({ ...outfitForm, dayNumber: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Date (Optional)"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={outfitForm.date}
                    onChange={(e) => setOutfitForm({ ...outfitForm, date: e.target.value })}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Activity / Occasion"
                placeholder="e.g. Capri Boat Excursion, Fine Dining, Alpine Hike"
                value={outfitForm.occasion}
                onChange={(e) => setOutfitForm({ ...outfitForm, occasion: e.target.value })}
                required
              />

              <TextField
                fullWidth
                multiline
                rows={2}
                label="Outfit Description & Styling Notes"
                placeholder="e.g. Breathable linen shirt, tailored swim shorts, leather sandals and straw hat"
                value={outfitForm.description}
                onChange={(e) => setOutfitForm({ ...outfitForm, description: e.target.value })}
              />

              <TextField
                fullWidth
                label="Clothing Items (Comma-separated)"
                placeholder="e.g. Linen shirt, Chino shorts, Sunglasses, Sandals"
                value={outfitForm.clothingItemsInput}
                onChange={(e) => setOutfitForm({ ...outfitForm, clothingItemsInput: e.target.value })}
                helperText="Items will be converted into individual visual garment tags"
              />

              {/* Lookbook Preset Selector */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: brandColors.charcoal, display: 'block', mb: 1 }}>
                  Choose a Lookbook Preset Image or Upload Your Own:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                  {OUTFIT_PRESETS.map((preset) => (
                    <Box
                      key={preset.name}
                      onClick={() => setOutfitForm({ ...outfitForm, image: preset.image })}
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        flexShrink: 0,
                        border: `2px solid ${outfitForm.image === preset.image ? brandColors.forestGreen : 'transparent'}`,
                      }}
                    >
                      <Box component="img" src={preset.image} alt={preset.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  ))}
                </Stack>

                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  startIcon={<PhotoCameraOutlinedIcon />}
                  sx={{ mt: 1, borderColor: brandColors.border, color: brandColors.forestGreen }}
                >
                  Upload Custom Reference Photo
                  <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                </Button>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={outfitForm.ready}
                    onChange={(e) => setOutfitForm({ ...outfitForm, ready: e.target.checked })}
                    checkedIcon={<CheckCircleRoundedIcon sx={{ color: brandColors.forestGreen }} />}
                  />
                }
                label="Mark this outfit as ready to pack"
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOutfitModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingOutfit ? 'Save Outfit' : 'Add Outfit'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Outfit Dialog */}
      <ConfirmDialog
        open={Boolean(deleteOutfitId)}
        title="Delete Outfit Plan?"
        message="Are you sure you want to remove this daily outfit plan?"
        confirmText="Delete"
        confirmColor="error"
        onConfirm={handleDeleteOutfitConfirm}
        onClose={() => setDeleteOutfitId(null)}
      />

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
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

export default OutfitPlanner;