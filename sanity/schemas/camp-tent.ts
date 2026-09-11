const campTentSchema = {
  name: 'campTent',
  title: 'CAMP Tent',
  type: 'document',
  description: 'A specialization tent inside CAMP. Adding any tent here replaces the built-in list on /camp entirely.',
  fields: [
    {
      name: 'name',
      title: 'Tent Name',
      type: 'string',
      description: 'E.g. "Bloodline Deliverance"',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'leader',
      title: 'Tent Leader(s)',
      type: 'string',
      description: 'E.g. "Ben & Page Irvine"',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'leaderImage',
      title: 'Leader Photo',
      type: 'image',
      description: 'Optional. Falls back to initials when empty.',
      options: { hotspot: true }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 10,
      description: 'Leave empty to show the tent as "Coming soon".'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'E.g. "12-week intensive"',
      initialValue: '12-week intensive'
    },
    {
      name: 'price',
      title: 'Tent Price Override',
      type: 'string',
      description: 'Only fill this in if this tent costs something different from the standard tent price set on the CAMP Page.'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required().integer()
    },
    {
      name: 'isActive',
      title: 'Show on the page',
      type: 'boolean',
      initialValue: true
    }
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }
  ],
  preview: {
    select: { title: 'name', subtitle: 'leader', media: 'leaderImage' }
  }
}

export default campTentSchema
