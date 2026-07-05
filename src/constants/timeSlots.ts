/**
 * Centralised time-slot data.
 *
 * Today  — static 30-minute intervals from 06:00 AM to 08:00 PM.
 * Future — replace getAvailableTimeSlots() body with an API call
 *          without changing any component code.
 */

export const TIME_SLOTS = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
] as const;

/**
 * Returns available time slots for a given date.
 *
 * @param date        — ISO date string (YYYY-MM-DD)
 * @param disabledDates — optional set of fully-booked dates
 * @returns string[]  — available time slot labels, or empty array
 *
 * To integrate with a backend later, make this function `async`
 * and fetch from your API:
 *
 * ```ts
 * export async function getAvailableTimeSlots(date: string) {
 *   const res = await fetch(`/api/slots?date=${date}`);
 *   return res.json();
 * }
 * ```
 */
export function getAvailableTimeSlots(
  date: string,
  disabledDates?: Set<string>,
): string[] {
  if (!date) return [...TIME_SLOTS];
  if (disabledDates?.has(date)) return [];
  // Future: filter slots that are already booked for this date
  return [...TIME_SLOTS];
}
