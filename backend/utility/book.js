// Initialize an empty array to store events as tuples [start, end]
 

/**
 * @param {Array} events - The start time of the event as a Date object
 * @param {Date} startTime - The start time of the event as a Date object
 * @param {Date} endTime - The end time of the event as a Date object
 * @return {boolean} - Returns true if the event can be booked without double booking; otherwise, false
 */
export const book = (events, startTime, endTime) => {
  // Convert Date objects to timestamps for easier integer comparison
  const start = startTime.getTime();
  const end = endTime.getTime();

  // Check for overlap with each existing event
  for (let [s, e] of events) {
    if (!(end <= s || start >= e)) {
      // Overlap exists, so we return false
      return false;
    }
  }

  // If no overlap, add the new event
  events.push([start, end]);
  return true;
}

// Usage example:
// console.log(book(new Date('2024-11-03T09:00:00'), new Date('2024-11-03T10:00:00'))); // true
// console.log(book(new Date('2024-11-03T09:30:00'), new Date('2024-11-03T11:00:00'))); // false (overlaps)
// console.log(book(new Date('2024-11-03T10:30:00'), new Date('2024-11-03T11:30:00'))); // true
