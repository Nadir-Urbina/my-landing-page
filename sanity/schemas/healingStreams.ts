export default {
  name: 'healingStreams',
  title: 'Healing Streams',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    },
    {
      name: 'upcomingEvents',
      title: 'Upcoming Events',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }
  ],
} 