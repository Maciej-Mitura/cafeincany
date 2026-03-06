"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

interface GalleryImage {
  id: number;
  caption: string;
  height: 'short' | 'medium' | 'tall';
}

const galleryImages: GalleryImage[] = [
  { id: 1, caption: 'Vers Getapt', height: 'tall' },
  { id: 2, caption: 'DJ-Avond', height: 'medium' },
  { id: 3, caption: 'Gezellig Interieur', height: 'short' },
  { id: 4, caption: 'Aan de Toog', height: 'medium' },
  { id: 5, caption: 'Borrelhapjes', height: 'tall' },
  { id: 6, caption: 'Belgische Klassiekers', height: 'short' },
  { id: 7, caption: 'Stamgasten', height: 'medium' },
  { id: 8, caption: 'Speciale Avonden', height: 'tall' },
];

const heightClasses = {
  short: 'h-48',
  medium: 'h-64',
  tall: 'h-80',
};

export default function Gallery() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <Section id="gallery" background="surface" spacing="lg">
      <SectionHeader
        title="Sfeerbeelden"
        subtitle="Een kijkje in ons bruine kroegje, de gezellige avonden en warme momenten"
        align="center"
        level={2}
      />

      {/* Masonry-like Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <ComingSoonModal
                active={hoveredImage === image.id}
                title="Sfeerbeeld binnenkort"
                subtitle={image.caption}
                aria-label={`Sfeerbeeld ${image.caption} binnenkort`}
              >
                <div
                  className={`group relative ${heightClasses[image.height]} rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] cursor-pointer transition-all duration-300`}
                  style={{
                    boxShadow: hoveredImage === image.id ? "var(--shadow-lg)" : "var(--shadow)",
                    transform: hoveredImage === image.id ? "scale(1.02)" : "scale(1)",
                  }}
                >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-muted)] via-[var(--surface-elevated)] to-[var(--surface)]" />
              
              {/* Decorative Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, var(--text) 1px, transparent 0)`,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Animated Blur Elements */}
              <div
                className="absolute w-20 h-20 bg-[var(--accent)] opacity-20 rounded-full blur-2xl transition-all duration-700"
                style={{
                  top: hoveredImage === image.id ? '10%' : '20%',
                  left: hoveredImage === image.id ? '10%' : '20%',
                }}
              />
              <div
                className="absolute w-24 h-24 bg-[var(--accent-hover)] opacity-20 rounded-full blur-2xl transition-all duration-700"
                style={{
                  bottom: hoveredImage === image.id ? '10%' : '20%',
                  right: hoveredImage === image.id ? '10%' : '20%',
                }}
              />

              {/* Image Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 bg-[var(--accent)]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[var(--accent-muted)] transition-all duration-300"
                  style={{
                    transform: hoveredImage === image.id ? 'scale(0.8) rotate(180deg)' : 'scale(1) rotate(0deg)',
                    opacity: hoveredImage === image.id ? 0.5 : 1,
                  }}
                >
                  <svg
                    className="w-8 h-8 text-[var(--accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-sm transition-opacity duration-300"
                style={{
                  opacity: hoveredImage === image.id ? 1 : 0,
                }}
              >
                <div className="h-full flex flex-col items-center justify-center p-6">
                  {/* Caption */}
                  <h3
                    className="text-2xl font-heading text-[var(--text)] mb-2 transition-all duration-300"
                    style={{
                      transform: hoveredImage === image.id ? 'translateY(0)' : 'translateY(20px)',
                      opacity: hoveredImage === image.id ? 1 : 0,
                    }}
                  >
                    {image.caption}
                  </h3>

                  {/* View Icon */}
                  <div
                    className="mt-4 transition-all duration-300 delay-100"
                    style={{
                      transform: hoveredImage === image.id ? 'translateY(0)' : 'translateY(20px)',
                      opacity: hoveredImage === image.id ? 1 : 0,
                    }}
                  >
                    <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-medium">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>View</span>
                    </div>
                  </div>

                  {/* Decorative Bottom Line */}
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-[var(--accent)] transition-all duration-500"
                    style={{
                      width: hoveredImage === image.id ? '100%' : '0%',
                    }}
                  />
                </div>
              </div>

                  {/* Image Number Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[var(--surface)]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[var(--border)]">
                    <span className="text-xs font-medium text-[var(--accent)]">
                      {image.id}
                    </span>
                  </div>
                </div>
              </ComingSoonModal>
            </div>
          ))}
        </div>
    </Section>
  );
}
