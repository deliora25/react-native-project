import { format, isValid } from "date-fns";

export type FormatDateProps = {
  date: string | number | Date;
  noDateDisplay?: string | undefined;
  tzCommonName?: string;
};

type TimeZoneProps = {
  commonName: string;
};

export const formatDate = ({ date, noDateDisplay }: FormatDateProps) => {
  if (date === "" || date === undefined || date === null) return noDateDisplay || "No Date";

  const newDate = new Date(date);

  // eslint-disable-next-line no-restricted-globals
  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const dateArray = newDate.toDateString().split(" ").slice(1);

    dateArray[1] = `${dateArray[1]},`;

    return dateArray.join(" ");
  }
  return "Invalid date";
};

export const formatDateToLocal = ({ date }: FormatDateProps) => {
  if (date === "" || date === undefined || date === null) return "No Date";

  const newDate = new Date(`${date}Z`);

  // eslint-disable-next-line no-restricted-globals
  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const dateArray = newDate.toDateString().split(" ").slice(1);

    dateArray[1] = `${dateArray[1]},`;
    return dateArray.join(" ");
  }
  return "Invalid date";
};

export const formatDateTime = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  // eslint-disable-next-line no-restricted-globals
  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const dateArray = newDate.toDateString().split(" ").slice(1);

    dateArray[1] = `${dateArray[1]},`;

    const dateText = dateArray.join(" ");
    const time = newDate.toLocaleTimeString();
    return `${dateText} - ${time}`;
  }
  return "Invalid date";
};

export const formatTime = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  // eslint-disable-next-line no-restricted-globals
  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const time = newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return time;
  }
  return "Invalid date";
};

// 01/01/1990
export const formatDateMMddyyyy = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  if (!isValid(newDate)) return "Invalid date";

  return format(new Date(newDate), "MM/dd/yyyy");
};

// 09/07/2023 5:48 PM
export const formatDateMMddyyyyp = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  if (!isValid(newDate)) return "Invalid date";

  return format(new Date(newDate), "MM/dd/yyyy p");
};

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
const US_TimezoneMapping = {
  "Eastern Standard Time": "America/New_York",
  "Eastern Daylight Time": "America/New_York",
  "Central Standard Time": "America/Chicago",
  "Central Daylight Time": "America/Chicago",
  "Mountain Standard Time": "America/Denver",
  "Mountain Daylight Time": "America/Denver",
  "Pacific Standard Time": "America/Los_Angeles",
  "Pacific Daylight Time": "America/Los_Angeles",
  "Alaska Standard Time": "America/Anchorage",
  "Alaska Daylight Time": "America/Anchorage",
  "Hawaii-Aleutian Standard Time": "Pacific/Honolulu",
  // Hawaii doesn't observe daylight saving time
  "Samoa Standard Time": "Pacific/Pago_Pago", // American Samoa
  "Chamorro Standard Time": "Pacific/Guam", // Guam
  "Atlantic Standard Time": "America/Puerto_Rico",
  "Atlantic Daylight Time": "America/Puerto_Rico", // Puerto Rico doesn't currently observe DST, but it's included for completeness
  "Aleutian Standard Time": "America/Adak",
  "Aleutian Daylight Time": "America/Adak",
};

export const getIANATimezone = ({ commonName }: TimeZoneProps) => {
  // eslint-disable-next-line camelcase
  return (US_TimezoneMapping as Record<string, string>)[commonName] || "Eastern Standard Time";
};

type FormatTimeByTimeZoneParamsType = {
  date: string | number | Date;
  tzCommonName: string;
  formatStr?: string;
};

export const formatTimeByTimeZone = ({
  date,
  tzCommonName,
  formatStr = "yyyy-MM-dd HH:mm:ss", // Default format string
}: FormatTimeByTimeZoneParamsType): string => {
  const ianaTz = getIANATimezone({ commonName: tzCommonName });

  // Use Intl.DateTimeFormat to format the date according to the IANA time zone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Convert the formatted date to a string
  const parts = formatter.formatToParts(new Date(date));
  const dateTimeStr = parts.map(({ value }) => value).join("");

  // Reformat using date-fns if a custom format string is provided
  const finalDate = format(new Date(dateTimeStr), formatStr);

  return finalDate;
};
