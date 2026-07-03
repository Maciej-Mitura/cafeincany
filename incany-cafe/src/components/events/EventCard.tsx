import EventCategoryBadge from '@/components/events/EventCategoryBadge';
import EventDateBlock from '@/components/events/EventDateBlock';
import EventLiveIndicator from '@/components/events/EventLiveIndicator';
import { calculateEventStatus, formatEventTimeRange } from '@/lib/events/helpers';
import { isValidImageSource } from '@/lib/events/media';
import type { Event } from '@/types/event';
import { forwardRef } from 'react';

interface EventCardProps {
  event: Event;
  now: Date;
  isHovered: boolean;
  variant?: 'standard' | 'featured';
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpen: (event: Event, triggerElement: HTMLButtonElement) => void;
}

const EventCard = forwardRef<HTMLButtonElement, EventCardProps>(function EventCard(
  { event, now, isHovered, variant = 'standard', onMouseEnter, onMouseLeave, onOpen },
  ref,
) {
  const status = calculateEventStatus(event, now);
  const hasCoverImage = isValidImageSource(event.coverImage);
  const isFeatured = variant === 'featured';
  const isPast = status === 'past';

  const sharedButtonClasses =
    'event-card group relative w-full text-left cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]';

  if (isFeatured) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={`${event.title} — Bekijk details`}
        className={`${sharedButtonClasses} event-card--featured overflow-hidden border border-[var(--border)] ${
          isHovered ? 'event-card--hovered' : ''
        }`}
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] min-h-[18rem]">
          {hasCoverImage ? (
            <div className="relative min-h-[14rem] lg:min-h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.coverImage!.trim()}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="event-card__image-scrim absolute inset-0" aria-hidden="true" />
            </div>
          ) : (
            <div className="event-card__fallback relative min-h-[14rem] lg:min-h-full" aria-hidden="true">
              <div className="event-card__fallback-line" />
            </div>
          )}

          <div className="relative flex flex-col justify-between p-6 sm:p-8 bg-[var(--surface-elevated)]">
            <div className="flex items-start justify-between gap-4 mb-6">
              <span className="event-card__featured-label">Uitgelicht</span>
              {status === 'live' ? <EventLiveIndicator /> : <EventCategoryBadge category={event.category} />}
            </div>

            <div className="flex gap-5 sm:gap-6 items-start">
              <EventDateBlock event={event} size="large" />
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl sm:text-3xl font-heading text-[var(--text)] leading-tight mb-3">
                  {event.title}
                </h3>
                <p className="text-sm text-[var(--accent)] font-medium tracking-wide mb-4">
                  {formatEventTimeRange(event)}
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {event.shortDescription}
                </p>
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
              Bekijk details
              <span className="event-card__arrow" aria-hidden="true">
                →
              </span>
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`${event.title} — Bekijk details`}
      className={`${sharedButtonClasses} event-card--standard flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] ${
        isHovered ? 'event-card--hovered' : ''
      } ${status === 'live' ? 'event-card--live' : ''} ${isPast ? 'event-card--past' : ''}`}
    >
      {hasCoverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.coverImage!.trim()}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="event-card__image-scrim event-card__image-scrim--subtle absolute inset-0" aria-hidden="true" />
          <div className="absolute top-3 left-3">
            <EventDateBlock event={event} size="compact" className="event-date-block--overlay" />
          </div>
        </div>
      ) : (
        <div className="event-card__fallback event-card__fallback--compact relative px-5 pt-5 pb-3" aria-hidden="true">
          <div className="flex items-start gap-4">
            <EventDateBlock event={event} size="standard" />
            <div className="event-card__fallback-line event-card__fallback-line--compact" />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            {status === 'live' && <EventLiveIndicator />}
            {event.featured && (
              <span className="event-card__featured-label event-card__featured-label--small">Uitgelicht</span>
            )}
            {status !== 'live' && <EventCategoryBadge category={event.category} />}
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-heading text-[var(--text)] leading-snug mb-2">{event.title}</h3>

        {hasCoverImage && (
          <p className="text-sm text-[var(--accent)] font-medium tracking-wide mb-3">
            {formatEventTimeRange(event)}
          </p>
        )}

        {!hasCoverImage && (
          <p className="text-sm text-[var(--accent)] font-medium tracking-wide mb-3 -mt-1">
            {formatEventTimeRange(event)}
          </p>
        )}

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 flex-1">
          {event.shortDescription}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
          Bekijk details
          <span className="event-card__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </button>
  );
});

export default EventCard;
