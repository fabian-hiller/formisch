import {
  $,
  component$,
  Slot,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from '@qwik.dev/core';
import clsx from 'clsx';

type ExpandableProps = {
  class?: string;
  id?: string;
  expanded: boolean;
};

/**
 * Wrapper component to vertically expand or collapse content.
 */
export const Expandable = component$(
  ({ id, expanded, ...props }: ExpandableProps) => {
    // Use element signal
    const element = useSignal<HTMLDivElement>();

    /**
     * Updates the expandable element height.
     */
    const updateElementHeight = $(() => {
      element.value!.style.height = `${
        expanded ? element.value!.scrollHeight : 0
      }px`;
    });

    // Expand or collapse content when expanded prop change
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => expanded);
      updateElementHeight();
    });

    // Update element height when window size change
    useOnWindow(
      'resize',
      $(async () => {
        element.value!.style.maxHeight = '0';
        await updateElementHeight();
        element.value!.style.maxHeight = '';
      })
    );

    return (
      <div
        class={clsx(
          '!m-0 h-0 origin-top duration-200',
          !expanded && 'invisible -translate-y-2 scale-y-75 opacity-0',
          props.class
        )}
        id={id}
        ref={element}
        aria-hidden={!expanded}
      >
        <Slot />
      </div>
    );
  }
);
