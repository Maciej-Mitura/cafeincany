"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const careAboutItems = [
  {
    title: "Échte Gezelligheid",
    description: "Bij ons is het geen afhaalpunt—het is een bruine kroeg waar je echt kan vertoeven. Een pint, een babbel met de buur, en die warme sfeer van thuis.",
  },
  {
    title: "Kwaliteit op 't Glas",
    description: "Elk biertje vers getapt, elk pintje met zorg geschonken. Van Belgische klassiekers tot speciale tapbieren. Geen compromissen, gewoon goed gedronken.",
  },
  {
    title: "Ons Dorp",
    description: "Moorslede is niet zomaar waar we werken - het is thuis. We organiseren themavonden, draaien goede muziek, en iedereen is welkom aan de toog.",
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
            <h3 className="text-2xl font-heading text-accent ">Ons Verhaal</h3>
            <div className="tet-text-secondary leading-relaxed space-y-4 pt-4">
              <p>Café In Cany opende haar deuren als een échte bruine kroeg waar gezelligheid voorop staat. We wilden geen trendy zaak, maar een authentiek café waar je welkom bent zoals je bent.</p>
              <p>Wat begon met de droom van een eigen stamkroeg is uitgegroeid tot deze warme plek in het hart van Moorslede. Met goede pinten, leuke avonden, en altijd die typische bruine kroeg sfeer waar je thuis komt.</p>
              <p>Vandaag zijn we trots deel uit te maken van dit dorp. Elk getapt pintje, elke DJ-avond, en elke lach aan de toog is onze manier om te zeggen: welkom thuis.</p>
            </div>
          </div>

          {/* What We Care About */}
          <div className="space-y-8">
            <h3 className="text-2xl font-heading text-accent pb-4">Waar We Voor Staan</h3>
            <div className="space-y-6">
              {careAboutItems.map((item, index) => (
                <div key={index} className="pl-6 border-l-3 border-[var(--accent)] group cursor-default hover:border-[var(--accent-hover)] transition-all duration-300">
                  <div className="py-2">
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">{item.title}</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Café Photo */}
        <div className="relative">
          <div
            onMouseEnter={() => setIsHoveringPhoto(true)}
            onMouseLeave={() => setIsHoveringPhoto(false)}
            className="relative h-[500px] lg:h-[600px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] transition-all duration-500 cursor-default"
            style={{
              boxShadow: isHoveringPhoto ? "var(--shadow-lg)" : "var(--shadow)",
              transform: isHoveringPhoto ? "scale(1.02)" : "scale(1)",
            }}
          >
            {/* Café Photo - Raw, no effects */}
            <Image src="/GioAleksandraImg.jpg" alt="Café In Cany - Gio en Aleksandra" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[var(--surface)] px-8 py-6 rounded-[var(--radius-lg)] border border-[var(--border)]" style={{ boxShadow: "var(--shadow)" }}>
          <p className="text-[var(--text-secondary)]">Wil je meer weten over ons café?</p>
          <Button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            variant="ghost"
            size="sm"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
