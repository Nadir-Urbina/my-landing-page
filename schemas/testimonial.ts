const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
}

export default testimonialSchema 