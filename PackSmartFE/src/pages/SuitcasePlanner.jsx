import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Paper,
  Divider,
  Snackbar,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import TripSwitcher from '../components/TripSwitcher';
import EmptyState from '../components/EmptyState';
import { brandColors } from '../styles/theme';
import { useActiveTrip } from '../hooks/useActiveTrip';
import { LUGGAGE_TYPES } from '../data/packingRules';
import { calculateLuggageStats } from '../utils/calculations';
import { updateTripPackingItem } from '../utils/storage';

const LUGGAGE_CONFIGS = [
  {
    type: 'Cabin Bag',
    title: 'Cabin Bag (Carry-On)',
    subtitle: 'Overhead bin baggage · Max recommended ~10 kg',
    icon: <WorkOutlinedIcon sx={{ fontSize: 28 }} />,
    color: brandColors.forestGreen,
    bgColor: brandColors.sageGreenLight,
    maxLimit: 10,
    guideline: 'Pack outfits, travel toiletries, delicate garments, and secondary footwear.',
  },
  {
    type: 'Main Suitcase',
    title: 'Main Suitcase (Checked Bag)',
    subtitle: 'Heavy luggage hold · Standard limit ~23 kg',
    icon: <LuggageIcon sx={{ fontSize: 28 }} />,
    color: '#1967D2',
    bgColor: '#EBF3FB',
    maxLimit: 23,
    guideline: 'Pack bulky footwear, liquids >100ml, hiking poles, tools, and extra wardrobe.',
  },
  {
    type: 'Backpack',
    title: 'Backpack (Personal Item)',
    subtitle: 'Under-seat personal bag · Target ~7 kg',
    icon: <BackpackOutlinedIcon sx={{ fontSize: 28 }} />,
    color: brandColors.mutedOrangeDark,
    bgColor: brandColors.mutedOrangeLight,
    maxLimit: 7,
    guideline: 'Keep documents, laptops, cameras, medications, chargers, and water bottle.',
  },
];

