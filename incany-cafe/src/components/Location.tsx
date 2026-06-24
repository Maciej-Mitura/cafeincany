"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cafeInfo, getTodayHours } from "@/data/cafe";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const MAPS_CONSENT_KEY = "incany_maps_consent";

export default function Location() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [mapsConsent, setMapsConsent] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const todayHours = getTodayHours();

  // Load consent from localStorage after mount (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem(MAPS_CONSENT_KEY);
    if (consent === "true") {
      setMapsConsent(true);
    }
  }, []);

  const handleLoadMap = () => {
    setMapsConsent(true);
    localStorage.setItem(MAPS_CONSENT_KEY, "true");
  };

  const handleRevokeConsent = () => {
    setMapsConsent(false);
    localStorage.removeItem(MAPS_CONSENT_KEY);
  };

  const handleOpenMaps = () => {
    window.open(cafeInfo.location.mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleCall = () => {
    window.location.href = `tel:${cafeInfo.contact.phoneRaw}`;
  };

  return (
    <Section id="location" background="default" spacing="lg">
      <SectionHeader title="Kom Langs" subtitle="Passeer gerust voor een pintje en een warme ontvangst aan de toog" align="center" level={2} />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Opening Hours */}
        <div className="space-y-8">
          {/* Opening Hours Table */}
          <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: "var(--shadow)" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)]">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-2">Openingsuren</h3>
                {todayHours && <p className="text-sm text-[var(--accent)] font-medium">Vandaag: {todayHours.hours}</p>}
              </div>
            </div>

            <div className="space-y-2">
              {cafeInfo.hours.map((schedule) => {
                const isToday = todayHours?.day === schedule.day;
                return (
                  <div key={schedule.day} onMouseEnter={() => setHoveredDay(schedule.day)} onMouseLeave={() => setHoveredDay(null)} className={`flex justify-between items-center py-3 px-4 rounded-[var(--radius-sm)] transition-all duration-200 ${isToday ? "bg-[var(--accent)]/10 border border-[var(--accent-muted)]" : hoveredDay === schedule.day ? "bg-[var(--surface-elevated)]" : ""}`}>
                    <span className={`font-medium ${isToday ? "text-[var(--accent)]" : "text-[var(--text)]"}`}>
                      {schedule.day}
                      {isToday && <span className="ml-2 text-xs bg-[var(--accent)] text-[var(--background)] px-2 py-0.5 rounded-full">Vandaag</span>}
                    </span>
                    <span className={isToday ? "text-[var(--text)] font-medium" : "text-[var(--text-secondary)]"}>{schedule.hours}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Address & Google Maps */}
        <div className="space-y-8">
          {/* Address Block */}
          <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: "var(--shadow)" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)]">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-2">Adres</h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  {cafeInfo.address.street}
                  <br />
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

          {/* Google Maps (Consent-Gated) */}
          <div className="space-y-4">
            {/* Map Container */}
            <div className="relative h-[500px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]" style={{ boxShadow: "var(--shadow-lg)" }}>
              {/* Show placeholder before consent or during SSR */}
              {!mounted || !mapsConsent ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-muted)] via-[var(--surface-elevated)] to-[var(--surface)] flex items-center justify-center p-8">
                  <div className="max-w-md text-center space-y-6">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto bg-[var(--accent)]/20 rounded-full flex items-center justify-center border border-[var(--accent-muted)]">
                      <svg className="w-10 h-10 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-[family:var(--font-heading)] text-[var(--text)]">Google Maps Kaart</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Om de kaart te tonen, wordt een verbinding gemaakt met Google Maps. Hierbij kunnen technische gegevens (zoals je IP-adres) naar Google worden verstuurd.</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={handleLoadMap}
                        variant="primary"
                        size="md"
                        icon={
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        }
                        iconPosition="left"
                      >
                        Kaart laden
                      </Button>
                      <Link href="/privacy" className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] underline">
                        Meer info over privacy
                      </Link>
                    </div>

                    {/* Alternative: Open in new tab */}
                    <div className="pt-4 border-t border-[var(--border)]">
                      <button onClick={handleOpenMaps} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Of open rechtstreeks in Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Embedded Google Map (only after consent) */
                <iframe src="https://www.google.com/maps?q=Kerkstraat+3,+8890+Moorslede,+Belgium&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Café In Cany Location Map" className="w-full h-full" />
              )}
            </div>

            {/* Consent Controls (show after map is loaded) */}
            {mounted && mapsConsent && (
              <div className="text-center space-y-2">
                <button onClick={handleOpenMaps} className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer group">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Open in Google Maps</span>
                </button>
                <div>
                  <button onClick={handleRevokeConsent} className="text-xs text-[var(--muted)] hover:text-[var(--text-secondary)] transition-colors underline">
                    Privacy-instellingen wijzigen
                  </button>
                </div>
              </div>
            )}
          </div>

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
          </div>
        </div>
      </div>
    </Section>
  );
}
