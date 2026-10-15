import { createTheme } from '@mui/material/styles';

export const brandColors = {
  forestGreen: '#173F35',
  forestGreenLight: '#23584B',
  forestGreenDark: '#0E2721',
  sageGreen: '#DDE8D8',
  sageGreenLight: '#EEF4EC',
  sageGreenDark: '#BDD2B5',
  warmIvory: '#F8F7F2',
  warmIvoryLight: '#FCFBF9',
  warmIvoryDark: '#EFECE2',
  mutedOrange: '#E99B62',
  mutedOrangeLight: '#F7D6BD',
  mutedOrangeDark: '#CC7B40',
  charcoal: '#252B29',
  charcoalLight: '#46504C',
  charcoalMuted: '#687470',
  white: '#FFFFFF',
  border: 'rgba(37, 43, 41, 0.12)',
  borderLight: 'rgba(37, 43, 41, 0.06)',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.forestGreen,
      light: brandColors.forestGreenLight,
      dark: brandColors.forestGreenDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: brandColors.mutedOrange,
      light: brandColors.mutedOrangeLight,
      dark: brandColors.mutedOrangeDark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: brandColors.warmIvory,
      paper: '#FFFFFF',
    },
    text: {
      primary: brandColors.charcoal,
      secondary: brandColors.charcoalMuted,
    },
    info: {
      main: '#2B6CB0',
      light: '#EBF8FF',
    },
    success: {
      main: '#2E7D32',
      light: brandColors.sageGreen,
    },
    warning: {
      main: brandColors.mutedOrange,
      light: brandColors.mutedOrangeLight,
    },
    divider: brandColors.border,
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
      color: brandColors.forestGreen,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: brandColors.forestGreen,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      color: brandColors.forestGreen,
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: brandColors.charcoal,
    },
    h5: {
      fontWeight: 600,
      color: brandColors.charcoal,
    },
    h6: {
      fontWeight: 600,
      color: brandColors.charcoal,
    },
    subtitle1: {
      color: brandColors.charcoalMuted,
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
    subtitle2: {
      fontWeight: 600,
      color: brandColors.charcoal,
    },
    body1: {
      color: brandColors.charcoal,
      fontSize: '0.975rem',
      lineHeight: 1.65,
    },
    body2: {
      color: brandColors.charcoalMuted,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(23, 63, 53, 0.05)',
    '0 2px 6px rgba(23, 63, 53, 0.06)',
    '0 4px 12px rgba(23, 63, 53, 0.08)',
    '0 8px 24px rgba(23, 63, 53, 0.09)',
    '0 12px 32px rgba(23, 63, 53, 0.10)',
    '0 16px 40px rgba(23, 63, 53, 0.12)',
    '0 20px 48px rgba(23, 63, 53, 0.14)',
    ...Array(17).fill('0 20px 48px rgba(23, 63, 53, 0.14)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(23, 63, 53, 0.18)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          backgroundColor: brandColors.forestGreen,
          '&:hover': {
            backgroundColor: brandColors.forestGreenLight,
          },
        },
        containedSecondary: {
          backgroundColor: brandColors.mutedOrange,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: brandColors.mutedOrangeDark,
          },
        },
        outlinedPrimary: {
          borderColor: brandColors.forestGreen,
          color: brandColors.forestGreen,
          '&:hover': {
            backgroundColor: brandColors.sageGreenLight,
            borderColor: brandColors.forestGreen,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${brandColors.borderLight}`,
          boxShadow: '0 4px 20px rgba(23, 63, 53, 0.06)',
          backgroundColor: '#FFFFFF',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(23, 63, 53, 0.10)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: brandColors.border,
            },
            '&:hover fieldset': {
              borderColor: brandColors.forestGreenLight,
            },
            '&.Mui-focused fieldset': {
              borderColor: brandColors.forestGreen,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: '8px',
          boxShadow: '0 24px 60px rgba(23, 63, 53, 0.20)',
        },
      },
    },
  },
});
