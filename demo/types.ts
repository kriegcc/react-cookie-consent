export enum Page {
  Home = "home",
  Second = "second",
}

export enum Language {
  English = "en",
  German = "de",
}

export const languages = [
  { name: "English", code: Language.English },
  { name: "Deutsch", code: Language.German },
]
export const DEFAULT_LANGUAGE = Language.English
