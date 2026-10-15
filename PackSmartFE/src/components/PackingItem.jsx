import React, { useState } from 'react';
import {
  Box,
  Card,
  Checkbox,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { brandColors } from '../styles/theme';
import { LUGGAGE_TYPES } from '../data/packingRules';

const getBagIcon = (bag) => {
  switch (bag) {
    case 'Cabin Bag':
      return <WorkOutlinedIcon sx={{ fontSize: 14 }} />;
    case 'Main Suitcase':
      return <LuggageIcon sx={{ fontSize: 14 }} />;
    case 'Backpack':
      return <BackpackOutlinedIcon sx={{ fontSize: 14 }} />;
    default:
      return <HelpOutlinedIcon sx={{ fontSize: 14 }} />;
  }
};

const getBagColor = (bag) => {
  switch (bag) {
    case 'Cabin Bag':
      return { bg: brandColors.sageGreenLight, text: brandColors.forestGreen };
    case 'Main Suitcase':
      return { bg: '#EBF3FB', text: '#1967D2' };
    case 'Backpack':
      return { bg: brandColors.mutedOrangeLight, text: brandColors.mutedOrangeDark };
    default:
      return { bg: '#F1F3F4', text: '#5F6368' };
  }
};

const PackingItem = ({
  item,
  onTogglePacked,
  onUpdateQuantity,
  onChangeBag,
  onEdit,
  onDelete,
}) => {
  const [bagAnchorEl, setBagAnchorEl] = useState(null);

  const handleBagClick = (event) => {
    event.stopPropagation();
    setBagAnchorEl(event.currentTarget);
  };

  const handleBagSelect = (bag) => {
    onChangeBag(item.id, bag);
    setBagAnchorEl(null);
  };

  const bagColors = getBagColor(item.bag);

  return (
    <Card
      elevation={0}
      sx={{
        py: 1.25,
        px: 2,
        mb: 1.25,
        borderRadius: 2.5,
        border: `1px solid ${item.packed ? brandColors.sageGreenDark : brandColors.borderLight}`,
        backgroundColor: item.packed ? brandColors.sageGreenLight : '#FFFFFF',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        gap: 1.5,
        '&:hover': {
          borderColor: item.packed ? brandColors.sageGreenDark : brandColors.border,
          boxShadow: '0 2px 10px rgba(23, 63, 53, 0.05)',
        },
      }}
    >
      {/* Left: Checkbox & Item info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flex: 1, minWidth: 200 }}>
        <Checkbox
          checked={Boolean(item.packed)}
          onChange={() => onTogglePacked(item.id)}
          icon={<RadioButtonUncheckedRoundedIcon sx={{ color: brandColors.charcoalMuted }} />}
          checkedIcon={<CheckCircleRoundedIcon sx={{ color: brandColors.forestGreen }} />}
          sx={{ p: 0.5 }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: item.packed ? brandColors.charcoalMuted : brandColors.charcoal,
              textDecoration: item.packed ? 'line-through' : 'none',
              transition: 'color 0.2s ease',
            }}
          >
            {item.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.25, flexWrap: 'wrap', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
              {item.category}
            </Typography>

            {item.weight > 0 && (
              <>
                <Typography variant="caption" sx={{ color: brandColors.border }}>•</Typography>
                <Typography variant="caption" sx={{ color: brandColors.charcoalMuted }}>
                  {(item.weight * (item.quantity || 1)).toFixed(2)} kg
                </Typography>
              </>
            )}

            {item.notes && (
              <>
                <Typography variant="caption" sx={{ color: brandColors.border }}>•</Typography>
                <Typography variant="caption" sx={{ color: brandColors.mutedOrangeDark, fontStyle: 'italic' }}>
                  {item.notes}
                </Typography>
              </>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Right: Quantity controls, Bag assignment badge & Action icons */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5 },
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'space-between', sm: 'flex-end' },
          pl: { xs: 5, sm: 0 },
        }}
      >
        {/* Quantity Stepper */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: brandColors.warmIvoryLight,
            border: `1px solid ${brandColors.borderLight}`,
            borderRadius: 2,
            px: 0.5,
          }}
        >
          <IconButton
            size="small"
            disabled={item.quantity <= 1}
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            sx={{ p: 0.5, color: brandColors.charcoal }}
          >
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{ px: 1, fontWeight: 700, minWidth: 24, textAlign: 'center', fontSize: '0.85rem' }}
          >
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            sx={{ p: 0.5, color: brandColors.charcoal }}
          >
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        {/* Bag Assignment Chip */}
        <Tooltip title="Click to assign or change bag" arrow>
          <Chip
            size="small"
            icon={getBagIcon(item.bag)}
            label={item.bag || 'Unassigned'}
            onClick={handleBagClick}
            sx={{
              backgroundColor: bagColors.bg,
              color: bagColors.text,
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
              border: `1px solid ${brandColors.borderLight}`,
              '&:hover': {
                filter: 'brightness(0.96)',
              },
            }}
          />
        </Tooltip>

        <Menu
          anchorEl={bagAnchorEl}
          open={Boolean(bagAnchorEl)}
          onClose={() => setBagAnchorEl(null)}
          PaperProps={{
            sx: { borderRadius: 2, minWidth: 160 },
          }}
        >
          {LUGGAGE_TYPES.map((bagType) => (
            <MenuItem
              key={bagType}
              selected={item.bag === bagType}
              onClick={() => handleBagSelect(bagType)}
              sx={{ fontSize: '0.85rem', gap: 1 }}
            >
              {getBagIcon(bagType)}
              {bagType}
            </MenuItem>
          ))}
        </Menu>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Edit Item">
            <IconButton
              size="small"
              onClick={() => onEdit(item)}
              sx={{ color: brandColors.charcoalMuted, '&:hover': { color: brandColors.forestGreen } }}
            >
              <EditOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Item">
            <IconButton
              size="small"
              onClick={() => onDelete(item.id)}
              sx={{ color: brandColors.charcoalMuted, '&:hover': { color: '#D32F2F' } }}
            >
              <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default PackingItem;
