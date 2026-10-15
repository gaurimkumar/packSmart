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
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import ProgressCard from '../components/ProgressCard';
import PackingItem from '../components/PackingItem';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import TripSwitcher from '../components/TripSwitcher';
import { brandColors } from '../styles/theme';
import { useActiveTrip } from '../hooks/useActiveTrip';
import { CATEGORIES, LUGGAGE_TYPES } from '../data/packingRules';
import { calculatePackingStats, calculateLuggageStats } from '../utils/calculations';
import { formatShortDateRange } from '../utils/dateUtils';
import {
  addTripPackingItem,
  updateTripPackingItem,
  deleteTripPackingItem,
  resetTripPackingItems,
} from '../utils/storage';

const PackingList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const paramTripId = searchParams.get('tripId');

  const { allTrips, activeTrip, activeTripId, changeActiveTrip, refreshData } = useActiveTrip(paramTripId);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Packed' | 'Unpacked'
  const [searchQuery, setSearchQuery] = useState('');

  // Item Add / Edit Modal state
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    category: 'Clothing',
    quantity: 1,
    weight: 0.2,
    bag: 'Cabin Bag',
    notes: '',
  });

  // Confirm Reset Modal state
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Snackbar feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const items = activeTrip?.packingList || [];
  const stats = calculatePackingStats(items);
  const luggageStats = calculateLuggageStats(items);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (statusFilter === 'Packed' && !item.packed) return false;
      if (statusFilter === 'Unpacked' && item.packed) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchNotes = (item.notes || '').toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchNotes) return false;
      }
      return true;
    });
  }, [items, selectedCategory, statusFilter, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: items.length };
    CATEGORIES.forEach(cat => { counts[cat] = 0; });
    items.forEach(it => {
      if (counts[it.category] !== undefined) counts[it.category] += 1;
    });
    return counts;
  }, [items]);

  const handleTripChange = (newTripId) => {
    changeActiveTrip(newTripId);
    setSearchParams({ tripId: newTripId });
  };

  const handleTogglePacked = (itemId) => {
    const it = items.find(i => i.id === itemId);
    if (!it) return;
    updateTripPackingItem(activeTrip.id, itemId, { packed: !it.packed });
    refreshData();
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    updateTripPackingItem(activeTrip.id, itemId, { quantity: newQty });
    refreshData();
  };

  const handleChangeBag = (itemId, newBag) => {
    updateTripPackingItem(activeTrip.id, itemId, { bag: newBag });
    refreshData();
    setSnackbar({
      open: true,
      message: `Item reassigned to ${newBag}`,
      severity: 'info',
    });
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setItemForm({
      name: '',
      category: selectedCategory !== 'All' ? selectedCategory : 'Clothing',
      quantity: 1,
      weight: 0.2,
      bag: 'Cabin Bag',
      notes: '',
    });
    setItemModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      weight: item.weight,
      bag: item.bag,
      notes: item.notes || '',
    });
    setItemModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!itemForm.name.trim()) return;

    if (editingItem) {
      updateTripPackingItem(activeTrip.id, editingItem.id, {
        name: itemForm.name.trim(),
        category: itemForm.category,
        quantity: parseInt(itemForm.quantity, 10) || 1,
        weight: parseFloat(itemForm.weight) || 0.1,
        bag: itemForm.bag,
        notes: itemForm.notes.trim(),
      });
      setSnackbar({ open: true, message: 'Item updated successfully!', severity: 'success' });
    } else {
      addTripPackingItem(activeTrip.id, {
        name: itemForm.name.trim(),
        category: itemForm.category,
        quantity: parseInt(itemForm.quantity, 10) || 1,
        weight: parseFloat(itemForm.weight) || 0.1,
        bag: itemForm.bag,
        notes: itemForm.notes.trim(),
        packed: false,
      });
      setSnackbar({ open: true, message: 'Custom item added to packing list!', severity: 'success' });
    }

    setItemModalOpen(false);
    refreshData();
  };

  const handleDeleteItemConfirm = () => {
    if (deleteItemId && activeTrip) {
      deleteTripPackingItem(activeTrip.id, deleteItemId);
      refreshData();
      setSnackbar({ open: true, message: 'Item removed.', severity: 'info' });
      setDeleteItemId(null);
    }
  };

  const handleResetChecklistConfirm = () => {
    if (activeTrip) {
      resetTripPackingItems(activeTrip.id);
      refreshData();
      setSnackbar({ open: true, message: 'Checklist reset. All items marked unpacked.', severity: 'info' });
      setResetDialogOpen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!activeTrip) {
    return (
      <ResponsiveContainer>
        <EmptyState
          title="No Active Trip Found"
          description="Create your first trip or select a trip to view its intelligent packing checklist."
          actionLabel="Create a Trip"
          onAction={() => navigate('/create')}
        />
      </ResponsiveContainer>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        {/* Page Header */}
        <PageHeader
          title={`Packing for ${activeTrip.destination}`}
          subtitle={`${formatShortDateRange(activeTrip.startDate, activeTrip.endDate)} • ${activeTrip.duration} Days • ${activeTrip.tripType} • ${activeTrip.packingPreference}`}
          backUrl="/my-trips"
          backLabel="Back to My Trips"
          badge={
            <Chip
              size="small"
              label={activeTrip.tripType}
              sx={{ backgroundColor: brandColors.sageGreen, color: brandColors.forestGreen, fontWeight: 700 }}
            />
          }
          actions={
            <TripSwitcher
              allTrips={allTrips}
              activeTripId={activeTrip.id}
              onTripChange={handleTripChange}
            />
          }
        />

        {/* 100% Complete Celebration Banner */}
        {stats.isComplete && items.length > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3.5,
              background: `linear-gradient(135deg, ${brandColors.forestGreen} 0%, #205E4F 100%)`,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              animation: 'celebrationPulse 2.5s infinite',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: brandColors.mutedOrange,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CelebrationIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  You're 100% Packed & Ready!
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.sageGreen }}>
                  Every essential has been checked off. Check your departure tasks before heading out.
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate(`/before?tripId=${activeTrip.id}`)}
              sx={{
                backgroundColor: brandColors.mutedOrange,
                color: '#FFFFFF',
                fontWeight: 700,
                borderRadius: 2,
                px: 2.5,
                '&:hover': { backgroundColor: brandColors.mutedOrangeDark },
              }}
            >
              Before You Leave Checklist
            </Button>
          </Paper>
        )}

        {/* Packing Progress Card */}
        <Box sx={{ mb: 4 }}>
          <ProgressCard
            total={stats.total}
            packed={stats.packed}
            percentage={stats.percentage}
            totalWeight={luggageStats.totalWeight}
            destination={activeTrip.destination}
          />
        </Box>

        {/* Quick Cross-Planner Shortcuts */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 3,
            backgroundColor: '#FFFFFF',
            border: `1px solid ${brandColors.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Button
              size="small"
              startIcon={<LuggageOutlinedIcon />}
              onClick={() => navigate(`/suitcase?tripId=${activeTrip.id}`)}
              sx={{
                color: brandColors.charcoal,
                backgroundColor: brandColors.warmIvoryLight,
                border: `1px solid ${brandColors.borderLight}`,
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': { backgroundColor: brandColors.sageGreenLight },
              }}
            >
              Suitcase Planner ({luggageStats.totalWeight} kg)
            </Button>

            <Button
              size="small"
              startIcon={<CheckroomOutlinedIcon />}
              onClick={() => navigate(`/outfit?tripId=${activeTrip.id}`)}
              sx={{
                color: brandColors.charcoal,
                backgroundColor: brandColors.warmIvoryLight,
                border: `1px solid ${brandColors.borderLight}`,
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': { backgroundColor: brandColors.sageGreenLight },
              }}
            >
              Daily Outfit Planner
            </Button>

            <Button
              size="small"
              startIcon={<FactCheckOutlinedIcon />}
              onClick={() => navigate(`/before?tripId=${activeTrip.id}`)}
              sx={{
                color: brandColors.charcoal,
                backgroundColor: brandColors.warmIvoryLight,
                border: `1px solid ${brandColors.borderLight}`,
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': { backgroundColor: brandColors.sageGreenLight },
              }}
            >
              Pre-Departure Checklist
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Print or Save as PDF">
              <Button
                variant="outlined"
                size="small"
                startIcon={<PrintOutlinedIcon />}
                onClick={handlePrint}
                sx={{
                  borderColor: brandColors.border,
                  color: brandColors.charcoalMuted,
                  borderRadius: 2,
                }}
              >
                Print
              </Button>
            </Tooltip>

            <Tooltip title="Reset all checkboxes to unpacked">
              <Button
                variant="outlined"
                size="small"
                startIcon={<RestartAltIcon />}
                onClick={() => setResetDialogOpen(true)}
                sx={{
                  borderColor: brandColors.border,
                  color: brandColors.charcoalMuted,
                  borderRadius: 2,
                  '&:hover': { borderColor: '#D32F2F', color: '#D32F2F' },
                }}
              >
                Reset Checklist
              </Button>
            </Tooltip>

            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenAddModal}
              sx={{ borderRadius: 2, px: 2, fontWeight: 700 }}
            >
              Add Item
            </Button>
          </Stack>
        </Paper>

        {/* Search & Status Filters */}
        <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search items by name, category, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: brandColors.charcoalMuted, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: '#FFFFFF', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
              {['All', 'Unpacked', 'Packed'].map((st) => (
                <Chip
                  key={st}
                  label={`${st} (${st === 'All' ? items.length : st === 'Packed' ? stats.packed : stats.total - stats.packed})`}
                  onClick={() => setStatusFilter(st)}
                  sx={{
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: statusFilter === st ? brandColors.forestGreen : '#FFFFFF',
                    color: statusFilter === st ? '#FFFFFF' : brandColors.charcoal,
                    border: `1px solid ${statusFilter === st ? brandColors.forestGreen : brandColors.borderLight}`,
                    '&:hover': {
                      backgroundColor: statusFilter === st ? brandColors.forestGreenLight : brandColors.sageGreenLight,
                    },
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Category Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: brandColors.borderLight,
            mb: 3,
            overflowX: 'auto',
          }}
        >
          <Tabs
            value={selectedCategory}
            onChange={(e, val) => setSelectedCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 48,
                fontSize: '0.9rem',
                color: brandColors.charcoalMuted,
                '&.Mui-selected': {
                  color: brandColors.forestGreen,
                  fontWeight: 800,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: brandColors.forestGreen,
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab
              value="All"
              label={`All Items (${categoryCounts['All'] || 0})`}
            />
            {CATEGORIES.map((cat) => (
              <Tab
                key={cat}
                value={cat}
                label={`${cat} (${categoryCounts[cat] || 0})`}
              />
            ))}
          </Tabs>
        </Box>

        {/* Items List */}
        <Box>
          {filteredItems.length === 0 ? (
            <EmptyState
              title="No items found"
              description={
                searchQuery
                  ? `No items matching "${searchQuery}". Try clearing search or filters.`
                  : `No items in ${selectedCategory} category yet.`
              }
              actionLabel="Add Custom Item"
              onAction={handleOpenAddModal}
            />
          ) : (
            filteredItems.map((item) => (
              <PackingItem
                key={item.id}
                item={item}
                onTogglePacked={handleTogglePacked}
                onUpdateQuantity={handleUpdateQuantity}
                onChangeBag={handleChangeBag}
                onEdit={handleOpenEditModal}
                onDelete={(id) => setDeleteItemId(id)}
              />
            ))
          )}
        </Box>
      </ResponsiveContainer>

      {/* Add / Edit Item Dialog */}
      <Dialog
        open={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <Box component="form" onSubmit={handleSaveItem}>
          <DialogTitle sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
            {editingItem ? 'Edit Packing Item' : 'Add Custom Packing Item'}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Item Name"
                placeholder="e.g. Linen shirt, Snorkel mask, Evening clutch"
                value={itemForm.name}
                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                required
                autoFocus
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="item-category-label">Category</InputLabel>
                    <Select
                      labelId="item-category-label"
                      value={itemForm.category}
                      label="Category"
                      onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                    >
                      {CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="item-bag-label">Bag Assignment</InputLabel>
                    <Select
                      labelId="item-bag-label"
                      value={itemForm.bag}
                      label="Bag Assignment"
                      onChange={(e) => setItemForm({ ...itemForm, bag: e.target.value })}
                    >
                      {LUGGAGE_TYPES.map((b) => (
                        <MenuItem key={b} value={b}>
                          {b}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    inputProps={{ min: 1, max: 99 }}
                    value={itemForm.quantity}
                    onChange={(e) => setItemForm({ ...itemForm, quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Estimated Weight (kg)"
                    type="number"
                    inputProps={{ step: '0.05', min: 0 }}
                    value={itemForm.weight}
                    onChange={(e) => setItemForm({ ...itemForm, weight: parseFloat(e.target.value) || 0.1 })}
                    helperText="Per single unit"
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Notes / Packing Tips"
                placeholder="e.g. Roll tightly, TSA limit, fragile"
                value={itemForm.notes}
                onChange={(e) => setItemForm({ ...itemForm, notes: e.target.value })}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setItemModalOpen(false)}
              variant="outlined"
              sx={{ borderColor: brandColors.border, color: brandColors.charcoalMuted }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Item Confirm Dialog */}
      <ConfirmDialog
        open={Boolean(deleteItemId)}
        title="Remove Item?"
        message="Are you sure you want to remove this item from your packing list?"
        confirmText="Remove"
        confirmColor="error"
        onConfirm={handleDeleteItemConfirm}
        onClose={() => setDeleteItemId(null)}
      />

      {/* Reset Checklist Confirm Dialog */}
      <ConfirmDialog
        open={resetDialogOpen}
        title="Reset Packing Checklist?"
        message="This will uncheck all items and reset your packing progress to 0%. Your items and weights will not be deleted."
        confirmText="Reset All"
        confirmColor="warning"
        onConfirm={handleResetChecklistConfirm}
        onClose={() => setResetDialogOpen(false)}
      />

      {/* Snackbar feedback */}
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

export default PackingList;