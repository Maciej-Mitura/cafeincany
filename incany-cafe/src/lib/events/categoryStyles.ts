import type { EventCategory } from '@/types/event';

export interface CategoryStyle {
  bg: string;
  text: string;
}

export function getCategoryStyles(category: EventCategory): CategoryStyle {
  const styles: Record<EventCategory, CategoryStyle> = {
    'DJ Night': {
      bg: 'var(--accent)',
      text: 'var(--background)',
    },
    'Theme Night': {
      bg: 'var(--success)',
      text: 'var(--background)',
    },
    Discount: {
      bg: 'var(--warning)',
      text: 'var(--background)',
    },
    'Live Muziek': {
      bg: 'var(--accent-muted)',
      text: 'var(--background)',
    },
    Quiz: {
      bg: 'var(--surface-elevated)',
      text: 'var(--text)',
    },
    Promotie: {
      bg: 'var(--warning)',
      text: 'var(--background)',
    },
    Sport: {
      bg: 'var(--success)',
      text: 'var(--background)',
    },
    Overig: {
      bg: 'var(--border)',
      text: 'var(--text-secondary)',
    },
  };

  return styles[category];
}
