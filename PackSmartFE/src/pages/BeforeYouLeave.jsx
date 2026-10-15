import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  Stack,
  LinearProgress,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import PageHeader from '../components/PageHeader';
import TripSwitcher from '../components/TripSwitcher';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { brandColors } from '../styles/theme';
import { useActiveTrip } from '../hooks/useActiveTrip';
import { calculateTaskStats } from '../utils/calculations';
import { formatShortDateRange } from '../utils/dateUtils';
import {
  addTripTask,
  updateTripTask,
  deleteTripTask,
} from '../utils/storage';

const TASK_CATEGORIES = ['Logistics', 'Documents', 'Electronics', 'Personal', 'Home'];

const DEADLINE_OPTIONS = [
  '1 week before',
  '3 days before',
  '2 days before',
  '1 day before',
  'Night before',
  'Day of travel',
];

const BeforeYouLeave = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const paramTripId = searchParams.get('tripId');

  const { allTrips, activeTrip, activeTripId, changeActiveTrip, refreshData } = useActiveTrip(paramTripId);

  // Filter state: 'All' | 'Pending' | 'Completed'
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Task Modal state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    category: 'Logistics',
    deadline: '2 days before',
    notes: '',
    completed: false,
  });

  // Delete modal state
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  // Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const tasks = activeTrip?.tasks || [];
  const stats = calculateTaskStats(tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter === 'Pending' && t.completed) return false;
      if (statusFilter === 'Completed' && !t.completed) return false;
      if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
      return true;
    });
  }, [tasks, statusFilter, categoryFilter]);

  const handleTripChange = (newTripId) => {
    changeActiveTrip(newTripId);
    setSearchParams({ tripId: newTripId });
  };

  const handleToggleComplete = (taskId, currentCompleted) => {
    updateTripTask(activeTrip.id, taskId, { completed: !currentCompleted });
    refreshData();
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setTaskForm({
      title: '',
      category: 'Logistics',
      deadline: '2 days before',
      notes: '',
      completed: false,
    });
    setTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      category: task.category || 'Logistics',
      deadline: task.deadline || '',
      notes: task.notes || '',
      completed: Boolean(task.completed),
    });
    setTaskModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    if (editingTask) {
      updateTripTask(activeTrip.id, editingTask.id, {
        title: taskForm.title.trim(),
        category: taskForm.category,
        deadline: taskForm.deadline,
        notes: taskForm.notes.trim(),
        completed: taskForm.completed,
      });
      setSnackbar({ open: true, message: 'Preparation task updated!' });
    } else {
      addTripTask(activeTrip.id, {
        title: taskForm.title.trim(),
        category: taskForm.category,
        deadline: taskForm.deadline,
        notes: taskForm.notes.trim(),
        completed: taskForm.completed,
      });
      setSnackbar({ open: true, message: 'New task added to departure checklist!' });
    }

    setTaskModalOpen(false);
    refreshData();
  };

  const handleDeleteTaskConfirm = () => {
    if (deleteTaskId && activeTrip) {
      deleteTripTask(activeTrip.id, deleteTaskId);
      refreshData();
      setSnackbar({ open: true, message: 'Task deleted.' });
      setDeleteTaskId(null);
    }
  };

  if (!activeTrip) {
    return (
      <ResponsiveContainer>
        <EmptyState
          title="No Active Trip Selected"
          description="Create or select a trip to manage your pre-departure checklist."
          actionLabel="Create Trip"
          onAction={() => navigate('/create')}
        />
      </ResponsiveContainer>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <ResponsiveContainer>
        <PageHeader
          title={`Before You Leave — ${activeTrip.destination}`}
          subtitle={`${formatShortDateRange(activeTrip.startDate, activeTrip.endDate)} • Essential documents, reservations, device charging, and home logistics before departure.`}
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
                onClick={handleOpenAddModal}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Add Task
              </Button>
            </Stack>
          }
        />

        {/* Departure Readiness Summary Card */}
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
                  <FactCheckOutlinedIcon sx={{ fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: brandColors.forestGreen, lineHeight: 1.1 }}>
                    {stats.completed} of {stats.total}
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, fontWeight: 600 }}>
                    Pre-Departure Tasks Completed ({stats.percentage}%)
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

        {/* 100% Tasks Complete Banner */}
        {stats.percentage === 100 && tasks.length > 0 && (
          <Paper
            elevation={1}
            sx={{
              p: 2.5,
              mb: 4,
              borderRadius: 3,
              backgroundColor: brandColors.sageGreen,
              color: brandColors.forestGreen,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CelebrationIcon sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                All Pre-Departure Tasks Complete!
              </Typography>
              <Typography variant="caption" sx={{ color: brandColors.forestGreenDark }}>
                Tickets confirmed, documents valid, devices charged. Have a wonderful and stress-free journey!
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Filter Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: '#FFFFFF',
            border: `1px solid ${brandColors.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Status Tabs/Chips */}
          <Stack direction="row" spacing={1}>
            {['All', 'Pending', 'Completed'].map((st) => (
              <Chip
                key={st}
                label={`${st} (${st === 'All' ? stats.total : st === 'Pending' ? stats.total - stats.completed : stats.completed})`}
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

          {/* Category Dropdown */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="task-filter-cat">Category</InputLabel>
            <Select
              labelId="task-filter-cat"
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {TASK_CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Tasks List */}
        <Box>
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No tasks match this filter"
              description="Add a pre-departure reminder or select 'All' to review all checklist items."
              actionLabel="Add Task"
              onAction={handleOpenAddModal}
            />
          ) : (
            filteredTasks.map((task) => (
              <Card
                key={task.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 2.5,
                  border: `1px solid ${task.completed ? brandColors.sageGreenDark : brandColors.borderLight}`,
                  backgroundColor: task.completed ? brandColors.sageGreenLight : '#FFFFFF',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  gap: 1.5,
                  '&:hover': {
                    borderColor: brandColors.border,
                    boxShadow: '0 2px 10px rgba(23, 63, 53, 0.05)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
                  <Checkbox
                    checked={Boolean(task.completed)}
                    onChange={() => handleToggleComplete(task.id, task.completed)}
                    checkedIcon={<CheckCircleRoundedIcon sx={{ color: brandColors.forestGreen }} />}
                    icon={<RadioButtonUncheckedRoundedIcon sx={{ color: brandColors.charcoalMuted }} />}
                    sx={{ p: 0.25, mt: 0.25 }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.97rem',
                        color: task.completed ? brandColors.charcoalMuted : brandColors.charcoal,
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.title}
                    </Typography>

                    {task.notes && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: brandColors.charcoalMuted,
                          fontSize: '0.85rem',
                          mt: 0.5,
                        }}
                      >
                        {task.notes}
                      </Typography>
                    )}

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, flexWrap: 'wrap', gap: 0.75 }}>
                      <Chip
                        size="small"
                        label={task.category || 'General'}
                        sx={{
                          backgroundColor: brandColors.warmIvoryLight,
                          border: `1px solid ${brandColors.borderLight}`,
                          fontSize: '0.72rem',
                          height: 22,
                        }}
                      />

                      {task.deadline && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: brandColors.mutedOrangeDark }}>
                          <AccessTimeOutlinedIcon sx={{ fontSize: 13 }} />
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                            {task.deadline}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Tooltip title="Edit Task">
                    <IconButton size="small" onClick={() => handleOpenEditModal(task)} sx={{ color: brandColors.charcoalMuted }}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton size="small" onClick={() => setDeleteTaskId(task.id)} sx={{ color: brandColors.charcoalMuted, '&:hover': { color: '#D32F2F' } }}>
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            ))
          )}
        </Box>
      </ResponsiveContainer>

      {/* Add / Edit Task Dialog */}
      <Dialog
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <Box component="form" onSubmit={handleSaveTask}>
          <DialogTitle sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
            {editingTask ? 'Edit Departure Task' : 'Add Pre-Departure Task'}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Task Description"
                placeholder="e.g. Set out-of-office autoreply, arrange pet sitter"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                required
                autoFocus
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="task-modal-category">Category</InputLabel>
                    <Select
                      labelId="task-modal-category"
                      value={taskForm.category}
                      label="Category"
                      onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                    >
                      {TASK_CATEGORIES.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="task-modal-deadline">Suggested Deadline</InputLabel>
                    <Select
                      labelId="task-modal-deadline"
                      value={taskForm.deadline}
                      label="Suggested Deadline"
                      onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                    >
                      {DEADLINE_OPTIONS.map((dl) => (
                        <MenuItem key={dl} value={dl}>
                          {dl}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={2}
                label="Notes / Instructions (Optional)"
                placeholder="e.g. Reservation code #89421, vet emergency contact"
                value={taskForm.notes}
                onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setTaskModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingTask ? 'Save Task' : 'Add Task'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Task Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTaskId)}
        title="Delete Task?"
        message="Are you sure you want to remove this pre-departure task?"
        confirmText="Delete"
        confirmColor="error"
        onConfirm={handleDeleteTaskConfirm}
        onClose={() => setDeleteTaskId(null)}
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

export default BeforeYouLeave;