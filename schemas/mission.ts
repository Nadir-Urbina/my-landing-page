const missionSchema = {
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
      type: 'datetime',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
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
          { title: 'Open', value: 'open' },
          { title: 'Full', value: 'full' },
          { title: 'Completed', value: 'completed' },
        ],
      },
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      optional: true,
    },
  ],
}

export default missionSchema 