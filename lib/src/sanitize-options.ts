import { InjectionToken, SecurityContext } from '@angular/core';

export const SANITIZE = new InjectionToken<SecurityContext | SanitizeFunction>('SANITIZE');

export type SanitizeFunction = (html: string) => string;

export function isSanitizeFunction(sanitize: SecurityContext | SanitizeFunction | null): sanitize is SanitizeFunction {
  return typeof sanitize === 'function';
}
