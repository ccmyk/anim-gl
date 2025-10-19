export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'template',
      type: 'string',
      title: 'Template key',
      description: 'home, projects, about, playground, error',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainHtml',
      type: 'text',
      title: 'HTML template',
      rows: 40,
    },
    {
      name: 'textureRefs',
      type: 'array',
      title: 'Texture groups used',
      of: [{ type: 'reference', to: [{ type: 'textureGroup' }] }],
    },
  ],
};
