// LocalStorage persistence utility for PackSmart
import { createInitialSampleTrips } from '../data/sampleTrips';
import { generatePackingList } from '../data/packingRules';
import { DEFAULT_PREP_TASKS } from '../data/defaultTasks';

const TRIPS_KEY = 'packsmart_trips';
const ACTIVE_TRIP_ID_KEY = 'packsmart_active_trip_id';
const STORAGE_EVENT = 'packsmart_storage_change';

function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
  }
}

/**
 * Safely reads and parses trips from localStorage.
 * Initializes with sample trips if first launch.
 */
export function getAllTrips() {
  try {
    const raw = localStorage.getItem(TRIPS_KEY);
    if (!raw) {
      const initial = createInitialSampleTrips();
      localStorage.setItem(TRIPS_KEY, JSON.stringify(initial));
      if (initial.length > 0 && !localStorage.getItem(ACTIVE_TRIP_ID_KEY)) {
        localStorage.setItem(ACTIVE_TRIP_ID_KEY, initial[0].id);
      }
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = createInitialSampleTrips();
      localStorage.setItem(TRIPS_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading trips from localStorage:', err);
    return [];
  }
}

export function saveAllTrips(trips) {
  try {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    notifyStorageChange();
  } catch (err) {
    console.error('Error saving trips to localStorage:', err);
  }
}

export function getActiveTripId() {
  try {
    const id = localStorage.getItem(ACTIVE_TRIP_ID_KEY);
    if (id) return id;
    const trips = getAllTrips();
    if (trips.length > 0) {
      setActiveTripId(trips[0].id);
      return trips[0].id;
    }
    return null;
  } catch {
    return null;
  }
}

export function setActiveTripId(id) {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_TRIP_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_TRIP_ID_KEY);
    }
    notifyStorageChange();
  } catch (err) {
    console.error('Error setting active trip ID:', err);
  }
}

export function getActiveTrip() {
  const activeId = getActiveTripId();
  const trips = getAllTrips();
  if (activeId) {
    const found = trips.find(t => t.id === activeId);
    if (found) return found;
  }
  return trips.length > 0 ? trips[0] : null;
}

export function getTripById(tripId) {
  if (!tripId) return null;
  const trips = getAllTrips();
  return trips.find(t => t.id === tripId) || null;
}

