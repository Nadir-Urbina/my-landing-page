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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the detail page URL (/ministry/your-slug). Required if you add Page Content below.',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'description',
      title: 'Card Description',
      type: 'text',
      description: 'Short summary shown on the landing page card. Keep it brief \u2014 it is clamped to a few lines.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'body',
      title: 'Page Content',
      type: 'array',
      description: 'Optional. If filled in, this ministry gets its own page at /ministry/[slug] and the "Learn More" button links there instead of the Learn More Link.',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
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
      description: 'External or existing page to link to. Used when Page Content is empty; when Page Content is filled in, this becomes a call-to-action button on the detail page.',
      validation: (Rule: any) =>
        Rule.custom((value: string, context: any) => {
          const hasBody = context.document?.body?.length > 0
          if (!value && !hasBody) {
            return 'Add either a Learn More Link or Page Content so the card has somewhere to go.'
          }
          return true
        })
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