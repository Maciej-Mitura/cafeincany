interface EventLiveIndicatorProps {
  className?: string;
}

export default function EventLiveIndicator({ className = '' }: EventLiveIndicatorProps) {
  return (
    <span
      className={`event-live-indicator inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-[var(--accent)] ${className}`}
      aria-hidden="true"
    >
      <span className="event-live-indicator__dot" />
      Nu bezig
    </span>
  );
}
