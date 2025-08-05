const campInterestSchema = {
  name: 'campInterest',
  title: 'CAMP Info Requests',
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
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Info Sent', value: 'info_sent' },
          { title: 'Applied', value: 'applied' },
          { title: 'Needs Follow-up', value: 'needs_followup' }
        ]
      },
      initialValue: 'info_sent'
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Any notes about follow-up or communication'
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
      const statusLabel = status === 'info_sent' ? '📧' : status === 'applied' ? '✅' : '⚠️';
      return {
        title: title || 'Untitled',
        subtitle: `${statusLabel} ${subtitle} (${date})`
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
    }
  ]
}

export default campInterestSchema