import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import { brandColors } from '../styles/theme';

const EmptyState = ({
  icon: Icon = LuggageOutlinedIcon,
  title = 'No items found',
  description = 'There are no items to display at this time.',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  sx = {},
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        py: { xs: 6, md: 8 },
        px: 3,
        textAlign: 'center',
        borderRadius: 4,
        backgroundColor: brandColors.warmIvoryLight,
        border: `1.5px dashed ${brandColors.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: brandColors.sageGreenLight,
          color: brandColors.forestGreen,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
        }}
      >
        <Icon sx={{ fontSize: 38 }} />
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: brandColors.charcoal, mb: 1 }}>
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: brandColors.charcoalMuted, maxWidth: 440, mb: actionLabel ? 3 : 0 }}
      >
        {description}
      </Typography>

      {(actionLabel || secondaryActionLabel) && (
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {actionLabel && (
            <Button
              variant="contained"
              color="primary"
              onClick={onAction}
              sx={{ px: 3, py: 1 }}
            >
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button
              variant="outlined"
              onClick={onSecondaryAction}
              sx={{
                px: 3,
                py: 1,
                borderColor: brandColors.border,
                color: brandColors.forestGreen,
                '&:hover': {
                  borderColor: brandColors.forestGreen,
                  backgroundColor: brandColors.sageGreenLight,
                },
              }}
            >
              {secondaryActionLabel}
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default EmptyState;
