/**
 * Returns a formatted date as a string.
 *
 * @param dateString
 * @returns {string}
 */
export const parseDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));

  return date.toDateString();
};

/**
 * Returns a formatted date with time as a string.
 *
 * @param dateString
 * @returns {string}
 */

export const parseDateWithTime = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const monthFormatted = month < 10 ? `0${month}` : month;
  const dayFormatted = day < 10 ? `0${day}` : day;
  const hourFormatted = hour < 10 ? `0${hour}` : hour;
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;

  return `${year}-${monthFormatted}-${dayFormatted} ${hourFormatted}:${minuteFormatted}`;
};

export function timeSince(
  date: Date | number,
  lang = navigator.language
): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
