export const __hasOwn: typeof Object.hasOwn = (object, propertyName) =>
  Object.prototype.hasOwnProperty.call(object, propertyName);
