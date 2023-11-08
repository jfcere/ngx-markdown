import { InjectionToken } from '@angular/core';
import { Marked } from 'marked';

/**
 * private token to be able to provide mock in testing
 * start with ɵ so IDE doesn't provide it in autocomplete suggestions
 * */
export const ɵMARKED = new InjectionToken<typeof Marked>('ɵMARKED');
