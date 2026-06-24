import type { Metadata } from "next";
import Link from "next/link";
import { cafeInfo } from "@/data/cafe";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacybeleid | Café In Cany",
  description: "Privacybeleid en gegevensbescherming voor Café In Cany",
};

export default function PrivacyPage() {
  const lastUpdated = "2 maart 2026";

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar home
          </Link>
          <h1 className="text-4xl font-[family:var(--font-heading)] text-[var(--text)] mb-2">Privacybeleid</h1>
          <p className="text-[var(--text-secondary)]">Laatste update: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <Section background="default" spacing="lg">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Intro */}
          <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: "var(--shadow)" }}>
            <p className="text-[var(--text-secondary)] leading-relaxed">Bij Café In Cany respecteren we je privacy. Deze pagina legt uit welke gegevens we verzamelen via onze website en hoe we deze gebruiken.</p>
          </div>

          {/* Verantwoordelijke */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Wie is verantwoordelijk?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 space-y-3" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)]">
                <strong className="text-[var(--text)]">{cafeInfo.name}</strong>
              </p>
              <p className="text-[var(--text-secondary)]">
                {cafeInfo.address.street}
                <br />
                {cafeInfo.address.zip} {cafeInfo.address.city}
              </p>
              <p className="text-[var(--text-secondary)]">
                E-mail:{" "}
                <a href={`mailto:${cafeInfo.contact.email}`} className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                  {cafeInfo.contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Welke gegevens */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Welke gegevens verzamelen we?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 space-y-6" style={{ boxShadow: "var(--shadow)" }}>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Contactformulier</h3>
                <p className="text-[var(--text-secondary)] mb-3">Als je het contactformulier op onze website gebruikt, verzamelen we:</p>
                <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                  <li>Je naam</li>
                  <li>Je e-mailadres</li>
                  <li>Je bericht</li>
                  <li>Technische gegevens (IP-adres, tijdstip van verzending)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Google Maps</h3>
                <p className="text-[var(--text-secondary)]">
                  Als je ervoor kiest om de kaart te laden, wordt er een verbinding gemaakt met Google Maps. Google kan dan technische gegevens verzamelen zoals je IP-adres en browserinformatie. Lees meer in het{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                    privacybeleid van Google
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Waarvoor gebruiken we je gegevens */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Waarvoor gebruiken we je gegevens?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 space-y-4" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)]">We gebruiken je gegevens alleen om:</p>
              <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                <li>
                  <strong className="text-[var(--text)]">Je vragen te beantwoorden:</strong> Via het contactformulier ontvangen berichten gebruiken we enkel om contact met je op te nemen over je vraag of aanvraag.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Technische beveiliging:</strong> We gebruiken Cloudflare Turnstile om geautomatiseerde spam te blokkeren.
                </li>
                <li>
                  <strong className="text-[var(--text)]">De kaart te tonen:</strong> Als je de Google Maps kaart laadt, dient dit om je onze locatie te tonen.
                </li>
              </ul>
            </div>
          </div>

          {/* Hoe lang bewaren we je gegevens */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Hoe lang bewaren we je gegevens?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)] leading-relaxed">Berichten via het contactformulier bewaren we alleen zolang nodig om je vraag af te handelen. Daarna verwijderen we je gegevens, tenzij we wettelijk verplicht zijn deze langer te bewaren (bijvoorbeeld voor boekhoudkundige redenen).</p>
            </div>
          </div>

          {/* Met wie delen we je gegevens */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Met wie delen we je gegevens?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 space-y-4" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)]">We verkopen je gegevens nooit. We delen je gegevens alleen met dienstverleners die we nodig hebben om de website te laten werken:</p>
              <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                <li>
                  <strong className="text-[var(--text)]">Cloudflare:</strong> Hosting en beveiliging van de website
                </li>
                <li>
                  <strong className="text-[var(--text)]">Resend:</strong> Versturen van contactformulier-e-mails naar ons
                </li>
                <li>
                  <strong className="text-[var(--text)]">Google:</strong> Alleen als je de kaart laadt (Google Maps)
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] pt-2">Deze partijen gebruiken je gegevens alleen voor de doeleinden waarvoor we ze inschakelen en volgens hun eigen privacybeleid.</p>
            </div>
          </div>

          {/* Jouw rechten */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Wat zijn je rechten?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 space-y-4" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)]">Je hebt altijd het recht om:</p>
              <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                <li>
                  <strong className="text-[var(--text)]">Inzage:</strong> Te vragen welke gegevens we van jou hebben
                </li>
                <li>
                  <strong className="text-[var(--text)]">Correctie:</strong> Onjuiste gegevens te laten corrigeren
                </li>
                <li>
                  <strong className="text-[var(--text)]">Verwijdering:</strong> Je gegevens te laten verwijderen
                </li>
                <li>
                  <strong className="text-[var(--text)]">Bezwaar:</strong> Bezwaar te maken tegen verwerking van je gegevens
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] pt-4">
                Neem hiervoor contact met ons op via{" "}
                <a href={`mailto:${cafeInfo.contact.email}`} className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                  {cafeInfo.contact.email}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Gebruiken we cookies?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8 space-y-4" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)]">Deze website gebruikt minimaal cookies:</p>
              <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                <li>
                  <strong className="text-[var(--text)]">Lokale opslag (localStorage):</strong> We onthouden je keuze om de Google Maps kaart te laden. Deze informatie blijft alleen in je browser en wordt nergens naartoe gestuurd.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Cloudflare Turnstile:</strong> Voor het contactformulier gebruikt Turnstile tijdelijke gegevens om spam te voorkomen.
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] pt-2">We gebruiken geen tracking cookies, geen advertentiecookies, en geen analytics zoals Google Analytics.</p>
            </div>
          </div>

          {/* Vragen */}
          <div>
            <h2 className="text-2xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">Vragen over privacy?</h2>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] p-8" style={{ boxShadow: "var(--shadow)" }}>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Heb je vragen over hoe we met je gegevens omgaan? Neem gerust contact met ons op via{" "}
                <a href={`mailto:${cafeInfo.contact.email}`} className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                  {cafeInfo.contact.email}
                </a>{" "}
                of kom langs in het café.
              </p>
            </div>
          </div>

          {/* Back button */}
          <div className="text-center pt-8 ">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)]  rounded-[var(--radius)] hover:bg-[var(--accent-hover)] transition-colors font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar home
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
