import { type ContentMenu, routeLoader$ } from '@qwik.dev/router';
import { useFramework } from './plugin@framework';

/**
 * Returns the current menu based on the selected framework and area.
 */
export const useMenu = routeLoader$(async ({ resolveValue, pathname }) => {
  // Determine area and framework
  const area = pathname.split('/')[2];
  const framework = await resolveValue(useFramework);

  // Load all menus and find correct one
  const menuEntry = Object.entries(
    import.meta.glob<{ default: ContentMenu }>('./**/menu.md')
  ).find(([path]) => path.includes(`/${framework}/${area}/`));

  // Return menu or null
  if (menuEntry) {
    const [, readFile] = menuEntry;
    return (await readFile()).default;
  }
  return null;
});

/**
 * Returns all hrefs from other menus in the same area but different frameworks.
 */
export const useOtherMenuHrefs = routeLoader$(
  async ({ resolveValue, pathname }) => {
    // Determine area and framework
    const area = pathname.split('/')[2];
    const framework = await resolveValue(useFramework);

    // Load, filter and read all other menus
    const menus = await Promise.all(
      Object.entries(import.meta.glob<{ default: ContentMenu }>('./**/menu.md'))
        .filter(
          ([path]) =>
            !path.includes(`/${framework}/`) && path.includes(`/${area}/`)
        )
        .map(async ([, readFile]) => (await readFile()).default)
    );

    // Return all hrefs from other menus
    return menus.flatMap((menu) =>
      menu.items?.flatMap((item) => item.items).map((item) => item?.href)
    );
  }
);
