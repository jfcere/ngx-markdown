import { InjectionToken } from '@angular/core';
// eslint-disable-next-line import/named
import { MarkedExtension } from 'marked';

export const MARKDOWN_EXTENSIONS = new InjectionToken<MarkedExtension[]>('Markdown extensions to be used');
