import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../styles/theme';
import { formatShortDateRange, getTripStatus } from '../utils/dateUtils';
import { calculatePackingStats } from '../utils/calculations';
import { getDestinationImage } from '../data/categoryImages';

const TripCard = ({
  trip,
  onEdit,
  onDuplicate,
  onDelete,
  onSelect,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const stats = calculatePackingStats(trip.packingList || []);
  const status = getTripStatus(trip.startDate, trip.endDate);
  const tripImage = trip.image || getDestinationImage(trip.destination, trip.tripType);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusChipProps = (st) => {
    switch (st) {
      case 'Ongoing':
        return {
          label: 'Ongoing',
          sx: {
            backgroundColor: brandColors.mutedOrangeLight,
            color: brandColors.mutedOrangeDark,
            fontWeight: 700,
          },
        };
      case 'Past':
        return {
          label: 'Past',
          sx: {
            backgroundColor: '#F1F3F4',
            color: brandColors.charcoalMuted,
            fontWeight: 600,
          },
        };
      default:
        return {
          label: 'Upcoming',
          sx: {
            backgroundColor: brandColors.sageGreen,
            color: brandColors.forestGreen,
            fontWeight: 700,
          },
        };
    }
  };

  const handleOpenTrip = () => {
    if (onSelect) onSelect(trip.id);
    navigate(`/packing?tripId=${trip.id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${brandColors.borderLight}`,
        boxShadow: '0 4px 20px rgba(23, 63, 53, 0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(23, 63, 53, 0.12)',
        },
      }}
    >
      {/* Image with status badge */}
      <Box sx={{ position: 'relative', height: 190, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={tripImage}
          alt={trip.destination}
          sx={{
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />

        {/* Gradient scrim */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(14, 39, 33, 0.5) 0%, transparent 50%)',
          }}
        />

        {/* Status Chip Top-Left */}
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip size="small" {...getStatusChipProps(status)} />
        </Box>

        {/* Trip Type Chip Top-Right */}
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Chip
            size="small"
            label={trip.tripType}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(6px)',
              color: brandColors.charcoal,
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Travellers count Bottom-Left */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontWeight: 600,
            textShadow: '0 1px 3px rgba(0,0,0,0.6)',
          }}
        >
          <PeopleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          <span>{trip.travellers || 1} {trip.travellers === 1 ? 'Traveller' : 'Travellers'}</span>
        </Box>

        {/* Duration Bottom-Right */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: 'rgba(23, 63, 53, 0.75)',
            px: 1,
            py: 0.25,
            borderRadius: 1,
          }}
        >
          {trip.duration || 1} Days
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: brandColors.forestGreen,
              lineHeight: 1.3,
              fontSize: '1.2rem',
            }}
          >
            {trip.destination}
          </Typography>

          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ color: brandColors.charcoalMuted, ml: 1 }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: brandColors.charcoalMuted, mb: 2 }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: brandColors.mutedOrange }} />
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            {formatShortDateRange(trip.startDate, trip.endDate)}
          </Typography>
        </Stack>

        {/* Packing Progress */}
        <Box sx={{ mt: 'auto', pt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: brandColors.charcoal }}>
              Packing Progress
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: stats.percentage === 100 ? '#2E7D32' : brandColors.forestGreen }}>
              {stats.packed} / {stats.total} packed ({stats.percentage}%)
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={stats.percentage}
            sx={{
              height: 7,
              borderRadius: 3.5,
              backgroundColor: brandColors.sageGreenLight,
              '& .MuiLinearProgress-bar': {
                backgroundColor: stats.percentage === 100 ? '#2E7D32' : brandColors.forestGreen,
                borderRadius: 3.5,
              },
            }}
          />
        </Box>

        {/* Quick section shortcuts */}
        <Stack direction="row" spacing={1} sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${brandColors.borderLight}` }}>
          <Tooltip title="Suitcase Planner">
            <IconButton
              size="small"
              onClick={() => {
                if (onSelect) onSelect(trip.id);
                navigate(`/suitcase?tripId=${trip.id}`);
              }}
              sx={{ color: brandColors.charcoalMuted, '&:hover': { color: brandColors.forestGreen, backgroundColor: brandColors.sageGreenLight } }}
            >
              <LuggageOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Outfit Planner">
            <IconButton
              size="small"
              onClick={() => {
                if (onSelect) onSelect(trip.id);
                navigate(`/outfit?tripId=${trip.id}`);
              }}
              sx={{ color: brandColors.charcoalMuted, '&:hover': { color: brandColors.forestGreen, backgroundColor: brandColors.sageGreenLight } }}
            >
              <CheckroomOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Before You Leave Checklist">
            <IconButton
              size="small"
              onClick={() => {
                if (onSelect) onSelect(trip.id);
                navigate(`/before?tripId=${trip.id}`);
              }}
              sx={{ color: brandColors.charcoalMuted, '&:hover': { color: brandColors.forestGreen, backgroundColor: brandColors.sageGreenLight } }}
            >
              <PlaylistAddCheckOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box sx={{ flex: 1 }} />

          <Button
            size="small"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
            onClick={handleOpenTrip}
            sx={{
              fontSize: '0.8rem',
              py: 0.5,
              px: 1.5,
              borderRadius: 2,
            }}
          >
            Checklist
          </Button>
        </Stack>
      </CardContent>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 160 },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            if (onEdit) onEdit(trip);
          }}
          sx={{ fontSize: '0.85rem' }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Trip</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            if (onDuplicate) onDuplicate(trip.id);
          }}
          sx={{ fontSize: '0.85rem' }}
        >
          <ListItemIcon>
            <FileCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate Trip</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            if (onDelete) onDelete(trip.id);
          }}
          sx={{ fontSize: '0.85rem', color: '#D32F2F' }}
        >
          <ListItemIcon sx={{ color: '#D32F2F' }}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Trip</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default TripCard;
