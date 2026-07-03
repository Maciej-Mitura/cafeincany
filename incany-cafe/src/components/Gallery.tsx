'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import GalleryTile from '@/components/gallery/GalleryTile';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import type { GalleryItem } from '@/types/gallery';

interface GalleryProps {
  items: GalleryItem[];
}

function ScrollArrow({
  direction,
  label,
  onClick,
}: {
  direction: 'left' | 'right';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`gallery-scroll__arrow gallery-scroll__arrow--${direction}`}
      onClick={onClick}
      aria-label={label}
    >
      <svg
        className="gallery-scroll__arrow-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {direction === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

export default function Gallery({ items }: GalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const overflow = element.scrollWidth > element.clientWidth + 1;
    setHasOverflow(overflow);
    setCanScrollLeft(overflow && element.scrollLeft > 1);
    setCanScrollRight(
      overflow && element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  }, []);

  const scrollByPage = useCallback((direction: 'left' | 'right') => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    const amount = element.clientWidth * 0.85;
    element.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(element);

    element.addEventListener('scroll', updateScrollState, { passive: true });

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      if (element.scrollWidth <= element.clientWidth + 1) {
        return;
      }

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('scroll', updateScrollState);
      element.removeEventListener('wheel', handleWheel);
    };
  }, [items, updateScrollState]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasOverflow) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollByPage('left');
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollByPage('right');
      }
    },
    [hasOverflow, scrollByPage],
  );

  return (
    <Section id="gallery" background="surface" spacing="lg">
      <SectionHeader
        title="Sfeerbeelden"
        subtitle="Een kijkje in ons bruine kroegje, de gezellige avonden en warme momenten"
        align="center"
        level={2}
      />

      {items.length > 0 && (
        <div className="gallery-scroll" aria-label="Sfeerbeelden galerij">
          {hasOverflow && canScrollLeft && (
            <ScrollArrow
              direction="left"
              label="Scroll sfeerbeelden naar links"
              onClick={() => scrollByPage('left')}
            />
          )}

          <div
            ref={scrollRef}
            className="gallery-scroll__track"
            role="list"
            tabIndex={hasOverflow ? 0 : undefined}
            onKeyDown={handleKeyDown}
            aria-roledescription="carrousel"
            aria-label="Horizontale sfeerbeelden"
          >
            {items.map((item, index) => (
              <div key={item.id} role="listitem" className="gallery-scroll__item">
                <GalleryTile
                  item={item}
                  index={index}
                  isActive={activeId === item.id}
                  onActivate={setActiveId}
                  onDeactivate={() => setActiveId(null)}
                />
              </div>
            ))}
          </div>

          {hasOverflow && canScrollRight && (
            <ScrollArrow
              direction="right"
              label="Scroll sfeerbeelden naar rechts"
              onClick={() => scrollByPage('right')}
            />
          )}
        </div>
      )}
    </Section>
  );
}
