'use client';

import { useState, FormEvent } from 'react';
import { cafeInfo } from '@/data/cafe';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowError(false);

    try {
      // Submit to API route which uses Resend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis bij het verzenden');
      }

      // Success - show toast and reset form
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      // Error - show error toast
      setShowError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Er ging iets mis. Probeer het opnieuw.',
      );

      // Hide error message after 7 seconds
      setTimeout(() => {
        setShowError(false);
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Section id="contact" background="surface" spacing="lg">
      <SectionHeader
        title="Contact"
        subtitle="Vragen of speciale aanvragen? We horen graag van je."
        align="center"
        level={2}
      />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          {/* Phone */}
          <a
            href={`tel:${cafeInfo.contact.phoneRaw}`}
            className="group flex items-start gap-4 bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-all duration-300 cursor-pointer"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)] group-hover:bg-[var(--accent)]/20 transition-colors">
              <svg
                className="w-6 h-6 text-[var(--accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Phone
              </h3>
              <p className="text-[var(--text-secondary)]">
                {cafeInfo.contact.phone}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">Click to call</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${cafeInfo.contact.email}`}
            className="group flex items-start gap-4 bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-all duration-300 cursor-pointer"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)] group-hover:bg-[var(--accent)]/20 transition-colors">
              <svg
                className="w-6 h-6 text-[var(--accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Email
              </h3>
              <p className="text-[var(--text-secondary)]">
                {cafeInfo.contact.email}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Send us a message
              </p>
            </div>
          </a>

          {/* Social Media */}
          <div
            className="bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 border border-[var(--accent-muted)]">
                <svg
                  className="w-6 h-6 text-[var(--accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                  Follow Us
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Stay updated with our latest news
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${cafeInfo.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 group cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--background)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`https://facebook.com/${cafeInfo.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 group cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--background)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/${cafeInfo.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 group cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--background)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div
          className="bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          <h3 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-6">
            Stuur ons een Bericht
          </h3>

          {/* ⚠️ SETUP REQUIRED: Update FORMSPREE_ENDPOINT constant at top of file */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--text)] mb-2"
              >
                Naam <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className={`w-full px-4 py-3 bg-[var(--surface)] text-[var(--text)] border ${errors.name ? 'border-[var(--error)]' : 'border-[var(--border)]'} rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors`}
                placeholder="Jan Janssens"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-[var(--error)]">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--text)] mb-2"
              >
                E-mailadres <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className={`w-full px-4 py-3 bg-[var(--surface)] text-[var(--text)] border ${errors.email ? 'border-[var(--error)]' : 'border-[var(--border)]'} rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors`}
                placeholder="jan@voorbeeld.be"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[var(--error)]">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--text)] mb-2"
              >
                Bericht <span className="text-[var(--error)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
                className={`w-full px-4 py-3 bg-[var(--surface)] text-[var(--text)] border ${errors.message ? 'border-[var(--error)]' : 'border-[var(--border)]'} rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-none transition-colors`}
                placeholder="Vertel ons wat je te zeggen hebt..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-[var(--error)]">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {isSubmitting ? 'Versturen...' : 'Verstuur Bericht'}
            </Button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div
          className="fixed bottom-8 right-8 bg-[var(--success)] text-[var(--background)] px-6 py-4 rounded-[var(--radius-lg)] flex items-center gap-3 animate-slide-up z-50"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-semibold">Bericht verzonden!</p>
            <p className="text-sm opacity-90">
              We nemen zo snel mogelijk contact met je op.
            </p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="ml-4 hover:opacity-75 transition-opacity cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Error Toast */}
      {showError && (
        <div
          className="fixed bottom-8 right-8 bg-[var(--error)] text-[var(--background)] px-6 py-4 rounded-[var(--radius-lg)] flex items-center gap-3 animate-slide-up z-50"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-semibold">Er ging iets mis</p>
            <p className="text-sm opacity-90">{errorMessage}</p>
          </div>
          <button
            onClick={() => setShowError(false)}
            className="ml-4 hover:opacity-75 transition-opacity cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </Section>
  );
}
