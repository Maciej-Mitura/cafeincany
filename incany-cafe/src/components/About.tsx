'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

const careAboutItems = [
  {
    title: 'Échte Gezelligheid',
    description:
      'Bij ons is het geen afhaalpunt—het is een bruine kroeg waar je echt kan vertoeven. Een pint, een babbel met de buur, en die warme sfeer van thuis.',
  },
  {
    title: "Kwaliteit op 't Glas",
    description:
      'Elk biertje vers getapt, elk pintje met zorg geschonken. Van Belgische klassiekers tot speciale tapbieren. Geen compromissen, gewoon goed gedronken.',
  },
  {
    title: 'Ons Dorp',
    description:
      'Moorslede is niet zomaar waar we werken—het is thuis. We organiseren themavonden, draaien goede muziek, en iedereen is welkom aan de toog.',
  },
];

export default function About() {
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  return (
    <Section id="about" background="default" spacing="lg">
      <SectionHeader title="Over Ons" align="center" level={2} />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Story & Values */}
        <div className="space-y-12">
          {/* Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading text-accent">Ons Verhaal</h3>
            <div className="tet-text-secondary leading-relaxed space-y-4">
              <p>
                Café In Cany opende haar deuren als een échte bruine kroeg waar
                gezelligheid voorop staat. We wilden geen trendy zaak, maar een
                authentiek café waar je welkom bent zoals je bent.
              </p>
              <p>
                Wat begon met de droom van een eigen stamkroeg is uitgegroeid
                tot deze warme plek in het hart van Moorslede. Met goede pinten,
                leuke avonden, en altijd die typische bruine kroeg sfeer waar je
                thuis komt.
              </p>
              <p>
                Vandaag zijn we trots deel uit te maken van dit dorp. Elk getapt
                pintje, elke DJ-avond, en elke lach aan de toog is onze manier
                om te zeggen: welkom thuis.
              </p>
            </div>
          </div>

          {/* What We Care About */}
          <div className="space-y-8">
            <h3 className="text-2xl font-heading text-accent">
              Waar We Voor Staan
            </h3>
            <div className="space-y-6">
              {careAboutItems.map((item, index) => (
                <div key={index} className="flex gap-4 group cursor-default">
                  <div className="flex-shrink-0 w-8 h-8 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border border-[var(--accent-muted)] group-hover:bg-[var(--accent)]/20 transition-all duration-300">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Photo Placeholder */}
        <div className="relative">
          <div
            onMouseEnter={() => setIsHoveringPhoto(true)}
            onMouseLeave={() => setIsHoveringPhoto(false)}
            className="relative h-[500px] lg:h-[600px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] transition-all duration-500 cursor-default"
            style={{
              boxShadow: isHoveringPhoto ? 'var(--shadow-lg)' : 'var(--shadow)',
              transform: isHoveringPhoto ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-muted)] via-[var(--surface-elevated)] to-[var(--surface)]" />

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--accent)] opacity-20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[var(--accent-hover)] opacity-20 rounded-full blur-3xl animate-float-delayed" />

            {/* Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--text) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="space-y-6">
                {/* Coffee Cup Icon */}
                <div
                  className="w-20 h-20 mx-auto bg-[var(--accent)] rounded-full flex items-center justify-center transition-transform duration-500"
                  style={{
                    transform: isHoveringPhoto
                      ? 'rotate(12deg) scale(1.1)'
                      : 'rotate(0) scale(1)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <svg
                    className="w-10 h-10 text-[var(--background)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                  </svg>
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <p className="text-[var(--text)] font-heading text-2xl opacity-90">
                    Your Photo Here
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm max-w-xs mx-auto">
                    Add a photo of your café interior, team, or signature drinks
                    to bring this section to life
                  </p>
                </div>

                {/* Decorative Frame */}
                <div className="pt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)]/80 backdrop-blur-sm rounded-full border border-[var(--border)]">
                    <svg
                      className="w-4 h-4 text-[var(--accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">
                      Placeholder Image
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent" />
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute -top-3 -right-3 w-16 h-16 bg-[var(--accent)] opacity-20 rounded-full blur-xl animate-pulse-slow" />
          <div
            className="absolute -bottom-3 -left-3 w-20 h-20 bg-[var(--accent-hover)] opacity-20 rounded-full blur-xl animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>

      {/* Bottom Call-to-Action */}
      <div className="mt-16 text-center">
        <div
          className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[var(--surface)] px-8 py-6 rounded-[var(--radius-lg)] border border-[var(--border)]"
          style={{ boxShadow: 'var(--shadow)' }}
        >
          <p className="text-[var(--text-secondary)]">
            Wil je meer weten over ons café?
          </p>
          <Button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            variant="ghost"
            size="sm"
            icon={
              <svg
                className="w-4 h-4"
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
            Contacteer ons
          </Button>
        </div>
      </div>
    </Section>
  );
}
