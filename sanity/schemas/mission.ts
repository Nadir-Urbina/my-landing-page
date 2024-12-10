export default {
  name: 'mission',
  title: 'Mission Trip',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'cost',
      title: 'Cost',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Open for Registration', value: 'open' },
          { title: 'Full', value: 'full' },
          { title: 'Completed', value: 'completed' }
        ]
      }
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }
  ],
} 