import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Anim GL Portfolio',

  projectId: 'mz6c1yf7',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
