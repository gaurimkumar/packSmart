// Calculation helpers for progress, luggage weight distribution and statistics

export function calculatePackingStats(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      total: 0,
      packed: 0,
      percentage: 0,
      isComplete: false,
    };
  }

  const total = items.length;
  const packed = items.filter(item => item.packed).length;
  const percentage = Math.round((packed / total) * 100);

  return {
    total,
    packed,
    percentage,
    isComplete: total > 0 && packed === total,
  };
}

export function calculateLuggageStats(items = []) {
  const result = {
    'Cabin Bag': { items: [], count: 0, weight: 0, maxRecommended: 10 },
    'Main Suitcase': { items: [], count: 0, weight: 0, maxRecommended: 23 },
    'Backpack': { items: [], count: 0, weight: 0, maxRecommended: 7 },
    'Unassigned': { items: [], count: 0, weight: 0, maxRecommended: 0 },
    totalWeight: 0,
    totalItems: 0,
  };

  if (!Array.isArray(items)) return result;

  items.forEach(item => {
    const bagKey = item.bag && result[item.bag] ? item.bag : 'Unassigned';
    result[bagKey].items.push(item);
    result[bagKey].count += 1;
    const itemWeight = (parseFloat(item.weight) || 0);
    result[bagKey].weight += itemWeight;
    result.totalWeight += itemWeight;
    result.totalItems += 1;
  });

  // Round all weights to 2 decimal places
  Object.keys(result).forEach(key => {
    if (result[key] && typeof result[key].weight === 'number') {
      result[key].weight = parseFloat(result[key].weight.toFixed(2));
    }
  });
  result.totalWeight = parseFloat(result.totalWeight.toFixed(2));

  return result;
}

export function calculateOutfitStats(outfits = []) {
  if (!Array.isArray(outfits) || outfits.length === 0) {
    return { total: 0, ready: 0, percentage: 0 };
  }
  const total = outfits.length;
  const ready = outfits.filter(o => o.ready).length;
  const percentage = Math.round((ready / total) * 100);
  return { total, ready, percentage };
}

export function calculateTaskStats(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return { total: 0, completed: 0, percentage: 0 };
  }
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completed / total) * 100);
  return { total, completed, percentage };
}
