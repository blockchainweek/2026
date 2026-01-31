import { TZDate } from "@date-fns/tz";

const TIMEZONE = "Europe/Berlin";

export class BerlinDate extends TZDate {
  constructor();
  constructor(timestamp: number);
  constructor(dateString: string);
  constructor(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  );
  constructor(
    first?: number | string,
    month?: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ) {
    if (typeof first === "undefined") {
      super(TIMEZONE);
    } else if (typeof first === "string") {
      super(first, TIMEZONE);
    } else if (typeof month === "undefined") {
      super(first, TIMEZONE);
    } else {
      super(first, month, date || 0, hours || 0, minutes || 0, seconds || 0, ms || 0, TIMEZONE);
    }
  }

  // Static helper to create a BerlinDate from a Date object
  static from(date: Date): BerlinDate {
    return new BerlinDate(date.toISOString());
  }
}
