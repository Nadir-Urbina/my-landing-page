export default {
  name: 'healingStreamsEvent',
  title: 'Healing Streams Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url'
    }
  ]
} 