import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { brandColors } from '../styles/theme';

const getCategoryIcon = (title) => {
  if (title.includes('Beach')) return <BeachAccessOutlinedIcon />;
  if (title.includes('Mountain')) return <TerrainOutlinedIcon />;
  if (title.includes('City')) return <LocationCityOutlinedIcon />;
  if (title.includes('Business')) return <BusinessCenterOutlinedIcon />;
  if (title.includes('Weekend')) return <WeekendOutlinedIcon />;
  return <ExploreOutlinedIcon />;
};

const CategoryCard = ({ title, subtitle, image, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        position: 'relative',
        height: 280,
        borderRadius: 4,
        overflow: 'hidden',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 8px 24px rgba(23, 63, 53, 0.08)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 36px rgba(23, 63, 53, 0.18)',
          '& .category-img': {
            transform: 'scale(1.08)',
          },
          '& .category-arrow': {
            transform: 'translateX(4px)',
            backgroundColor: brandColors.mutedOrange,
            color: '#FFFFFF',
          },
        },
      }}
    >
      <Box
        className="category-img"
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(14, 39, 33, 0.88) 0%, rgba(14, 39, 33, 0.35) 60%, rgba(14, 39, 33, 0.1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            {getCategoryIcon(title)}
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              mb: 0.5,
              fontSize: '1.35rem',
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              sx={{
                color: brandColors.sageGreen,
                fontWeight: 500,
                fontSize: '0.85rem',
              }}
            >
              {subtitle}
            </Typography>

            <Box
              className="category-arrow"
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: brandColors.forestGreen,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CategoryCard;
