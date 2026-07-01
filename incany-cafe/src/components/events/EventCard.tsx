import { getCategoryStyles } from '@/lib/events/categoryStyles';
import { calculateEventStatus, formatEventDate, formatEventTimeRange } from '@/lib/events/helpers';
import type { Event } from '@/types/event';
import { forwardRef } from 'react';

interface EventCardProps {
  event: Event;
  now: Date;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpen: (event: Event, triggerElement: HTMLButtonElement) => void;
}

const EventCard = forwardRef<HTMLButtonElement, EventCardProps>(function EventCard(
  { event, now, isHovered, onMouseEnter, onMouseLeave, onOpen },
  ref,
) {
  const status = calculateEventStatus(event, now);
  const categoryStyle = getCategoryStyles(event.category);

  return (
    <button
      ref={ref}
      type="button"
      onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`${event.title} — Bekijk details`}
      className="relative w-full text-left bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      style={{
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: isHovered ? 'var(--accent-muted)' : 'var(--border)',
      }}
    >
      {event.featured && (
        <span
          className="absolute -top-3 -right-3 bg-[var(--accent)] text-[var(--background)] text-xs font-bold uppercase px-3 py-1 rounded-full border-2 border-[var(--background)] pointer-events-none"
          style={{ boxShadow: 'var(--shadow)' }}
          aria-hidden="true"
        >
          Uitgelicht
        </span>
      )}

      {status === 'live' && (
        <span
          className="absolute -top-3 left-6 bg-[var(--success)] text-[var(--background)] text-xs font-bold uppercase px-3 py-1 rounded-full border-2 border-[var(--background)] pointer-events-none"
          style={{ boxShadow: 'var(--shadow)' }}
          aria-hidden="true"
        >
          NU BEZIG
        </span>
      )}

      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-xl font-heading text-[var(--text)] flex-1">{event.title}</span>
          <span
            className="text-xs font-bold uppercase px-3 py-1 rounded-full whitespace-nowrap pointer-events-none"
            style={{
              backgroundColor: categoryStyle.bg,
              color: categoryStyle.text,
            }}
            aria-hidden="true"
          >
            {event.category}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatEventDate(event)}</span>
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatEventTimeRange(event)}</span>
          </span>
        </div>
      </div>

      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">{event.shortDescription}</p>

      <span className="text-sm font-medium text-[var(--accent)]">Bekijk details</span>

      <span
        className="absolute bottom-0 left-0 h-1 bg-[var(--accent)] rounded-b-[var(--radius-lg)] transition-all duration-300 pointer-events-none"
        style={{
          width: isHovered ? '100%' : '0%',
        }}
        aria-hidden="true"
      />
    </button>
  );
});

export default EventCard;
