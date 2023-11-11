import { InjectionToken, TemplateRef, Type } from '@angular/core';

export interface ClipboardOptions {
  buttonComponent?: Type<unknown>;
}

export interface ClipboardRenderOptions extends ClipboardOptions {
  buttonTemplate?: TemplateRef<unknown>;
}

export const CLIPBOARD_OPTIONS = new InjectionToken<ClipboardOptions>('CLIPBOARD_OPTIONS');
