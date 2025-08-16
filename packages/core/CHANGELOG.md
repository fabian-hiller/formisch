# Changelog

All notable changes to the library will be documented in this file.

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
