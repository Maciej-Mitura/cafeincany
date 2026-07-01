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
  };

  return styles[category];
}
