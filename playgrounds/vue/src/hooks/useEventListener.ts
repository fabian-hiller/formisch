import { onMounted, onUnmounted } from 'vue';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void
): void {
  onMounted(() => {
    window.addEventListener(eventName, handler);
  });

  onUnmounted(() => {
    window.removeEventListener(eventName, handler);
  });
}
