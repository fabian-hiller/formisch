import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  TSchema: {
    modifier: 'extends',
    type: {
      type: 'custom',
      name: 'Schema',
      href: '/core/api/Schema/',
    },
  },
  TFieldArrayPath: {
    modifier: 'extends',
    type: {
      type: 'custom',
      name: 'RequiredPath',
      href: '/core/api/RequiredPath/',
    },
  },
  path: {
    type: {
      type: 'custom',
      name: 'ValidArrayPath',
      href: '/solid/api/ValidArrayPath/',
      generics: [
        {
          type: 'custom',
          name: 'v.InferInput',
          href: 'https://valibot.dev/api/InferInput/',
          generics: [
            {
              type: 'custom',
              name: 'TSchema',
            },
          ],
        },
        {
          type: 'custom',
          name: 'TFieldArrayPath',
        },
      ],
    },
  },
  at: {
    type: {
      type: 'union',
      options: ['number', 'undefined'],
    },
  },
  initialInput: {
    type: {
      type: 'union',
      options: [
        {
          type: 'custom',
          name: 'DeepPartial',
          href: '/core/api/DeepPartial/',
          generics: [
            {
              type: 'custom',
              name: 'PathValue',
              href: '/core/api/PathValue/',
              generics: [
                {
                  type: 'custom',
                  name: 'v.InferInput',
                  href: 'https://valibot.dev/api/InferInput/',
                  generics: [
                    {
                      type: 'custom',
                      name: 'TSchema',
                    },
                  ],
                },
                {
                  type: 'tuple',
                  items: [
                    {
                      type: 'custom',
                      name: 'TFieldArrayPath',
                      modifier: '...',
                    },
                    'number',
                  ],
                },
              ],
            },
          ],
        },
        'undefined',
      ],
    },
  },
};
