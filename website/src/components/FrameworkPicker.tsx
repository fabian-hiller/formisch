import { $, component$, useOnDocument, useSignal } from '@qwik.dev/core';
import { Link, useLocation } from '@qwik.dev/router';
import clsx from 'clsx';
import { useFocusTrap } from '~/hooks';
import { AngleUpIcon } from '~/icons';
import type { Framework } from '~/routes/plugin@framework';
import {
  FRAMEWORK_LIST,
  getFrameworkIcon,
  getFrameworkName,
  useFramework,
} from '~/routes/plugin@framework';

type FrameworkPickerProps = {
  class?: string;
};

/**
 * Allows the user to navigate between frameworks.
 */
export const FrameworkPicker = component$<FrameworkPickerProps>((props) => {
  // Use location and framework
  const location = useLocation();
  const framework = useFramework();

  // Create open and element signal
  const isOpen = useSignal(false);
  const rootElement = useSignal<HTMLDivElement>();

  // Create focus trap for picker
  useFocusTrap(rootElement, isOpen);

  // Close picker when clicked outside
  useOnDocument(
    'click',
    $((event) => {
      if (isOpen.value && !rootElement.value?.contains(event.target as Node)) {
        isOpen.value = false;
      }
    })
  );

  /**
   * Returns the pathname to the framework.
   */
  const getPathname = (targetFramework: Framework): string => {
    const pathList = location.url.pathname.split('/');
    pathList[1] = targetFramework;
    return pathList.join('/');
  };

  /**
   * Returns the logo component for the current framework.
   */
  const CurrentIcon = getFrameworkIcon(framework.value);

  return (
    <div class={clsx('relative', props.class)} ref={rootElement}>
      <button
        class="flex h-12 w-full items-center justify-between rounded-xl border-2 border-slate-200 px-3.5 outline-none hover:border-slate-300 focus:border-sky-600/50 focus:ring-4 focus:ring-sky-600/10 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50 dark:focus:ring-sky-400/10"
        type="button"
        onClick$={() => (isOpen.value = !isOpen.value)}
      >
        <span class="flex items-center">
          <CurrentIcon class="mr-2.5 h-[22px]" />
          <span class="text-slate-900 dark:text-slate-200">
            {getFrameworkName(framework.value)}
          </span>
        </span>
        <AngleUpIcon
          class={clsx(
            'h-4.5 transition-transform duration-200',
            isOpen.value ? 'rotate-0' : 'rotate-180'
          )}
        />
      </button>
      <nav
        class={clsx(
          'absolute z-30 w-full origin-top rounded-xl border-2 border-slate-200 bg-white/90 py-2 backdrop-blur duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-gray-900/90 dark:hover:border-slate-700',
          isOpen.value ? 'translate-y-2' : 'invisible scale-y-75 opacity-0'
        )}
        aria-hidden={!isOpen.value}
      >
        {FRAMEWORK_LIST.filter((item) => item !== framework.value).map(
          (item) => {
            const FrameworkIcon = getFrameworkIcon(item);
            return (
              <Link
                key={item}
                class="focus-ring flex items-center space-x-2.5 rounded-xl px-3.5 py-2 hover:text-slate-900 dark:hover:text-slate-200"
                href={getPathname(item)}
                onClick$={() => (isOpen.value = false)}
                prefetch={false}
              >
                <FrameworkIcon class="mr-2.5 h-[22px]" />
                {getFrameworkName(item)}
              </Link>
            );
          }
        )}
      </nav>
    </div>
  );
});