const SuitcasePlanner = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const paramTripId = searchParams.get('tripId');

  const { allTrips, activeTrip, activeTripId, changeActiveTrip, refreshData } = useActiveTrip(paramTripId);

  // Bag move menu state
  const [menuAnchor, setMenuAnchor] = useState({ el: null, itemId: null });
  // Edit weight modal state
  const [weightModal, setWeightModal] = useState({ open: false, item: null, weight: 0 });
  // Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const items = activeTrip?.packingList || [];
  const luggageStats = calculateLuggageStats(items);

  const handleTripChange = (newTripId) => {
    changeActiveTrip(newTripId);
    setSearchParams({ tripId: newTripId });
  };

  const handleMoveItem = (itemId, targetBag) => {
    updateTripPackingItem(activeTrip.id, itemId, { bag: targetBag });
    refreshData();
    setMenuAnchor({ el: null, itemId: null });
    setSnackbar({ open: true, message: `Moved item to ${targetBag}` });
  };

  const handleTogglePacked = (itemId, currentPacked) => {
    updateTripPackingItem(activeTrip.id, itemId, { packed: !currentPacked });
    refreshData();
  };

  const handleSaveWeight = (e) => {
    e.preventDefault();
    if (weightModal.item) {
      updateTripPackingItem(activeTrip.id, weightModal.item.id, {
        weight: parseFloat(weightModal.weight) || 0.1,
      });
      refreshData();
      setWeightModal({ open: false, item: null, weight: 0 });
      setSnackbar({ open: true, message: 'Item weight updated.' });
    }
  };

  if (!activeTrip) {
    return (
      <ResponsiveContainer>
        <EmptyState
          title="No Active Trip Selected"
          description="Create or select a trip to plan your suitcase allocation and track baggage weights."
          actionLabel="Create Trip"
          onAction={() => navigate('/create')}
        />
      </ResponsiveContainer>
    );
  }

  const unassignedItems = luggageStats['Unassigned'].items;

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        <PageHeader
          title={`Suitcase Planner — ${activeTrip.destination}`}
          subtitle="Distribute your packing items across your cabin carry-on, main checked suitcase, and personal backpack to balance weight and airline limits."
          backUrl="/packing"
          backLabel="Back to Packing List"
          actions={
            <TripSwitcher
              allTrips={allTrips}
              activeTripId={activeTrip.id}
              onTripChange={handleTripChange}
            />
          }
        />

        {/* Global Baggage Summary Banner */}
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
                  <ScaleOutlinedIcon sx={{ fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: brandColors.forestGreen, lineHeight: 1.1 }}>
                    {luggageStats.totalWeight} kg
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, fontWeight: 600 }}>
                    Total Estimated Luggage Weight
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ sm: 'flex-end' }}
              >
                <Box sx={{ textAlign: { sm: 'center' } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: brandColors.forestGreen }}>
                    {luggageStats['Cabin Bag'].weight} kg
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                    Cabin ({luggageStats['Cabin Bag'].count} items)
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

                <Box sx={{ textAlign: { sm: 'center' } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1967D2' }}>
                    {luggageStats['Main Suitcase'].weight} kg
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                    Main ({luggageStats['Main Suitcase'].count} items)
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

                <Box sx={{ textAlign: { sm: 'center' } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: brandColors.mutedOrangeDark }}>
                    {luggageStats['Backpack'].weight} kg
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                    Backpack ({luggageStats['Backpack'].count} items)
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* 3 Main Luggage Columns */}
        <Grid container spacing={3}>
          {LUGGAGE_CONFIGS.map((cfg) => {
            const bagData = luggageStats[cfg.type];
            const weightPercent = Math.min(100, Math.round((bagData.weight / cfg.maxLimit) * 100));
            const isNearLimit = bagData.weight > cfg.maxLimit * 0.9;
            const isOverLimit = bagData.weight > cfg.maxLimit;

            return (
              <Grid item xs={12} md={4} key={cfg.type}>
                <Card
                  sx={{
                    borderRadius: 3.5,
                    border: `1.5px solid ${isOverLimit ? '#D32F2F' : brandColors.borderLight}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {/* Bag Header */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderBottom: `1px solid ${brandColors.borderLight}`,
                      backgroundColor: cfg.bgColor,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: cfg.color }}>
                        {cfg.icon}
                        <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen, fontSize: '1.1rem' }}>
                          {cfg.type}
                        </Typography>
                      </Box>
                      <Chip
                        size="small"
                        label={`${bagData.count} items`}
                        sx={{ fontWeight: 700, backgroundColor: '#FFFFFF', fontSize: '0.75rem' }}
                      />
                    </Box>

                    <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, display: 'block', mb: 1.5 }}>
                      {cfg.guideline}
                    </Typography>

                    {/* Weight gauge */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: isOverLimit ? '#D32F2F' : brandColors.charcoal }}>
                        {bagData.weight} kg
                      </Typography>
                      <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                        Max limit ~{cfg.maxLimit} kg ({weightPercent}%)
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={weightPercent}
                      sx={{
                        height: 7,
                        borderRadius: 3.5,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: isOverLimit ? '#D32F2F' : isNearLimit ? brandColors.mutedOrange : cfg.color,
                        },
                      }}
                    />
                  </Box>

                  {/* Items in this Bag */}
                  <CardContent sx={{ p: 2, flex: 1, overflowY: 'auto', maxHeight: 480 }}>
                    {bagData.items.length === 0 ? (
                      <Box sx={{ py: 6, textAlign: 'center', color: brandColors.charcoalMuted }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          No items assigned to {cfg.type} yet.
                        </Typography>
                      </Box>
                    ) : (
                      bagData.items.map((it) => (
                        <Paper
                          key={it.id}
                          elevation={0}
                          sx={{
                            p: 1.25,
                            mb: 1,
                            borderRadius: 2,
                            backgroundColor: it.packed ? brandColors.sageGreenLight : brandColors.warmIvoryLight,
                            border: `1px solid ${brandColors.borderLight}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, flex: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleTogglePacked(it.id, it.packed)}
                              sx={{ p: 0.25, color: it.packed ? brandColors.forestGreen : brandColors.charcoalMuted }}
                            >
                              {it.packed ? (
                                <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />
                              ) : (
                                <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 18 }} />
                              )}
                            </IconButton>

                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="body2"
                                noWrap
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.85rem',
                                  textDecoration: it.packed ? 'line-through' : 'none',
                                  color: it.packed ? brandColors.charcoalMuted : brandColors.charcoal,
                                }}
                              >
                                {it.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                                Qty: {it.quantity} • {((it.weight || 0.1) * (it.quantity || 1)).toFixed(2)} kg
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Update item weight">
                              <IconButton
                                size="small"
                                onClick={() => setWeightModal({ open: true, item: it, weight: it.weight })}
                                sx={{ color: brandColors.charcoalMuted, p: 0.5 }}
                              >
                                <EditOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Move to another bag">
                              <IconButton
                                size="small"
                                onClick={(e) => setMenuAnchor({ el: e.currentTarget, itemId: it.id })}
                                sx={{ color: brandColors.forestGreen, p: 0.5 }}
                              >
                                <SwapHorizIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Paper>
                      ))
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Unassigned Items Shelf */}
        {unassignedItems.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3.5,
                backgroundColor: brandColors.warmIvoryLight,
                border: `1.5px dashed ${brandColors.border}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
                    Unassigned Items ({unassignedItems.length})
                  </Typography>
                  <Typography variant="body2" sx={{ color: brandColors.charcoalMuted }}>
                    These items are not yet allocated to a specific bag. Click a quick button to assign them.
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={1.5}>
                {unassignedItems.map((it) => (
                  <Grid item xs={12} sm={6} md={4} key={it.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: '#FFFFFF',
                        border: `1px solid ${brandColors.borderLight}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: brandColors.charcoal }}>
                          {it.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                          {(it.weight * (it.quantity || 1)).toFixed(2)} kg
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleMoveItem(it.id, 'Cabin Bag')}
                          sx={{ fontSize: '0.72rem', py: 0.25, px: 1, borderColor: brandColors.border }}
                        >
                          Cabin
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleMoveItem(it.id, 'Main Suitcase')}
                          sx={{ fontSize: '0.72rem', py: 0.25, px: 1, borderColor: brandColors.border }}
                        >
                          Main
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleMoveItem(it.id, 'Backpack')}
                          sx={{ fontSize: '0.72rem', py: 0.25, px: 1, borderColor: brandColors.border }}
                        >
                          Backpack
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}
      </ResponsiveContainer>

      {/* Reassign Bag Menu */}
      <Menu
        anchorEl={menuAnchor.el}
        open={Boolean(menuAnchor.el)}
        onClose={() => setMenuAnchor({ el: null, itemId: null })}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 180 } }}
      >
        <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', fontWeight: 700, color: brandColors.charcoalMuted }}>
          Move Item To:
        </Typography>
        {LUGGAGE_TYPES.map((b) => (
          <MenuItem
            key={b}
            onClick={() => handleMoveItem(menuAnchor.itemId, b)}
            sx={{ fontSize: '0.85rem' }}
          >
            {b}
          </MenuItem>
        ))}
      </Menu>

      {/* Edit Weight Dialog */}
      <Dialog
        open={weightModal.open}
        onClose={() => setWeightModal({ open: false, item: null, weight: 0 })}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <Box component="form" onSubmit={handleSaveWeight}>
          <DialogTitle sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
            Edit Weight for {weightModal.item?.name}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              type="number"
              label="Weight per unit (kg)"
              inputProps={{ step: '0.05', min: 0 }}
              value={weightModal.weight}
              onChange={(e) => setWeightModal({ ...weightModal, weight: e.target.value })}
              sx={{ mt: 1.5 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setWeightModal({ open: false, item: null, weight: 0 })}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Weight
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

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

export default SuitcasePlanner;