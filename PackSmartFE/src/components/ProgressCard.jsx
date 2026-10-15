import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { brandColors } from '../styles/theme';

const ProgressCard = ({
  total = 0,
  packed = 0,
  percentage = 0,
  totalWeight = 0,
  compact = false,
  showWeight = true,
  destination = '',
}) => {
  const getMotivationalMessage = (pct) => {
    if (pct === 100) return '🎉 All packed & ready for takeoff!';
    if (pct >= 80) return 'Almost there! Just a few final touches.';
    if (pct >= 50) return 'Halfway packed! Making great progress.';
    if (pct > 0) return 'Good start! Pack room for spontaneity.';
    return 'Ready to start packing? Check off your essentials.';
  };

  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${brandColors.borderLight}`,
        boxShadow: '0 4px 20px rgba(23, 63, 53, 0.06)',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top accent border */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${brandColors.forestGreen} 0%, ${brandColors.mutedOrange} ${percentage}%, ${brandColors.sageGreen} 100%)`,
        }}
      />

      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LuggageIcon sx={{ color: brandColors.forestGreen, fontSize: 22 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: brandColors.forestGreen }}>
                Packing Progress
              </Typography>
              {percentage === 100 && (
                <Chip
                  size="small"
                  label="100% Complete"
                  icon={<CheckCircleOutlinedIcon />}
                  sx={{
                    backgroundColor: brandColors.sageGreen,
                    color: brandColors.forestGreen,
                    fontWeight: 700,
                  }}
                />
              )}
            </Stack>
            <Typography variant="body2" sx={{ color: brandColors.charcoalMuted, mt: 0.5 }}>
              {getMotivationalMessage(percentage)}
            </Typography>
          </Box>

          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: percentage === 100 ? '#2E7D32' : brandColors.forestGreen,
                lineHeight: 1,
              }}
            >
              {percentage}%
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.charcoalMuted, fontWeight: 600 }}>
              {packed} of {total} items packed
            </Typography>
          </Box>
        </Stack>

        {/* Progress Bar */}
        <Box sx={{ width: '100%', mb: showWeight && totalWeight > 0 ? 2 : 0 }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: brandColors.sageGreenLight,
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: percentage === 100 ? '#2E7D32' : brandColors.forestGreen,
                backgroundImage: percentage === 100
                  ? 'none'
                  : `linear-gradient(90deg, ${brandColors.forestGreen} 0%, ${brandColors.mutedOrange} 100%)`,
              },
            }}
          />
        </Box>

        {showWeight && totalWeight > 0 && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              pt: 1.5,
              borderTop: `1px solid ${brandColors.borderLight}`,
              fontSize: '0.85rem',
              color: brandColors.charcoalMuted,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <FitnessCenterIcon sx={{ fontSize: 16, color: brandColors.mutedOrange }} />
              <span>Estimated Baggage Weight:</span>
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: brandColors.charcoal }}>
              {totalWeight.toFixed(1)} kg total
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
