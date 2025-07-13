export interface Signal<T> {
  value: T;
}

export interface Batch {
  <T>(fn: () => T): T;
}

export interface Untrack {
  <T>(fn: () => T): T;
}
