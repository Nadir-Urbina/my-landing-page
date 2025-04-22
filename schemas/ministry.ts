const ministrySchema = {
  name: 'ministry',
  title: 'Ministry Life',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Ministry Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Role Title',
      type: 'string',
      description: 'E.g., "Senior Leader at East Gate" or "Elder at TWGA"',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon from Lucide React (e.g., CircleUserRound, Heart, Crown, BookOpen, Tent)',
      options: {
        list: [
          { title: 'User (Circle)', value: 'CircleUserRound' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Crown', value: 'Crown' },
          { title: 'Book Open', value: 'BookOpen' },
          { title: 'Tent', value: 'Tent' },
          { title: 'Gift', value: 'Gift' },
          { title: 'Star', value: 'Star' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Users', value: 'Users' },
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Church', value: 'Church' },
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'learnMoreLink',
      title: 'Learn More Link',
      type: 'url',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display the ministry (lower numbers shown first)',
      validation: (Rule: any) => Rule.required().integer().positive()
    },
    {
      name: 'registrationBadge',
      title: 'Registration Badge',
      type: 'object',
      fields: [
        {
          name: 'isActive',
          title: 'Show Badge',
          type: 'boolean',
          default: false
        },
        {
          name: 'text',
          title: 'Badge Text',
          type: 'string',
          description: 'E.g., "2025 Registration Open"'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'role',
      media: 'image'
    }
  }
}

export default ministrySchema 