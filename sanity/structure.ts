import { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Books
      S.listItem()
        .title('Book')
        .child(S.documentTypeList('book')),
      
      // Testimonials  
      S.listItem()
        .title('Testimonial')
        .child(S.documentTypeList('testimonial')),
      
      // Events  
      S.listItem()
        .title('Events')
        .child(S.documentTypeList('event')),
      
      // Mission Trips
      S.listItem()
        .title('Mission Trip')
        .child(S.documentTypeList('mission')),
      
      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .child(S.documentTypeList('post')),
      
      // Comments
      S.listItem()
        .title('Comments')
        .child(S.documentTypeList('comment')),
      
      // Calendar Events
      S.listItem()
        .title('Calendar Events')
        .child(S.documentTypeList('calendarEvent')),
      
      // Healing Streams Content
      S.listItem()
        .title('Healing Streams')
        .child(
          S.list()
            .title('Healing Streams')
            .items([
              S.listItem()
                .title('Testimonials')
                .child(S.documentTypeList('healingStreamsTestimonial')),
              S.listItem()
                .title('Events')
                .child(S.documentTypeList('healingStreamsEvent')),
            ])
        ),
      
      // School of Encounter Content
      S.listItem()
        .title('School of Encounter')
        .child(
          S.list()
            .title('School of Encounter')
            .items([
              S.listItem()
                .title('Courses')
                .child(S.documentTypeList('course')),
              S.listItem()
                .title('Instructors')
                .child(S.documentTypeList('instructor')),
              S.listItem()
                .title('Interest Form Submissions')
                .child(S.documentTypeList('interestForm')),
            ])
        ),
      
      // Ministry Life
      S.listItem()
        .title('Ministry Life')
        .child(S.documentTypeList('ministry')),
      
      // CAMP Season 3 Management
      S.listItem()
        .title('CAMP Season 3')
        .child(
          S.list()
            .title('CAMP Season 3 Management')
            .items([
              S.listItem()
                .title('Info Requests')
                .child(S.documentTypeList('campInterest')),
              S.listItem()
                .title('Applications')
                .child(S.documentTypeList('campApplication')),
            ])
        ),
    ])
