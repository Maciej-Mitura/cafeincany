export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">
            Cafe Information
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need to know about our cozy corner of comfort
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Opening Hours */}
          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-colors duration-200" style={{ boxShadow: 'var(--shadow)' }}>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">
              Opening Hours
            </h2>
            <div className="space-y-3 text-[var(--text-secondary)]">
              <div className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)]">
                <span className="font-medium">Monday - Friday</span>
                <span className="text-[var(--muted)]">7:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)]">
                <span className="font-medium">Saturday</span>
                <span className="text-[var(--muted)]">8:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Sunday</span>
                <span className="text-[var(--muted)]">8:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-colors duration-200" style={{ boxShadow: 'var(--shadow)' }}>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <div>
                <p className="font-medium text-[var(--accent)] mb-1">Phone</p>
                <p className="text-[var(--text-secondary)]">(555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium text-[var(--accent)] mb-1">Email</p>
                <p className="text-[var(--text-secondary)]">hello@cafeincany.com</p>
              </div>
              <div>
                <p className="font-medium text-[var(--accent)] mb-1">Address</p>
                <p className="text-[var(--text-secondary)]">123 Coffee Street<br />Your City, ST 12345</p>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-colors duration-200" style={{ boxShadow: 'var(--shadow)' }}>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">
              What We Offer
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Premium coffee and espresso drinks</span>
              </li>
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Fresh pastries and baked goods</span>
              </li>
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Free Wi-Fi for customers</span>
              </li>
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Cozy seating area</span>
              </li>
            </ul>
          </div>

          {/* Special Features */}
          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-6 hover:border-[var(--accent-muted)] transition-colors duration-200" style={{ boxShadow: 'var(--shadow)' }}>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">
              Special Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Outdoor seating available</span>
              </li>
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Pet-friendly patio</span>
              </li>
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Takeout and delivery options</span>
              </li>
              <li className="flex items-start text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mr-3 text-lg">✓</span>
                <span>Private event space</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-[var(--surface-elevated)] rounded-[var(--radius-lg)] border border-[var(--accent-muted)] p-8 text-center" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <h3 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-3">
            Visit Us Today!
          </h3>
          <p className="text-[var(--text-secondary)] text-lg">
            We look forward to serving you the best coffee in town.
          </p>
        </div>
      </div>
    </div>
  );
}
