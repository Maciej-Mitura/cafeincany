'use client';

import { useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import menuData from '@/data/menu.json';

// TypeScript interfaces for type safety
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: string;
  dietary?: string[];
}

interface MenuData {
  categories: string[];
  items: MenuItem[];
}

// Load menu data with proper typing
const typedMenuData: MenuData = menuData as MenuData;
const menuCategories = typedMenuData.categories;
const menuItems = typedMenuData.items;

const ITEMS_PER_PAGE = 8;

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Alles');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredItems = activeCategory === 'Alles' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Reset expansion when category changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory]);

  // Determine which items to display
  const displayedItems = isExpanded 
    ? filteredItems 
    : filteredItems.slice(0, ITEMS_PER_PAGE);

  const hasMoreItems = filteredItems.length > ITEMS_PER_PAGE;

  const handleDownloadMenu = () => {
    alert('PDF menu download is not yet available. This is a placeholder button.');
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Section id="menu" background="surface" spacing="lg">
      <SectionHeader
        title="Onze Kaart"
        subtitle="Van Belgische klassiekers tot sterke drank. Alles vers getapt en met liefde geschonken."
        align="center"
        level={2}
      />

      {/* Download Menu Button */}
      <div className="text-center mb-12">
        <Button
          onClick={handleDownloadMenu}
          variant="primary"
          size="md"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          iconPosition="left"
        >
          Download Drankkaart (PDF) <span className="text-xs opacity-75">(Komt binnenkort)</span>
        </Button>
      </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-[var(--radius)] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[var(--accent)] text-[var(--background)] shadow-[var(--shadow)]'
                    : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--text)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayedItems.map((item, index) => (
            <div
              key={`${item.category}-${index}`}
              className="group bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-all duration-300 cursor-default animate-fade-in"
              style={{ 
                boxShadow: 'var(--shadow)',
                animationDelay: `${index * 30}ms`,
              }}
            >
              {/* Item Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-[family:var(--font-heading)] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 flex-1 pr-4">
                  {item.name}
                </h3>
                <span className="text-xl font-semibold text-[var(--accent)] whitespace-nowrap">
                  {item.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Dietary Tags */}
              {item.dietary && item.dietary.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.dietary.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--success)',
                        color: 'var(--background)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Hover Indicator Line */}
              <div className="mt-4 h-0.5 bg-[var(--accent)] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreItems && (
          <div className="text-center mt-8">
            <Button
              onClick={handleToggleExpand}
              variant="ghost"
              size="md"
              icon={
                isExpanded ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              }
              iconPosition="right"
            >
              {isExpanded 
                ? 'Toon minder' 
                : `Toon meer (${filteredItems.length - ITEMS_PER_PAGE} meer)`
              }
            </Button>
          </div>
        )}

        {/* Category Item Count */}
        <div className="text-center mt-8">
          <p className="text-[var(--muted)] text-sm">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} 
            {activeCategory !== 'Alles' && ` in ${activeCategory}`}
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 text-center">
          <p className="text-[var(--text-secondary)] mb-2">
            <span className="text-[var(--accent)] font-medium">Speciale Wensen?</span>
          </p>
          <p className="text-[var(--muted)] text-sm">
            Ons volledige assortiment is groter dan deze kaart. Vraag gerust aan ons personeel naar je favoriete biertje of speciale dranken.
          </p>
        </div>
    </Section>
  );
}
