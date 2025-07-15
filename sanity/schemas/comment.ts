import { Rule } from '@sanity/types'

const commentSchema = {
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Blog Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule: Rule) => rule.required().email()
    },
    {
      name: 'content',
      title: 'Comment Content',
      type: 'text',
      validation: (rule: Rule) => rule.required().max(1000)
    },
    {
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      description: 'Whether this comment is approved for display',
      initialValue: false
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (rule: Rule) => rule.required()
    },
    {
      name: 'approvedAt',
      title: 'Approved At',
      type: 'datetime',
      description: 'When this comment was approved (if applicable)'
    },
    {
      name: 'moderatorNotes',
      title: 'Moderator Notes',
      type: 'text',
      description: 'Internal notes for moderators'
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'content',
      media: 'post.mainImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `Comment by ${title}`,
        subtitle: subtitle?.substring(0, 50) + '...',
        media
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: 'submittedAt', direction: 'asc' }]
    },
    {
      title: 'Approval Status',
      name: 'approvalStatus',
      by: [{ field: 'isApproved', direction: 'asc' }]
    }
  ]
}

export default commentSchema 