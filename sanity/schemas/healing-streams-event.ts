import { Rule } from '@sanity/types'

const healingStreamsEventSchema = {
  name: 'healingStreamsEvent',
  title: 'Healing Streams Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule: Rule) => rule.required()
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

export default healingStreamsEventSchema 