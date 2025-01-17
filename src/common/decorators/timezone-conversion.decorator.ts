import { Timezone } from '../helpers/timezone-conversation.handler';

export function TimezoneConversion(timezoneField: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let result = await originalMethod.apply(this, args);

      if (!!result[timezoneField]) {
        result = Timezone.transformTimestamps(result, result[timezoneField]);
      }

      return result;
    };

    return descriptor;
  };
}
