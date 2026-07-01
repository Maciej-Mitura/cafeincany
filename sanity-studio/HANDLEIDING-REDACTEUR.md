# Handleiding evenementen — Café In Cany

Korte gids voor het beheren van evenementen in Sanity Studio.  
Je hoeft niets te weten van GitHub, code of Cloudflare — alleen dit scherm gebruiken.

---

## Inloggen

1. Open de link die je van ons krijgt (bijv. `https://….sanity.studio`)
2. Log in met het uitgenodigde e-mailadres
3. Klik links op **Evenementen**

---

## Nieuw evenement maken

1. Klik op **+** of **Create** → **Evenement**
2. Vul de velden in per tab:

### Basisinformatie

| Veld | Wat invullen? |
|------|----------------|
| **Titel** | Naam van het feest, bv. “DJ Marc Draait de Classics” |
| **URL-naam** | Klik **Generate** — laat het voorstel staan |
| **Korte omschrijving** | 1–3 zinnen voor op de kaart op de website |
| **Categorie** | Kies het type (DJ Night, Quiz, …) |

### Timing en zichtbaarheid

| Veld | Wat invullen? |
|------|----------------|
| **Startdatum en -tijd** | Wanneer begint het? |
| **Einddatum en -tijd** | Wanneer is het afgelopen? (moet na de start liggen) |
| **Gepubliceerd** | **Aan** = zichtbaar op de site (later). **Uit** = concept, nog niet tonen |
| **Uitgelicht** | Zet **aan** voor maximaal één belangrijk evenement met label “Uitgelicht” |

### Media

| Veld | Wat invullen? |
|------|----------------|
| **Coverafbeelding** | Hoofdfoto — upload via **Upload** of sleep een foto |
| **Alt-tekst coverafbeelding** | Kort wat er op de foto staat, bv. “DJ-booth met publiek in het café” |
| **Fotogalerij** | Optioneel — extra foto’s (elke foto **moet** alt-tekst hebben) |

### Extra informatie (optioneel)

| Veld | Wat invullen? |
|------|----------------|
| **Volledige omschrijving** | Langere tekst voor het detailvenster |
| **Video-URL** | Link naar YouTube/Vimeo (`https://…`) |
| **Externe evenementpagina** | Link naar Facebook of tickets (`https://…`) |

3. Klik rechtsboven op **Publish** (niet alleen Save draft)

---

## Afbeelding toevoegen

1. Ga naar tab **Media**
2. Bij **Coverafbeelding**: klik **Upload** of sleep een bestand
3. Vul **Alt-tekst** in — verplicht voor toegankelijkheid
4. Optioneel: bij **Fotogalerij** op **Add item** → upload + alt-tekst per foto

**Tip:** Gebruik liggende foto’s in goede kwaliteit. Te grote bestanden mogen, Sanity comprimeert ze.

---

## Publiceren en depubliceren

- **Gepubliceerd aan + Publish** → evenement is klaar voor de website (zodra die gekoppeld is)
- **Gepubliceerd uit** → bewaren als concept, bezoekers zien het niet
- Om een fout te herstellen: document openen → aanpassen → opnieuw **Publish**
- Om tijdelijk te verbergen: zet **Gepubliceerd** uit → **Publish**

---

## Na het evenement: terugblik en foto’s

1. Open het evenement
2. Tab **Terugblik**:
   - **Terugbliktekst** — hoe was de avond? (optioneel)
   - **Terugblik publiceren** — zet **aan** als de tekst op de site mag
3. Tab **Media** → voeg foto’s toe aan **Fotogalerij** (met alt-tekst)
4. Klik **Publish**

### Wat betekent “Terugblik publiceren”?

- **Uit** — terugbliktekst blijft verborgen, ook al is het evenement voorbij
- **Aan** — zodra de website gekoppeld is, zien bezoekers de terugblik bij voorbije evenementen

Foto’s in de galerij verschijnen in het detailvenster wanneer ze geüpload zijn (de website toont ze zodra die fase klaar is).

---

## Wat doet “Uitgelicht”?

- Markeert een evenement met het label **Uitgelicht** op de website
- Gebruik dit spaarzaam — bijvoorbeeld voor de belangrijkste avond van de maand
- Meerdere evenementen kunnen technisch uitgelicht zijn; op de site is één uitgelicht evenement het netst

---

## Veelgemaakte fouten

| Probleem | Oplossing |
|----------|-----------|
| Rode melding bij einddatum | Eindtijd moet **na** starttijd liggen |
| Kan niet publiceren | Controleer verplichte velden: titel, slug, categorie, datums, cover + alt-tekst |
| URL werkt niet | Moet beginnen met `https://` |
| Korte omschrijving te lang | Max. 280 tekens — kort in |

---

## Hulp nodig?

Neem contact op met degene die de website beheert. Jij hoeft alleen inhoud in te vullen; het uiterlijk van de site past zich automatisch aan.
