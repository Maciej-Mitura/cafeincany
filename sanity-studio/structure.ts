import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      S.listItem()
        .title('Evenementen')
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .title('Evenementen')
            .defaultOrdering([{ field: 'startDateTime', direction: 'desc' }]),
        ),
    ]);
