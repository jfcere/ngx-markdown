import { TemplateRef, Type } from '@angular/core';

export class ClipboardOptions {
  buttonComponent?: Type<unknown>;
}

export class ClipboardRenderOptions extends ClipboardOptions {
  buttonTemplate?: TemplateRef<unknown>;
}
