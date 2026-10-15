import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../styles/theme';

const PageHeader = ({
  title,
  subtitle,
  backUrl,
  backLabel = 'Back',
  actions,
  badge,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      {backUrl && (
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate(backUrl)}
          sx={{
            mb: 1.5,
            color: brandColors.charcoalMuted,
            p: 0,
            minWidth: 0,
            '&:hover': {
              color: brandColors.forestGreen,
              background: 'transparent',
            },
          }}
        >
          {backLabel}
        </Button>
      )}

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          {badge && (
            <Box sx={{ mb: 1 }}>{badge}</Box>
          )}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              color: brandColors.forestGreen,
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle1"
              sx={{
                mt: 0.5,
                color: brandColors.charcoalMuted,
                maxWidth: 700,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
            {actions}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PageHeader;
