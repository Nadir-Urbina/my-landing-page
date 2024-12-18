import { Rule } from '@sanity/types'

export default {
  name: 'healingStreamsTestimonial',
  title: 'Healing Streams Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Testimony',
      type: 'text',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'healingType',
      title: 'Type of Healing',
      type: 'string',
      options: {
        list: [
          { title: 'Physical', value: 'physical' },
          { title: 'Emotional', value: 'emotional' },
          { title: 'Spiritual', value: 'spiritual' },
          { title: 'Mental', value: 'mental' },
          { title: 'Other', value: 'other' }
        ]
      }
    }
  ]
} 