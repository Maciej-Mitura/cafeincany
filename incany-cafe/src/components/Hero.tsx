'use client';

import { useState } from 'react';
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

          {/* Right Column - Image Placeholder */}
          <div className="relative lg:h-[600px] h-[400px] group">
            {/* Main image placeholder */}
            <div className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] transition-all duration-500 group-hover:scale-[1.02]" style={{ boxShadow: 'var(--shadow-lg)' }}>
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-muted)] via-[var(--surface-elevated)] to-[var(--surface)]" />
              
              {/* Animated circles */}
              <div className="absolute top-20 left-20 w-32 h-32 bg-[var(--accent)] opacity-20 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-[var(--accent-hover)] opacity-20 rounded-full blur-3xl animate-float-delayed" />
              
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                                   linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-24 h-24 mx-auto bg-[var(--accent)] rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <svg
                      className="w-12 h-12 text-[var(--background)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                    </svg>
                  </div>
                  <p className="text-[var(--text)] font-[family:var(--font-heading)] text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Image Placeholder
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Replace with your café image
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--accent)] opacity-20 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--accent-hover)] opacity-20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
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
