import React from 'react';
import { Container, Box } from '@mui/material';

const ResponsiveContainer = ({ children, maxWidth = 'lg', sx = {}, ...props }) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, md: 5 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  );
};

export default ResponsiveContainer;
