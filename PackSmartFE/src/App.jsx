import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import CreateTrip from './pages/CreateTrip';
import PackingList from './pages/PackingList';
import SuitcasePlanner from './pages/SuitcasePlanner';
import OutfitPlanner from './pages/OutfitPlanner';
import BeforeYouLeave from './pages/BeforeYouLeave';
import MyTrips from './pages/MyTrips';
import AboutUs from './pages/AboutUs';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTrip />} />
          <Route path="/packing" element={<PackingList />} />
          <Route path="/suitcase" element={<SuitcasePlanner />} />
          <Route path="/outfit" element={<OutfitPlanner />} />
          <Route path="/before" element={<BeforeYouLeave />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/mytrip" element={<MyTrips />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<AboutUs />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
