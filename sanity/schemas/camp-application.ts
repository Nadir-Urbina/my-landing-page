const campApplicationSchema = {
  name: 'campApplication',
  title: 'CAMP Applications',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'ministry',
      title: 'Current Ministry',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'kingdomLeader',
      title: 'Kingdom Leader',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'propheticTraining',
      title: 'Prophetic Training & Involvement',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'salvationExperience',
      title: 'Salvation Experience',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'viewOfGod',
      title: 'View of God',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'hopesToLearn',
      title: 'Hopes to Learn',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'howHeardAboutCamp',
      title: 'How They Heard About CAMP',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'knowSomeoneInCamp',
      title: 'Knows Someone in CAMP',
      type: 'string'
    },
    {
      name: 'potentialCandidates',
      title: 'Potential Candidates',
      type: 'text'
    },
    {
      name: 'financialCommitmentAcknowledged',
      title: 'Financial Commitment Acknowledged',
      type: 'boolean',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Under Review', value: 'under_review' },
          { title: 'Accepted', value: 'accepted' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Waitlisted', value: 'waitlisted' }
        ]
      },
      initialValue: 'pending'
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Started', value: 'not_started' },
          { title: 'Active', value: 'active' },
          { title: 'Past Due', value: 'past_due' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Incomplete', value: 'incomplete' }
        ]
      },
      initialValue: 'not_started'
    },
    {
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      description: 'Stripe customer ID for payment tracking'
    },
    {
      name: 'stripeSubscriptionId',
      title: 'Stripe Subscription ID',
      type: 'string',
      description: 'Stripe subscription ID for payment tracking'
    },
    {
      name: 'reviewNotes',
      title: 'Review Notes',
      type: 'text',
      description: 'Notes from Dr. Josh or admin about the application review'
    },
    {
      name: 'paymentLinkSent',
      title: 'Payment Link Sent',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'paymentLinkSentAt',
      title: 'Payment Link Sent Date',
      type: 'datetime'
    },
    {
      name: 'paymentLinkSentCount',
      title: 'Payment Link Send Count',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'communicationLog',
      title: 'Communication Log',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'datetime'
            },
            {
              name: 'type',
              title: 'Communication Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Email Sent', value: 'email_sent' },
                  { title: 'Email Received', value: 'email_received' },
                  { title: 'Phone Call', value: 'phone_call' },
                  { title: 'Note Added', value: 'note' },
                  { title: 'Payment Link Sent', value: 'payment_link_sent' }
                ]
              }
            },
            {
              name: 'subject',
              title: 'Subject/Topic',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Content/Notes',
              type: 'text'
            }
          ],
          preview: {
            select: {
              title: 'subject',
              subtitle: 'type',
              description: 'date'
            },
            prepare: function(selection: Record<string, any>) {
              const { title, subtitle, description } = selection;
              const date = description ? new Date(description).toLocaleDateString() : '';
              return {
                title: title || 'Communication',
                subtitle: `${subtitle} - ${date}`
              };
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      description: 'submittedAt',
      status: 'status'
    },
    prepare: function(selection: Record<string, any>) {
      const { title, subtitle, description, status } = selection;
      const date = description ? new Date(description).toLocaleDateString() : '';
      const statusEmojiMap: Record<string, string> = {
        'pending': '⏳',
        'under_review': '👀',
        'accepted': '✅',
        'rejected': '❌',
        'waitlisted': '⏰'
      };
      const statusEmoji = statusEmojiMap[status] || '❓';
      
      return {
        title: title || 'Untitled',
        subtitle: `${statusEmoji} ${subtitle} (${date})`
      };
    }
  },
  orderings: [
    {
      title: 'Submission Date (Newest)',
      name: 'submissionDateDesc',
      by: [
        { field: 'submittedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Status',
      name: 'statusOrder',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' }
      ]
    }
  ]
}

export default campApplicationSchema