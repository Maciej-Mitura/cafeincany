'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

interface DietaryTag {
  label: string;
  color: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags: DietaryTag[];
  isNew?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: 'Duvel',
    description: 'De klassieker onder de Belgische bieren. Stevig blond bier met een rijke smaak',
    price: '€4.50',
    tags: [
      { label: 'Van \'t Vat', color: 'success' },
    ],
  },
  {
    name: 'Westmalle Tripel',
    description: 'Trappistenbier met complexe smaak, kruidige en fruitige aroma\'s',
    price: '€5.20',
    tags: [
      { label: 'Trappist', color: 'accent' },
      { label: 'Fles', color: 'warning' },
    ],
  },
  {
    name: 'Kaasplankje',
    description: 'Selectie van Belgische kazen met noten, druiven en confituur',
    price: '€12.50',
    tags: [
      { label: 'Vegetarisch', color: 'success' },
    ],
    isNew: true,
  },
  {
    name: 'Bitterballen (8st)',
    description: 'Krokante bitterballen met mosterd - de perfecte borrelhap',
    price: '€7.50',
    tags: [
      { label: 'Huisgemaakt', color: 'accent' },
    ],
  },
  {
    name: 'Chouffe Blond',
    description: 'De legende uit de Ardennen. Fruitig blond bier met unieke karakter',
    price: '€4.80',
    tags: [
      { label: 'Speciaal', color: 'warning' },
      { label: 'Fles', color: 'accent' },
    ],
  },
  {
    name: 'Tripel Karmeliet',
    description: 'Complex tripel bier gebrouwen volgens eeuwenoude receptuur',
    price: '€5.00',
    tags: [
      { label: 'Premium', color: 'accent' },
    ],
  },
];

const getTagStyles = (color: string) => {
  const styles = {
    success: {
      bg: 'var(--success)',
      text: 'var(--background)',
    },
    warning: {
      bg: 'var(--warning)',
      text: 'var(--background)',
    },
    accent: {
      bg: 'var(--accent-muted)',
      text: 'var(--text)',
    },
  };
  return styles[color as keyof typeof styles] || styles.accent;
};

export default function Bestsellers() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const isComingSoon = true;

  return (
    <ComingSoonModal
      active={isComingSoon}
      title="Binnenkort beschikbaar"
      subtitle="Onze populairste keuzes en volledige kaart worden momenteel vernieuwd."
      aria-label="Bestsellers coming soon"
    >
      <Section id="bestsellers" background="default" spacing="lg">
        <SectionHeader
          badge="Populairste Keuzes"
          title="Onze Toppers"
          subtitle="De pintjes en hapjes waar iedereen voor terugkomt"
          align="center"
          level={2}
        />

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 transition-all duration-300 cursor-default"
              style={{
                boxShadow:
                  hoveredItem === index ? 'var(--shadow-lg)' : 'var(--shadow)',
                transform:
                  hoveredItem === index ? 'translateY(-4px)' : 'translateY(0)',
                borderColor:
                  hoveredItem === index
                    ? 'var(--accent-muted)'
                    : 'var(--border)',
              }}
            >
              {/* New Badge */}
              {item.isNew && (
                <div
                  className="absolute -top-3 -right-3 bg-[var(--accent)] text-[var(--background)] text-xs font-bold uppercase px-3 py-1 rounded-full border-2 border-[var(--background)]"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  New
                </div>
              )}

              {/* Item Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-[family:var(--font-heading)] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 pr-2">
                    {item.name}
                  </h3>
                  <span className="text-xl font-semibold text-[var(--accent)] whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => {
                  const tagStyles = getTagStyles(tag.color);
                  return (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium px-2.5 py-1 rounded-full transition-transform duration-200 hover:scale-105"
                      style={{
                        backgroundColor: tagStyles.bg,
                        color: tagStyles.text,
                      }}
                    >
                      {tag.label}
                    </span>
                  );
                })}
              </div>

              {/* Hover Indicator */}
              <div
                className="absolute bottom-0 left-0 h-1 bg-[var(--accent)] rounded-b-[var(--radius-lg)] transition-all duration-300"
                style={{
                  width: hoveredItem === index ? '100%' : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center mt-12">
          <Button
            onClick={() => {
              const menuSection = document.getElementById('menu');
              menuSection?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            }
          >
            Bekijk Volledige Kaart
          </Button>
        </div>
      </Section>
    </ComingSoonModal>
  );
}
