import type { Event, EventStatus } from '@/types/event';

export const BRUSSELS_TIMEZONE = 'Europe/Brussels';
const LOCALE = 'nl-BE';

export function calculateEventStatus(event: Event, now: Date): EventStatus {
  const start = new Date(event.startDateTime).getTime();
  const end = new Date(event.endDateTime).getTime();
  const current = now.getTime();

  if (current < start) {
    return 'upcoming';
  }

  if (current >= end) {
    return 'past';
  }

  return 'live';
}

export function filterUpcomingAndLive(events: Event[], now: Date): Event[] {
  return events.filter((event) => {
    const status = calculateEventStatus(event, now);
    return status === 'upcoming' || status === 'live';
  });
}

export function filterPast(events: Event[], now: Date): Event[] {
  return events.filter((event) => calculateEventStatus(event, now) === 'past');
}

/** Live events first, then upcoming events sorted by nearest start time. */
export function sortUpcomingAndLive(events: Event[], now: Date): Event[] {
  return [...events].sort((a, b) => {
    const statusA = calculateEventStatus(a, now);
    const statusB = calculateEventStatus(b, now);

    if (statusA === 'live' && statusB !== 'live') {
      return -1;
    }

    if (statusA !== 'live' && statusB === 'live') {
      return 1;
    }

    return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
  });
}

/** Past events sorted from most recent to oldest. */
export function sortPast(events: Event[]): Event[] {
  return [...events].sort(
    (a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime(),
  );
}

export function getBinnenkortEvents(events: Event[], now: Date): Event[] {
  return sortUpcomingAndLive(filterUpcomingAndLive(events, now), now);
}

export function getVoorbijEvents(events: Event[], now: Date): Event[] {
  return sortPast(filterPast(events, now));
}

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: BRUSSELS_TIMEZONE,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: BRUSSELS_TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const calendarDayFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: BRUSSELS_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Dutch date label for event cards (e.g. "vr 15 mrt 2026"). */
export function formatEventDate(event: Event): string {
  return dateFormatter.format(new Date(event.startDateTime));
}

/** Dutch time or time range in Europe/Brussels (e.g. "21:00" or "21:00 – 02:00"). */
export function formatEventTimeRange(event: Event): string {
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);

  const startTime = timeFormatter.format(start);
  const endTime = timeFormatter.format(end);

  if (calendarDayFormatter.format(start) === calendarDayFormatter.format(end)) {
    if (startTime === endTime) {
      return startTime;
    }

    return `${startTime} – ${endTime}`;
  }

  return `${startTime} – ${endTime}`;
}

/** Combined Dutch date/time range for detail views. */
export function formatEventDateTimeRange(event: Event): string {
  const date = formatEventDate(event);
  const time = formatEventTimeRange(event);
  return `${date}, ${time}`;
}

export function getEventStatusLabel(status: EventStatus): string {
  switch (status) {
    case 'upcoming':
      return 'Binnenkort';
    case 'live':
      return 'Nu bezig';
    case 'past':
      return 'Voorbij';
  }
}

export function getEventDescription(event: Event): string {
  const full = event.fullDescription?.trim();
  if (full) {
    return full;
  }

  return event.shortDescription;
}

export function shouldShowRecap(event: Event, status: EventStatus): boolean {
  return status === 'past' && Boolean(event.recap?.trim()) && event.recapPublished === true;
}
