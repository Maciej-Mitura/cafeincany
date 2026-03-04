'use client';

import { useState } from 'react';
import { cafeInfo, getTodayHours } from '@/data/cafe';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function Location() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const todayHours = getTodayHours();

  const handleOpenMaps = () => {
    window.open(cafeInfo.location.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.location.href = `tel:${cafeInfo.contact.phoneRaw}`;
  };

  return (
    <Section id="location" background="default" spacing="lg">
      <SectionHeader
        title="Kom Langs"
        subtitle="Passeer gerust voor een pintje en een warme ontvangst aan de toog"
        align="center"
        level={2}
      />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            {/* Address Block */}
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: 'var(--shadow)' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)]">
                  <svg
                    className="w-6 h-6 text-[var(--accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-2">
                    Adres
                  </h3>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                    {cafeInfo.address.street}<br />
                    {cafeInfo.address.city}, {cafeInfo.address.state} {cafeInfo.address.zip}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">{cafeInfo.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{cafeInfo.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Opening Hours Table */}
            <ComingSoonModal
              active={true}
              title="Openingsuren worden bijgewerkt"
              subtitle="De tabel met openingsuren is binnenkort beschikbaar."
              aria-label="Opening hours coming soon"
            >
              <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: 'var(--shadow)' }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)]">
                    <svg
                      className="w-6 h-6 text-[var(--accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-2">
                      Opening Hours
                    </h3>
                    {todayHours && (
                      <p className="text-sm text-[var(--accent)] font-medium">
                        Today: {todayHours.hours}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {cafeInfo.hours.map((schedule) => {
                    const isToday = todayHours?.day === schedule.day;
                    return (
                      <div
                        key={schedule.day}
                        onMouseEnter={() => setHoveredDay(schedule.day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`flex justify-between items-center py-3 px-4 rounded-[var(--radius-sm)] transition-all duration-200 ${
                          isToday
                            ? 'bg-[var(--accent)]/10 border border-[var(--accent-muted)]'
                            : hoveredDay === schedule.day
                            ? 'bg-[var(--surface-elevated)]'
                            : ''
                        }`}
                      >
                        <span className={`font-medium ${isToday ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                          {schedule.day}
                          {isToday && (
                            <span className="ml-2 text-xs bg-[var(--accent)] text-[var(--background)] px-2 py-0.5 rounded-full">
                              Today
                            </span>
                          )}
                        </span>
                        <span className={isToday ? 'text-[var(--text)] font-medium' : 'text-[var(--text-secondary)]'}>
                          {schedule.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ComingSoonModal>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleOpenMaps}
                variant="primary"
                size="lg"
                className="flex-1"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                }
                iconPosition="left"
              >
                Open in Google Maps
              </Button>

              <Button
                onClick={handleCall}
                variant="secondary"
                size="lg"
                className="flex-1"
                icon={
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                iconPosition="left"
              >
                Bel Ons
              </Button>
            </div>
          </div>

          {/* Right Column - Google Maps Embed */}
          <div className="relative">
            <div className="sticky top-24 space-y-4">
              {/* Embedded Google Map */}
              <div 
                className="relative h-[600px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]"
                style={{ boxShadow: 'var(--shadow-lg)' }}
              >
                <iframe
                  src="https://www.google.com/maps?q=Kerkstraat+3,+8890+Moorslede,+Belgium&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Café In Cany Location Map"
                  className="w-full h-full"
                />
              </div>

              {/* Secondary "Open in Google Maps" Link */}
              <div className="text-center">
                <button
                  onClick={handleOpenMaps}
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer group"
                >
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Open in Google Maps</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    </Section>
  );
}
