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
  TFieldPath: {
    modifier: 'extends',
    type: {
      type: 'custom',
      name: 'RequiredPath',
      href: '/core/api/RequiredPath/',
    },
  },
  of: {
    type: {
      type: 'custom',
      name: 'FormStore',
      href: '../FormStore/',
      generics: [
        {
          type: 'custom',
          name: 'TSchema',
        },
      ],
    },
  },
  path: {
    type: {
      type: 'custom',
      name: 'ValidPath',
      href: '/core/api/ValidPath/',
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
          name: 'TFieldPath',
        },
      ],
    },
  },
  children: {
    type: {
      type: 'function',
      params: [
        {
          name: 'store',
          type: {
            type: 'custom',
            name: 'FieldStore',
            href: '../FieldStore/',
            generics: [
              {
                type: 'custom',
                name: 'TSchema',
              },
              {
                type: 'custom',
                name: 'TFieldPath',
              },
            ],
          },
        },
      ],
      return: {
        type: 'custom',
        name: 'JSX.Element',
      },
    },
  },
};
