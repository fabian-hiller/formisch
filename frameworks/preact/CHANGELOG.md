# Changelog

All notable changes to the library will be documented in this file.

## vX.X.X (Month DD, YYYY)

- Add `SubmitHandler` type from `@formisch/core` to exports
- Change `render` prop to `children` in `Field` and `FieldArray` component
- Change name of `validateOn` and `revalidateOn` config by removing `On` suffix
- Change name of `revalidateOn` config to `revalidate` in internal form store
- Refactor `useField` and `useFieldArray` to improve implementation
- Refactor `Form` component to use new `handleSubmit` method
- Fix bug when resetting dynamic field array items

## v0.1.0 (July 18, 2025)

- Initial release
