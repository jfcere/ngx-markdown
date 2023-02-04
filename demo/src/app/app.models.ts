export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export function isTheme(value: unknown): value is Theme {
  return value != null
    && typeof value === 'string'
    && Object.values(Theme).includes(value as Theme);
}
