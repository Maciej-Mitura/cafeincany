'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Hero() {

  const handleViewMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent('Kerkstraat 3, Moorslede 8890');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const handleScrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[var(--background)] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-10 animate-fade-in-up">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family:var(--font-heading)] text-[var(--text)] leading-tight">
                Uw Bruine Kroeg in het Hart van{' '}
                <span className="text-[var(--accent)] relative inline-block">
                  Moorslede
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C40 2.5 80 1 120 2.5C160 4 180 6 199 5.5"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                Gezelligheid, goede pinten en speciale avonden in een authentieke sfeer. Welkom bij Café In Cany.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleViewMenu}
                variant="primary"
                size="lg"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                }
              >
                Bekijk Kaart
              </Button>

              <Button
                onClick={handleGetDirections}
                variant="secondary"
                size="lg"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                }
              >
                Routebeschrijving
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:h-[600px] h-[400px] group">
            <div
              className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] transition-all duration-500 group-hover:scale-[1.02]"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <Image
                src="/incany_street_view.jpg"
                alt="Straataanzicht van Café In Cany in de avond"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />

              {/* Subtle gradient overlay for readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--accent)] opacity-20 rounded-full blur-2xl animate-pulse-slow" />
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--accent-hover)] opacity-20 rounded-full blur-2xl animate-pulse-slow"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:text-[var(--accent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full p-2"
        aria-label="Scroll to next section"
      >
        <svg
          className="w-6 h-6 text-[var(--muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
}
