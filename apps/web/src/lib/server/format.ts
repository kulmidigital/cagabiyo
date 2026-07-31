/** Human-readable timestamps for the notification emails, in East Africa Time. */
export function formatReceivedAt(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Nairobi',
  }).format(date)
}
