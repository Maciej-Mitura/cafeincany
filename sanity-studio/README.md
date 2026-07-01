# Café In Cany — Sanity Studio (evenementen)

Aparte Sanity Studio voor het beheren van evenementen op [incany.be](https://incany.be).  
Deze map hoort **niet** bij de Next.js-website in `incany-cafe/` en is daar nog **niet** aan gekoppeld.

## Wat zit hierin?

- Eén documenttype: **Evenement** (`event`)
- Nederlandstalige labels en hulpteksten voor de café-eigenaar
- Validatie op datums, URL’s, alt-teksten en korte omschrijving
- Documentvoorbeelden met titel, categorie, startdatum en coverafbeelding

De publieke website leest nog steeds `incany-cafe/src/data/events.json`. Dat wordt in een latere fase vervangen door Sanity-queries.

---

## Vereisten

- Node.js **18.18+** of **20+** (aanbevolen: 20 LTS)
- npm (zelfde als de Next.js-app)
- Gratis Sanity-account: [sanity.io](https://www.sanity.io/)

---

## Lokaal opstarten

### 1. Dependencies installeren

```bash
cd sanity-studio
npm install
```

### 2. Inloggen bij Sanity

```bash
npx sanity login
```

Kies **Google** of **GitHub** (of e-mail) en volg de browserprompt.

### 3. Sanity-project aanmaken

**Optie A — via CLI (aanbevolen bij eerste setup)**

```bash
npx sanity init --reconfigure
```

Kies in de prompts:

| Prompt | Aanbevolen keuze |
|--------|------------------|
| Login / account | Jouw Sanity-account |
| Create new project or select existing | **Create new project** |
| Project name | `Cafe In Cany Events` (of vergelijkbaar) |
| Dataset | **production** |
| Output path | **Huidige map behouden** / `.` (niet overschrijven met submap) |
| Template | **Clean** / schema behouden als gevraagd |
| TypeScript | **Yes** |

De CLI vult `SANITY_STUDIO_PROJECT_ID` in `.env` of in `sanity.cli.ts`. Als dat niet automatisch gebeurt, kopieer het project-ID handmatig.

**Optie B — via het dashboard**

1. Ga naar [sanity.io/manage](https://www.sanity.io/manage)
2. **Create project** → naam bv. `Cafe In Cany Events`
3. Dataset: **production**
4. Kopieer het **Project ID**
5. Maak lokaal een `.env`-bestand:

```bash
cp .env.example .env
```

Vul in (geen API-tokens nodig voor Studio):

```env
SANITY_STUDIO_PROJECT_ID=jouw-project-id
SANITY_STUDIO_DATASET=production
```

### 4. Studio starten

```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333). Je zou **Evenementen** in het linkermenu moeten zien.

---

## Testevenement aanmaken

1. Klik **Evenementen** → **Create** → **Evenement**
2. Vul minimaal in:
   - Titel
   - URL-naam (knop **Generate** naast slug)
   - Korte omschrijving
   - Categorie
   - Start- en einddatum/tijd
   - Coverafbeelding + alt-tekst
3. Laat **Gepubliceerd** aan staan
4. Klik **Publish**

Zie ook `HANDLEIDING-REDACTEUR.md` voor uitleg aan de café-eigenaar.

---

## Studio later online zetten (deploy)

Sanity host de Studio gratis op een `*.sanity.studio`-subdomein:

```bash
npm run deploy
```

Eerste keer kies je een hostnaam, bv. `cafe-incany-events` →  
`https://cafe-incany-events.sanity.studio`

Daarna kan de redacteur inloggen zonder lokaal `npm run dev` te draaien.

**Nog niet uitvoeren** als je eerst lokaal wilt testen — deploy is optioneel tot je klaar bent.

---

## Vader uitnodigen als Editor

1. Ga naar [sanity.io/manage](https://www.sanity.io/manage) → jouw project
2. Tab **Members** (of **Team**)
3. **Invite member**
4. Vul het e-mailadres van je vader in
5. Rol: **Editor** (kan inhoud maken en publiceren, geen projectinstellingen)
6. Verstuur de uitnodiging

Na acceptatie kan hij:

- de gedeployde Studio openen (`*.sanity.studio`), of
- lokaal alleen als jij dat nodig hebt (meestal niet nodig)

**Administrator** alleen voor jou (technisch beheer).

---

## Scripts

| Commando | Doel |
|----------|------|
| `npm run dev` | Lokale Studio op poort 3333 |
| `npm run build` | Productie-build van de Studio |
| `npm run deploy` | Studio publiceren op sanity.studio |

---

## Mapstructuur

```
sanity-studio/
├── schemaTypes/
│   ├── event.ts      # Evenement-schema
│   └── index.ts
├── structure.ts      # Menu: alleen Evenementen
├── sanity.config.ts
├── sanity.cli.ts
├── package.json
├── README.md
└── HANDLEIDING-REDACTEUR.md
```

---

## Publieke website koppelen (later)

Nog **niet** gedaan. In een volgende fase:

1. Sanity-client in `incany-cafe` (alleen lezen)
2. GROQ-query met `published == true`
3. Mapping naar `src/types/event.ts`
4. `next.config.ts` remote images voor `cdn.sanity.io`
5. Cloudflare env-vars voor project-ID (geen secrets in git)

---

## Veiligheid

- Commit **geen** `.env` met tokens
- Deel **geen** API-tokens in chat of documentatie
- Voor alleen Studio-gebruik is inloggen via de browser voldoende; tokens zijn pas nodig als de website gaat lezen
