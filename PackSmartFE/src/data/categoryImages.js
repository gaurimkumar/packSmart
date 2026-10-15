// High-quality travel imagery for PackSmart
export const CATEGORY_IMAGES = {
  'Beach Getaways': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'Mountain Adventures': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'City Breaks': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  'Business Trips': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'Weekend Escapes': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'Adventure Travel': 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80',
  'Beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'Mountains': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'City': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  'Business': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'Adventure': 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80',
  'Weekend Getaway': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
};

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85';

export const DESTINATION_PRESETS = [
  {
    name: 'Amalfi Coast, Italy',
    type: 'Beach',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Swiss Alps, Switzerland',
    type: 'Mountains',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tokyo, Japan',
    type: 'City',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Paris, France',
    type: 'City',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bali, Indonesia',
    type: 'Beach',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Patagonia, Chile',
    type: 'Adventure',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'New York City, USA',
    type: 'Business',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cotswolds, UK',
    type: 'Weekend Getaway',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
];

export const OUTFIT_PRESETS = [
  {
    name: 'Relaxed Resort Chic',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    description: 'Linen shirt, tailored shorts, leather sandals and sun hat',
  },
  {
    name: 'Alpine Trail Layering',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80',
    description: 'Merino wool base layer, fleece jacket, waterproof shell, cargo pants',
  },
  {
    name: 'Smart Urban Sightseeing',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp white tee, relaxed blazer, dark denim and supportive walking sneakers',
  },
  {
    name: 'Executive Business Sharp',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    description: 'Tailored suit jacket, dress shirt, pressed trousers and oxford shoes',
  },
  {
    name: 'Sunset Dinner Elegance',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    description: 'Silk midi dress / relaxed evening linen suit with loafers',
  },
  {
    name: 'Cozy Travel Transit',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80',
    description: 'Knit sweater, comfortable stretch joggers, compression socks and slip-ons',
  },
];

export function getDestinationImage(destination, type) {
  if (!destination) return CATEGORY_IMAGES[type] || CATEGORY_IMAGES['City Breaks'];
  const match = DESTINATION_PRESETS.find(p => destination.toLowerCase().includes(p.name.split(',')[0].toLowerCase()));
  if (match) return match.image;
  return CATEGORY_IMAGES[type] || CATEGORY_IMAGES['City Breaks'];
}
