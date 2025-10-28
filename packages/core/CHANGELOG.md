# Changelog

All notable changes to the library will be documented in this file.

## vX.X.X (Month DD, YYYY)

- Fix bug when setting array input with more array items than previous state (pull request #29)

## v0.4.0 (September 22, 2025)

- Add new `initialElements` state to `InternalBaseStore` interface and update `initializeFieldStore`
- Change interfaces of `InternalFieldStore` to support `null` and `undefined` values for arrays and objects (issue #15)
- Fix bug in `copyItemState`, `resetItemState` and `swapItemState` by including `elements` and `errors` state

## v0.3.1 (September 13, 2025)

- Fix `setFieldInput` and `setInitialFieldInput` for nullish arrays and objects (issue #15)

## v0.3.0 (August 17, 2025)

- Change implementation of `setFieldInput` to set `isTouched` to `true`
- Fix `PathValue`, `ValidPath` and `ValidArrayPath` for optional properties (issue #13)

## v0.2.0 (July 27, 2025)

- Change name of `validate` method to `parse` in internal form store
- Change name of `validateOn` config to `validate` in internal form store
- Change name of `revalidateOn` config to `revalidate` in internal form store
- Fix bug in `resetItemState` by also resetting `.errors` signals

## v0.1.0 (July 14, 2025)

- Initial release
