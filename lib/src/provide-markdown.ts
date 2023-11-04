import { makeEnvironmentProviders, SecurityContext } from '@angular/core';
import { MarkdownModuleConfig } from './markdown.module';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';
import { MARKED_EXTENSIONS } from './marked-extensions';

export function provideMarkdown(markdownModuleConfig?: MarkdownModuleConfig) {
  return makeEnvironmentProviders([
    MarkdownService,
    markdownModuleConfig?.loader ?? [],
    markdownModuleConfig?.clipboardOptions ?? [],
    markdownModuleConfig?.markedOptions ?? [],
    {
      provide: MARKED_EXTENSIONS,
      useValue: markdownModuleConfig?.markedExtensions ?? [],
    },
    {
      provide: SECURITY_CONTEXT,
      useValue: markdownModuleConfig?.sanitize ?? SecurityContext.HTML,
    },
  ]);
}
