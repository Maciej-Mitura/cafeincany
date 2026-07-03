import { BRUSSELS_TIMEZONE } from '@/lib/events/helpers';
import type { Event } from '@/types/event';

interface EventDateBlockProps {
  event: Event;
  size?: 'compact' | 'standard' | 'large';
  className?: string;
}

const weekdayFormatter = new Intl.DateTimeFormat('nl-BE', {
  timeZone: BRUSSELS_TIMEZONE,
  weekday: 'short',
});

const dayFormatter = new Intl.DateTimeFormat('nl-BE', {
  timeZone: BRUSSELS_TIMEZONE,
  day: 'numeric',
});

const monthFormatter = new Intl.DateTimeFormat('nl-BE', {
  timeZone: BRUSSELS_TIMEZONE,
  month: 'short',
});

const calendarDayFormatter = new Intl.DateTimeFormat('nl-BE', {
  timeZone: BRUSSELS_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const sizeClasses = {
  compact: {
    block: 'min-w-[3.25rem] px-2.5 py-2',
    weekday: 'text-[0.6rem]',
    day: 'text-xl',
    month: 'text-[0.65rem]',
    dash: 'text-base px-0.5',
  },
  standard: {
    block: 'min-w-[4rem] px-3 py-2.5',
    weekday: 'text-[0.65rem]',
    day: 'text-2xl',
    month: 'text-xs',
    dash: 'text-lg px-1',
  },
  large: {
    block: 'min-w-[4.75rem] px-3.5 py-3',
    weekday: 'text-xs',
    day: 'text-3xl',
    month: 'text-sm',
    dash: 'text-xl px-1',
  },
} as const;

function isMultiDayEvent(event: Event): boolean {
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);

  return calendarDayFormatter.format(start) !== calendarDayFormatter.format(end);
}

function DateColumn({ date, size }: { date: Date; size: keyof typeof sizeClasses }) {
  const classes = sizeClasses[size];
  const weekday = weekdayFormatter.format(date).replace('.', '');
  const day = dayFormatter.format(date);
  const month = monthFormatter.format(date).replace('.', '');

  return (
    <div className={`event-date-block__column text-center ${classes.block}`}>
      <span className={`block uppercase tracking-[0.14em] text-[var(--muted)] font-medium ${classes.weekday}`}>
        {weekday}
      </span>
      <span className={`block font-heading leading-none text-[var(--text)] my-0.5 ${classes.day}`}>
        {day}
      </span>
      <span className={`block uppercase tracking-[0.12em] text-[var(--accent)] font-medium ${classes.month}`}>
        {month}
      </span>
    </div>
  );
}

export default function EventDateBlock({ event, size = 'standard', className = '' }: EventDateBlockProps) {
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);
  const classes = sizeClasses[size];
  const multiDay = isMultiDayEvent(event);

  if (multiDay) {
    return (
      <div
        className={`event-date-block event-date-block--range shrink-0 inline-flex items-center ${className}`}
        aria-hidden="true"
      >
        <DateColumn date={start} size={size} />
        <span className={`event-date-block__dash font-heading text-[var(--accent-muted)] ${classes.dash}`}>
          –
        </span>
        <DateColumn date={end} size={size} />
      </div>
    );
  }

  return (
    <div
      className={`event-date-block shrink-0 text-center ${classes.block} ${className}`}
      aria-hidden="true"
    >
      <span className={`block uppercase tracking-[0.14em] text-[var(--muted)] font-medium ${classes.weekday}`}>
        {weekdayFormatter.format(start).replace('.', '')}
      </span>
      <span className={`block font-heading leading-none text-[var(--text)] my-0.5 ${classes.day}`}>
        {dayFormatter.format(start)}
      </span>
      <span className={`block uppercase tracking-[0.12em] text-[var(--accent)] font-medium ${classes.month}`}>
        {monthFormatter.format(start).replace('.', '')}
      </span>
    </div>
  );
}