export function saveNewTrip(tripData) {
  const trips = getAllTrips();
  const id = `trip-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  // Generate items if not already provided
  const items = tripData.packingList || generatePackingList({
    destination: tripData.destination,
    duration: tripData.duration,
    tripType: tripData.tripType,
    activities: tripData.activities,
    packingPreference: tripData.packingPreference,
    travellers: tripData.travellers,
  });

  const tasks = tripData.tasks || DEFAULT_PREP_TASKS.map(t => ({ ...t, completed: false }));
  const outfits = tripData.outfits || [];

  const newTrip = {
    ...tripData,
    id,
    createdAt: new Date().toISOString(),
    packingList: items,
    tasks,
    outfits,
  };

  const updatedTrips = [newTrip, ...trips];
  saveAllTrips(updatedTrips);
  setActiveTripId(id);
  return newTrip;
}

export function updateTrip(tripId, updates) {
  const trips = getAllTrips();
  const index = trips.findIndex(t => t.id === tripId);
  if (index === -1) return null;

  trips[index] = {
    ...trips[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveAllTrips(trips);
  return trips[index];
}

export function deleteTrip(tripId) {
  const trips = getAllTrips();
  const filtered = trips.filter(t => t.id !== tripId);
  saveAllTrips(filtered);

  const activeId = getActiveTripId();
  if (activeId === tripId) {
    if (filtered.length > 0) {
      setActiveTripId(filtered[0].id);
    } else {
      setActiveTripId(null);
    }
  }
  return filtered;
}

export function duplicateTrip(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return null;

  const duplicatedId = `trip-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  // Clone packing items with new unique IDs and reset packed state
  const clonedItems = (trip.packingList || []).map(item => ({
    ...item,
    id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    packed: false,
  }));

  // Clone tasks with reset completed state
  const clonedTasks = (trip.tasks || []).map(task => ({
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    completed: false,
  }));

  // Clone outfits with reset ready state
  const clonedOutfits = (trip.outfits || []).map(outfit => ({
    ...outfit,
    id: `outfit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    ready: false,
  }));

  const duplicatedTrip = {
    ...trip,
    id: duplicatedId,
    destination: `${trip.destination} (Copy)`,
    createdAt: new Date().toISOString(),
    packingList: clonedItems,
    tasks: clonedTasks,
    outfits: clonedOutfits,
  };

  const trips = getAllTrips();
  const updatedTrips = [duplicatedTrip, ...trips];
  saveAllTrips(updatedTrips);
  setActiveTripId(duplicatedId);
  return duplicatedTrip;
}

// PACKING ITEMS OPERATIONS
export function getTripPackingItems(tripId) {
  const trip = getTripById(tripId);
  return trip ? (trip.packingList || []) : [];
}

export function saveTripPackingItems(tripId, items) {
  return updateTrip(tripId, { packingList: items });
}

export function addTripPackingItem(tripId, item) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const newItem = {
    id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    name: item.name || 'Untitled item',
    category: item.category || 'Miscellaneous',
    quantity: parseInt(item.quantity, 10) || 1,
    weight: parseFloat(item.weight) || 0.1,
    bag: item.bag || 'Cabin Bag',
    packed: Boolean(item.packed),
    notes: item.notes || '',
  };
  const updatedItems = [newItem, ...(trip.packingList || [])];
  return saveTripPackingItems(tripId, updatedItems);
}

export function updateTripPackingItem(tripId, itemId, updates) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const items = (trip.packingList || []).map(item => {
    if (item.id === itemId) {
      return { ...item, ...updates };
    }
    return item;
  });
  return saveTripPackingItems(tripId, items);
}

export function deleteTripPackingItem(tripId, itemId) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const items = (trip.packingList || []).filter(item => item.id !== itemId);
  return saveTripPackingItems(tripId, items);
}

export function resetTripPackingItems(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const items = (trip.packingList || []).map(item => ({ ...item, packed: false }));
  return saveTripPackingItems(tripId, items);
}

// OUTFITS OPERATIONS
export function getTripOutfits(tripId) {
  const trip = getTripById(tripId);
  return trip ? (trip.outfits || []) : [];
}

export function saveTripOutfits(tripId, outfits) {
  return updateTrip(tripId, { outfits });
}

export function addTripOutfit(tripId, outfit) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const newOutfit = {
    id: outfit.id || `outfit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    dayNumber: outfit.dayNumber || (trip.outfits ? trip.outfits.length + 1 : 1),
    date: outfit.date || '',
    occasion: outfit.occasion || 'Day Exploration',
    description: outfit.description || '',
    clothingItems: Array.isArray(outfit.clothingItems) ? outfit.clothingItems : [],
    image: outfit.image || '',
    ready: Boolean(outfit.ready),
  };
  const updatedOutfits = [...(trip.outfits || []), newOutfit];
  return saveTripOutfits(tripId, updatedOutfits);
}

export function updateTripOutfit(tripId, outfitId, updates) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const outfits = (trip.outfits || []).map(o => {
    if (o.id === outfitId) {
      return { ...o, ...updates };
    }
    return o;
  });
  return saveTripOutfits(tripId, outfits);
}

export function deleteTripOutfit(tripId, outfitId) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const outfits = (trip.outfits || []).filter(o => o.id !== outfitId);
  return saveTripOutfits(tripId, outfits);
}

// PREPARATION TASKS OPERATIONS
export function getTripTasks(tripId) {
  const trip = getTripById(tripId);
  return trip ? (trip.tasks || []) : [];
}

export function saveTripTasks(tripId, tasks) {
  return updateTrip(tripId, { tasks });
}

export function addTripTask(tripId, task) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const newTask = {
    id: task.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title: task.title || 'Untitled task',
    category: task.category || 'General',
    deadline: task.deadline || '',
    notes: task.notes || '',
    completed: Boolean(task.completed),
  };
  const updatedTasks = [...(trip.tasks || []), newTask];
  return saveTripTasks(tripId, updatedTasks);
}

export function updateTripTask(tripId, taskId, updates) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const tasks = (trip.tasks || []).map(t => {
    if (t.id === taskId) {
      return { ...t, ...updates };
    }
    return t;
  });
  return saveTripTasks(tripId, tasks);
}

export function deleteTripTask(tripId, taskId) {
  const trip = getTripById(tripId);
  if (!trip) return null;
  const tasks = (trip.tasks || []).filter(t => t.id !== taskId);
  return saveTripTasks(tripId, tasks);
}

export { STORAGE_EVENT };
