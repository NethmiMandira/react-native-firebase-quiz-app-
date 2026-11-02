export const formatCreatedAt = (value: unknown): string | null => {
  let date: Date | null = null;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    date = new Date(value);
  } else if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof value.toDate === 'function'
  ) {
    date = value.toDate();
  }

  if (!date || Number.isNaN(date.getTime())) return null;

  return date.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
