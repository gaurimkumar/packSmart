import { useState, useEffect, useCallback } from 'react';
import { getAllTrips, getActiveTripId, setActiveTripId as setStorageActiveId, getTripById, STORAGE_EVENT } from '../utils/storage';

export function useActiveTrip(paramTripId = null) {
  const [allTrips, setAllTrips] = useState(() => getAllTrips());
  const [activeTripId, setActiveIdState] = useState(() => paramTripId || getActiveTripId());

  const refreshData = useCallback(() => {
    const trips = getAllTrips();
    setAllTrips(trips);
    const currentId = paramTripId || getActiveTripId();
    setActiveIdState(currentId);
  }, [paramTripId]);

  useEffect(() => {
    refreshData();
    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshData]);

  const changeActiveTrip = useCallback((newId) => {
    setStorageActiveId(newId);
    setActiveIdState(newId);
    refreshData();
  }, [refreshData]);

  const activeTrip = paramTripId ? getTripById(paramTripId) : (allTrips.find(t => t.id === activeTripId) || allTrips[0] || null);

  return {
    allTrips,
    activeTrip,
    activeTripId: activeTrip?.id || null,
    changeActiveTrip,
    refreshData,
  };
}
