export default {
  name: 'project',
  title: 'Project',
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
      name: 'projectIndex',
      type: 'number',
      title: 'Order / numeric id',
    },
    {
      name: 'template',
      type: 'string',
      title: 'Template key',
      description: 'Use “project” for all project pages',
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
    {
      name: 'nextProject',
      type: 'reference',
      title: 'Next project (data-url target)',
      to: [{ type: 'project' }],
    },
  ],
};
