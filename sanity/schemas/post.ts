const postSchema = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    },
    {
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.integer().min(0)
    }
  ]
}

export default postSchema 