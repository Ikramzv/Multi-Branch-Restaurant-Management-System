import { toZonedTime } from 'date-fns-tz';

interface TimezoneAware {
  createdAt: Date;
  updatedAt: Date;
}

export class Timezone {
  static toLocalTime(utcTime: Date, timezone: string) {
    return toZonedTime(utcTime, timezone);
  }

  static toUTC(localTime: Date) {
    return toZonedTime(localTime, 'UTC');
  }

  // Traverses the data object and converts the timestamps to the local timezone
  // If the data is an array, it will map over the array and recursively call the function on each item
  // If the data is an object, it will traverse the object and convert the timestamps to the local timezone
  private static traverse<T extends TimezoneAware | TimezoneAware[]>(
    data: T,
    timezone: string,
    fields: string[] = ['createdAt', 'updatedAt'],
  ): T {
    if (Array.isArray(data)) {
      return data.map((item) =>
        this.transformTimestamps(item, timezone, fields),
      ) as T;
    }

    return Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key];

      if (fields.includes(key)) {
        acc[key] = this.toLocalTime(data[key], timezone);
      }

      if (Array.isArray(acc[key])) {
        acc[key] = this.transformTimestamps(acc[key], timezone, fields);
      }

      return acc;
      // copies the data object and transforms the timestamps
    }, {} as T);
  }

  static transformTimestamps<T extends TimezoneAware | TimezoneAware[]>(
    data: T,
    timezone: string,
    fields: string[] = ['createdAt', 'updatedAt'],
  ): T {
    return this.traverse(data, timezone, fields);
  }
}
