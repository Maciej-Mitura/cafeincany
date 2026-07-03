import EventCategoryBadge from '@/components/events/EventCategoryBadge';
import EventDateBlock from '@/components/events/EventDateBlock';
import EventLiveIndicator from '@/components/events/EventLiveIndicator';
import {
  calculateEventStatus,
  formatEventTimeRange,
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

function getStatusTone(status: EventStatus): string {
  switch (status) {
    case 'upcoming':
      return 'text-[var(--accent)]';
    case 'live':
      return 'text-[var(--accent)]';
    case 'past':
      return 'text-[var(--muted)]';
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
  const statusTone = getStatusTone(status);
  const description = getEventDescription(event);
  const showRecap = shouldShowRecap(event, status);
  const galleryImages = getValidGalleryImages(event.gallery);
  const showCoverImage = isValidImageSource(event.coverImage);
  const showExternalLink = isValidHttpUrl(event.externalEventUrl);
  const showVideoLink = isValidHttpUrl(event.videoUrl);
  const [heroImage, ...galleryRest] = galleryImages;

  return (
    <div className="event-detail-dialog__panel">
      {showCoverImage && (
        <div className="event-detail-dialog__hero relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.coverImage!.trim()}
            alt={event.coverImageAlt?.trim() || event.title}
            className="w-full h-48 sm:h-64 md:h-72 object-cover"
          />
          <div className="event-detail-dialog__hero-scrim" aria-hidden="true" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onRequestClose}
            className="event-detail-dialog__close absolute top-4 right-4"
            aria-label="Sluiten"
          >
            Sluiten
          </button>
        </div>
      )}

      <div className="event-detail-dialog__body">
        {!showCoverImage && (
          <div className="flex items-start justify-end px-5 pt-5 sm:px-7 sm:pt-6">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onRequestClose}
              className="event-detail-dialog__close event-detail-dialog__close--inline"
            >
              Sluiten
            </button>
          </div>
        )}

        <header className="px-5 sm:px-7 pt-5 sm:pt-6 pb-5 border-b border-[var(--border)]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {event.featured && <span className="event-card__featured-label">Uitgelicht</span>}
            <EventCategoryBadge category={event.category} />
            {status === 'live' ? (
              <EventLiveIndicator />
            ) : (
              <span className={`text-[0.65rem] uppercase tracking-[0.14em] font-semibold ${statusTone}`}>
                {getEventStatusLabel(status)}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
            <EventDateBlock event={event} size="large" />
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-2xl sm:text-3xl font-heading text-[var(--text)] leading-tight mb-2">
                {event.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--accent)] font-medium tracking-wide">
                {formatEventTimeRange(event)}
              </p>
            </div>
          </div>
        </header>

        <div className="event-detail-dialog__scroll max-h-[calc(90dvh-12rem)] overflow-y-auto px-5 sm:px-7 py-6 sm:py-7">
          <div
            id={descriptionId}
            className="event-detail-dialog__description text-[var(--text-secondary)] leading-relaxed whitespace-pre-line"
          >
            {description}
          </div>

          {showRecap && (
            <section className="event-detail-dialog__recap mt-8" aria-labelledby={recapId}>
              <h3 id={recapId} className="text-lg font-heading text-[var(--text)] mb-3">
                Terugblik
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{event.recap}</p>
            </section>
          )}

          {galleryImages.length > 0 && (
            <section className="mt-8" aria-label="Fotogalerij">
              <h3 className="text-lg font-heading text-[var(--text)] mb-4">Fotogalerij</h3>
              <div className="event-detail-dialog__gallery">
                {heroImage && (
                  <div className="event-detail-dialog__gallery-hero overflow-hidden border border-[var(--border)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroImage.url.trim()}
                      alt={heroImage.alt.trim()}
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                  </div>
                )}
                {galleryRest.length > 0 && (
                  <div className="event-detail-dialog__gallery-grid">
                    {galleryRest.map((image) => (
                      <div
                        key={image.url}
                        className="overflow-hidden border border-[var(--border)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url.trim()}
                          alt={image.alt.trim()}
                          className="w-full h-28 sm:h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {(showExternalLink || showVideoLink) && (
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row gap-3">
              {showExternalLink && (
                <a
                  href={event.externalEventUrl!.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-detail-dialog__link event-detail-dialog__link--primary"
                >
                  Naar evenementpagina
                </a>
              )}
              {showVideoLink && (
                <a
                  href={event.videoUrl!.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-detail-dialog__link event-detail-dialog__link--secondary"
                >
                  Bekijk video
                </a>
              )}
            </div>
          )}
        </div>
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
