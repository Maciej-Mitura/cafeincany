'use client';

import { useState, useEffect } from 'react';
// import Image from 'next/image'; // TODO: Uncomment when logo is available
import Button from '@/components/ui/Button';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'Over Ons', href: '#about' },
  { name: 'Kaart', href: '#menu' },
  { name: 'Events', href: '#events' },
  { name: 'Galerij', href: '#gallery' },
  { name: 'Locatie', href: '#location' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll to add shadow/background change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Set up IntersectionObserver for active section highlighting
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setIsOpen(false);
  };

  const scrollToMenu = () => {
    scrollToSection('#menu');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      style={isScrolled ? { boxShadow: 'var(--shadow)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[var(--radius-sm)] p-1 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              {/* TODO: Add logo when available */}
              {/* <div className="relative h-12 w-auto bg-white/95 rounded-[var(--radius-sm)] px-3 py-1 flex items-center" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
                <Image
                  src="/logo.jpg"
                  alt="Café Incany Logo"
                  width={120}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div> */}
              <span className="text-xl font-[family:var(--font-heading)] text-[var(--text)] font-semibold">
                Café In Cany
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-elevated)]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={scrollToMenu}
              variant="primary"
              size="md"
            >
              Bekijk Kaart
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-[var(--radius-sm)] text-[var(--text)] hover:bg-[var(--surface-elevated)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-colors duration-200 cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)]">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left px-4 py-3 rounded-[var(--radius-sm)] text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
                  isActive
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          
          {/* Mobile CTA Button */}
          <div className="mt-4">
            <Button
              onClick={scrollToMenu}
              variant="primary"
              size="md"
              className="w-full"
            >
              Bekijk Kaart
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
