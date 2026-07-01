import { getCategoryStyles } from '@/lib/events/categoryStyles';
import {
  calculateEventStatus,
  formatEventDateTimeRange,
  getEventDescription,
  getEventStatusLabel,
  shouldShowRecap,
} from '@/lib/events/helpers';
import { getValidGalleryImages, isValidHttpUrl, isValidImageSource } from '@/lib/events/media';
import type { Event, EventStatus } from '@/types/event';
import { useCallback, useEffect, useId, useRef, type MouseEvent, type RefObject } from 'react';

interface EventDetailModalProps {
  event: Event | null;
  now: Date;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}

interface EventDetailPanelProps {
  event: Event;
  now: Date;
  titleId: string;
  descriptionId: string;
  recapId: string;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onRequestClose: () => void;
}

function getStatusBadgeStyle(status: EventStatus): { bg: string; text: string } {
  switch (status) {
    case 'upcoming':
      return { bg: 'var(--accent)', text: 'var(--background)' };
    case 'live':
      return { bg: 'var(--success)', text: 'var(--background)' };
    case 'past':
      return { bg: 'var(--surface-elevated)', text: 'var(--text-secondary)' };
  }
}

function EventDetailPanel({
  event,
  now,
  titleId,
  descriptionId,
  recapId,
  closeButtonRef,
  onRequestClose,
}: EventDetailPanelProps) {
  const status = calculateEventStatus(event, now);
  const categoryStyle = getCategoryStyles(event.category);
  const statusStyle = getStatusBadgeStyle(status);
  const description = getEventDescription(event);
  const showRecap = shouldShowRecap(event, status);
  const galleryImages = getValidGalleryImages(event.gallery);
  const showCoverImage = isValidImageSource(event.coverImage);
  const showExternalLink = isValidHttpUrl(event.externalEventUrl);
  const showVideoLink = isValidHttpUrl(event.videoUrl);

  return (
    <div className="event-detail-dialog__panel">
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 pr-2">
          {event.featured && (
            <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--background)]">
              Uitgelicht
            </span>
          )}
          <span
            className="text-xs font-bold uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
          >
            {event.category}
          </span>
          <span
            className="text-xs font-bold uppercase px-3 py-1 rounded-full border border-[var(--border)]"
            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
          >
            {getEventStatusLabel(status)}
          </span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onRequestClose}
          className="shrink-0 rounded-[var(--radius)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-muted)] hover:text-[var(--text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          Sluiten
        </button>
      </div>

      <div className="max-h-[calc(90dvh-5rem)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
        <h2 id={titleId} className="text-2xl sm:text-3xl font-heading text-[var(--text)] mb-3">
          {event.title}
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mb-5">{formatEventDateTimeRange(event)}</p>

        {showCoverImage && (
          <div className="mb-5 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.coverImage!.trim()}
              alt={event.coverImageAlt?.trim() || event.title}
              className="w-full max-h-80 object-cover"
            />
          </div>
        )}

        <div id={descriptionId} className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
          {description}
        </div>

        {showRecap && (
          <section className="mt-6 pt-6 border-t border-[var(--border)]" aria-labelledby={recapId}>
            <h3 id={recapId} className="text-lg font-heading text-[var(--text)] mb-3">
              Terugblik
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{event.recap}</p>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section className="mt-6" aria-label="Fotogalerij">
            <h3 className="text-lg font-heading text-[var(--text)] mb-3">Fotogalerij</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((image) => (
                <div
                  key={image.url}
                  className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url.trim()} alt={image.alt.trim()} className="w-full h-32 sm:h-36 object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {(showExternalLink || showVideoLink) && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {showExternalLink && (
              <a
                href={event.externalEventUrl!.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-[var(--radius)] text-sm font-medium bg-[var(--accent)] text-[var(--background)] hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Naar evenementpagina
              </a>
            )}
            {showVideoLink && (
              <a
                href={event.videoUrl!.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-[var(--radius)] text-sm font-medium border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent-muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Bekijk video
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventDetailModal({
  event,
  now,
  onClose,
  returnFocusRef,
}: EventDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const recapId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (event) {
      if (!dialog.open) {
        dialog.showModal();
      }

      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
      returnFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [event, returnFocusRef]);

  const finalizeClose = useCallback(() => {
    document.body.style.overflow = '';
    onClose();
    returnFocusRef.current?.focus();
  }, [onClose, returnFocusRef]);

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    } else {
      finalizeClose();
    }
  }, [finalizeClose]);

  const handleBackdropClick = (mouseEvent: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      mouseEvent.clientX >= rect.left &&
      mouseEvent.clientX <= rect.right &&
      mouseEvent.clientY >= rect.top &&
      mouseEvent.clientY <= rect.bottom;

    if (!clickedInDialog) {
      requestClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="event-detail-dialog"
      aria-labelledby={event ? titleId : undefined}
      aria-describedby={event ? descriptionId : undefined}
      onClose={finalizeClose}
      onCancel={(cancelEvent) => {
        cancelEvent.preventDefault();
        requestClose();
      }}
      onClick={handleBackdropClick}
    >
      {event && (
        <EventDetailPanel
          event={event}
          now={now}
          titleId={titleId}
          descriptionId={descriptionId}
          recapId={recapId}
          closeButtonRef={closeButtonRef}
          onRequestClose={requestClose}
        />
      )}
    </dialog>
  );
}
