const campPageSchema = {
  name: 'campPage',
  title: 'CAMP Page',
  type: 'document',
  description: 'Settings for the /camp funnel page. Only one of these is needed.',
  fields: [
    {
      name: 'checkoutUrl',
      title: 'Checkout URL',
      type: 'url',
      description: 'Where every join button sends people.',
      initialValue: 'https://ccm.drjoshuatodd.com/campv4-checkout',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Join CAMP'
    },
    {
      name: 'seasonLabel',
      title: 'Season Label',
      type: 'string',
      description: 'E.g. "Season 4"',
      initialValue: 'Season 4'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      initialValue: '$20'
    },
    {
      name: 'priceNote',
      title: 'Price Note',
      type: 'string',
      initialValue: 'per month · cancel anytime'
    },
    {
      name: 'tentPrice',
      title: 'Tent Price',
      type: 'string',
      description: 'Cost to enrol in one specialization tent, separate from membership. Shown on every tent card.',
      initialValue: '$300'
    },
    {
      name: 'tentPriceNote',
      title: 'Tent Price Note',
      type: 'string',
      initialValue: 'per 12-week tent'
    },
    {
      name: 'memberCount',
      title: 'Member Count',
      type: 'string',
      description: 'Shown in the stat band, e.g. "120+". Leave empty to hide that stat.',
      initialValue: '120+'
    },
    {
      name: 'openingSoon',
      title: 'Registration not open yet',
      type: 'boolean',
      description: 'When on, the page shows an "opening soon" notice instead of presenting the join buttons as live.',
      initialValue: false
    },
    {
      name: 'openingSoonNote',
      title: 'Opening Soon Note',
      type: 'string',
      description: 'Shown when the switch above is on, e.g. "Season 4 registration opens in October."'
    },
    {
      name: 'testimonialVideoUrl',
      title: 'Testimonial Video URL',
      type: 'url',
      description: 'YouTube or Vimeo link for the member testimonial video. Paste the normal watch/share URL. The video testimonial section is hidden entirely until this is set.'
    },
    {
      name: 'testimonialVideoPoster',
      title: 'Testimonial Video Thumbnail',
      type: 'image',
      description: 'Optional still shown before the video is played. Falls back to the CAMP hero image.',
      options: { hotspot: true }
    },
    {
      name: 'testimonialVideoCaption',
      title: 'Testimonial Video Caption',
      type: 'string',
      description: 'Optional line under the video, e.g. "Five CAMP members on what the community has meant to them."'
    },
    {
      name: 'faqs',
      title: 'FAQ Overrides',
      type: 'array',
      description: 'Optional. Adding any question here replaces the built-in FAQ list entirely.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'answer', title: 'Answer', type: 'text', validation: (Rule: any) => Rule.required() }
          ],
          preview: { select: { title: 'question' } }
        }
      ]
    }
  ],
  preview: { prepare: () => ({ title: 'CAMP Page Settings' }) }
}

export default campPageSchema
