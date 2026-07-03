import { getCategoryStyles } from '@/lib/events/categoryStyles';
import type { EventCategory } from '@/types/event';

interface EventCategoryBadgeProps {
  category: EventCategory;
  className?: string;
}

export default function EventCategoryBadge({ category, className = '' }: EventCategoryBadgeProps) {
  const style = getCategoryStyles(category);

  return (
    <span
      className={`inline-block text-[0.65rem] uppercase tracking-[0.14em] font-semibold px-2 py-1 border ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: 'color-mix(in srgb, currentColor 25%, transparent)',
      }}
      aria-hidden="true"
    >
      {category}
    </span>
  );
}
