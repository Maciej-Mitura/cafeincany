import { defineArrayMember, defineField, defineType } from 'sanity';

const CATEGORY_OPTIONS = [
  { title: 'DJ Night', value: 'DJ Night' },
  { title: 'Theme Night', value: 'Theme Night' },
  { title: 'Live Muziek', value: 'Live Muziek' },
  { title: 'Quiz', value: 'Quiz' },
  { title: 'Promotie', value: 'Promotie' },
  { title: 'Sport', value: 'Sport' },
  { title: 'Overig', value: 'Overig' },
] as const;

const SHORT_DESCRIPTION_MAX = 280;

type EventDocument = {
  startDateTime?: string;
  endDateTime?: string;
  coverImage?: unknown;
};

export const event = defineType({
  name: 'event',
  title: 'Evenement',
  type: 'document',
  groups: [
    { name: 'basis', title: 'Basisinformatie', default: true },
    { name: 'timing', title: 'Timing en zichtbaarheid' },
    { name: 'media', title: 'Media' },
    { name: 'extra', title: 'Extra informatie' },
    { name: 'recap', title: 'Terugblik' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'basis',
      description: 'De naam van het evenement zoals bezoekers die op de website zien.',
      validation: (Rule) => Rule.required().error('Vul een titel in.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      group: 'basis',
      description: 'Wordt automatisch voorgesteld op basis van de titel. Laat staan tenzij je een korte, vaste link nodig hebt.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Genereer een URL-naam via “Generate”.'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Korte omschrijving',
      type: 'text',
      group: 'basis',
      rows: 3,
      description: `Korte samenvatting voor op de evenementenkaart (max. ${SHORT_DESCRIPTION_MAX} tekens).`,
      validation: (Rule) =>
        Rule.required()
          .max(SHORT_DESCRIPTION_MAX)
          .error(`De korte omschrijving is verplicht en mag maximaal ${SHORT_DESCRIPTION_MAX} tekens bevatten.`),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      group: 'basis',
      description: 'Kies het type evenement. Dit bepaalt het label op de website.',
      options: {
        list: [...CATEGORY_OPTIONS],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().error('Kies een categorie.'),
    }),
    defineField({
      name: 'startDateTime',
      title: 'Startdatum en -tijd',
      type: 'datetime',
      group: 'timing',
      description: 'Wanneer het evenement begint (Belgische tijd).',
      options: {
        dateFormat: 'D MMM YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) => Rule.required().error('Vul een startdatum en -tijd in.'),
    }),
    defineField({
      name: 'endDateTime',
      title: 'Einddatum en -tijd',
      type: 'datetime',
      group: 'timing',
      description: 'Wanneer het evenement eindigt. Moet na de start liggen.',
      options: {
        dateFormat: 'D MMM YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) =>
        Rule.required()
          .error('Vul een einddatum en -tijd in.')
          .custom((endDateTime, context) => {
            const document = context.document as EventDocument | undefined;
            const startDateTime = document?.startDateTime;

            if (!startDateTime || !endDateTime) {
              return true;
            }

            if (new Date(endDateTime) <= new Date(startDateTime)) {
              return 'De einddatum moet na de startdatum liggen.';
            }

            return true;
          }),
    }),
    defineField({
      name: 'published',
      title: 'Gepubliceerd',
      type: 'boolean',
      group: 'timing',
      description:
        'Alleen gepubliceerde evenementen worden later op de publieke website getoond. Zet uit om een concept te bewaren.',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Uitgelicht',
      type: 'boolean',
      group: 'timing',
      description: 'Markeer hoogstens één belangrijk evenement met het label “Uitgelicht” op de website.',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Coverafbeelding',
      type: 'image',
      group: 'media',
      description: 'Hoofdafbeelding voor de kaart en het detailvenster. Gebruik een horizontale foto in hoge kwaliteit.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Voeg een coverafbeelding toe.'),
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Alt-tekst coverafbeelding',
      type: 'string',
      group: 'media',
      description: 'Korte beschrijving van de afbeelding voor blindengebruikers en zoekmachines.',
      validation: (Rule) =>
        Rule.required()
          .error('Alt-tekst is verplicht voor de coverafbeelding.')
          .custom((alt, context) => {
            const document = context.document as EventDocument | undefined;

            if (document?.coverImage && !alt?.trim()) {
              return 'Alt-tekst is verplicht wanneer er een coverafbeelding is.';
            }

            return true;
          }),
    }),
    defineField({
      name: 'gallery',
      title: 'Fotogalerij',
      type: 'array',
      group: 'media',
      description: 'Optionele extra foto’s, bijvoorbeeld voor een terugblik na het evenement.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
              description: 'Beschrijf wat er op de foto te zien is.',
              validation: (Rule) =>
                Rule.required().error('Alt-tekst is verplicht voor elke galerijfoto.'),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'fullDescription',
      title: 'Volledige omschrijving',
      type: 'array',
      group: 'extra',
      description: 'Uitgebreide tekst in het detailvenster op de website. Optioneel — de korte omschrijving wordt gebruikt als dit leeg is.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video-URL',
      type: 'url',
      group: 'extra',
      description: 'Link naar een video op YouTube, Vimeo of een andere website (https://).',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }).error('Gebruik een geldige URL die begint met http:// of https://.'),
    }),
    defineField({
      name: 'externalEventUrl',
      title: 'Externe evenementpagina',
      type: 'url',
      group: 'extra',
      description: 'Link naar Facebook, een ticketpagina of een andere externe pagina (https://).',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }).error('Gebruik een geldige URL die begint met http:// of https://.'),
    }),
    defineField({
      name: 'recap',
      title: 'Terugbliktekst',
      type: 'array',
      group: 'recap',
      description: 'Tekst over hoe het evenement was. Alleen zichtbaar op de website als “Terugblik publiceren” aan staat en het evenement voorbij is.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'recapPublished',
      title: 'Terugblik publiceren',
      type: 'boolean',
      group: 'recap',
      description: 'Zet aan wanneer de terugblik klaar is om getoond te worden op de website.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      startDateTime: 'startDateTime',
      published: 'published',
      media: 'coverImage',
    },
    prepare({ title, category, startDateTime, published, media }) {
      const formattedDate = startDateTime
        ? new Date(startDateTime).toLocaleString('nl-BE', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Europe/Brussels',
          })
        : 'Geen startdatum';

      const statusLabel = published === false ? ' · Concept' : '';

      return {
        title: title || 'Naamloos evenement',
        subtitle: `${category || 'Geen categorie'} · ${formattedDate}${statusLabel}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Startdatum (nieuwste eerst)',
      name: 'startDateTimeDesc',
      by: [{ field: 'startDateTime', direction: 'desc' }],
    },
    {
      title: 'Startdatum (oudste eerst)',
      name: 'startDateTimeAsc',
      by: [{ field: 'startDateTime', direction: 'asc' }],
    },
  ],
});
