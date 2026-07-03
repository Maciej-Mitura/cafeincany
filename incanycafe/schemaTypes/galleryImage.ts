import {defineField, defineType} from 'sanity'

type GalleryImageDocument = {
  image?: unknown
}

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Sfeerbeeld',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'De hoofdtitel die op de website verschijnt wanneer bezoekers over de foto gaan.',
      validation: (Rule) => Rule.required().error('Vul een titel in.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Ondertitel',
      type: 'string',
      description: 'Korte extra tekst onder de titel, bijvoorbeeld wat er op de foto te zien is.',
      validation: (Rule) => Rule.required().error('Vul een ondertitel in.'),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      description: 'De datum van het moment op de foto. Alleen de dag telt, geen tijdstip.',
      options: {
        dateFormat: 'D MMM YYYY',
      },
      validation: (Rule) => Rule.required().error('Vul een datum in.'),
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      description: 'De sfeerfoto voor op de website. Kies een scherpe foto in liggend formaat.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Voeg een foto toe.'),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-tekst',
      type: 'string',
      description: 'Korte beschrijving van de foto voor blindengebruikers en zoekmachines.',
      validation: (Rule) =>
        Rule.required()
          .error('Alt-tekst is verplicht wanneer er een foto is.')
          .custom((alt, context) => {
            const document = context.document as GalleryImageDocument | undefined

            if (document?.image && !alt?.trim()) {
              return 'Alt-tekst is verplicht wanneer er een foto is.'
            }

            return true
          }),
    }),
    defineField({
      name: 'published',
      title: 'Gepubliceerd',
      type: 'boolean',
      description:
        'Alleen gepubliceerde sfeerbeelden verschijnen op de website. Zet uit om een concept te bewaren.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({title, date, media}) {
      const formattedDate = date
        ? new Date(`${date}T12:00:00`).toLocaleDateString('nl-BE', {
            dateStyle: 'medium',
            timeZone: 'Europe/Brussels',
          })
        : 'Geen datum'

      return {
        title: title || 'Naamloos sfeerbeeld',
        subtitle: formattedDate,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Datum (nieuwste eerst)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Datum (oudste eerst)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
