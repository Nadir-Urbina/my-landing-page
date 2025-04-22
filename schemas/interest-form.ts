const interestFormSchema = {
  name: 'interestForm',
  title: 'Interest Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'School of Encounter', value: 'schoolOfEncounter' }
        ]
      }
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'mailchimpStatus',
      title: 'Mailchimp Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Subscribed', value: 'subscribed' },
          { title: 'Failed', value: 'failed' }
        ]
      },
      initialValue: 'pending'
    },
    {
      name: 'statusNotes',
      title: 'Status Notes',
      type: 'text',
      description: 'Any notes about the subscription status or errors'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'submittedAt'
    },
    prepare: function(selection: Record<string, any>) {
      const { title, subtitle, description } = selection;
      const date = description ? new Date(description).toLocaleDateString() : '';
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `${subtitle} (${date})` : date
      };
    }
  },
  orderings: [
    {
      title: 'Submission Date',
      name: 'submissionDateDesc',
      by: [
        { field: 'submittedAt', direction: 'desc' }
      ]
    }
  ]
}

export default interestFormSchema 