import { LanguageValue } from "./language";

export const FORM_LANGUAGES = [
  { label: "English", value: LanguageValue.ENGLISH as number },
  { label: "Spanish", value: LanguageValue.SPANISH as number },
  // { name: 'French', value: 3 },
  // { name: 'Russian', value: 4 },
  // { name: 'Filipino', value: 5 },
];

export const FORM_LANGUAGES_WITH_DEFAULT = [{ label: "Language", value: "" }, ...FORM_LANGUAGES];

export const LIBRARY_TYPE_ID = {
  ALL: 0,
  TREATMENT: 1,
  DIAGNOSIS: 2,
  FACILITY: 3,
  ARBITRATION: 4,
};
