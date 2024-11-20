import { InjectionToken } from '@angular/core';
import { MarkedOptions } from 'marked';

export type { MarkedOptions } from 'marked';

export const MARKED_OPTIONS = new InjectionToken<MarkedOptions>('MARKED_OPTIONS');
