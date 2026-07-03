export type EventTab = 'upcoming' | 'past';

interface EventTabsProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
}

const tabs: { id: EventTab; label: string }[] = [
  { id: 'upcoming', label: 'Binnenkort' },
  { id: 'past', label: 'Voorbij' },
];

export default function EventTabs({ activeTab, onTabChange }: EventTabsProps) {
  return (
    <div className="event-tabs mb-10 sm:mb-12" role="tablist" aria-label="Evenementen filter">
      <div className="flex justify-center">
        <div className="inline-flex border-b border-[var(--border)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`event-tabs__trigger relative px-5 sm:px-8 py-3 min-h-11 text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] cursor-pointer ${
                  isActive
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {tab.label}
                {isActive && <span className="event-tabs__indicator" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
