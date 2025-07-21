import type { Ref, ShallowRef } from 'vue';

export type MaybeRef<T> = T | Readonly<Ref<T> | ShallowRef<T>>;
