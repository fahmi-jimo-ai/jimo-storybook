const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Returns true if two Date objects represent the same calendar day */
export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Returns true if date is before other (calendar day comparison) */
export function isBefore(date, other) {
  return toMidnight(date) < toMidnight(other);
}

/** Returns true if date is after other (calendar day comparison) */
export function isAfter(date, other) {
  return toMidnight(date) > toMidnight(other);
}

/** Returns a new Date set to midnight local time */
export function toMidnight(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Returns today at midnight */
export function today() {
  return toMidnight(new Date());
}

/** Adds `n` days to a date, returns new Date */
export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** `D Mon YYYY` — trigger display format, e.g. "1 Mar 2026" */
export function formatShort(date) {
  if (!date) return '';
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** `Month/DD/YYYY` — panel text input format, e.g. "March/15/2026" */
export function formatSlash(date) {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  return `${LONG_MONTHS[date.getMonth()]}/${day}/${date.getFullYear()}`;
}

/**
 * Parses "Month/DD/YYYY" string → Date or null.
 * e.g. "March/15/2026" or "march/5/2026"
 */
export function parseSlash(str) {
  if (!str || !str.trim()) return null;
  const parts = str.trim().split('/');
  if (parts.length !== 3) return null;
  const [monthStr, dayStr, yearStr] = parts;
  const month = LONG_MONTHS.findIndex((m) => m.toLowerCase() === monthStr.toLowerCase().trim());
  if (month === -1) return null;
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  if (isNaN(day) || isNaN(year)) return null;
  const d = new Date(year, month, day);
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return null;
  return d;
}

/** @deprecated use formatSlash / parseSlash for panel inputs */
export function formatLong(date) {
  if (!date) return '';
  return `${LONG_MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** @deprecated use parseSlash for panel inputs */
export function parseLong(str) {
  if (!str || !str.trim()) return null;
  const clean = str.replace(/,/g, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length !== 3) return null;
  const [monthStr, dayStr, yearStr] = parts;
  const month = LONG_MONTHS.findIndex((m) => m.toLowerCase() === monthStr.toLowerCase());
  if (month === -1) return null;
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  if (isNaN(day) || isNaN(year)) return null;
  const d = new Date(year, month, day);
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return null;
  return d;
}

/**
 * Generates an array of 42 Date objects for the calendar grid.
 * Always starts on Monday. Week starts = Monday (ISO).
 * @param {number} year - full year
 * @param {number} month - 0-indexed
 */
export function getCalendarDays(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  // getDay(): 0=Sun, 1=Mon, ... 6=Sat
  // Convert to Monday-based: Mon=0, Tue=1, ... Sun=6
  const dayOfWeek = (firstOfMonth.getDay() + 6) % 7;
  const start = addDays(firstOfMonth, -dayOfWeek);
  const days = [];
  for (let i = 0; i < 42; i++) {
    days.push(addDays(start, i));
  }
  return days;
}

/** Month name for header, e.g. "March 2026" */
export function formatMonthYear(year, month) {
  return `${LONG_MONTHS[month]} ${year}`;
}

/** Navigate month: returns { year, month } for next/prev */
export function stepMonth(year, month, direction) {
  let m = month + direction;
  let y = year;
  if (m > 11) { m = 0; y += 1; }
  if (m < 0) { m = 11; y -= 1; }
  return { year: y, month: m };
}

/** Resolve single-date presets */
export function getSinglePresets() {
  const t = today();
  return [
    { label: 'Today', resolve: () => t },
    { label: 'Yesterday', resolve: () => addDays(t, -1) },
    { label: 'Tomorrow', resolve: () => addDays(t, 1) },
  ];
}

/** Resolve range presets */
export function getRangePresets() {
  const t = today();
  const firstOfMonth = new Date(t.getFullYear(), t.getMonth(), 1);
  const lastOfMonth = new Date(t.getFullYear(), t.getMonth() + 1, 0);
  return [
    { label: 'Last 7 days', resolve: () => [addDays(t, -6), t] },
    { label: 'Last 30 days', resolve: () => [addDays(t, -29), t] },
    { label: 'This month', resolve: () => [toMidnight(firstOfMonth), toMidnight(lastOfMonth)] },
  ];
}
