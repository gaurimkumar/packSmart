// Date calculation and formatting utilities for PackSmart

export function calculateDurationDays(startDate, endDate) {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
  
  // Calculate difference in days (inclusive of travel day)
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diffDays);
}

export function formatDateString(dateStr, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', options);
}

export function formatShortDateRange(startDate, endDate) {
  if (!startDate) return '';
  const start = new Date(startDate);
  if (isNaN(start.getTime())) return '';
  
  if (!endDate) {
    return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  const end = new Date(endDate);
  if (isNaN(end.getTime())) return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  
  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()} – ${end.getDate()}, ${startYear}`;
    }
    return `${startMonth} ${start.getDate()} – ${endMonth} ${end.getDate()}, ${startYear}`;
  }
  return `${startMonth} ${start.getDate()}, ${startYear} – ${endMonth} ${end.getDate()}, ${endYear}`;
}

export function getTripStatus(startDate, endDate) {
  if (!startDate) return 'Upcoming';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = endDate ? new Date(endDate) : new Date(startDate);
  end.setHours(23, 59, 59, 999);

  if (today < start) {
    return 'Upcoming';
  } else if (today >= start && today <= end) {
    return 'Ongoing';
  } else {
    return 'Past';
  }
}

/**
 * Generates an array of day objects between start and end dates for the Outfit Planner
 */
export function generateTripDays(startDate, endDate) {
  const days = [];
  const duration = calculateDurationDays(startDate, endDate);
  const start = startDate ? new Date(startDate) : new Date();

  for (let i = 0; i < duration; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    days.push({
      dayIndex: i + 1,
      dateString: current.toISOString().split('T')[0],
      formatted: current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    });
  }
  return days;
}

export function getTodayDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}
