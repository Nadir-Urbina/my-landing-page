const courseSchema = {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'instructor' }]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isAvailable',
      title: 'Currently Available',
      type: 'boolean',
      description: 'Is this course currently available for enrollment?',
      default: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display the course (lower numbers shown first)',
      validation: (Rule: any) => Rule.required().integer().positive()
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Link for course registration (if applicable)'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'When does the course start?'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'E.g., "6 weeks", "3 months"'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  }
}

export default courseSchema 