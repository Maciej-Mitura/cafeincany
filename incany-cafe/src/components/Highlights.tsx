'use client';

import { useState, ReactElement } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

interface Highlight {
  icon: ReactElement;
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Belgische Klassiekers',
    description: 'Van Duvel tot Westmalle, streekbieren en speciale tapbieren. Altijd vers getapt met de perfecte schuimkraag.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: 'DJ-Avonden & Events',
    description: 'Elke week themavonden, live muziek en gezellige bijeenkomsten. Van quiz tot DJ-sets, er is altijd wat te beleven.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Gezellige Sfeer',
    description: 'Authentiek bruin café met warme ambiance. Kom binnen als vreemde, vertrek als vriend.',
  },
];

export default function Highlights() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <Section id="highlights" background="surface" spacing="lg">
      <SectionHeader
        title="Waarom Café In Cany?"
        subtitle="Goede pinten, gezelligheid en altijd wat te beleven in ons bruine kroegje"
        align="center"
        level={2}
      />

      {/* Highlights Grid */}
      <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 transition-all duration-300 cursor-default"
              style={{
                boxShadow: hoveredCard === index ? 'var(--shadow-lg)' : 'var(--shadow)',
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              {/* Icon Container */}
              <div
                className="w-16 h-16 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--accent)]/20 group-hover:scale-110"
                style={{
                  border: `1px solid ${hoveredCard === index ? 'var(--accent)' : 'var(--accent-muted)'}`,
                }}
              >
                <div className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                  {highlight.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-heading text-[var(--text)] mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]">
                {highlight.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
    </Section>
  );
}
