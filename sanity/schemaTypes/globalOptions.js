export default {
  name: 'globalOptions',
  title: 'Global Options',
  type: 'document',
  fields: [
    {
      name: 'navHtml',
      type: 'text',
      title: 'Navigation HTML',
      rows: 10,
    },
    {
      name: 'loaderHtml',
      type: 'text',
      title: 'Loader HTML',
      rows: 10,
    },
    {
      name: 'textureRefs',
      type: 'array',
      title: 'Shared texture groups',
      of: [{ type: 'reference', to: [{ type: 'textureGroup' }] }],
    },
  ],
};
