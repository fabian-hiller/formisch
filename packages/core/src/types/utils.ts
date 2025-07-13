/**
 * Checks if a type is `any`.
 */
export type IsAny<Type> = 0 extends 1 & Type ? true : false;

/**
 * Checks if a type is `never`.
 */
export type IsNever<Type> = [Type] extends [never] ? true : false;

/**
 * Constructs a type that is maybe a promise.
 */
export type MaybePromise<TValue> = TValue | Promise<TValue>;

/**
 * Makes all properties deeply optional.
 */
export type DeepPartial<TValue> = TValue extends readonly unknown[]
  ? number extends TValue['length']
    ? TValue
    : { [Key in keyof TValue]?: DeepPartial<TValue[Key]> | undefined }
  : TValue extends Record<PropertyKey, unknown>
    ? { [Key in keyof TValue]?: DeepPartial<TValue[Key]> | undefined }
    : TValue | undefined;

/**
 * Makes all value properties optional.
 */
export type PartialValues<TValue> = TValue extends readonly unknown[]
  ? number extends TValue['length']
    ? TValue
    : { [Key in keyof TValue]: PartialValues<TValue[Key]> }
  : TValue extends Record<PropertyKey, unknown>
    ? { [Key in keyof TValue]: PartialValues<TValue[Key]> }
    : TValue | undefined;
