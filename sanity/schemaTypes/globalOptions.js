export default {
  name: 'globalOptions',
  title: 'Global Options',
  type: 'document',
  fields: [
    {
      name: 'navHtml',
      type: 'text',
      title: 'Navigation HTML',
      rows: 50,
    },
    {
      name: 'loaderHtml',
      type: 'text',
      title: 'Loader HTML',
      rows: 15,
    },    
    {
      name: 'mbgHtml',
      type: 'text',
      title: 'Mbg HTML',
      rows: 70,
    },
    {
      name: 'textureRefs',
      type: 'array',
      title: 'Shared texture groups',
      of: [{ type: 'reference', to: [{ type: 'textureGroup' }] }],
    },
  ],
};

