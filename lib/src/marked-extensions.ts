import { InjectionToken } from '@angular/core';
import { MarkedExtension } from 'marked';

export const MARKED_EXTENSIONS = new InjectionToken<MarkedExtension[]>('MARKED_EXTENSIONS');
