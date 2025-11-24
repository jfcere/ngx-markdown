import { InjectionToken, SecurityContext } from '@angular/core';

export const SANITIZE = new InjectionToken<SecurityContext | SanitizeFunction>('SANITIZE');

export type SanitizeFunction = (html: string) => string;

export function isSanitizeFunction(sanitize: SecurityContext | SanitizeFunction): sanitize is SanitizeFunction {
  return typeof sanitize === 'function';
}
