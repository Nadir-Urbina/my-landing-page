import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'dr-joshua-todd',
  title: 'Dr. Joshua Todd CMS',
  projectId: 'your-project-id', // Get this from sanity.io
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
}) 