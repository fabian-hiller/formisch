import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  FieldElementProps: {
    type: {
      type: 'object',
      entries: [
        {
          key: 'name',
          value: 'string',
        },
        {
          key: 'autofocus',
          optional: true,
          value: 'boolean',
        },
        {
          key: 'ref',
          optional: true,
          value: {
            type: 'function',
            params: [
              {
                name: 'element',
                type: {
                  type: 'custom',
                  name: 'FieldElement',
                  href: '/core/api/FieldElement/',
                },
              },
            ],
            return: 'void',
          },
        },
        {
          key: 'onFocus',
          optional: true,
          value: {
            type: 'custom',
            name: 'EventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
              {
                type: 'custom',
                name: 'FocusEvent',
              },
            ],
          },
        },
        {
          key: 'onInput',
          optional: true,
          value: {
            type: 'custom',
            name: 'EventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
              {
                type: 'custom',
                name: 'InputEvent',
              },
            ],
          },
        },
        {
          key: 'onChange',
          optional: true,
          value: {
            type: 'custom',
            name: 'EventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
              {
                type: 'custom',
                name: 'Event',
              },
            ],
          },
        },
        {
          key: 'onBlur',
          optional: true,
          value: {
            type: 'custom',
            name: 'EventHandler',
            generics: [
              {
                type: 'custom',
                name: 'FieldElement',
                href: '/core/api/FieldElement/',
              },
              {
                type: 'custom',
                name: 'FocusEvent',
              },
            ],
          },
        },
      ],
    },
  },
  name: {
    type: 'string',
  },
  autofocus: {
    type: 'boolean',
  },
  ref: {
    type: {
      type: 'function',
      params: [
        {
          name: 'element',
          type: {
            type: 'custom',
            name: 'FieldElement',
            href: '/core/api/FieldElement/',
          },
        },
      ],
      return: 'void',
    },
  },
  onFocus: {
    type: {
      type: 'custom',
      name: 'EventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
        {
          type: 'custom',
          name: 'FocusEvent',
        },
      ],
    },
  },
  onInput: {
    type: {
      type: 'custom',
      name: 'EventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
        {
          type: 'custom',
          name: 'InputEvent',
        },
      ],
    },
  },
  onChange: {
    type: {
      type: 'custom',
      name: 'EventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
        {
          type: 'custom',
          name: 'Event',
        },
      ],
    },
  },
  onBlur: {
    type: {
      type: 'custom',
      name: 'EventHandler',
      generics: [
        {
          type: 'custom',
          name: 'FieldElement',
          href: '/core/api/FieldElement/',
        },
        {
          type: 'custom',
          name: 'FocusEvent',
        },
      ],
    },
  },
};
