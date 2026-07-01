'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import EventDetailModal from '@/components/events/EventDetailModal';
import EventTabs, { type EventTab } from '@/components/events/EventTabs';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import eventsData from '@/data/events.json';
import { getBinnenkortEvents, getVoorbijEvents } from '@/lib/events/helpers';
import { useCurrentTime } from '@/lib/events/useCurrentTime';
import type { Event, EventsData } from '@/types/event';

const typedEventsData: EventsData = eventsData as EventsData;

export default function Events() {
  const [activeTab, setActiveTab] = useState<EventTab>('upcoming');
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const now = useCurrentTime();

  const currentEvents = useMemo(() => {
    if (activeTab === 'upcoming') {
      return getBinnenkortEvents(typedEventsData.events, now);
    }

    return getVoorbijEvents(typedEventsData.events, now);
  }, [activeTab, now]);

  const handleOpenEvent = useCallback((event: Event, triggerElement: HTMLButtonElement) => {
    returnFocusRef.current = triggerElement;
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <Section id="events" background="default" spacing="lg">
      <SectionHeader
        title="Evenementen"
        subtitle="Van DJ-avonden tot themafuiven - er is altijd wat te beleven in ons café"
        align="center"
        level={2}
      />

      <EventTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid md:grid-cols-2 gap-6">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            now={now}
            isHovered={hoveredEventId === event.id}
            onMouseEnter={() => setHoveredEventId(event.id)}
            onMouseLeave={() => setHoveredEventId(null)}
            onOpen={handleOpenEvent}
          />
        ))}
      </div>

      {currentEvents.length === 0 && (
        <div className="text-center py-12">
          <div
            className="w-20 h-20 bg-[var(--surface)] rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <svg className="w-10 h-10 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-[var(--muted)]">
            {activeTab === 'upcoming' ? 'Geen evenementen gepland' : 'Geen voorbije evenementen'}
          </p>
        </div>
      )}

      <div
        className="mt-12 text-center bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
        style={{ boxShadow: 'var(--shadow)' }}
      >
        <p className="text-[var(--text-secondary)] mb-2">
          <span className="text-[var(--accent)] font-medium">Wil je een privé-event organiseren?</span>
        </p>
        <p className="text-[var(--muted)] text-sm">
          Neem contact met ons op voor beschikbaarheid en prijzen. We regelen graag je verjaardag, bedrijfsfeest of andere gelegenheid!
        </p>
      </div>

      <EventDetailModal
        event={selectedEvent}
        now={now}
        onClose={handleCloseModal}
        returnFocusRef={returnFocusRef}
      />
    </Section>
  );
}
