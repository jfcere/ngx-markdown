import { InjectionToken } from '@angular/core';
// eslint-disable-next-line import/named
import { MarkedOptions } from 'marked';

// eslint-disable-next-line import/named
export { MarkedOptions } from 'marked';

export const MARKED_OPTIONS = new InjectionToken<MarkedOptions>('MARKED_OPTIONS');
