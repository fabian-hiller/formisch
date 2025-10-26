import type { Component, SVGProps } from '@qwik.dev/core/internal';
import type { JSONValue } from '@qwik.dev/router';
import {
  type RequestEventAction,
  routeAction$,
  routeLoader$,
} from '@qwik.dev/router';
import { PreactIcon, QwikIcon, SolidIcon, SvelteIcon, VueIcon } from '~/icons';
import { PreactLogo, QwikLogo, SolidLogo, SvelteLogo, VueLogo } from '~/logos';

const COOKIE_NAME = 'framework';

export type Framework = 'preact' | 'qwik' | 'solid' | 'svelte' | 'vue';

export const FRAMEWORK_LIST: Framework[] = [
  'preact',
  'qwik',
  'solid',
  'svelte',
  'vue',
];

export const FRAMEWORK_NAME_MAP: Record<Framework, string> = {
  preact: 'Preact',
  qwik: 'Qwik',
  solid: 'SolidJS',
  svelte: 'Svelte',
  vue: 'Vue',
};

const FRAMEWORK_LOGO_MAP: Record<
  Framework,
  Component<SVGProps<SVGSVGElement>>
> = {
  preact: PreactLogo,
  qwik: QwikLogo,
  solid: SolidLogo,
  svelte: SvelteLogo,
  vue: VueLogo,
};

const FRAMEWORK_ICON_MAP: Record<
  Framework,
  Component<SVGProps<SVGSVGElement>>
> = {
  preact: PreactIcon,
  qwik: QwikIcon,
  solid: SolidIcon,
  svelte: SvelteIcon,
  vue: VueIcon,
};

/**
 * Returns the value of the framework cookie.
 */
function getCookie(request: RequestEventAction): Framework {
  const value = request.cookie.get(COOKIE_NAME)?.value;
  if (
    value === 'preact' ||
    value === 'qwik' ||
    value === 'solid' ||
    value === 'svelte' ||
    value === 'vue'
  ) {
    return value;
  }
  return 'solid'; // default framework
}

/**
 * Sets the value of the framework cookie.
 */
function setCookie(request: RequestEventAction, framework: Framework): void {
  if (getCookie(request) !== framework) {
    request.cookie.set(COOKIE_NAME, framework, {
      httpOnly: true,
      maxAge: 31557600, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: import.meta.env.PROD,
    });
  }
}

/**
 * Returns the current framework.
 */
export const useFramework = routeLoader$((request) => {
  // Get first path segment
  const firstSegment = request.url.pathname.split('/')[1];

  // Special handling if path segment is a framework
  if ((FRAMEWORK_LIST as string[]).includes(firstSegment)) {
    const framework = firstSegment as Framework;

    // Update framework cookie to match path segment
    setCookie(request, framework);

    // Return framework from the path segment
    return framework;
  }

  // Otherwise, fall back to cookie value
  return getCookie(request);
});

/**
 * Sets the framework by updating the framework cookie.
 */
export const useSetFramework = routeAction$((form, request) => {
  const framework = form.framework;

  // Validate the framework value
  if ((FRAMEWORK_LIST as JSONValue[]).includes(framework)) {
    setCookie(request, framework as Framework);
  }
});

/**
 * Returns the display name of the framework.
 */
export const getFrameworkName = (framework: Framework): string =>
  FRAMEWORK_NAME_MAP[framework];

/**
 * Returns the logo component of the framework.
 */
export const getFrameworkLogo = (framework: Framework) =>
  FRAMEWORK_LOGO_MAP[framework];

/**
 * Returns the icon component of the framework.
 */
export const getFrameworkIcon = (framework: Framework) =>
  FRAMEWORK_ICON_MAP[framework];
