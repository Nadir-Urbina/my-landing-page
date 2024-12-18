import { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Book')
        .child(S.documentTypeList('book')),
      S.listItem()
        .title('Testimonial')
        .child(S.documentTypeList('testimonial')),
      S.listItem()
        .title('Events')
        .child(S.documentTypeList('event')),
      S.listItem()
        .title('Mission Trip')
        .child(S.documentTypeList('mission')),
      S.listItem()
        .title('Blog Posts')
        .child(S.documentTypeList('post')),
      S.listItem()
        .title('Calendar Events')
        .child(S.documentTypeList('calendarEvent')),
      S.listItem()
        .title('Healing Streams Testimonial')
        .child(S.documentTypeList('healingStreamsTestimonial')),
      S.listItem()
        .title('Healing Streams Event')
        .child(S.documentTypeList('healingStreamsEvent')),
    ])
