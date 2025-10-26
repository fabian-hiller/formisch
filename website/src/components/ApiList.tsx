import { component$ } from '@qwik.dev/core';
import { type ContentMenu, Link } from '@qwik.dev/router';

type ApiListProps = {
  label?: string;
  items: ContentMenu[];
};

/**
 * List to display APIs and navigate to their documentation.
 */
export const ApiList = component$<ApiListProps>(({ label, items }) => (
  <ul class="ml-8! lg:ml-10! flex list-none flex-row flex-wrap gap-2">
    {label && label + ': '}
    {items.map((item, index) => (
      <li key={item.href} class="p-0!">
        <Link href={item.href}>
          <code>{item.text}</code>
        </Link>
        {index < items.length - 1 && ','}
      </li>
    ))}
  </ul>
));
