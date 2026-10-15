// Predefined JavaScript rules for generating smart packing suggestions

export const CATEGORIES = [
  'Clothing',
  'Toiletries',
  'Electronics',
  'Travel Documents',
  'Footwear',
  'Activity Essentials',
  'Miscellaneous',
];

export const LUGGAGE_TYPES = [
  'Cabin Bag',
  'Main Suitcase',
  'Backpack',
  'Unassigned',
];

/**
 * Generates an intelligent, tailored packing checklist based on trip parameters.
 * Frontend-only algorithmic generation without any external backend or API keys.
 */
export function generatePackingList({
  destination = '',
  duration = 3,
  tripType = 'City',
  activities = [],
  packingPreference = 'Regular Packing',
  travellers = 1,
}) {
  const isLight = packingPreference === 'Light Packing';
  const days = Math.max(1, parseInt(duration, 10) || 3);
  let idCounter = 1;
  const nextId = () => `item-${Date.now()}-${idCounter++}-${Math.random().toString(36).substr(2, 5)}`;

  const items = [];

  const addItem = (name, category, qty, weight, defaultBag, notes = '') => {
    // If light packing, prefer Cabin Bag or Backpack if not heavy
    let bag = defaultBag;
    if (isLight && bag === 'Main Suitcase' && weight < 1.0) {
      bag = 'Cabin Bag';
    }
    items.push({
      id: nextId(),
      name,
      category,
      quantity: Math.max(1, qty),
      packed: false,
      weight: parseFloat(Number(weight).toFixed(2)),
      bag: bag || 'Cabin Bag',
      notes,
    });
  };

  // 1. CLOTHING (Scaled by duration & packing preference)
  const underwearQty = isLight ? Math.min(days, Math.ceil(days * 0.7) + 1) : days + 1;
  const socksQty = isLight ? Math.min(days, Math.ceil(days * 0.7) + 1) : days + 1;
  const topsQty = isLight ? Math.max(2, Math.ceil(days * 0.5)) : Math.max(3, Math.ceil(days * 0.8));
  const bottomsQty = isLight ? Math.max(1, Math.ceil(days / 4)) : Math.max(2, Math.ceil(days / 3));
  const sleepwearQty = isLight ? 1 : Math.max(1, Math.ceil(days / 4));

  addItem('Underwear & base undergarments', 'Clothing', underwearQty, 0.06 * underwearQty, 'Cabin Bag');
  addItem('Socks & everyday hosiery', 'Clothing', socksQty, 0.05 * socksQty, 'Cabin Bag');
  addItem('T-shirts, shirts & casual tops', 'Clothing', topsQty, 0.18 * topsQty, isLight ? 'Cabin Bag' : 'Main Suitcase');
  addItem('Pants, jeans & casual bottoms', 'Clothing', bottomsQty, 0.45 * bottomsQty, isLight ? 'Cabin Bag' : 'Main Suitcase');
  addItem('Sleepwear & lounge clothing', 'Clothing', sleepwearQty, 0.25 * sleepwearQty, 'Cabin Bag');
  addItem('Light jacket / cardigan / layer', 'Clothing', 1, 0.55, 'Cabin Bag', 'Great for chilly flights');

  if (!isLight) {
    addItem('Spare backup outfit', 'Clothing', 1, 0.60, 'Main Suitcase');
  }

  // 2. TOILETRIES (Travel-sized liquids compliant with airport security)
  addItem('Toothbrush & travel toothpaste', 'Toiletries', 1, 0.12, 'Cabin Bag', 'TSA friendly size');
  addItem('Deodorant (solid / roll-on)', 'Toiletries', 1, 0.10, 'Cabin Bag');
  addItem('Shampoo & body wash bars or minis', 'Toiletries', 1, 0.20, isLight ? 'Cabin Bag' : 'Main Suitcase');
  addItem('Daily facial cleanser & moisturizer', 'Toiletries', 1, 0.15, 'Cabin Bag');
  addItem('Personal medications & pain relievers', 'Toiletries', 1, 0.10, 'Backpack', 'Keep in personal bag at all times');
  addItem('Hair comb / compact detangling brush', 'Toiletries', 1, 0.08, 'Cabin Bag');
  addItem('Lip balm with SPF', 'Toiletries', 1, 0.03, 'Backpack');
  if (!isLight) {
    addItem('Travel hair dryer / styler', 'Toiletries', 1, 0.65, 'Main Suitcase');
    addItem('Toiletry hanging Dopp kit bag', 'Toiletries', 1, 0.25, 'Main Suitcase');
  }

  // 3. ELECTRONICS
  addItem('Smartphone charger & USB cables', 'Electronics', 2, 0.15, 'Backpack');
  addItem('Portable power bank (10,000mAh+)', 'Electronics', 1, 0.28, 'Backpack', 'Must be in cabin / personal carry-on');
  addItem('Universal international travel plug adapter', 'Electronics', 1, 0.18, 'Backpack');
  addItem('Noise-cancelling headphones / earbuds', 'Electronics', 1, 0.22, 'Backpack');

  // 4. TRAVEL DOCUMENTS
  addItem('Passport / Official government ID', 'Travel Documents', 1, 0.05, 'Backpack', 'Always carry on person');
  addItem('Flight / transit tickets & boarding passes', 'Travel Documents', 1, 0.02, 'Backpack');
  addItem('Payment cards & emergency local currency', 'Travel Documents', 1, 0.08, 'Backpack');
  addItem('Travel health insurance documents', 'Travel Documents', 1, 0.03, 'Backpack');
  addItem('Emergency contacts & hotel confirmations', 'Travel Documents', 1, 0.02, 'Backpack');

  // 5. FOOTWEAR
  addItem('Comfortable walking / running shoes', 'Footwear', 1, 0.75, 'Cabin Bag', 'Wear your bulkiest pair during transit');
  if (!isLight) {
    addItem('Secondary versatile casual shoes / loafers', 'Footwear', 1, 0.65, 'Main Suitcase');
  }

  // 6. MISCELLANEOUS
  addItem('Reusable insulated water bottle', 'Miscellaneous', 1, 0.30, 'Backpack', 'Fill up after passing airport security');
  addItem('UV protective sunglasses & case', 'Miscellaneous', 1, 0.10, 'Backpack');
  addItem('Compact travel umbrella / pocket poncho', 'Miscellaneous', 1, 0.25, isLight ? 'Backpack' : 'Cabin Bag');
  addItem('Laundry bag for worn clothing', 'Miscellaneous', 1, 0.05, 'Cabin Bag');

  // 7. TRIP TYPE SPECIFIC ITEMS
  switch (tripType) {
    case 'Beach':
      addItem('Swimwear & swim trunks / bikinis', 'Clothing', isLight ? 1 : 2, 0.35, isLight ? 'Cabin Bag' : 'Main Suitcase');
      addItem('Broad spectrum SPF 50+ sunscreen', 'Toiletries', 1, 0.25, isLight ? 'Cabin Bag' : 'Main Suitcase');
      addItem('Quick-dry microfiber beach towel', 'Activity Essentials', 1, 0.35, 'Main Suitcase');
      addItem('Beach sandals / waterproof slides', 'Footwear', 1, 0.35, 'Main Suitcase');
      addItem('Wide-brim sun hat / straw fedora', 'Clothing', 1, 0.15, 'Cabin Bag');
      addItem('After-sun cooling aloe vera gel', 'Toiletries', 1, 0.18, 'Main Suitcase');
      break;

    case 'Mountains':
      addItem('Thermal base layer (merino wool top/bottom)', 'Clothing', 1, 0.40, 'Cabin Bag');
      addItem('Warm fleece midlayer pullover', 'Clothing', 1, 0.45, 'Cabin Bag');
      addItem('Waterproof windbreaker / shell jacket', 'Clothing', 1, 0.55, 'Cabin Bag');
      addItem('Sturdy supportive hiking boots', 'Footwear', 1, 1.10, 'Main Suitcase', 'Wear during transit if heavy');
      addItem('Thick wool hiking socks', 'Clothing', 2, 0.20, 'Cabin Bag');
      addItem('Warm beanie & lightweight gloves', 'Clothing', 1, 0.15, 'Cabin Bag');
      break;

    case 'City':
      addItem('Sleek city walking trainers / boots', 'Footwear', 1, 0.70, 'Cabin Bag');
      addItem('Crossbody anti-theft day bag', 'Activity Essentials', 1, 0.35, 'Backpack');
      addItem('Smart-casual evening dinner outfit', 'Clothing', 1, 0.60, isLight ? 'Cabin Bag' : 'Main Suitcase');
      addItem('Hand sanitizer & pocket wet wipes', 'Toiletries', 1, 0.12, 'Backpack');
      break;

    case 'Business':
      addItem('Wrinkle-resistant tailored suit / blazer', 'Clothing', 1, 0.90, 'Main Suitcase');
      addItem('Crisp dress shirts / silk blouses', 'Clothing', Math.min(days, 3), 0.55, isLight ? 'Cabin Bag' : 'Main Suitcase');
      addItem('Polished leather dress shoes / heels', 'Footwear', 1, 0.85, 'Main Suitcase');
      addItem('Work laptop & high-wattage charger', 'Electronics', 1, 1.80, 'Backpack');
      addItem('Business cards & leather portfolio', 'Travel Documents', 1, 0.25, 'Backpack');
      addItem('Portable fabric wrinkle release spray', 'Toiletries', 1, 0.15, 'Cabin Bag');
      break;

    case 'Adventure':
      addItem('Moisture-wicking athletic performance tees', 'Clothing', 2, 0.30, 'Cabin Bag');
      addItem('Convertible ripstop hiking cargo pants', 'Clothing', 1, 0.45, 'Cabin Bag');
      addItem('Compact outdoor first aid & blister kit', 'Activity Essentials', 1, 0.30, 'Backpack');
      addItem('LED rechargeable headlamp & extra batteries', 'Electronics', 1, 0.18, 'Backpack');
      addItem('Waterproof roll-top dry bag (10L)', 'Activity Essentials', 1, 0.22, 'Backpack');
      break;

    case 'Weekend Getaway':
      addItem('Versatile capsule top & bottom mix', 'Clothing', 2, 0.50, 'Cabin Bag');
      addItem('Stylish weekend slip-on loafers / espadrilles', 'Footwear', 1, 0.55, 'Cabin Bag');
      addItem('Compact toiletry pouch with 3-in-1 essentials', 'Toiletries', 1, 0.25, 'Cabin Bag');
      break;

    default:
      break;
  }

  // 8. PLANNED ACTIVITIES SPECIFIC ITEMS
  if (activities.includes('Hiking')) {
    addItem('Collapsible lightweight trekking poles', 'Activity Essentials', 1, 0.55, 'Main Suitcase', 'Must be in checked bag');
    addItem('High-energy trail snacks & electrolytes', 'Activity Essentials', 1, 0.40, 'Backpack');
    addItem('Insect repellent spray (DEET / Picaridin)', 'Activity Essentials', 1, 0.18, 'Cabin Bag');
  }

  if (activities.includes('Swimming')) {
    addItem('Anti-fog swim goggles', 'Activity Essentials', 1, 0.08, 'Cabin Bag');
    addItem('Waterproof phone floating pouch lanyard', 'Activity Essentials', 1, 0.06, 'Backpack');
  }

  if (activities.includes('Sightseeing')) {
    addItem('Packable ultra-light nylon daypack', 'Activity Essentials', 1, 0.15, 'Backpack');
    addItem('Audio tour guide 3.5mm headphone adapter', 'Electronics', 1, 0.02, 'Backpack');
  }

  if (activities.includes('Shopping')) {
    addItem('Foldable extra duffel bag for souvenirs', 'Miscellaneous', 1, 0.25, 'Main Suitcase');
    addItem('Digital portable luggage hanging scale', 'Miscellaneous', 1, 0.12, 'Backpack', 'Avoid surprise airline baggage fees');
  }

  if (activities.includes('Camping')) {
    addItem('Compact sleeping bag compression sack', 'Activity Essentials', 1, 1.20, 'Main Suitcase');
    addItem('Camp cutlery & multi-use pocket knife', 'Activity Essentials', 1, 0.20, 'Main Suitcase', 'Must be in checked bag');
  }

  if (activities.includes('Business Meetings')) {
    addItem('Wireless presentation remote clicker', 'Electronics', 1, 0.08, 'Backpack');
    addItem('Pocket breath freshener & lint roller', 'Toiletries', 1, 0.10, 'Backpack');
  }

  if (activities.includes('Fine Dining')) {
    addItem('Formal evening cocktail attire / dress shirt', 'Clothing', 1, 0.60, 'Main Suitcase');
    addItem('Dress belt / clutch evening bag', 'Clothing', 1, 0.25, 'Cabin Bag');
  }

  if (activities.includes('Photography')) {
    addItem('Mirrorless / DSLR camera body & prime lens', 'Electronics', 1, 1.30, 'Backpack', 'Always carry expensive gear in backpack');
    addItem('Spare camera batteries & fast SD memory cards', 'Electronics', 2, 0.20, 'Backpack');
    addItem('Microfiber optical lens cleaning cloth & blower', 'Electronics', 1, 0.05, 'Backpack');
  }

  return items;
}
