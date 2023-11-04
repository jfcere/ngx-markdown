import { makeEnvironmentProviders, SecurityContext } from '@angular/core';
import { MarkdownModuleConfig } from './markdown.module';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';

export function provideMarkdown(markdownModuleConfig?: MarkdownModuleConfig) {
  return makeEnvironmentProviders([
    MarkdownService,
    markdownModuleConfig && markdownModuleConfig.clipboardOptions || [],
    markdownModuleConfig && markdownModuleConfig.markedOptions || [],
    {
      provide: SECURITY_CONTEXT,
      useValue: markdownModuleConfig && markdownModuleConfig.sanitize != null
        ? markdownModuleConfig.sanitize
        : SecurityContext.HTML,
    },
  ]);
}
