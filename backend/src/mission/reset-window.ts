import { Frequency } from '@prisma/client';

export function getMinutelyResetWindow(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}-${minutes}`;
}

export function getHourlyResetWindow(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}`;
}

export function getDailyResetWindow(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeeklyResetWindow(now: Date = new Date()): string {
  const date = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );

  const dayOfWeek = date.getUTCDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  date.setUTCDate(date.getUTCDate() - diff);

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return `${date.getUTCFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
}

export function getOnceResetWindow(): string {
  return 'once';
}

export function getResetWindow(
  frequency: Frequency,
  now: Date = new Date(),
): string {
  switch (frequency) {
    case 'MINUTE':
      return getMinutelyResetWindow(now);
    case 'HOUR':
      return getHourlyResetWindow(now);
    case 'DAILY':
      return getDailyResetWindow(now);
    case 'WEEKLY':
      return getWeeklyResetWindow(now);
    case 'ONCE':
      return getOnceResetWindow();
    default:
      throw new Error(`Unknown frequency: ${frequency}`);
  }
}
