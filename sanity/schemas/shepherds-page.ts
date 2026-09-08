const shepherdsPageSchema = {
  name: 'shepherdsPage',
  title: 'Shepherds & Wolves Page',
  type: 'document',
  description: 'Settings for the /shepherds7 sales page. Only one of these is needed.',
  fields: [
    {
      name: 'checkoutUrl',
      title: 'Checkout URL',
      type: 'url',
      description: 'Where every "Get the book" button sends people.',
      initialValue: 'https://ccm.drjoshuatodd.com/shepherds7-checkout',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'E.g. "Get Instant Access" or "Enroll Now"',
      initialValue: 'Get Instant Access'
    },
    {
      name: 'promoVideoUrl',
      title: 'Promo Video URL',
      type: 'url',
      description: 'YouTube or Vimeo link for the hero preview. Paste the normal watch/share URL — it is converted to an embed automatically. Until this is set, the hero video is a still image and the play button is not clickable.'
    },
    {
      name: 'videoHours',
      title: 'Hours of Video',
      type: 'string',
      description: 'Shown throughout the page, e.g. "12" or "12+".',
      initialValue: '12'
    },
    {
      name: 'communityName',
      title: 'Community Name / Platform',
      type: 'string',
      description: 'Optional. Named in the community card, e.g. "the private Circle community".'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Displayed as written, e.g. "$17". Leave empty to hide pricing on the page.'
    },
    {
      name: 'compareAtPrice',
      title: 'Compare-At Price',
      type: 'string',
      description: 'Optional strikethrough price shown next to the price, e.g. "$29".'
    },
    {
      name: 'priceNote',
      title: 'Price Note',
      type: 'string',
      description: 'Small line under the button, e.g. "Instant digital download".'
    },
    {
      name: 'valueStack',
      title: 'Value Stack',
      type: 'array',
      description: 'Optional. Itemised value shown next to the price, e.g. "12 hours of video teaching" / "$1,200". The pricing block only shows this breakdown when you fill it in.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Item', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'value', title: 'Value', type: 'string', validation: (Rule: any) => Rule.required() }
          ],
          preview: { select: { title: 'label', subtitle: 'value' } }
        }
      ]
    },
    {
      name: 'totalValue',
      title: 'Total Value',
      type: 'string',
      description: 'Shown struck through above the price, e.g. "$2,400". Only used when a Value Stack is filled in.'
    },
    {
      name: 'priceAnchor',
      title: 'Price Comparison',
      type: 'string',
      description: 'One line that makes the price feel reasonable, e.g. "Less than a single day of outside consulting."'
    },
    {
      name: 'guarantee',
      title: 'Guarantee / Reassurance',
      type: 'string',
      description: 'Optional line shown near the final call to action.'
    },
    {
      name: 'endorsements',
      title: 'Endorsements',
      type: 'array',
      description: 'Optional. The endorsements section is hidden entirely when this is empty.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text', validation: (Rule: any) => Rule.required() },
            { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'role', title: 'Role / Church', type: 'string' }
          ],
          preview: { select: { title: 'name', subtitle: 'role' } }
        }
      ]
    },
    {
      name: 'faqs',
      title: 'FAQ Overrides',
      type: 'array',
      description: 'Optional. If you add any questions here they replace the built-in FAQ list entirely — useful for adding format, delivery, and refund details.',
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
  preview: {
    prepare: () => ({ title: 'Shepherds & Wolves Page Settings' })
  }
}

export default shepherdsPageSchema
