'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import EventDetailModal from '@/components/events/EventDetailModal';
import EventTabs, { type EventTab } from '@/components/events/EventTabs';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { getBinnenkortEvents, getVoorbijEvents } from '@/lib/events/helpers';
import { useCurrentTime } from '@/lib/events/useCurrentTime';
import type { Event } from '@/types/event';

const PAST_EVENTS_INITIAL_COUNT = 6;
const PAST_EVENTS_LOAD_MORE_COUNT = 6;

interface EventsProps {
  events: Event[];
}

export default function Events({ events }: EventsProps) {
  const [activeTab, setActiveTab] = useState<EventTab>('upcoming');
  const [pastVisibleCount, setPastVisibleCount] = useState(PAST_EVENTS_INITIAL_COUNT);
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const now = useCurrentTime();

  const currentEvents = useMemo(() => {
    if (activeTab === 'upcoming') {
      return getBinnenkortEvents(events, now);
    }

    return getVoorbijEvents(events, now);
  }, [activeTab, events, now]);

  const featuredEvent = useMemo(() => {
    if (activeTab !== 'upcoming') {
      return null;
    }

    return currentEvents.find((event) => event.featured) ?? null;
  }, [activeTab, currentEvents]);

  const gridEvents = useMemo(() => {
    if (!featuredEvent) {
      return currentEvents;
    }

    return currentEvents.filter((event) => event.id !== featuredEvent.id);
  }, [currentEvents, featuredEvent]);

  const visibleGridEvents = useMemo(() => {
    if (activeTab !== 'past' || gridEvents.length <= PAST_EVENTS_INITIAL_COUNT) {
      return gridEvents;
    }

    return gridEvents.slice(0, pastVisibleCount);
  }, [activeTab, gridEvents, pastVisibleCount]);

  const remainingPastCount = useMemo(() => {
    if (activeTab !== 'past') {
      return 0;
    }

    return Math.max(0, gridEvents.length - visibleGridEvents.length);
  }, [activeTab, gridEvents.length, visibleGridEvents.length]);

  const handleTabChange = useCallback((tab: EventTab) => {
    setActiveTab(tab);

    if (tab === 'past') {
      setPastVisibleCount(PAST_EVENTS_INITIAL_COUNT);
    }
  }, []);

  const handleLoadMorePast = useCallback(() => {
    setPastVisibleCount((count) =>
      Math.min(count + PAST_EVENTS_LOAD_MORE_COUNT, gridEvents.length),
    );
  }, [gridEvents.length]);

  const handleOpenEvent = useCallback((event: Event, triggerElement: HTMLButtonElement) => {
    returnFocusRef.current = triggerElement;
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <Section id="events" background="default" spacing="lg" className="events-section">
      <SectionHeader
        badge="Programma"
        title="Evenementen"
        subtitle="Van DJ-avonden tot themafuiven — ontdek wat er binnenkort in het café gebeurt."
        align="center"
        level={2}
        className="events-section__header"
      />

      <EventTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="events-section__content space-y-6 sm:space-y-8">
        {featuredEvent && (
          <EventCard
            key={featuredEvent.id}
            event={featuredEvent}
            now={now}
            variant="featured"
            isHovered={hoveredEventId === featuredEvent.id}
            onMouseEnter={() => setHoveredEventId(featuredEvent.id)}
            onMouseLeave={() => setHoveredEventId(null)}
            onOpen={handleOpenEvent}
          />
        )}

        {visibleGridEvents.length > 0 && (
          <div
            className={`events-grid grid sm:grid-cols-2 gap-5 sm:gap-6 ${
              visibleGridEvents.length > 1 ? 'events-grid--staggered' : ''
            }`}
          >
            {visibleGridEvents.map((event, index) => (
              <div
                key={event.id}
                className={`events-grid__item ${
                  visibleGridEvents.length > 1
                    ? index % 2 === 0
                      ? 'events-grid__item--raised'
                      : 'events-grid__item--lowered'
                    : ''
                }`}
              >
                <EventCard
                  event={event}
                  now={now}
                  isHovered={hoveredEventId === event.id}
                  onMouseEnter={() => setHoveredEventId(event.id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                  onOpen={handleOpenEvent}
                />
              </div>
            ))}
          </div>
        )}

        {remainingPastCount > 0 && (
          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              type="button"
              onClick={handleLoadMorePast}
              className="events-load-more"
              aria-label={`Toon ${Math.min(remainingPastCount, PAST_EVENTS_LOAD_MORE_COUNT)} extra voorbije evenementen`}
            >
              Toon meer
              <span className="events-load-more__count" aria-hidden="true">
                ({Math.min(remainingPastCount, PAST_EVENTS_LOAD_MORE_COUNT)})
              </span>
            </button>
          </div>
        )}
      </div>

      {currentEvents.length === 0 && (
        <div className="events-empty text-center py-14 sm:py-16 border border-dashed border-[var(--border)]">
          <p className="text-[var(--muted)] text-sm uppercase tracking-[0.14em] mb-2">Programma</p>
          <p className="text-lg font-heading text-[var(--text-secondary)]">
            {activeTab === 'upcoming' ? 'Geen evenementen gepland' : 'Geen voorbije evenementen'}
          </p>
        </div>
      )}

      <aside className="events-private-cta mt-10 sm:mt-12 lg:mt-14 border-l-2 border-[var(--accent-muted)] pl-4 sm:pl-6 py-1">
        <p className="text-[var(--text)] font-heading text-lg sm:text-xl mb-2">
          Privé-event organiseren?
        </p>
        <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed max-w-2xl">
          Neem contact met ons op voor beschikbaarheid en prijzen. We regelen graag je verjaardag,
          bedrijfsfeest of andere gelegenheid.
        </p>
      </aside>

      <EventDetailModal
        event={selectedEvent}
        now={now}
        onClose={handleCloseModal}
        returnFocusRef={returnFocusRef}
      />
    </Section>
  );
}
