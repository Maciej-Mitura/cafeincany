export type EventTab = 'upcoming' | 'past';

interface EventTabsProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
}

export default function EventTabs({ activeTab, onTabChange }: EventTabsProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => onTabChange('upcoming')}
          className={`px-8 py-3 rounded-[var(--radius)] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-[var(--accent)] text-[var(--background)] shadow-[var(--shadow)]'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--text)]'
          }`}
        >
          Binnenkort
        </button>
        <button
          type="button"
          onClick={() => onTabChange('past')}
          className={`px-8 py-3 rounded-[var(--radius)] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
            activeTab === 'past'
              ? 'bg-[var(--accent)] text-[var(--background)] shadow-[var(--shadow)]'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--text)]'
          }`}
        >
          Voorbij
        </button>
      </div>
    </div>
  );
}
