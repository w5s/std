export const __hasOwn: typeof Object.hasOwn = (object, propertyName) =>
  // eslint-disable-next-line e18e/prefer-object-has-own
  Object.prototype.hasOwnProperty.call(object, propertyName);
