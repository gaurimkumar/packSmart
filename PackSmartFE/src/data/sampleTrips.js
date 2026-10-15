import { generatePackingList } from './packingRules';
import { DEFAULT_PREP_TASKS } from './defaultTasks';
import { getTodayDateString } from '../utils/dateUtils';

export function createInitialSampleTrips() {
  const trip1Start = getTodayDateString(7);
  const trip1End = getTodayDateString(13);
  const trip1Items = generatePackingList({
    destination: 'Amalfi Coast, Italy',
    duration: 7,
    tripType: 'Beach',
    activities: ['Sightseeing', 'Swimming', 'Fine Dining', 'Photography'],
    packingPreference: 'Regular Packing',
    travellers: 2,
  });

  // Mark some items as packed to show realistic progress
  trip1Items.forEach((item, index) => {
    if (index % 3 === 0 || index % 5 === 0) {
      item.packed = true;
    }
  });

  const trip1 = {
    id: 'trip-amalfi-coast-001',
    destination: 'Amalfi Coast, Italy',
    startDate: trip1Start,
    endDate: trip1End,
    duration: 7,
    travellers: 2,
    tripType: 'Beach',
    activities: ['Sightseeing', 'Swimming', 'Fine Dining', 'Photography'],
    packingPreference: 'Regular Packing',
    notes: 'Staying in Positano cliffside villa. Evening dinner reservations at Da Adolfo.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    packingList: trip1Items,
    tasks: DEFAULT_PREP_TASKS.map(t => ({ ...t })),
    outfits: [
      {
        id: 'outfit-1',
        dayNumber: 1,
        date: trip1Start,
        occasion: 'Airport Transit & Arrival',
        description: 'Breezy linen button-down, stretch travel chinos, slip-on espadrilles.',
        clothingItems: ['Linen shirt', 'Chino pants', 'Espadrilles', 'Sun hat'],
        image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80',
        ready: true,
      },
      {
        id: 'outfit-2',
        dayNumber: 2,
        date: getTodayDateString(8),
        occasion: 'Capri Island Boat Excursion',
        description: 'Tailored swim trunks, breathable white cotton polo, UV polarized sunglasses.',
        clothingItems: ['Swim trunks', 'White polo', 'Boat shoes', 'Sunglasses'],
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        ready: true,
      },
      {
        id: 'outfit-3',
        dayNumber: 3,
        date: getTodayDateString(9),
        occasion: 'Ravello Cliffside Fine Dining',
        description: 'Navy unstructured summer blazer, crisp collared shirt, tailored trousers.',
        clothingItems: ['Navy blazer', 'Collared shirt', 'Tailored trousers', 'Leather loafers'],
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
        ready: false,
      },
    ],
  };

  const trip2Start = getTodayDateString(25);
  const trip2End = getTodayDateString(32);
  const trip2Items = generatePackingList({
    destination: 'Tokyo & Kyoto, Japan',
    duration: 8,
    tripType: 'City',
    activities: ['Sightseeing', 'Shopping', 'Photography'],
    packingPreference: 'Light Packing',
    travellers: 1,
  });

  trip2Items.forEach((item, index) => {
    if (index < 6) {
      item.packed = true;
    }
  });

  const trip2 = {
    id: 'trip-tokyo-japan-002',
    destination: 'Tokyo & Kyoto, Japan',
    startDate: trip2Start,
    endDate: trip2End,
    duration: 8,
    travellers: 1,
    tripType: 'City',
    activities: ['Sightseeing', 'Shopping', 'Photography'],
    packingPreference: 'Light Packing',
    notes: 'JR Pass booked. Capsule packing strategy to leave room for ceramics & matcha purchases.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    packingList: trip2Items,
    tasks: DEFAULT_PREP_TASKS.map(t => ({ ...t, completed: false })),
    outfits: [
      {
        id: 'outfit-201',
        dayNumber: 1,
        date: trip2Start,
        occasion: 'Shibuya & Harajuku Walking',
        description: 'Black oversized minimalist tee, cargo trousers, ultra-cushioned sneakers.',
        clothingItems: ['Oversized tee', 'Cargo pants', 'Walking trainers'],
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        ready: true,
      },
    ],
  };

  return [trip1, trip2];
}
