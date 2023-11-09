import { InjectionToken } from '@angular/core';
// eslint-disable-next-line import/named
import { MarkedExtension } from 'marked';

export const MARKED_EXTENSIONS = new InjectionToken<MarkedExtension[]>('MARKED_EXTENSIONS');
