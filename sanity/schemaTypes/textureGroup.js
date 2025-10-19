export default {
  name: 'textureGroup',
  title: 'Texture Group',
  type: 'document',
  fields: [
    {
      name: 'key',
      type: 'string',
      title: 'Key (home0, prjs0, etc.)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'assets',
      type: 'array',
      title: 'Assets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
              },
            },
            {
              name: 'file',
              type: 'file',
              title: 'File',
              options: { accept: 'image/*,video/*' },
            },
            { name: 'width', type: 'number', title: 'Width' },
            { name: 'height', type: 'number', title: 'Height' },
          ],
        },
      ],
    },
  ],
};
