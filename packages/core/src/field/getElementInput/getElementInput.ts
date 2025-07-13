import { untrack } from '../../framework/index.ts';
import type { FieldElement, InternalFieldStore } from '../../types/index.ts';
import { getFieldInput } from '../getFieldInput/index.ts';

/**
 * Returns the current input of the element.
 *
 * @param element The field element.
 * @param interalFieldStore The interal field store.
 *
 * @returns The element input.
 */
export function getElementInput(
  element: FieldElement,
  internalFieldStore: InternalFieldStore
): unknown {
  // @ts-expect-error
  if (element.options && element.multiple) {
    // @ts-expect-error
    return [...element.options]
      .filter((option) => option.selected && !option.disabled)
      .map((option) => option.value);
  }
  if (element.type === 'checkbox') {
    const options = document.getElementsByName(element.name);
    if (options.length > 1) {
      // @ts-expect-error
      return [...options]
        .filter((option) => option.checked)
        .map((option) => option.value);
    }
    // @ts-expect-error
    return element.checked;
  }
  if (element.type === 'radio') {
    const prevValue = untrack(
      () => getFieldInput(internalFieldStore) as unknown[]
    );
    // @ts-expect-error
    if (element.checked) {
      return [...prevValue, element.value];
    }
    return prevValue.filter((value) => value !== element.value);
  }
  if (element.type === 'file') {
    // @ts-expect-error
    if (element.multiple) {
      return [
        // @ts-expect-error
        ...element.files,
      ];
    }
    // @ts-expect-error
    return element.files[0];
  }
  return element.value;
}
