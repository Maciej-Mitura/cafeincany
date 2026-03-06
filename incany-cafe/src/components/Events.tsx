'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import ComingSoonModal from '@/components/ui/ComingSoonModal';
import eventsData from '@/data/events.json';

// TypeScript types
export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  tag: 'DJ Night' | 'Theme Night' | 'Discount';
  featured: boolean;
}

interface EventsData {
  upcoming: Event[];
  past: Event[];
}

type EventTab = 'upcoming' | 'past';

const typedEventsData: EventsData = eventsData as EventsData;

const getTagStyles = (tag: Event['tag']) => {
  const styles = {
    'DJ Night': {
      bg: 'var(--accent)',
      text: 'var(--background)',
    },
    'Theme Night': {
      bg: 'var(--success)',
      text: 'var(--background)',
    },
    'Discount': {
      bg: 'var(--warning)',
      text: 'var(--background)',
    },
  };
  return styles[tag];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('nl-BE', options);
};

export default function Events() {
  const [activeTab, setActiveTab] = useState<EventTab>('upcoming');
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const currentEvents = activeTab === 'upcoming' 
    ? typedEventsData.upcoming 
    : typedEventsData.past;

  const handleAddToCalendar = (event: Event) => {
    // Placeholder - will be implemented later
    alert(`Toevoegen aan kalender: ${event.title}`);
  };

  return (
    <Section id="events" background="default" spacing="lg">
      <SectionHeader
        title="Evenementen"
        subtitle="Van DJ-avonden tot themafuiven - er is altijd wat te beleven in ons café"
        align="center"
        level={2}
      />

      <ComingSoonModal
        active={false}
        title="Evenementen binnenkort beschikbaar"
        subtitle="De filters en lijst van evenementen worden momenteel uitgewerkt."
        aria-label="Events coming soon"
      >
        {/* Tabs */}
        <div className="mb-12">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-[var(--radius)] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-[var(--accent)] text-[var(--background)] shadow-[var(--shadow)]'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--text)]'
              }`}
            >
              Binnenkort
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-[var(--radius)] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-[var(--accent)] text-[var(--background)] shadow-[var(--shadow)]'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--text)]'
              }`}
            >
              Voorbij
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentEvents.map((event) => {
            const tagStyle = getTagStyles(event.tag);
            return (
              <div
                key={event.id}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                className="relative bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 transition-all duration-300 cursor-default"
                style={{
                  boxShadow: hoveredEvent === event.id ? 'var(--shadow-lg)' : 'var(--shadow)',
                  transform: hoveredEvent === event.id ? 'translateY(-4px)' : 'translateY(0)',
                  borderColor: hoveredEvent === event.id ? 'var(--accent-muted)' : 'var(--border)',
                }}
              >
                {/* Featured Badge */}
                {event.featured && (
                  <div 
                    className="absolute -top-3 -right-3 bg-[var(--accent)] text-[var(--background)] text-xs font-bold uppercase px-3 py-1 rounded-full border-2 border-[var(--background)]" 
                    style={{ boxShadow: 'var(--shadow)' }}
                  >
                    Uitgelicht
                  </div>
                )}

                {/* Event Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-heading text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 flex-1">
                      {event.title}
                    </h3>
                    <span
                      className="text-xs font-bold uppercase px-3 py-1 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: tagStyle.bg,
                        color: tagStyle.text,
                      }}
                    >
                      {event.tag}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Add to Calendar Button (only for upcoming events) */}
                {activeTab === 'upcoming' && (
                  <Button
                    onClick={() => handleAddToCalendar(event)}
                    variant="ghost"
                    size="sm"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    }
                    iconPosition="left"
                  >
                    Voeg toe aan kalender
                  </Button>
                )}

                {/* Hover Indicator Line */}
                <div
                  className="absolute bottom-0 left-0 h-1 bg-[var(--accent)] rounded-b-[var(--radius-lg)] transition-all duration-300"
                  style={{
                    width: hoveredEvent === event.id ? '100%' : '0%',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[var(--surface)] rounded-full flex items-center justify-center mx-auto mb-4" style={{ boxShadow: 'var(--shadow)' }}>
              <svg className="w-10 h-10 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[var(--muted)]">
              {activeTab === 'upcoming' ? 'Geen evenementen gepland' : 'Geen voorbije evenementen'}
            </p>
          </div>
        )}

        {/* Bottom Note */}
        <div className="mt-12 text-center bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6" style={{ boxShadow: 'var(--shadow)' }}>
          <p className="text-[var(--text-secondary)] mb-2">
            <span className="text-[var(--accent)] font-medium">Wil je een privé-event organiseren?</span>
          </p>
          <p className="text-[var(--muted)] text-sm">
            Neem contact met ons op voor beschikbaarheid en prijzen. We regelen graag je verjaardag, bedrijfsfeest of andere gelegenheid!
          </p>
        </div>
      </ComingSoonModal>
    </Section>
  );
}
